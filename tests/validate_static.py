#!/usr/bin/env python3
"""Dependency-free integrity checks for the static MirrorCoach build."""
from __future__ import annotations
from collections import Counter
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
FRAGMENTS = [
    "fragments/00-shell-dashboard.html",
    "fragments/01-clinical-planning.html",
    "fragments/02-session-learning.html",
    "fragments/03-outcomes-research-close.html",
]
SCRIPTS = [
    "js/00-boot.js", "js/01-base.js", "js/02-exercises.js",
    "js/03-tutorial-content.js", "js/04-manual-content.js",
    "js/05-sample-state.js", "js/06-core.js",
    "js/07-patients-protocols.js", "js/08-session.js",
    "js/09-library-tutorial.js", "js/10-manual-outcomes-research.js",
    "js/11-init.js",
]
REQUIRED = ["index.html", "manifest.webmanifest", "sw.js", ".nojekyll", *FRAGMENTS, *SCRIPTS]
DYNAMIC_IDS = {"quizResult"}

errors: list[str] = []
for path in REQUIRED:
    if not (ROOT / path).exists():
        errors.append(f"Missing required file: {path}")

if not errors:
    html = "\n".join((ROOT / path).read_text(encoding="utf-8") for path in FRAGMENTS)
    ids = re.findall(r'\bid=["\']([^"\']+)', html)
    duplicates = sorted(key for key, count in Counter(ids).items() if count > 1)
    if duplicates:
        errors.append(f"Duplicate interface IDs: {', '.join(duplicates)}")

    js_text = "\n".join((ROOT / path).read_text(encoding="utf-8") for path in SCRIPTS[1:])
    refs = set(re.findall(r'\$\(["\']([^"\']+)["\']\)', js_text))
    missing_refs = sorted(refs - set(ids) - DYNAMIC_IDS)
    if missing_refs:
        errors.append(f"JavaScript references missing interface IDs: {', '.join(missing_refs)}")

    sw = (ROOT / "sw.js").read_text(encoding="utf-8")
    cached = re.findall(r"['\"](\./[^'\"]+)['\"]", sw)
    missing_cached = sorted(path for path in cached if path != "./" and not (ROOT / path[2:].split("?", 1)[0]).exists())
    if missing_cached:
        errors.append(f"Service-worker entries do not exist: {', '.join(missing_cached)}")

    index = (ROOT / "index.html").read_text(encoding="utf-8")
    for path in ["js/00-boot.js", "css/01-foundation.css", "css/02-layout.css", "css/03-components.css", "css/04-responsive.css"]:
        if path not in index:
            errors.append(f"index.html does not reference {path}")

if errors:
    print("MirrorCoach static validation failed:", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    raise SystemExit(1)

print("MirrorCoach static validation passed.")
