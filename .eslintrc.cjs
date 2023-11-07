module export = {
  root: true,
  env: {
    browser: true,
    es2021: true, // Updated to es2021 for latest features
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // This should only be used if you're using the new JSX transform from React 17+
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended', // To adjust the rules from eslint for TypeScript
  ],
  ignorePatterns: ['dist', '**/*.js'], // Ignores JavaScript files to avoid conflict with TypeScript files
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // Match the ecmaVersion to the env es2021
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Specify the project file if you are using rules that require type information
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    // 'react-refresh' should only be included if you have this plugin installed and configured
  ],
  rules: {
    // Custom rules or override of existing ones go here
    'react/jsx-uses-react': 'off', // Not needed with the new JSX transform
    'react/react-in-jsx-scope': 'off', // Not needed with the new JSX transform

    // Include additional TypeScript specific rules or override defaults here
    '@typescript-eslint/no-unused-vars': 'warn', // or 'error' to enforce as an error
    '@typescript-eslint/explicit-module-boundary-types': 'off', // if you don't want to enforce specifying return types
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off', // Disable prop-types rule for TypeScript files as TS handles this
        // Any other TypeScript specific overrides
      },
    },
  ],
};
