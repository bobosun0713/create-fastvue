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

With Yarn:

```
yarn create fastvue
```

With PNPM:

```
pnpm create fastvue
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

Different package managers (npm, Yarn, pnpm) handle **dependency installation** and **module hoisting** differently across versions.  
As a result, projects that rely on `peerDependencies` may experience inconsistent module resolution depending on the environment.

### Automatic Installation and Root Placement

1. **Hoisting to the Project Root**

   - **npm v7+** automatically installs missing `peerDependencies` and typically places them in the project’s root `node_modules/` for compatibility.

2. **Partial Hoisting (Legacy pnpm Behavior)**
   - **pnpm v8 and earlier** had `public-hoist-pattern=["*"]` by default, effectively hoisting most dependencies to the project root.
   - Starting from **pnpm v9**, the default was changed to `[]`, enforcing a strict isolation mode.
   - To restore legacy behavior, you can explicitly set `public-hoist-pattern=["*"]` or enable `shamefully-hoist=true` in your `.npmrc`.

### Strict Isolation (No Hoisting)

Both **Yarn Berry (v2+)** and **pnpm v9+** (default `public-hoist-pattern=[]`) enforce a **strict isolation model** for dependency management.

In this mode:

- Each package resolves its own dependencies locally.
- Installed `peerDependencies` are **not automatically hoisted** or exposed at the project root.
- This behavior can affect tools that rely on globally resolvable modules, such as **ESLint**, **TailwindCSS**, or **Nuxt UI**.

To ensure consistent resolution across environments, some project templates explicitly install the following key dependencies:

- `vue-eslint-parser`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`

Failing to address these differences may lead to runtime errors such as `Cannot find module 'xxx'`, potentially affecting development and CI/CD stability.

> Related discussion: [#9438](https://github.com/pnpm/pnpm/issues/9438)

## About

This project isn't for everyone. It's designed to simplify setting up the development environment so developers can get to work quickly. That's why I created this project, and it's also easy to adjust the setup if needed. If you have any suggestions or run into any issues, feel free to contact me. I really appreciate your support!
