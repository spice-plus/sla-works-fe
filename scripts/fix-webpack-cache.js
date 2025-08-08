#!/usr/bin/env node

/**
 * Webpack Cache and Sharp Module Resolution Fix Script
 *
 * This script addresses common issues with Webpack caching and Sharp module resolution,
 * particularly the tunnel-agent dependency resolution problem.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Starting Webpack cache and Sharp module resolution fix...\n');

// Step 1: Clean Next.js cache
console.log('1. Cleaning Next.js cache...');
try {
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
    console.log('   ✅ .next directory removed');
  } else {
    console.log('   ℹ️  No .next directory found');
  }
} catch (error) {
  console.log('   ⚠️  Error removing .next directory:', error.message);
}

// Step 2: Clean npm cache
console.log('\n2. Cleaning npm cache...');
try {
  execSync('npm cache clean --force', { stdio: 'pipe' });
  console.log('   ✅ npm cache cleaned');
} catch (error) {
  console.log('   ⚠️  Error cleaning npm cache:', error.message);
}

// Step 3: Verify Sharp installation
console.log('\n3. Verifying Sharp installation...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  if (!packageJson.dependencies?.sharp) {
    console.log('   📦 Installing Sharp as direct dependency...');
    execSync('npm install sharp --save', { stdio: 'pipe' });
    console.log('   ✅ Sharp installed successfully');
  } else {
    console.log('   ✅ Sharp is already installed as direct dependency');
  }
} catch (error) {
  console.log('   ⚠️  Error with Sharp installation:', error.message);
}

// Step 4: Check Next.js config
console.log('\n4. Checking Next.js configuration...');
try {
  const configPath = 'next.config.js';
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');

    if (configContent.includes('tunnel-agent')) {
      console.log('   ✅ Webpack fallback configuration found');
    } else {
      console.log('   ⚠️  Consider updating next.config.js with fallback configuration');
    }
  }
} catch (error) {
  console.log('   ⚠️  Error checking Next.js config:', error.message);
}

// Step 5: Reinstall dependencies (optional)
console.log('\n5. Reinstalling dependencies...');
try {
  execSync('npm install', { stdio: 'pipe' });
  console.log('   ✅ Dependencies reinstalled');
} catch (error) {
  console.log('   ⚠️  Error reinstalling dependencies:', error.message);
}

console.log('\n🎉 Webpack cache and Sharp module resolution fix completed!');
console.log('\n📝 Next steps:');
console.log('   - Run "npm run dev" to start development server');
console.log('   - Run "npm run build" to test production build');
console.log('   - If issues persist, check the console for specific error messages');
