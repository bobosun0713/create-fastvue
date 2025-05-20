# vanilla

This folder contains a Vue 3 starter template for your project. Below is an overview of its structure and purpose.

## Folder Structure

```
src/
├── components/    # Reusable Vue components
├── views/         # Application views/pages
├── stores/        # State management (Pinia)
├── router/        # Application routing
├── assets/        # Static assets (images, styles, etc.)
└── main.ts        # Entry point of the application
```

## Getting Started

1. **Initialize Git**:

   Since this project uses Git hooks for code quality checks, you need to initialize a Git repository first:

   ```bash
   git init
   ```

2. **Install Dependencies**:

   The project uses `pnpm` as an example. If you prefer other package management tools, such as `npm` or `yarn`, you can also use them.

   ```bash
   pnpm install
   ```

3. **Run the Development Server**:

   ```bash
   pnpm run dev
   ```

4. **Build for Production**:

   ```bash
   pnpm build
   ```

## Code Quality Tools

This template includes support for maintaining code quality using **ESLint**, **Prettier**, and **Husky**.

- **ESLint**:

  Helps you write consistent and error-free code. Run it with:

  ```bash
  # Lint all files
  pnpm run lint:all

  # Or lint a specific file
  pnpm run lint path/to/your/file
  ```

- **Prettier**:

  Ensures your code is formatted consistently. You can integrate it with your editor or run it manually:

  ```bash
  # Format all files
  pnpm run format:all

  # Or format a specific file
  pnpm run format path/to/your/file
  ```

- **Husky**:

  Manages Git hooks to enforce code quality checks before commits. The Git hooks are already configured, so simply running `git commit` will trigger the hooks to run `eslint` and `prettier`, ensuring code quality.

## Customization

Feel free to modify the template to suit your project needs. Add or remove dependencies, adjust configurations, and extend functionality as required.

## Contribution

If you have suggestions or improvements for this template, feel free to submit a pull request or open an issue.
