import astroConfig from '@st1ggy/linter-config/eslint-astro'

const projectConventions = {
  // This application predates the shared config. Preserve its stable Astro names,
  // content-schema keys and runtime-compatible APIs while keeping correctness and
  // formatting rules from the upstream preset active.
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  camelcase: 'off',
  'import-x/no-unresolved': ['error', { ignore: ['^astro:'] }],
  'no-useless-assignment': 'off',
  'no-useless-escape': 'off',
  'sonarjs/cognitive-complexity': 'off',
  'sonarjs/no-nested-conditional': 'off',
  'sonarjs/no-nested-functions': 'off',
  'sonarjs/no-nested-template-literals': 'off',
  'sonarjs/prefer-regexp-exec': 'off',
  'sonarjs/regex-complexity': 'off',
  'sonarjs/super-linear-regex': 'off',
  'unicorn/consistent-boolean-name': 'off',
  'unicorn/consistent-function-scoping': 'off',
  'unicorn/filename-case': 'off',
  'unicorn/max-nested-calls': 'off',
  'unicorn/name-replacements': 'off',
  'unicorn/no-array-callback-reference': 'off',
  'unicorn/no-array-sort': 'off',
  'unicorn/no-await-expression-member': 'off',
  'unicorn/no-break-in-nested-loop': 'off',
  'unicorn/no-declarations-before-early-exit': 'off',
  'unicorn/no-duplicate-loops': 'off',
  'unicorn/no-for-each': 'off',
  'unicorn/no-nested-ternary': 'off',
  'unicorn/no-null': 'off',
  'unicorn/no-top-level-assignment-in-function': 'off',
  'unicorn/no-unreadable-for-of-expression': 'off',
  'unicorn/prefer-await': 'off',
  'unicorn/prefer-includes-over-repeated-comparisons': 'off',
  'unicorn/prefer-iterator-to-array': 'off',
  'unicorn/prefer-minimal-ternary': 'off',
  'unicorn/prefer-simple-condition-first': 'off',
  'unicorn/prefer-top-level-await': 'off',
}

export default [
  ...astroConfig,
  {
    files: ['**/*.{astro,js,mjs,ts}'],
    rules: projectConventions,
  },
  {
    files: ['**/*.astro/**/*.ts'],
    rules: {
      // Astro exposes inline TypeScript through virtual files that TypeScript cannot
      // include in tsconfig.json; keep the rest of the Astro preset enabled.
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
    },
  },
]
