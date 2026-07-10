import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/sw.js',
      'playwright-report/**',
      'test-results/**',
      'coverage/**',
    ],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // New rules shipped with eslint-plugin-react-hooks 6 (via
      // eslint-config-next 16). They flag long-standing patterns across the
      // codebase; kept as warnings until those are addressed case by case.
      'react-hooks/refs': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
