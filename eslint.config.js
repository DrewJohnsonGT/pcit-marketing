import nextPlugin from '@next/eslint-plugin-next';
import eslintParserTypeScript from '@typescript-eslint/parser';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import react from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import sort from 'eslint-plugin-sort';
import ts from 'typescript-eslint';

const sharedLanguageOptions = {
  parser: eslintParserTypeScript,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: true,
    tsconfigRootDir: './',
  },
};

export default [
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: sharedLanguageOptions,
  },
  // Tailwind
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: sharedLanguageOptions,
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn']?.rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error']?.rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        {
          group: 'newLine',
          printWidth: 120,
        },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/app/globals.css',
      },
    },
  },
  // React
  react.configs.flat?.recommended,
  {
    languageOptions: sharedLanguageOptions,
    plugins: {
      'react-hooks': pluginReactHooks,
      sort,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'sort/exports': 'off',
      'sort/import-members': 'off',
      'sort/imports': 'off',
      'sort/object-properties': 'error',
      'sort/string-enums': 'error',
      'sort/string-unions': 'error',
      'sort/type-properties': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Next
  {
    name: 'Next Plugin',
    plugins: {
      '@next/next': nextPlugin,
      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
      },
    },
  },
];
