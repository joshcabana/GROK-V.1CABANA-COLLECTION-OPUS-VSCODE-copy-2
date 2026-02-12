export const serverEnvKeys = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'DATABASE_URL',
  'RESEND_API_KEY',
  'ORDER_FROM_EMAIL',
  'ADMIN_EXPORT_TOKEN',
] as const

export type ServerEnvKey = (typeof serverEnvKeys)[number]

export class EnvConfigError extends Error {
  readonly missing: ServerEnvKey[]

  constructor(missing: ServerEnvKey[]) {
    super(`Missing required environment variables: ${missing.join(', ')}`)
    this.name = 'EnvConfigError'
    this.missing = missing
  }
}

function normalizeValue(value: string | undefined) {
  const normalized = value?.trim()
  return normalized ? normalized : undefined
}

export function getServerEnv(key: ServerEnvKey) {
  return normalizeValue(process.env[key])
}

export function listMissingServerEnv(keys: readonly ServerEnvKey[]) {
  return keys.filter((key) => !getServerEnv(key))
}

export function requireServerEnv<const T extends readonly ServerEnvKey[]>(keys: T) {
  const missing = listMissingServerEnv(keys)
  if (missing.length) throw new EnvConfigError(missing)

  return Object.fromEntries(keys.map((key) => [key, getServerEnv(key)!])) as {
    [K in T[number]]: string
  }
}
