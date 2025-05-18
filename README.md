# create-fastvue

```
███████╗ █████╗ ███████╗████████╗    ██╗   ██╗██╗   ██╗███████╗
██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██║   ██║██║   ██║██╔════╝
█████╗  ███████║███████╗   ██║       ██║   ██║██║   ██║█████╗
██╔══╝  ██╔══██║╚════██║   ██║       ╚██╗ ██╔╝██║   ██║██╔══╝
██║     ██║  ██║███████║   ██║        ╚████╔╝ ╚██████╔╝███████╗
╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝         ╚═══╝   ╚═════╝ ╚══════╝
```

Quickly establish a complete development environment for Vue projects, which basically includes the following development tools.

- ✅️ Husky
- ✅️ Lint-staged
- ✅️ Commitlint
- ✅️ ESLint
- ✅️ Prettier
- ✅️ Vitest

## Installation

With NPM:

```
npm create fastvue@latest
```

With PNPM:

```
pnpm create fastvue@latest
```

## Usage

Currently supported template include:

> Node version >= 18+ or 20+ is required.

- vanilla
- vanilla-airbnb
- typescript-airbnb
- typescript-airbnb-tailwindcss
- typescript-airbnb-unplugin-with-import-router
- vue-typescript (ESLint v9)

## Dependency Configuration

Due to differences in how various package managers (npm, Yarn, pnpm) handle `peerDependencies` hoisting across versions, installing the same package may result in the following discrepancies:

1. **Hoisting to the Project Root**
   - npm v7+, pnpm v8–v9: `peerDependencies` are treated as regular dependencies and hoisted to the project node_modules/ root.
2. **No Hoisting to the Project Root**
   - Yarn, pnpm v10+ (default publicHoistPattern=[]): `peerDependencies` are only hoisted to the private store (node_modules/.pnpm/node_modules/) and are not exposed in the project root.

To ensure that necessary `peerDependencies` are properly loaded across different package managers and versions, the following key package will be explicitly installed:

- vue-eslint-parse

Failure to account for these differences may lead to runtime errors such as Cannot find module 'xxx', potentially affecting development and CI/CD stability.

> Related discussion: pnpm Issue [#9438](https://github.com/pnpm/pnpm/issues/9438)

## About

This project isn't for everyone. It's designed to simplify setting up the development environment so developers can get to work quickly. That's why I created this project, and it's also easy to adjust the setup if needed. If you have any suggestions or run into any issues, feel free to contact me. I really appreciate your support!
