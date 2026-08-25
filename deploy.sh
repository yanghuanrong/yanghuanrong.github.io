#!/bin/bash
set -euo pipefail

npm run build
echo "产物在 dist/。GitHub Pages 仍由 master 的 Actions 发布；确认后再把 astro 合入。"
