import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig(
    [globalIgnores(["**/node_modules/", "**/.next/", "**/out/", "**/dist/"]), {
        extends: compat.extends(
            "next/core-web-vitals",
            "plugin:@typescript-eslint/recommended",
            "plugin:prettier/recommended",
        ),

        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                project: ["./tsconfig.json"],
                tsconfigRootDir: ".",
            },
        },

        rules: {
            "prettier/prettier": ["error"],
            "@typescript-eslint/no-unused-vars": ["warn"],
            "react/react-in-jsx-scope": "off",
            "react/jsx-no-target-blank": "off",
            "jsx-a11y/alt-text": "warn",
        },
    }],
);