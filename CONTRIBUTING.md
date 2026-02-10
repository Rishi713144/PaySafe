# Contributing to PaySafe

Thank you for considering a contribution to **PaySafe**. This guide outlines the process and expectations for contributing to the project. Please read it in full before submitting any changes.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Code Style and Linting](#code-style-and-linting)
- [Creating a Pull Request](#creating-a-pull-request)
- [PR Best Practices](#pr-best-practices)
- [What NOT to Commit](#what-not-to-commit)


---

## Getting Started

### 1. Fork the Repository

Click the **Fork** button on the top-right of the [repository page](https://github.com/Rishi713144/PaySafe) to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/PaySafe.git
cd PaySafe
```

> Replace `<your-username>` with your GitHub username.

### 3. Add the Upstream Remote

```bash
git remote add upstream https://github.com/Rishi713144/PaySafe.git
git fetch upstream
```

### 4. Install Dependencies

This project uses [pnpm](https://pnpm.io/) with a [Turborepo](https://turbo.build/) monorepo setup:

```bash
pnpm install
```

### 5. Set Up the Database

```bash
cp .env.example .env
```

Update the `.env` file with your database connection URL, then run:

```bash
cd packages/db
npx prisma migrate dev
```

### 6. Start the Development Server

```bash
pnpm dev
```

---

## Branch Naming Conventions

Create all branches from the latest `main`. Use these prefixes:

| Prefix      | Purpose                             | Example                          |
| ----------- | ----------------------------------- | -------------------------------- |
| `feature/`  | New features or enhancements        | `feature/add-payment-history`    |
| `fix/`      | Bug fixes                           | `fix/balance-calculation-error`  |
| `docs/`     | Documentation changes               | `docs/update-contributing-guide` |
| `refactor/` | Code refactoring (no behavior change) | `refactor/simplify-auth-flow`  |
| `chore/`    | Tooling, dependencies, maintenance  | `chore/update-dependencies`      |

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

---

## Commit Message Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>: <short description>
```

### Types

| Type       | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `feat`     | A new feature                                                |
| `fix`      | A bug fix                                                    |
| `docs`     | Documentation-only changes                                   |
| `refactor` | Code change that neither fixes a bug nor adds a feature      |
| `style`    | Formatting, whitespace, etc. (no logic change)               |
| `test`     | Adding or updating tests                                     |
| `chore`    | Build process, dependency updates, tooling                   |

### Examples

```
feat: add P2P transfer functionality
fix: resolve incorrect balance display on dashboard
docs: add contributing guidelines
refactor: extract reusable form validation logic
chore: upgrade Next.js to v14
```

### Rules

- Use the **imperative mood** — "add feature" not "added feature"
- Keep the subject line under **72 characters**
- Do not end the subject line with a period
- Separate subject from body with a blank line when additional context is needed

---

## Code Style and Linting

This project uses shared ESLint configurations from `packages/eslint-config/`.

### Expectations

- Write all source files in **TypeScript**
- Use **functional components** and **React hooks** for all frontend code
- Follow the existing monorepo structure — place files in the correct `apps/` or `packages/` directory
- Prefer **named exports** over default exports
- Keep components focused on a single responsibility

### Before Submitting

Run the linter and build to verify your changes:

```bash
pnpm lint
pnpm build
```

PRs with linting errors or build failures will not be merged.

---

## Creating a Pull Request

### 1. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 2. Open a Pull Request

- Navigate to the [original repository](https://github.com/Rishi713144/PaySafe) on GitHub
- Click **Compare & pull request**
- Fill out the [PR template](.github/pull_request_template.md) completely
- Provide a clear, descriptive title

### 3. Link Related Issues

Reference any issues your PR addresses:

```
Closes #42
```

### 4. Request a Review

Tag a maintainer for review. Please allow time for the review process.

### 5. Address Feedback

Push additional commits to the same branch to address review comments. Avoid force-pushing unless specifically asked to squash commits.

---

## PR Best Practices

- **Keep PRs small and focused.** One concern per PR. Split unrelated changes into separate PRs.
- **Write a clear description.** Explain what changed, why, and how to verify it.
- **Include screenshots** for any UI changes.
- **Test locally** before submitting. Run `pnpm build` and `pnpm lint` at minimum.
- **Do not include unrelated changes** — no drive-by reformatting or unrelated fixes.
- **Rebase on `main`** before requesting a review:

  ```bash
  git fetch upstream
  git rebase upstream/main
  ```

---

## What NOT to Commit

The following must **never** be committed to the repository:

| Path / Pattern   | Reason                                    |
| ---------------- | ----------------------------------------- |
| `node_modules/`  | Installed dependencies (managed by pnpm)  |
| `.env`           | Environment variables containing secrets  |
| `.env.local`     | Local environment overrides               |
| `.next/`         | Next.js build output                      |
| `dist/`          | Compiled build output                     |
| `.turbo/`        | Turborepo cache                           |
| `*.log`          | Log files                                 |
| `.DS_Store`      | macOS system files                        |

These entries are already in `.gitignore`. If you notice something missing, open a PR to update it.

> Run `git status` before committing and review the staged files carefully.

---

## Questions?

If you have questions, open an [issue](https://github.com/Rishi713144/PaySafe/issues) or leave a comment on the relevant thread. We're happy to help.
