import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Base configuration for all files
  {
    ignores: ['node_modules/**', 'dist/**', 'src/generated/**', 'env.d.ts', 'tailwind.config.js'],
  },
  // JavaScript-specific configuration
  {
    files: ['**/*.{js,cjs,mjs}'],
    ...js.configs.recommended,
  },
  // TypeScript and React configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: '.',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        FormData: 'readonly',
        FileReader: 'readonly',
        Image: 'readonly',
        MessageChannel: 'readonly',
        ResizeObserver: 'readonly',
        performance: 'readonly',
        getSelection: 'readonly',
        DocumentFragment: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'prettier': prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
      }],
      '@typescript-eslint/no-unused-expressions': 'warn',
      
      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // 'react/jsx-max-props-per-line': ['error', { maximum: 1 }], // Causes conflicts with prettier
      
      // Base rules
      'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
      'no-undef': 'off', // TypeScript handles this
      'no-case-declarations': 'warn',
      'no-prototype-builtins': 'warn',
      'no-cond-assign': ['error', 'except-parens'],
      'no-sparse-arrays': 'warn',
      'no-useless-escape': 'warn',
      'prefer-const': 'warn',
      
      // Prettier rules
      'prettier/prettier': ['error', {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        endOfLine: 'auto',
        jsxBracketSameLine: false, // Set to false to encourage multi-line JSX
      }],
    },
  },
  // Special configuration for generated files
  {
    files: ['src/generated/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-case-declarations': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];
