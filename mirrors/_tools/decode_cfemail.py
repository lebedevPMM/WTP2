#!/usr/bin/env python3
"""Decode Cloudflare email obfuscation artifacts back to plaintext source form.

Cloudflare's Email Address Obfuscation rewrites emails at serve time:
  - href="mailto:x@y" -> href="/cdn-cgi/l/email-protection#HEX"
  - text emails       -> <span class="__cf_email__" data-cfemail="HEX">[email protected]</span>
  - injects /cdn-cgi/scripts/.../email-decode.min.js
This script reverses all three so the mirror matches the original source.
"""
import re
import sys


def decode(hexstr: str) -> str:
    data = bytes.fromhex(hexstr)
    key = data[0]
    return "".join(chr(b ^ key) for b in data[1:])


def process(path: str) -> None:
    with open(path, encoding="utf-8") as f:
        html = f.read()
    orig = html

    # 1. mailto hrefs
    def href_repl(m):
        return 'href="mailto:%s"' % decode(m.group(1))

    html = re.sub(r'href="/cdn-cgi/l/email-protection#([0-9a-fA-F]+)"', href_repl, html)

    # 2. obfuscated text spans
    def span_repl(m):
        return decode(m.group(1))

    html = re.sub(
        r'<span[^>]*data-cfemail="([0-9a-fA-F]+)"[^>]*>.*?</span>',
        span_repl,
        html,
        flags=re.S,
    )

    # 3. injected decode script
    html = re.sub(
        r'<script[^>]*src="/cdn-cgi/scripts/[^"]*email-decode\.min\.js"[^>]*></script>\s*',
        "",
        html,
    )

    if html != orig:
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"UPDATED {path}")
    else:
        print(f"unchanged {path}")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        process(p)
