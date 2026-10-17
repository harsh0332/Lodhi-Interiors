"""Verify crawlable content and route contracts; does not replace browser QA."""
from html.parser import HTMLParser
from urllib.request import urlopen
import json

class Document(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=set();self.chapters=[];self.links=[];self.images=[];self.text=[];self.h1=0;self.hidden=0;self.details=0;self.preloads=[];self.scripts=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):
            assert a['id'] not in self.ids, f'Duplicate id {a["id"]}'
            self.ids.add(a['id'])
        if 'data-chapter' in a:
            self.chapters.append(a)
            assert 'hidden' not in a
            assert a.get('aria-labelledby'), 'Chapter heading missing'
        if tag=='a':self.links.append(a)
        if tag=='img':self.images.append(a)
        if tag=='h1':self.h1+=1
        if tag=='details':self.details+=1
        if tag=='link' and a.get('rel')=='preload' and a.get('as')=='image':self.preloads.append(a)
        if tag=='script' and a.get('src'):self.scripts.append(a['src'])
    def handle_data(self,data):self.text.append(data)

results=[]
for path,ids,need in [('/process',['discover','imagine','detail','create','live'],['Your moment','A project brief and agreed scope','Your completed space and care guidance']),('/services',['homes','workplaces','kitchens','execution'],['Design consultancy','Design + execution','Residential Interiors','Turnkey Interiors'])]:
    html=urlopen('http://localhost:3000'+path).read().decode()
    doc=Document();doc.feed(html)
    assert doc.h1==1
    assert [c['id'] for c in doc.chapters]==ids
    assert all(c['aria-labelledby'] in doc.ids for c in doc.chapters)
    for anchor in doc.links:
        if anchor.get('href','').startswith('#'):assert anchor['href'][1:] in doc.ids,anchor
    assert set(a['href'] for a in doc.links if 'data-chapter-link' in a)==set('#'+i for i in ids)
    for text in need:assert text in ' '.join(doc.text),text
    assert all(i.get('alt') and i.get('sizes') for i in doc.images)
    assert len([i for i in doc.images if i.get('fetchPriority')=='high' or i.get('fetchpriority')=='high'])<=1
    assert all(i.get('loading')=='lazy' for i in doc.images[1:])
    if path=='/services':
        assert doc.details==8
        assert len([a for a in doc.links if a.get('href','').startswith('/contact?project=')])==4
    if path=='/process':
        assert any(a.get('href')=='https://lodhiinteriors.vercel.app/' for a in doc.links)
        assert len([a for a in doc.links if a.get('href','').endswith('.pdf')])==2
    results.append({'route':path,'server_rendered_chapters':len(doc.chapters),'images':len(doc.images),'native_details':doc.details,'chapter_anchor_targets':'pass','content_without_JS':'pass'})
print(json.dumps(results,indent=2))
