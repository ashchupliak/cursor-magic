#!/bin/bash
# Cursor Magic - Quick Install Script
# https://github.com/ashchupliak/cursor-magic

set -e

REPO="ashchupliak/cursor-magic"
CURSOR_DIR="$HOME/.cursor"
RULES_DIR="$CURSOR_DIR/rules"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              CURSOR MAGIC INSTALLER                        ║"
echo "║      Autonomous AI Agent Setup for Maximum Productivity    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Create directories
mkdir -p "$RULES_DIR"

# Download and extract
echo "[1/4] Downloading cursor-magic..."
TEMP_DIR=$(mktemp -d)
curl -sL "https://github.com/$REPO/archive/main.tar.gz" | tar -xz -C "$TEMP_DIR"

# Install rules
echo "[2/4] Installing Cursor rules..."
cp -r "$TEMP_DIR/cursor-magic-main/rules/"* "$RULES_DIR/"

# Install templates
echo "[3/4] Installing configurations..."
cp "$TEMP_DIR/cursor-magic-main/templates/mcp.json" "$CURSOR_DIR/mcp.json" 2>/dev/null || true
cp "$TEMP_DIR/cursor-magic-main/templates/worktrees.json" "$CURSOR_DIR/worktrees.json" 2>/dev/null || true
cp "$TEMP_DIR/cursor-magic-main/templates/cursor_aliases" "$HOME/.cursor_aliases"

# Add to shell
echo "[4/4] Configuring shell..."
for rc in "$HOME/.zshrc" "$HOME/.bashrc"; do
    if [ -f "$rc" ] && ! grep -q "cursor_aliases" "$rc"; then
        echo "" >> "$rc"
        echo "# Cursor Magic CLI aliases" >> "$rc"
        echo "source ~/.cursor_aliases" >> "$rc"
    fi
done

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  Installation complete!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "  Next steps:"
echo ""
echo "  1. Reload your shell:"
echo "     source ~/.zshrc"
echo ""
echo "  2. Start using Cursor agent:"
echo "     cursor-auto \"your task here\""
echo ""
echo "  3. See all commands:"
echo "     cursor-help"
echo ""
echo "  Documentation: https://github.com/$REPO"
echo ""
