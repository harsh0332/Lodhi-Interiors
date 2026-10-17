"""SSR integrity checks for the shared journey and expertise navigation."""
from html.parser import HTMLParser
from urllib.request import urlopen
import json

class Tabs(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids={}; self.tabs=[]; self.panels=[]; self.links=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):
            assert a['id'] not in self.ids, f"Duplicate id: {a['id']}"
            self.ids[a['id']]=a
        if a.get('role')=='tab':self.tabs.append(a)
        if a.get('role')=='tabpanel':self.panels.append(a)
        if tag=='a':self.links.append(a.get('href',''))

def page(path):
    p=Tabs();p.feed(urlopen('http://localhost:3000'+path).read().decode());return p

def check(path,n):
    p=page(path)
    assert len(p.tabs)==n,(path,len(p.tabs))
    assert len(p.panels)==n
    for t in p.tabs:
        panel=p.ids[t['aria-controls']]
        assert panel['aria-labelledby']==t['id']
        assert ('hidden' not in panel)==(t['aria-selected']=='true')
        assert t['tabindex']==('0' if t['aria-selected']=='true' else '-1')
    return {'route':path,'tabs':n,'visible_panels':sum('hidden' not in p for p in p.panels)}
results=[check('/',9)]
# Standalone process/services now use native chapters, checked in check-narrative.py.
page('/process');page('/services')
for path in ['/studio','/work','/insights','/residential-interior-design-bhopal']:
    page(path)
print(json.dumps({'journey_and_services':results,'unique_ids':'pass','aria_associations':'pass','server_initial_state':'pass'},indent=2))
