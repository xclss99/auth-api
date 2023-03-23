import { config } from 'dotenv'

// Loads .env file contents into process.env.
config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

export const CREDENTIALS = process.env.CREDENTIALS === 'true'
export const {
  NODE_ENV,
  PORT,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN
} = process.env
