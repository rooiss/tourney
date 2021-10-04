require('dotenv').config()

const devConfig = {
  hostName: 'http://localhost:5000',
  dbConfig: {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'localdev',
    // ensures that the inferred type is string, not string | undefined
    password: process.env.DB_PASSWORD || '',
    database: 'tourney',
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    // logging: true,
  },
  // redis: {
  //   password: process.env.REDIS_PASSWORD || '',
  // },
  // session: {
  //   cookieKey: 'got any good sassaparilla?',
  // },
}

const prodConfig = {
  hostName: process.env.HOSTNAME,
  dbConfig: {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'localdev',
    // ensures that the inferred type is string, not string | undefined
    password: process.env.DB_PASSWORD || '',
    database: 'tourney',
    entities: ['build/entity/**/*.js'],
    migrations: ['build/migration/**/*.js'],
    subscribers: ['build/subscriber/**/*.js'],
  },
  redis: {
    password: process.env.REDIS_PASSWORD || '',
  },
}

export const getAppConfig = () =>
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
