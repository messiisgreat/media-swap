module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "tailwindcss", "jsdoc"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
    "plugin:jsdoc/recommended-typescript-error",
    "plugin:storybook/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    "./next*",
    "**/*.js",
    "**/*.cjs",
    "pnpm-lock.yaml",
    "__generated__",
  ],
  rules: {
    "no-restricted-syntax": [
      "error",
      "TSEnumDeclaration",
      "TSInterfaceDeclaration",
      "ForInStatement",
      "ForOfStatement",
      "LabeledStatement",
      "WithStatement",
      "VariableDeclaration[kind='let']",
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "jsdoc/tag-lines": "off",
    "jsdoc/no-types": "off",
    "jsdoc/require-param": [
      "error",
      {
        checkDestructuredRoots: false,
      },
    ],
    "jsdoc/check-param-names": [
      "error",
      {
        checkDestructured: false,
      },
    ],
    "jsdoc/require-jsdoc": [
      "error",
      {
        publicOnly: true,
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
    "jsdoc/require-returns": "off",
    "jsdoc/require-returns-description": "off",
    "jsdoc/require-description": [
      "error",
      {
        descriptionStyle: "body",
      },
    ],
    "react/forbid-elements": [
      "error",
      { forbid: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    ],
    "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    "react/jsx-no-useless-fragment": ["error"],
    "react/self-closing-comp": ["error"],
    // "import/order": [
    //   "error",
    //   {
    //     groups: ["builtin", "external", "internal", "object", "type"],
    //     pathGroups: [
    //       {
    //         pattern: "{react,react-dom/**,react-router-dom}",
    //         group: "builtin",
    //         position: "before",
    //       },
    //       {
    //         pattern: "@app/**",
    //         group: "internal",
    //         position: "before",
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ["builtin", "object"],
    //     alphabetize: {
    //       order: "asc",
    //     },
    //     "newlines-between": "always",
    //   },
    // ],
  },
};
