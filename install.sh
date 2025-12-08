#!/bin/bash
# Cursor Magic v2.0 - Simple Install
# https://github.com/ashchupliak/cursor-magic

set -e

REPO="ashchupliak/cursor-magic"
CURSOR_DIR="$HOME/.cursor"
RULES_DIR="$CURSOR_DIR/rules"

echo ""
echo "Cursor Magic v2.0"
echo "================="
echo ""

# Create directory
mkdir -p "$RULES_DIR"

# Download rules
echo "Installing rules..."
curl -sL "https://raw.githubusercontent.com/$REPO/main/rules/.cursorrules" -o "$RULES_DIR/.cursorrules"

echo ""
echo "Done!"
echo ""
echo "Installed: ~/.cursor/rules/.cursorrules"
echo ""
echo "Just use Cursor normally. Rules are auto-applied."
echo ""
