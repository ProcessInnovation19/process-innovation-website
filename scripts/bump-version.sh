#!/bin/sh
# Bump patch version. Usage: ./scripts/bump-version.sh [repo-root]
# Priority matches .githooks/pre-commit: app-version.json → package.json → VERSION
set -e
ROOT="${1:-.}"

bump_json_version() {
  local f="$1"
  [ ! -f "$f" ] && return 1
  v=$(grep -E '"version"' "$f" | head -1 | sed -E 's/.*"([0-9]+\.[0-9]+\.[0-9]+)".*/\1/')
  [ -z "$v" ] && return 1
  major=$(echo "$v" | cut -d. -f1)
  minor=$(echo "$v" | cut -d. -f2)
  patch=$(echo "$v" | cut -d. -f3)
  patch=$((patch + 1))
  next="${major}.${minor}.${patch}"
  v_esc=$(echo "$v" | sed 's/\./\\./g')
  tmp="${f}.bump.tmp"
  sed -E "s/\"version\"[[:space:]]*:[[:space:]]*\"${v_esc}\"/\"version\": \"${next}\"/" "$f" > "$tmp" && mv "$tmp" "$f"
  echo "$next"
  return 0
}

if [ -f "$ROOT/public/app-version.json" ]; then
  bump_json_version "$ROOT/public/app-version.json"
elif [ -f "$ROOT/app-version.json" ]; then
  bump_json_version "$ROOT/app-version.json"
elif [ -f "$ROOT/package.json" ] && grep -qE '"version"[[:space:]]*:[[:space:]]*"[0-9]+\.[0-9]+\.[0-9]+"' "$ROOT/package.json"; then
  bump_json_version "$ROOT/package.json"
else
  VFILE="$ROOT/VERSION"
  if [ ! -f "$VFILE" ]; then
    echo "0.1.0" > "$VFILE"
    echo "0.1.0"
    exit 0
  fi
  v=$(cat "$VFILE" | tr -d '[:space:]')
  major=$(echo "$v" | cut -d. -f1)
  minor=$(echo "$v" | cut -d. -f2)
  patch=$(echo "$v" | cut -d. -f3)
  patch=$((patch + 1))
  echo "${major}.${minor}.${patch}" > "$VFILE"
  echo "${major}.${minor}.${patch}"
fi
