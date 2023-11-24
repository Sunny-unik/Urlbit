/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint", "import", "prettier", "check-file"],
  overrides: [
    {
      files: ["*.{js,ejs}"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"]
    }
  ],
  ignorePatterns: [".*.js", "package*.json", "*.config.js", "dist/**", "*.ejs"],
  root: true,
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "check-file/filename-naming-convention": [
      "error",
      { "*.{js,ts,ejs}": "CAMEL_CASE" }
    ],
    camelcase: [
      "error",
      {
        ignoreGlobals: true,
        ignoreImports: true,
        ignoreDestructuring: true
      }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-misused-promises": ["off"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        vars: "all",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true
      }
    ],
    "no-console": "warn",
    "object-shorthand": ["error", "always"],
    "no-extra-boolean-cast": "error",
    "no-duplicate-imports": "error",
    "arrow-body-style": ["error", "as-needed"],
    "no-nested-ternary": "error",
    "default-param-last": "error",
    "max-depth": ["error", 5],
    "max-nested-callbacks": ["error", 5],
    complexity: ["error", 10],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": ["error", { "prefer-inline": true }],
    "no-multiple-empty-lines": "error",
    "prefer-const": "error"
  }
};
