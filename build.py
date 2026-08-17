#!/usr/bin/env python3
"""Inline index.html into a single self-contained file for Artifact publishing.

Artifacts run under a strict CSP that blocks every external host, so a published
page cannot fetch css/*.css or js/*.js. This walks index.html and replaces each
<link rel="stylesheet"> and <script src> with the file's contents inline, writing
the result to dist/integrity-console.html.

Order is preserved exactly, and the scripts stay classic (non-module) tags, so the
33 inline onclick= handlers keep resolving against global scope.

    python3 build.py
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / "dist" / "integrity-console.html"

LINK = re.compile(r'<link rel="stylesheet" href="([^"]+)"\s*/?>')
SCRIPT = re.compile(r'<script src="([^"]+)"></script>')


def read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists():
        sys.exit(f"build: missing {rel} (referenced by index.html)")
    return path.read_text(encoding="utf-8").rstrip("\n")


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    html = LINK.sub(lambda m: f"<style>\n{read(m.group(1))}\n</style>", html)
    html = SCRIPT.sub(lambda m: f"<script>\n{read(m.group(1))}\n</script>", html)

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"built {OUT.relative_to(ROOT)}  ({len(html):,} bytes)")


if __name__ == "__main__":
    main()
