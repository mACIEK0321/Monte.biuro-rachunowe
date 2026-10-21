"""Read-only HTTP audit. Run with Python 3; saves public metadata beside this file."""
import concurrent.futures
import json
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

BASE = 'https://www.montebiuro.pl'
OUT = Path(__file__).parent

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.links, self.anchors, self.images, self.scripts = [], [], [], [], []
        self.title, self.h1, self.schema, self.lang = '', [], [], ''
        self.capture, self.buffer = None, ''
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang', '')
        if tag == 'meta': self.meta.append(a)
        if tag == 'link': self.links.append(a)
        if tag == 'a' and a.get('href'): self.anchors.append(a['href'])
        if tag == 'img': self.images.append(a)
        if tag == 'script' and a.get('src'): self.scripts.append(a['src'])
        if tag in ('title', 'h1') or (tag == 'script' and a.get('type') == 'application/ld+json'):
            self.capture, self.buffer = tag, ''
    def handle_data(self, data):
        if self.capture: self.buffer += data
    def handle_endtag(self, tag):
        if tag != self.capture: return
        if tag == 'title': self.title = self.buffer
        if tag == 'h1': self.h1.append(self.buffer)
        if tag == 'script':
            try: self.schema.append(json.loads(self.buffer))
            except ValueError: self.schema.append({'parse_error': True})
        self.capture, self.buffer = None, ''

class Redirects(urllib.request.HTTPRedirectHandler):
    def __init__(self): self.chain = []
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append({'status': code, 'from': req.full_url, 'to': newurl})
        return super().redirect_request(req, fp, code, msg, headers, newurl)

def fetch(url):
    redir = Redirects()
    opener = urllib.request.build_opener(redir)
    start = time.monotonic()
    try:
        try: r = opener.open(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (compatible; MonteSEOAudit/1.0)'}), timeout=25)
        except urllib.error.HTTPError as error: r = error
        raw = r.read()
        body = raw.decode('utf-8', errors='replace')
        result = {'url': url, 'final_url': r.url, 'status': r.status, 'redirects': redir.chain,
                  'elapsed_ms': round((time.monotonic()-start)*1000), 'bytes': len(raw),
                  'headers': {k.lower(): v for k,v in r.headers.items()}}
        if 'text/html' in r.headers.get('Content-Type', ''):
            p = Parser(); p.feed(body)
            result.update(vars(p))
            for key in ['rawdata','lasttag','interesting','cdata_elem','convert_charrefs','lineno','offset','capture','buffer']:
                result.pop(key, None)
        else:
            result['body'] = body if len(raw) < 50000 and ('text' in r.headers.get('Content-Type','') or 'xml' in r.headers.get('Content-Type','')) else None
        return result
    except Exception as error: return {'url': url, 'error': str(error)}

if __name__ == '__main__':
    paths = ['/', '/en/', '/blog/', '/en/blog/', '/polityka-prywatnosci/', '/polityka-cookies/', '/regulamin/', '/en/privacy-policy/', '/en/cookie-policy/', '/en/terms-and-conditions/', '/robots.txt', '/sitemap.xml', '/og-image.jpg', '/seo-audit-nieistniejacy-adres-20261021/']
    urls = [BASE+p for p in paths] + ['http://montebiuro.pl/', 'http://www.montebiuro.pl/', 'https://montebiuro.pl/', BASE+'/blog', BASE+'/index.html', BASE+'/en/polityka-prywatnosci/', BASE+'/en/polityka-cookies/', BASE+'/en/regulamin/']
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(fetch, urls))
        found = set()
        for r in results:
            for href in r.get('anchors', []):
                u = urllib.parse.urljoin(r.get('final_url', BASE), href).split('#')[0]
                parsed = urllib.parse.urlparse(u)
                if parsed.netloc == 'www.montebiuro.pl' and (parsed.path.startswith('/blog/') or parsed.path.startswith('/en/blog/')):
                    found.add(u)
        extra = sorted(found - set(urls))[:150]
        results += list(pool.map(fetch, extra))
    report = {'checked_at_utc': datetime.now(timezone.utc).isoformat(), 'method': 'HTTP GET; up to 4 concurrent requests; no JavaScript; no form submission', 'results': results}
    (OUT/'http-evidence.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    for r in results:
        canonical = [a.get('href') for a in r.get('links', []) if a.get('rel') == 'canonical']
        print(json.dumps({'url':r['url'], 'status':r.get('status'), 'final':r.get('final_url'), 'canonical':canonical, 'lang':r.get('lang'), 'h1':r.get('h1'), 'title':r.get('title'), 'error':r.get('error')}, ensure_ascii=True))
