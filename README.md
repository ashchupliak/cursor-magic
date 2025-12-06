# Cursor Magic

One-command setup for autonomous Cursor AI agent. Maximum productivity with minimal config.

[![npm version](https://badge.fury.io/js/@andriish%2Fcursor-magic.svg)](https://www.npmjs.com/package/@andriish/cursor-magic)

## Quick Install

### Option 1: NPX (Recommended)
```bash
npx @andriish/cursor-magic
```

### Option 2: Shell Script
```bash
curl -fsSL https://raw.githubusercontent.com/ashchupliak/cursor-magic/main/install.sh | bash
```

### Option 3: NPM Global Install
```bash
npm install -g @andriish/cursor-magic
```

After installation, reload your shell:
```bash
source ~/.zshrc
```

## Usage

### Single Agent Commands

```bash
# Main autonomous command - use this most of the time
cursor-auto "fix the authentication bug in login.ts"

# With browser automation for UI testing
cursor-auto-browser "test the checkout flow and fix issues"

# Full power - all features enabled
cursor-full-power "implement user dashboard with tests"
```

### Choose Model

```bash
cursor-with-sonnet "implement feature X"           # Fast, good quality
cursor-with-sonnet-thinking "debug complex issue"  # Deep reasoning
cursor-with-opus "architect new system"            # Best quality
cursor-with-gpt "write documentation"              # GPT-5
```

### Parallel Agents

Run multiple agents simultaneously for maximum productivity:

```bash
# Same task with 3 different models - pick best result
cursor-parallel-models "optimize database queries"

# Multiple different tasks running at once
cursor-parallel-tasks \
  "fix auth bug" \
  "add unit tests" \
  "update docs"

# Each agent works on separate git branch (no conflicts)
cursor-parallel-branches \
  "implement login" \
  "implement signup" \
  "implement password reset"

# Background agent (returns immediately, works in cloud)
cursor-background "refactor the entire auth module"
```

### Session Management

```bash
cursor-list-sessions        # See all chat sessions
cursor-resume-last          # Continue where you left off
cursor-resume-session abc   # Resume specific session
cursor-check-status         # Verify authentication
```

### All Commands

Type `cursor-help` to see all available commands.

## What Gets Installed

```
~/.cursor/
├── mcp.json              # MCP server configuration
├── worktrees.json        # Parallel agent setup
└── rules/
    ├── autonomous-agent.mdc    # Max autonomy behavior
    ├── efficiency.mdc          # Minimize tool calls
    ├── memory-management.mdc   # Context optimization
    ├── session-coordinator.mdc # Session continuity
    ├── coding-standards.mdc    # Code quality
    └── parallel-agent.mdc      # Multi-agent patterns

~/.cursor_aliases         # Shell command aliases
```

## Cursor GUI Settings

For maximum autonomy, also enable these in Cursor app:

**Settings > Features:**
- YOLO Mode: ON
- Agent Mode: Default
- Auto-fix Errors: ON

**YOLO Mode Prompt:**
```
Allow: npm, pnpm, yarn, bun, vitest, jest, pytest, tsc, vite, webpack, cargo, git, touch, mkdir
Deny: rm -rf /, sudo, production deploy, .env modification
```

## Project-Level Installation

To install rules for a specific project:

```bash
npx @andriish/cursor-magic install --project
```

This creates `.cursor/rules/` in your current directory.

## Uninstall

```bash
npx @andriish/cursor-magic uninstall
```

## How Parallel Agents Work

| Method | Description | Best For |
|--------|-------------|----------|
| `cursor-parallel-models` | Same task → 3 models | Complex problems |
| `cursor-parallel-tasks` | Different tasks → parallel | Independent features |
| `cursor-parallel-branches` | Each on own git branch | Team-like workflow |
| `cursor-background` | Runs in Cursor cloud | Long-running tasks |

**Practical limits:**
- 3-4 agents comfortable on 32GB RAM
- Up to 8 agents supported by Cursor 2.0
- Each agent should work on separate branch

## Share With Your Team

```
Install Cursor Magic:
  npx @andriish/cursor-magic

Then reload shell:
  source ~/.zshrc

Commands:
  cursor-auto "your task"           # Main command
  cursor-parallel-tasks t1 t2 t3    # Run multiple in parallel
  cursor-help                       # See all commands
```

## Contributing

PRs welcome! Feel free to add new rules or improve existing ones.

## License

MIT
