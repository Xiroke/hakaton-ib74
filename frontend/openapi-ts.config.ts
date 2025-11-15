import { defineConfig } from '@hey-api/openapi-ts'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// load .env from parent
dotenv.config({ path: path.resolve(__dirname, '.env.development') })

export default defineConfig({
  input: {
    path: process.env.VITE_BACKEND_URL + '/openapi.json',
  },
  output: 'src/api/generated',
  plugins: ['@tanstack/react-query'],
})
