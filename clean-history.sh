#!/usr/bin/env bash
# =============================================================================
# clean-history.sh — Erase all git commit history and start fresh
#
# WHEN TO USE:
#   Run this script when you want to completely wipe the git commit history
#   and replace it with a single "Initial commit" that contains all current
#   files. This is useful when sensitive data (e.g. API keys) was accidentally
#   committed and you want to remove it from history entirely.
#
# EFFECT ON YOUR SITE:
#   Your website will continue to work perfectly. Git history is only metadata
#   about how the code evolved — it has no effect on how the site is built or
#   deployed by Netlify/Vercel/GitHub Pages.
#
# HOW TO RUN:
#   1. Make sure you have committed or stashed any uncommitted changes first.
#   2. chmod +x clean-history.sh
#   3. ./clean-history.sh
#
# WARNING:
#   This operation is IRREVERSIBLE. Once force-pushed, the old commit history
#   is permanently gone. Make a backup if you need it.
# =============================================================================

set -euo pipefail

BRANCH="${1:-main}"

echo "=========================================="
echo "  Git History Cleaner"
echo "=========================================="
echo ""
echo "This will erase ALL commit history on branch '${BRANCH}'"
echo "and replace it with a single 'Initial commit'."
echo ""
echo "Your site files will NOT be changed — only the git history."
echo ""
read -r -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [[ "${CONFIRM}" != "yes" ]]; then
  echo "Aborted. No changes were made."
  exit 0
fi

# Make sure the working tree is clean
if git rev-parse --verify HEAD > /dev/null 2>&1 && ! git diff-index --quiet HEAD --; then
  echo ""
  echo "ERROR: You have uncommitted changes. Please commit or stash them first."
  exit 1
fi

echo ""
echo "Step 1/5 — Creating orphan branch (no history)..."
git checkout --orphan temp-clean-history

echo "Step 2/5 — Staging all current files..."
git add -A

echo "Step 3/5 — Creating fresh initial commit..."
git commit -m "Initial commit"

echo "Step 4/5 — Replacing '${BRANCH}' branch with the clean version..."
git branch -D "${BRANCH}"
git branch -m "${BRANCH}"

echo "Step 5/5 — Force-pushing to origin to overwrite remote history..."
git push --force origin "${BRANCH}"

echo ""
echo "=========================================="
echo "  Done! Commit history has been erased."
echo "=========================================="
echo ""
echo "What happened:"
echo "  - All old commits have been removed from '${BRANCH}'"
echo "  - A single 'Initial commit' now contains all your current files"
echo "  - Your website will continue to work exactly as before"
echo ""
echo "Note: Any open pull requests or branches based on the old history"
echo "will need to be re-created if you want to keep working on them."
