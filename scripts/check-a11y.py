"""Static accessibility checks; supplements, never replaces, assistive-device QA."""
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parent.parent
class Scan(HTMLParser):
    def __init__(self):super().__init__();self.html_lang=False;self.h1=0;self.main_ids=[];self.skip=[];self.viewport=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='html':self.html_lang=bool(a.get('lang'))
        if tag=='h1':self.h1+=1
        if tag=='main':self.main_ids.append(a.get('id'))
        if tag=='a' and set(a.get('class','').split()) & {'skip','skip-link'}:self.skip.append(a.get('href'))
        if tag=='meta' and a.get('name')=='viewport':self.viewport=True
paths=[ROOT/'index.html',*ROOT.glob('app/index.html'),*ROOT.glob('calculators/*/index.html'),ROOT/'compare/index.html',ROOT/'saved/index.html',*[ROOT/'blog'/p for p in ('emi-payment-formula.html','sip-growth-illustration.html','gst-amount-math.html','fd-compounding-math.html')]]
for path in paths:
    page=Scan();page.feed(path.read_text())
    assert page.html_lang and page.viewport and page.h1==1 and len(page.main_ids)==1,path
    assert page.skip and page.skip[0]=='#'+page.main_ids[0],path

def luminance(h):
    rgb=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    return sum(w*(v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4) for w,v in zip((.2126,.7152,.0722),rgb))
def contrast(a,b):
    light,dark=sorted([luminance(a),luminance(b)],reverse=True)
    return (light+0.05)/(dark+0.05)
for a,b in [('#a94206','#ffffff'),('#505461','#ffffff'),('#ffae82','#181a22'),('#bec3cf','#181a22'),('#665e54','#ffffff'),('#9e6510','#ffffff'),('#c9c2b5','#1f1c17'),('#aba395','#1f1c17')]:
    assert contrast(a,b)>=4.5,(a,b,contrast(a,b))
print(f'Static landmarks and sampled design-token text contrast pass on {len(paths)} routes.')
