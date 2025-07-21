import re
from urllib.parse import urlparse

def check_url(url):
    reasons = []
    score = 0  # Add scoring logic

    # Clean up
    url = url.strip()

    # BASIC VALIDITY CHECK
    if not re.match(r'^https?://', url):
        reasons.append("URL is missing a proper scheme (http:// or https://)")
        score += 10

    # Prevent plain text like "hello" or "@!#"
    if not re.search(r'\.\w+', url):
        reasons.append("Invalid domain structure")
        score += 10

    # Rule 1: '@' in URL
    if '@' in url:
        reasons.append("Contains '@' symbol")
        score += 10

    # Rule 2: Too many dots
    if url.count('.') > 5:
        reasons.append("Too many dots (.)")
        score += 5

    # Rule 3: URL too long
    if len(url) > 75:
        reasons.append("URL is too long")
        score += 5

    # Rule 4: Contains dash
    if '-' in url:
        reasons.append("Contains dash (-)")
        score += 5

    # Rule 5: IP address instead of domain
    if re.search(r'(\d{1,3}\.){3}\d{1,3}', url):
        reasons.append("Contains IP address")
        score += 15

    # Rule 6: Uses HTTP
    if url.startswith('http://'):
        reasons.append("Uses HTTP instead of HTTPS")
        score += 5

    # Rule 7: URL shortener
    if any(short in url for short in ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'is.gd']):
        reasons.append("Uses a URL shortener")
        score += 10

    # Rule 8: Suspicious keywords
    if any(keyword in url.lower() for keyword in ['login', 'verify', 'secure', 'account', 'update', 'bank', 'signin', 'confirm']):
        reasons.append("Contains suspicious keyword(s)")
        score += 8

    # Rule 9: Suspicious TLDs
    if any(url.endswith(tld) for tld in ['.tk', '.ml', '.ga', '.cf', '.gq']):
        reasons.append("Uses a suspicious TLD")
        score += 7

    # Rule 10: Excessive special characters
    if len(re.findall(r'[^\w\s]', url)) > 10:
        reasons.append("Too many special characters")
        score += 6

    # Rule 11: Missing domain or structure
    parsed = urlparse(url)
    if not parsed.netloc:
        reasons.append("URL is malformed or incomplete")
        score += 10

    # Determine result based on score threshold
    result = 'Phishing' if score >= 25 else 'Safe'

    return result, reasons
