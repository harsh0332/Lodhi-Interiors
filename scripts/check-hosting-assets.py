"""Check real HTTP responses, including empty HTTP 200s that break hydration.
Usage: python3 scripts/check-hosting-assets.py http://localhost:3013
Also works against the deployed HTTPS origin after publishing.
"""
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from urllib.request import urlopen
from urllib.parse import urljoin, urlparse
import json
import sys

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3013').rstrip('/')
ROUTES = ['/', '/process', '/services', '/work', '/studio', '/contact']
assets = {}
errors = []

class Page(HTMLParser):
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        source = None
        kind = None
        if tag == 'script' and attrs.get('src'):
            source, kind = attrs['src'], 'javascript'
        elif tag == 'link' and attrs.get('rel') == 'stylesheet':
            source, kind = attrs.get('href'), 'css'
        elif tag == 'img':
            source, kind = attrs.get('src'), 'image'
        if not source:
            return
        if '/_next/image?' in source:
            errors.append(f'Image still uses the failing optimizer: {source}')
        if source.startswith('/') and not source.startswith('//'):
            if kind in ('javascript', 'css') and not source.startswith('/site-assets/_next/static/'):
                errors.append(f'Browser asset is not using public delivery: {source}')
            assets[source] = kind

for route in ROUTES:
    try:
        with urlopen(BASE + route, timeout=20) as response:
            page = response.read().decode()
            if response.status != 200 or 'text/html' not in response.headers.get('Content-Type', ''):
                errors.append(f'Invalid HTML response: {route}')
            Page().feed(page)
    except Exception as error:
        errors.append(f'{route}: {error}')

def check(item):
    source, kind = item
    try:
        with urlopen(urljoin(BASE, source), timeout=20) as response:
            body = response.read()
            content_type = response.headers.get('Content-Type', '').lower()
            expected = {'javascript': ('javascript', 'ecmascript'), 'css': ('text/css',), 'image': ('image/',)}[kind]
            if response.status != 200 or not body or not any(t in content_type for t in expected):
                return f'{source}: HTTP {response.status}, {content_type}, {len(body)} bytes'
            if kind == 'image' and not (body.startswith((b'\xff\xd8\xff', b'\x89PNG', b'GIF8', b'RIFF')) or b'<svg' in body[:500]):
                return f'{source}: Invalid image signature'
    except Exception as error:
        return f'{source}: {error}'

with ThreadPoolExecutor(max_workers=4) as pool:
    errors.extend(error for error in pool.map(check, assets.items()) if error)
if not assets:
    errors.append('No browser assets discovered')
print(json.dumps({'origin': BASE, 'pages': len(ROUTES), 'assets': len(assets), 'errors': errors}, indent=2))
sys.exit(bool(errors))
