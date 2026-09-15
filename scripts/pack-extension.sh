#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
extension_dir="$root/extension"
zip_name="${1:-copy-tab-urls.zip}"
rm -f "$root/$zip_name"

(
  cd "$extension_dir"
  zip -r "$root/$zip_name" \
    manifest.json \
    service-worker.js \
    settings.js \
    options.html \
    options.js \
    options.css \
    offscreen.html \
    offscreen.js \
    icons/icon16.png \
    icons/icon32.png \
    icons/icon48.png \
    icons/icon128.png
)

echo "Packed $root/$zip_name:"
unzip -l "$root/$zip_name"
