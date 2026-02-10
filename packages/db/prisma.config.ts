import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  // Path to the Prisma schema
  schema: 'prisma/schema.prisma',

  // Migration output and seed script
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },

  // Database connection — uses process.env with a dummy fallback so
  // `prisma generate` works during Docker build (no real DB needed).
  datasource: {
    url: process.env.DATABASE_URL ?? 'postgresql://dummy:dummy@localhost:5432/dummy',
  },
})
