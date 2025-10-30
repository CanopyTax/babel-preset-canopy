# babel-preset-canopy

A shared Babel preset for Canopy projects that provides consistent transpilation for TypeScript, React, and modern JavaScript.

## Features

- **TypeScript Support** - Transpiles TypeScript with `@babel/preset-typescript`
- **Modern React** - Configured for React 17+ automatic JSX runtime
- **ES Module Preservation** - Maintains ES modules for optimal tree-shaking
- **Runtime Helpers** - Uses `@babel/plugin-transform-runtime` to reduce bundle size
- **Targeted Transpilation** - Only applies necessary transforms based on browserslist targets
- **Webpack Import Ignoring** - Handles Canopy-specific import patterns

## Installation

```bash
yarn add -D babel-preset-canopy
```

## Usage

Create a `babel.config.js` in your project:

```javascript
module.exports = {
  presets: ['babel-preset-canopy']
};
```

## What's Included

### Presets

1. **@babel/preset-typescript** - TypeScript transpilation
2. **@babel/preset-react** - React JSX transformation
   - Uses automatic JSX runtime (no need to import React)
   - Development mode enabled when `NODE_ENV=development`
3. **@babel/preset-env** - Smart JavaScript transpilation
   - `bugfixes: true` - Applies minimal transforms for known issues
   - `modules: false` - Preserves ES modules for bundler optimization
   - `shippedProposals: false` - Only stable language features

### Plugins

1. **@babel/plugin-transform-runtime** - Runtime helper optimization
   - Reduces code duplication by reusing Babel helpers
   - Enables regenerator for async/await support
   - Uses ES modules for better tree-shaking
2. **babel-plugin-webpack-import-ignore** - Canopy-specific import handling
   - Ignores imports matching `@canopytax/` pattern during webpack processing


## Browser Support

Browser targets should be defined in your project's `browserslist` configuration (`browserslist-config-canopy`). The preset will automatically apply only the necessary transforms based on your targets.


## Development vs Production

The preset automatically detects the environment:

- **Development** (`NODE_ENV=development`): Enables React development mode for better error messages
- **Production** (`NODE_ENV=production`): Optimizes for smaller bundle size and performance

## TypeScript Configuration

This preset handles TypeScript transpilation through Babel, but you should still maintain a `tsconfig.json` for type checking which should be run separately:

```bash
yarn tsc --noEmit
```

## License

MIT
