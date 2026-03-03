import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
    {
        ignores: ["node_modules/**"],
    },

    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ["tsconfig.eslint.json"],
                createDefaultProgram: true,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },

        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y,
        },

        rules: {
            ...reactPlugin.configs.recommended.rules,

            ...jsxA11y.configs.recommended.rules,

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            "@typescript-eslint/naming-convention": [
                "error",

                {
                    selector: "variableLike",
                    format: ["strictCamelCase", "UPPER_CASE", "StrictPascalCase"],
                },

                {
                    selector: "function",
                    format: ["strictCamelCase", "StrictPascalCase"],    
                },

                {
                    selector: "method",
                    format: ["strictCamelCase"],
                    leadingUnderscore: "allow",
                },

                {
                    selector: "typeLike",
                    format: ["StrictPascalCase"],
                },

                {
                    selector: "parameter",
                    format: ["strictCamelCase"],
                    leadingUnderscore: "allow",
                },
            ],

            "brace-style": ["error", "allman", { allowSingleLine: true }],
            indent: ["error", 4, { SwitchCase: 1 }],
            "no-extra-semi": ["error"],
            "comma-dangle": ["error", "always-multiline"],
            "keyword-spacing": ["error", { before: true, after: true }],
            "no-trailing-spaces": ["error"],
            "no-multiple-empty-lines": [
                "error",
                { max: 1, maxEOF: 0 },
            ],
            "eol-last": ["error", "always"],
            quotes: [
                "error",
                "double",
                { avoidEscape: true, allowTemplateLiterals: false },
            ],
            "no-console": ["error", { allow: ["error", "trace"] }],
            "no-var": "warn",

            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
        },
    },
];