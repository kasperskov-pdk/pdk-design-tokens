/**
 * Script to run all token builds in sequence
 */
const { spawn } = require('child_process');
const path = require('path');

// Run a command and return a promise
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    const process = spawn(command, args, { stdio: 'inherit', shell: true });
    
    process.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
        return;
      }
      resolve();
    });
  });
}

// Main function to run all build steps
async function buildAll() {
  try {
    // First, transform tokens from the source JSON
    await runCommand('node', ['./scripts/transform-design-tokens.js']);
    
    // Clean style dictionary
    await runCommand('npm', ['run', 'clean']);
    
    // Build global tokens
    await runCommand('style-dictionary', ['build']);
    
    // Build sejl tokens
    await runCommand('style-dictionary', ['build', '--config', 'config.sejl.js']);
    
    console.log('✅ All token builds completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildAll();
