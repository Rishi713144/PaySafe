# PaySafe

A full-stack, monorepo-based payment application built with **Next.js**, **Turborepo**, **Prisma**, and **pnpm** workspaces.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Pull Request Guidelines](#pull-request-guidelines)
- [License](#license)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rishi713144/PaySafe.git
cd PaySafe
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up PostgreSQL

Run PostgreSQL locally or use a managed service like [Neon](https://neon.tech).

### 4. Configure Environment Variables

Copy all `.env.example` files to `.env` and update each with your database connection URL.

### 5. Run Database Migrations and Seed

```bash
cd packages/db
npx prisma migrate dev
npx prisma db seed
```

### 6. Start the Development Server

```bash
cd ../..
pnpm dev
```

### 7. Login

Navigate to the user app and log in with the seeded credentials:

- **Phone:** `1111111111`
- **Password:** `alice`

> See [`packages/db/prisma/seed.ts`](packages/db/prisma/seed.ts) for all seeded data.

---

## Project Structure

```
PaySafe/
├── apps/
│   ├── user-app/          # End-user facing Next.js application
│   ├── merchant-app/      # Merchant-facing Next.js application
│   └── bank-webhook/      # Bank webhook handler service
├── packages/
│   ├── db/                # Prisma schema, migrations, and seed data
│   ├── ui/                # Shared UI component library
│   ├── store/             # Shared state management
│   ├── eslint-config/     # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── packages/              # (see above)
```

---

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | Next.js                           |
| Language     | TypeScript                        |
| Monorepo     | Turborepo + pnpm workspaces       |
| Database     | PostgreSQL                        |
| ORM          | Prisma                            |
| Styling      | Tailwind CSS                      |
| Auth         | NextAuth.js                       |

---

## Contributing

Contributions are welcome. Please read the **[Contributing Guide](CONTRIBUTING.md)** before getting started.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
