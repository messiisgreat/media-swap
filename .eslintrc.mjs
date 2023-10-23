module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "tailwindcss"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ["./next*"],
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
    "@typescript-eslint/no-explicit-any": "off",
  },
};
