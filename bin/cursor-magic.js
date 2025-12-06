#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const HOME = os.homedir();
const CURSOR_DIR = path.join(HOME, '.cursor');
const RULES_DIR = path.join(CURSOR_DIR, 'rules');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function logStep(step, msg) {
  console.log(`${colors.cyan}[${step}]${colors.reset} ${msg}`);
}

function logSuccess(msg) {
  console.log(`${colors.green}✓${colors.reset} ${msg}`);
}

function logError(msg) {
  console.log(`${colors.red}✗${colors.reset} ${msg}`);
}

// Get the package root directory
function getPackageRoot() {
  return path.join(__dirname, '..');
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy file with backup
function copyFile(src, dest, backup = true) {
  if (backup && fs.existsSync(dest)) {
    const backupPath = `${dest}.backup.${Date.now()}`;
    fs.copyFileSync(dest, backupPath);
  }
  fs.copyFileSync(src, dest);
}

// Copy directory recursively
function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath, false);
    }
  }
}

// Install cursor rules
function installRules() {
  logStep('1/5', 'Installing Cursor rules...');
  const srcRules = path.join(getPackageRoot(), 'rules');
  ensureDir(RULES_DIR);
  copyDir(srcRules, RULES_DIR);
  logSuccess(`Rules installed to ${RULES_DIR}`);
}

// Install MCP configuration
function installMCP() {
  logStep('2/5', 'Installing MCP server configuration...');
  const srcMCP = path.join(getPackageRoot(), 'templates', 'mcp.json');
  const destMCP = path.join(CURSOR_DIR, 'mcp.json');
  
  ensureDir(CURSOR_DIR);
  
  // Merge with existing if present
  let config = {};
  if (fs.existsSync(destMCP)) {
    try {
      config = JSON.parse(fs.readFileSync(destMCP, 'utf8'));
    } catch (e) {}
  }
  
  const newConfig = JSON.parse(fs.readFileSync(srcMCP, 'utf8'));
  config.mcpServers = { ...config.mcpServers, ...newConfig.mcpServers };
  
  fs.writeFileSync(destMCP, JSON.stringify(config, null, 2));
  logSuccess(`MCP config installed to ${destMCP}`);
}

// Install worktrees configuration
function installWorktrees() {
  logStep('3/5', 'Installing worktrees configuration...');
  const srcWorktrees = path.join(getPackageRoot(), 'templates', 'worktrees.json');
  const destWorktrees = path.join(CURSOR_DIR, 'worktrees.json');
  
  if (!fs.existsSync(destWorktrees)) {
    copyFile(srcWorktrees, destWorktrees, false);
    logSuccess(`Worktrees config installed to ${destWorktrees}`);
  } else {
    logSuccess('Worktrees config already exists, skipping');
  }
}

// Install shell aliases
function installAliases() {
  logStep('4/5', 'Installing shell aliases...');
  const srcAliases = path.join(getPackageRoot(), 'templates', 'cursor_aliases');
  const destAliases = path.join(HOME, '.cursor_aliases');
  
  copyFile(srcAliases, destAliases, true);
  
  // Add to shell config
  const shellConfigs = ['.zshrc', '.bashrc'].map(f => path.join(HOME, f));
  const sourceLine = 'source ~/.cursor_aliases';
  
  for (const shellConfig of shellConfigs) {
    if (fs.existsSync(shellConfig)) {
      const content = fs.readFileSync(shellConfig, 'utf8');
      if (!content.includes('cursor_aliases')) {
        fs.appendFileSync(shellConfig, `\n# Cursor Magic CLI aliases\n${sourceLine}\n`);
        logSuccess(`Added aliases to ${shellConfig}`);
      }
    }
  }
  
  logSuccess(`Aliases installed to ${destAliases}`);
}

// Install project-level config (optional)
function installProjectConfig(projectPath) {
  logStep('5/5', 'Installing project-level configuration...');
  const projectCursor = path.join(projectPath, '.cursor');
  const projectRules = path.join(projectCursor, 'rules');
  
  ensureDir(projectRules);
  
  const srcRules = path.join(getPackageRoot(), 'rules');
  copyDir(srcRules, projectRules);
  
  logSuccess(`Project config installed to ${projectCursor}`);
}

// Main install function
function install(options = {}) {
  const { silent, project } = options;
  
  if (!silent) {
    console.log('');
    log('╔════════════════════════════════════════════════════════════╗', 'cyan');
    log('║              CURSOR MAGIC INSTALLER                        ║', 'cyan');
    log('║      Autonomous AI Agent Setup for Maximum Productivity    ║', 'cyan');
    log('╚════════════════════════════════════════════════════════════╝', 'cyan');
    console.log('');
  }

  try {
    installRules();
    installMCP();
    installWorktrees();
    installAliases();
    
    if (project) {
      installProjectConfig(project);
    }
    
    if (!silent) {
      console.log('');
      log('════════════════════════════════════════════════════════════', 'green');
      log('  Installation complete!', 'green');
      log('════════════════════════════════════════════════════════════', 'green');
      console.log('');
      log('  Next steps:', 'bright');
      console.log('');
      console.log('  1. Reload your shell:');
      log('     source ~/.zshrc', 'yellow');
      console.log('');
      console.log('  2. Start using Cursor agent:');
      log('     cursor-auto "your task here"', 'yellow');
      console.log('');
      console.log('  3. See all commands:');
      log('     cursor-help', 'yellow');
      console.log('');
      log('  Documentation: https://github.com/ashchupliak/cursor-magic', 'blue');
      console.log('');
    }
  } catch (error) {
    logError(`Installation failed: ${error.message}`);
    process.exit(1);
  }
}

// Uninstall function
function uninstall() {
  log('Removing Cursor Magic...', 'yellow');
  
  // Remove rules
  if (fs.existsSync(RULES_DIR)) {
    fs.rmSync(RULES_DIR, { recursive: true });
    logSuccess('Removed rules');
  }
  
  // Remove aliases file
  const aliasFile = path.join(HOME, '.cursor_aliases');
  if (fs.existsSync(aliasFile)) {
    fs.unlinkSync(aliasFile);
    logSuccess('Removed aliases');
  }
  
  log('Uninstall complete. MCP config preserved.', 'green');
}

// Show help
function showHelp() {
  console.log(`
${colors.cyan}cursor-magic${colors.reset} - Autonomous Cursor AI Agent Setup

${colors.bright}USAGE${colors.reset}
  npx cursor-magic [command] [options]

${colors.bright}COMMANDS${colors.reset}
  install           Install global Cursor configuration
  install --project Install to current project directory  
  uninstall         Remove Cursor Magic configuration
  help              Show this help message

${colors.bright}QUICK INSTALL${colors.reset}
  npx cursor-magic

${colors.bright}AFTER INSTALLATION${colors.reset}
  source ~/.zshrc              Reload shell
  cursor-help                  See all available commands
  cursor-auto "your task"      Start autonomous agent

${colors.bright}EXAMPLES${colors.reset}
  cursor-auto "fix the auth bug"
  cursor-parallel-tasks "task1" "task2" "task3"
  cursor-with-sonnet "implement feature X"

${colors.bright}DOCUMENTATION${colors.reset}
  https://github.com/ashchupliak/cursor-magic
`);
}

// Parse arguments and run
const args = process.argv.slice(2);
const command = args[0] || 'install';

switch (command) {
  case 'install':
    install({
      silent: args.includes('--silent') || args.includes('-s'),
      project: args.includes('--project') ? process.cwd() : null
    });
    break;
  case 'uninstall':
    uninstall();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    // Treat as install with task hint
    install({ silent: false });
}
