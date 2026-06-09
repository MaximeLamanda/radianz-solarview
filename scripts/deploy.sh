#!/usr/bin/env bash
set -euo pipefail

BRANCH="${1:-main}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Erreur : des changements non commités sont présents. Committez d'abord."
  exit 1
fi

echo "→ Push origin/$BRANCH"
git push origin "$BRANCH"

echo "→ Push prod/$BRANCH (déclenche Vercel)"
if git push prod "$BRANCH" 2>/dev/null; then
  echo "✓ Déployé sur origin et prod"
  exit 0
fi

echo "⚠ Push direct vers prod rejeté — cherry-pick du dernier commit sur prod/main…"
COMMIT="$(git rev-parse HEAD)"
git fetch prod

TMP_BRANCH="deploy-$(date +%s)"
git checkout -B "$TMP_BRANCH" prod/main

if git cherry-pick "$COMMIT"; then
  git push prod "$TMP_BRANCH:$BRANCH"
  git checkout "$BRANCH"
  git branch -D "$TMP_BRANCH"
  echo "✓ Déployé sur prod via cherry-pick"
else
  git cherry-pick --abort 2>/dev/null || true
  git checkout "$BRANCH"
  git branch -D "$TMP_BRANCH" 2>/dev/null || true
  echo "Erreur : conflit lors du cherry-pick sur prod. Résolvez manuellement."
  exit 1
fi
