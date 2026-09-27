"""Syntax-check inline JavaScript retained on the archived HTML pages."""
from pathlib import Path
from html.parser import HTMLParser
import subprocess
import tempfile

ROOT=Path(__file__).resolve().parent.parent
class Scripts(HTMLParser):
    def __init__(self):
        super().__init__();self.code=[];self.current=None
    def handle_starttag(self,tag,attrs):
        if tag=='script':
            args=dict(attrs)
            self.current=[] if not args.get('src') and args.get('type','') not in ('application/ld+json','application/json') else None
    def handle_data(self,data):
        if self.current is not None:self.current.append(data)
    def handle_endtag(self,tag):
        if tag=='script' and self.current is not None:
            self.code.append(''.join(self.current));self.current=None

pages=[*ROOT.glob('*.html'),*ROOT.glob('blog/*.html'),*ROOT.glob('calculators/*/index.html')]
checked=0
with tempfile.TemporaryDirectory() as tmp:
    scratch=Path(tmp)/'inline.js'
    for page in pages:
        parser=Scripts();parser.feed(page.read_text(encoding='utf-8'))
        for index,script in enumerate(parser.code):
            scratch.write_text(script,encoding='utf-8')
            check=subprocess.run(['node','--check',str(scratch)],capture_output=True,text=True)
            if check.returncode:raise SystemExit(f'{page.relative_to(ROOT)} script {index}: {check.stderr}')
            checked+=1
print(f'Checked {checked} inline scripts on {len(pages)} pages.')
