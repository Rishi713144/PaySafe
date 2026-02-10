import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  // Path to the Prisma schema
  schema: 'prisma/schema.prisma',

  // Migration output and seed script
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },

  // Database connection (reads DATABASE_URL from environment)
  datasource: {
    url: env('DATABASE_URL'),
  },
})
