import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: ['eslint:recommended', 'plugin:@tanstack/eslint-plugin-query/recommended'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        parser: '@typescript-eslint/parser',
        settings: {
          react: { version: 'detect' },
          'import/resolver': {
            typescript: {},
          },
        },
        env: {
          browser: true,
          node: true,
          es2020: true,
        },
        extends: [
          'eslint:recommended',
          'plugin:import/errors',
          'plugin:import/warnings',
          'plugin:import/typescript',
          'plugin:@typescript-eslint/recommended',
          'plugin:react/recommended',
          'plugin:react-hooks/recommended',
          'plugin:jsx-a11y/recommended',
          'plugin:prettier/recommended',
        ],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: ['@/features/*/*', '!@/features/*/api'],
            },
          ],
          'linebreak-style': ['error', 'unix'],
          'react/prop-types': 'off',
          'no-console': 'warn',
          'import/order': [
            'error',
            {
              groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
              'newlines-between': 'always',
              alphabetize: { order: 'asc', caseInsensitive: true },
            },
          ],
          'import/default': 'off',
          'import/no-named-as-default-member': 'off',
          'import/no-named-as-default': 'off',

          'react/react-in-jsx-scope': 'off',

          'jsx-a11y/anchor-is-valid': 'off',

          '@typescript-eslint/no-unused-vars': ['error'],

          '@typescript-eslint/explicit-function-return-type': ['off'],
          '@typescript-eslint/explicit-module-boundary-types': ['off'],
          '@typescript-eslint/no-empty-function': ['off'],
          '@typescript-eslint/no-explicit-any': ['off'],

          'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        },
      },
    ],
  }
);
