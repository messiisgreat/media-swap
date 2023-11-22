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
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ["./next*", "**/*.js", "**/*.cjs", "pnpm-lock.yaml"],
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
  },
};
