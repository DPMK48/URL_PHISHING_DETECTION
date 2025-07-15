import re
from urllib.parse import urlparse

def check_url(url):
    reasons = []

    # Clean up
    url = url.strip()

    # BASIC VALIDITY CHECK
    if not re.match(r'^https?://', url):
        reasons.append("URL is missing a proper scheme (http:// or https://)")

    # Prevent plain text like "hello" or "@!#"
    if not re.search(r'\.\w+', url):
        reasons.append("Invalid domain structure")

    # Rule 1: '@' in URL
    if '@' in url:
        reasons.append("Contains '@' symbol")

    # Rule 2: Too many dots
    if url.count('.') > 5:
        reasons.append("Too many dots (.)")

    # Rule 3: URL too long
    if len(url) > 75:
        reasons.append("URL is too long")

    # Rule 4: Contains dash
    if '-' in url:
        reasons.append("Contains dash (-)")

    # Rule 5: IP address instead of domain
    if re.search(r'(\d{1,3}\.){3}\d{1,3}', url):
        reasons.append("Contains IP address")

    # Rule 6: Uses HTTP
    if url.startswith('http://'):
        reasons.append("Uses HTTP instead of HTTPS")

    # Rule 7: Uses known URL shortener
    if any(short in url for short in ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'is.gd']):
        reasons.append("Uses a URL shortener")

    # Rule 8: Suspicious keywords
    if any(keyword in url.lower() for keyword in ['login', 'verify', 'secure', 'account', 'update', 'bank', 'signin', 'confirm']):
        reasons.append("Contains suspicious keyword(s)")

    # Rule 9: Suspicious TLDs (like .tk, .ml, .ga)
    if any(url.endswith(tld) for tld in ['.tk', '.ml', '.ga', '.cf', '.gq']):
        reasons.append("Uses a suspicious TLD")

    # Rule 10: Excessive special characters
    if len(re.findall(r'[^\w\s]', url)) > 10:
        reasons.append("Too many special characters")

    # Rule 11: Missing domain or structure
    parsed = urlparse(url)
    if not parsed.netloc:
        reasons.append("URL is malformed or incomplete")

    # Result
    if reasons:
        result = 'Phishing'
    else:
        result = 'Safe'

    return result, reasons
