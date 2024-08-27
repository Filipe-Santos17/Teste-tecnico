import { Knex, knex } from 'knex';
import { env } from '../env/index';

export const config: Knex.Config = {
  client: env.DB_CLIENT,
  connection: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    database: env.DB_NAMEDB
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  }
}
  
export const db = knex(config)