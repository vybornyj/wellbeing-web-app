import getConfig from 'next/config'
import { Pool } from 'pg'
import { SQLStatement } from 'sql-template-strings'
import { logger } from 'src/scripts-server/logger/logger'

const { serverRuntimeConfig }: GetConfig = getConfig()

const pool = new Pool(serverRuntimeConfig.PG_CONFIG)

interface PgQueryResult<ROW = anyObject> {
  command?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | string
  rowCount?: number
  oid?: number
  rows?: ROW[]
  fields?: {
    name: string
    tableID: number
    columnID: number
    dataTypeID: number
    dataTypeSize: number
    dataTypeModifier: number
    format: string
  }[]
  RowCtor?: any
  rowAsArray?: boolean
  err?: Error
}

type PgQuery = <ROW = anyObject>(query: SQLStatement, end?: boolean) => Promise<PgQueryResult<ROW>>

export const pgQuery: PgQuery = async (query, end = false) => {
  try {
    const result = await pool.query(query)
    if (end) await pool.end()
    return result
  } catch (err) {
    logger.error(`pgQuery: exception, query=${query}`)
    if (end) await pool.end()
    return { err }
  }
}
