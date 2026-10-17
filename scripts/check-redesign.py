"""Read-only smoke audit of the running production preview. No browser interactions."""
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.parse import urlparse, unquote
import json

BASE = 'http://localhost:3000'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.h1=0; self.links=[]; self.images=[]; self.schemas=[]; self.schema=None; self.canonical=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='a' and attrs.get('href'): self.links.append(attrs['href'])
        if tag=='img': self.images.append(attrs)
        if tag=='link' and attrs.get('rel')=='canonical': self.canonical=attrs.get('href')
        if tag=='script' and attrs.get('type')=='application/ld+json': self.schema=''
    def handle_data(self,data):
        if self.schema is not None: self.schema+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema));self.schema=None

def fetch(route):
    try:
        with urlopen(BASE+route, timeout=20) as response: return response.status,response.headers.get('Content-Type',''),response.read()
    except HTTPError as e:return e.code,'',b''
    except TimeoutError:return 599,'',b''

routes=json.loads(Path('.next/prerender-manifest.json').read_text())['routes']
html_routes=[r for r in routes if not r.endswith(('.txt','.xml','.png')) and r not in ['/demo','/_not-found']]
errors=[]; links=set();image_count=0
with ThreadPoolExecutor(max_workers=4) as pool:
    for route,(status,kind,body) in zip(html_routes,pool.map(fetch,html_routes)):
        if status!=200:errors.append(f'{route}: HTTP {status}');continue
        page=Page();page.feed(body.decode())
        if page.h1!=1: errors.append(f'{route}: {page.h1} h1 elements')
        if not page.canonical:errors.append(f'{route}: missing canonical')
        for im in page.images:
            image_count+=1
            if not im.get('alt'):errors.append(f'{route}: missing image alt')
        links.update(l for l in page.links if l.startswith('/') and not l.startswith('//'))
paths=sorted({unquote(urlparse(l).path) for l in links})
missing=[]
for path in paths:
    if path not in routes and not (Path('public')/path.lstrip('/')).is_file():missing.append(path)
errors.extend('Missing linked path: '+p for p in missing)
resources=['/favicon.ico','/design-resources/residence-24x42-3d-views.pdf','/design-resources/raja-residence-elevation-details.pdf','/design-resources/residence-24x42-preview.webp','/design-resources/elevation-details-preview.webp']
with ThreadPoolExecutor(max_workers=4) as pool:
    for route,(status,kind,body) in zip(resources,pool.map(fetch,resources)):
        if status!=200 or not body:errors.append(f'{route}: invalid resource {status}')
        if route.endswith('.pdf') and not body.startswith(b'%PDF'):errors.append(f'{route}: not PDF')
status,_,_=fetch('/not-a-real-page-redesign-check')
if status!=404:errors.append('Missing route should return 404')
print(json.dumps({'html_pages_checked':len(html_routes),'local_link_targets':len(paths),'rendered_images_checked':image_count,'resource_checks':len(resources),'errors':errors},indent=2))
raise SystemExit(bool(errors))
