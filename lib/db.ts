import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg'
import { requireServerEnv } from '@/lib/env'

declare global {
  // eslint-disable-next-line no-var
  var __cabanaPgPool: Pool | undefined
}

function shouldUseSsl(connectionString: string) {
  return !/localhost|127\.0\.0\.1/i.test(connectionString)
}

function getPool() {
  if (!global.__cabanaPgPool) {
    const { DATABASE_URL } = requireServerEnv(['DATABASE_URL'])
    global.__cabanaPgPool = new Pool({
      connectionString: DATABASE_URL,
      max: 10,
      ssl: shouldUseSsl(DATABASE_URL) ? { rejectUnauthorized: false } : undefined,
    })
  }

  return global.__cabanaPgPool
}

export async function dbQuery<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values: unknown[] = []
): Promise<QueryResult<T>> {
  return getPool().query<T>(text, values)
}

export async function withDbTransaction<T>(work: (client: PoolClient) => Promise<T>) {
  const client = await getPool().connect()

  try {
    await client.query('BEGIN')
    const value = await work(client)
    await client.query('COMMIT')
    return value
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}
