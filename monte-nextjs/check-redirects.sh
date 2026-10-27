#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
node scripts/check-redirects.cjs "${1:-https://www.montebiuro.pl}"
