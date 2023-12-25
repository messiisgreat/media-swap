module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "tailwindcss",
    "jsdoc",
    "unicorn",
    "import",
    "jest",
    "jest-dom",
    "testing-library",
    "prefer-arrow-functions",
  ],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:jsdoc/recommended-typescript-error",
    "plugin:storybook/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    "./next*",
    ".swc",
    "**/*.js",
    "**/*.cjs",
    "pnpm-lock.yaml",
    "bun.lockb",
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
    /** 引数の`@params`での解説を強制 */
    "jsdoc/require-param": [
      "error",
      {
        checkDestructuredRoots: false,
      },
    ],
    /** `@paramas`の値が引数と一致していることを確認 */
    "jsdoc/check-param-names": [
      "error",
      {
        checkDestructured: false,
      },
    ],
    /** JSDocコメントを強制 */
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
    /** コメントの詳細がない関数をerrorに */
    "jsdoc/require-description": [
      "error",
      {
        descriptionStyle: "body",
      },
    ],
    /** 見出しレベルのハードコードを禁止 */
    "react/forbid-elements": [
      "error",
      { forbid: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    ],
    /** 相対パスでのインポートを禁止 */
    "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    /** 冗長なReact.Fragmentを禁止 */
    "react/jsx-no-useless-fragment": ["error"],
    /** 中身のない要素を禁止し、自己終了タグでの指定を強制 */
    "react/self-closing-comp": ["error"],
    /** awaitのないasyncを禁止 */
    "@typescript-eslint/require-await": "error",
    "require-await": "error",
    /** voidを期待される箇所でのPromise<void> form action用に無効化 */
    "@typescript-eslint/no-misused-promises": "off",
    /** 異なる型動詞の加算や、文字列の + による連結を禁止 */
    "no-implicit-coercion": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "prefer-template": "error",
    /** switch文の分岐網羅を強制 */
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    /** switch文が適している箇所でのif文を修正 */
    "unicorn/prefer-switch": "error",
    "import/no-cycle": "error",
    /** インポート直後の空白行を強制 */
    "import/newline-after-import": "error",
    /** 型定義のtype only importを強制 */
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: true,
      },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-inline"],
    "@typescript-eslint/consistent-type-exports": "error",

    /** イベントハンドラの命名規則 propsにon,関数にhandleを強制 */
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
        checkLocalVariables: true,
        checkInlineFunction: true,
      },
    ],
    /** jsxでのbooleanの`={true}`を省略 */
    "react/jsx-boolean-value": "error",
    /** 文字列の冗長な`{}`を削除 */
    "react/jsx-curly-brace-presence": "error",
    /** コンポーネントにPascalCaseの命名を強制 */
    "react/jsx-pascal-case": "error",
    /** testメソッドを"test"に統一 */
    "jest/consistent-test-it": ["error", { fn: "test" }],
    /** 関数のスタイルをアロー関数に統一 */
    "import/no-anonymous-default-export": "off",
    "arrow-body-style": ["error", "as-needed"],
    "func-style": "error",
    "prefer-arrow-functions/prefer-arrow-functions": [
      "error",
      {
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: "unchanged",
        singleReturnOnly: false,
      },
    ],
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
  overrides: [
    {
      files: ["*.test.{ts,tsx}"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
