"""Catch broken local links and missing static assets before GitHub Pages deploy."""
from pathlib import Path
from urllib.parse import urlparse,unquote
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parent.parent
class Links(HTMLParser):
    def __init__(self):super().__init__();self.links=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag in ('a','link','script','img'):
            target=attrs.get('href') or attrs.get('src')
            if target:self.links.append(target)
errors=[]
for source in ROOT.rglob('*.html'):
    links=Links();links.feed(source.read_text(encoding='utf-8'))
    for value in links.links:
        url=urlparse(value)
        if url.scheme or value.startswith('//') or value.startswith('#') or not url.path:continue
        target=(ROOT/unquote(url.path.lstrip('/'))) if value.startswith('/') else source.parent/unquote(url.path)
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append(f'{source.relative_to(ROOT)} -> {value}')
if errors:raise SystemExit('Missing local links:\n'+'\n'.join(errors))
print('Local links resolve across all HTML pages.')
