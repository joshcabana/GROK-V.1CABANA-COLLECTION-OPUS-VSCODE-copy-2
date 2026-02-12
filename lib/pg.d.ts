declare module 'pg' {
  import { EventEmitter } from 'events';

  export interface QueryResultRow {
    [column: string]: unknown;
  }

  export interface QueryResult<R extends QueryResultRow = QueryResultRow> {
    rows: R[];
    rowCount: number | null;
    command: string;
    fields: Array<{ name: string; dataTypeID: number }>;
  }

  export interface PoolConfig {
    connectionString?: string;
    max?: number;
    ssl?: boolean | { rejectUnauthorized?: boolean };
    [key: string]: unknown;
  }

  export class PoolClient extends EventEmitter {
    query<R extends QueryResultRow = QueryResultRow>(
      text: string,
      values?: unknown[]
    ): Promise<QueryResult<R>>;
    release(err?: boolean | Error): void;
  }

  export class Pool extends EventEmitter {
    constructor(config?: PoolConfig);
    connect(): Promise<PoolClient>;
    query<R extends QueryResultRow = QueryResultRow>(
      text: string,
      values?: unknown[]
    ): Promise<QueryResult<R>>;
    end(): Promise<void>;
  }
}
