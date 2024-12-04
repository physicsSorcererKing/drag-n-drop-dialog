# React Vite Template

#### This template provides a basic setup for developing React applications using Vite with TypeScript.

---

## Features

This template includes the following features:

- TypeScript 5.5
  - Fully integrated TypeScript support for both development and building processes.
- React 18
  - This project is set up for the latest version of React, providing the best performance and optimal developer experience.
- ESLint 9
  - This project uses ESLint for static code analysis to quickly find problems. It includes setups for:
    - Flat Config
    - Up-to-date React configs
    - Unused Imports Auto-Removal
    - Sorted Imports
    - Prettier Integration
- Vite 5
  - For bundling and development, this template uses Vite which is known for its fast Hot Module Replacement (HMR).
    - @vitejs/plugin-react-swc: Swc helps us to supercharge our JavaScript build pipeline. It has similar functionality to Babel but is faster.
    - Alias paths '@' feature to simplify import statements in your project.
- Husky 9 & Lint-staged 15
  - Integrated into a workflow that executes ESLint and Prettier in a pre-commit hook.

## Notes

- micromatch: can be removed after the official release of eslint-plugin-unused-imports fixs dependency issue.

## Requirements

This project requires one of the following Node.js versions:

- ^18.18.0
- ^20.9.0
- \>=21.1.0

To get started using these tools, you'll need to install the required Node.js version on your system. Please refer to the Node.js [official documentation](https://nodejs.org/) on how to do so.

---

## Prerequisites

- Node.js: Ensure you have the required Node.js version installed. You can download it [here](https://nodejs.org/).
- Git: Make sure Git is installed. Download it [here](https://git-scm.com/).
- pnpm: Follow the instructions to install pnpm [here](https://pnpm.io/installation).

## Project Setup

#### Using this template as a starting point for your React application involves a few simple steps:

### Via GitHub Template

1. Navigate to the main page of this GitHub repository.
2. Click the **"Use this template"** button on the GitHub repository page.
3. Choose **"Create a new repository"** from the dropdown menu.
4. Provide your desired **repository name**, and then click **"Create repository"** to finish the creation process.

### Configure Your New Repository

1. Clone the repository: `git clone <repository-url>`
2. Navigate into the project directory `cd <project-dir>`
3. Install dependencies: `pnpm i`
4. Start the Vite server for development: `pnpm dev`

Enjoy writing your React application with this ready-to-use setup!
