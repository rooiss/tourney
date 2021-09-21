import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { getAppConfig } from './config'

export async function setupDB() {
  const config = getAppConfig()
  const dbConnection = await createConnection(
    config.dbConfig as PostgresConnectionOptions,
  )
  await dbConnection.synchronize()
  console.log('========== Database schema synced =========')
}
