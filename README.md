# Cursor Magic v2.0

One file. Maximum effectiveness. Based on [official Cursor docs](https://docs.cursor.com/context/rules-for-ai) and real-world feedback.

## Philosophy

> *"Be terse. Give the answer immediately."* - Cursor employee's rules

**Less is more.** Cursor's AI is already good. Don't over-engineer.

## Quick Install

```bash
npx @andriish/cursor-magic
```

Or manually:
```bash
curl -fsSL https://raw.githubusercontent.com/ashchupliak/cursor-magic/main/install.sh | bash
```

## What Gets Installed

```
~/.cursor/rules/
└── .cursorrules    # One file with everything
```

That's it. One file.

## The Rules

```
# Cursor AI Rules

You are an autonomous coding agent. Work efficiently and independently.

## Principles
- Act, don't ask
- Be terse
- Fix forward
- Self-verify

## Workflow
1. Understand the task
2. Implement (don't output plans unless asked)
3. Verify it works
4. Move on
```

[See full rules →](./rules/.cursorrules)

## Usage

Just use Cursor normally. The rules are automatically applied.

For autonomous mode, enable in Cursor settings:
- **Settings > Features > YOLO Mode**: ON
- **Agent Mode**: Default

## Project-Specific Rules

Create `.cursorrules` in your project root:

```bash
# Copy the base rules
cp ~/.cursor/rules/.cursorrules ./.cursorrules

# Add project-specific rules
cat >> .cursorrules << 'EOF'

## Project: My App
- Use TypeScript strict mode
- Tests with Vitest
- Styling with Tailwind
EOF
```

## What's New in v2.0

**Removed:**
- 14 shell commands → Use Cursor normally
- 6 rule files → One file
- Parallel agent complexity → Cursor handles this
- MCP server config → Not needed

**Added:**
- Simplicity
- Effectiveness

## Why Simplified?

From [official Cursor documentation](https://docs.cursor.com/context/rules-for-ai):

> *"Keep rules concise (under 500 lines)"*

From [community feedback](https://dev.to/heymarkkop/my-top-cursor-tips-v043-1kcg):

> *"Context is king. Overly complex rules often make AI worse."*

The old cursor-magic had:
- 14+ shell commands
- 6 rule files
- Complex parallel agent setup

Reality: Cursor is already autonomous. It doesn't need orchestration.

## Legacy Commands

If you still want shell aliases, they're in `archive/`:

```bash
# Install legacy aliases (optional)
source ~/.cursor_aliases
```

But honestly? Just open Cursor and type your task.

## Uninstall

```bash
rm ~/.cursor/rules/.cursorrules
```

## Research

Based on:
- [Cursor: Rules for AI](https://docs.cursor.com/context/rules-for-ai)
- [Top Cursor Tips](https://dev.to/heymarkkop/my-top-cursor-tips-v043-1kcg)
- [Cursor Best Practices](https://github.com/digitalchild/cursor-best-practices)

## License

MIT

## Author

Andrii Shchupliak
