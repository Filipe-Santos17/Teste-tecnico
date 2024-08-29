import type { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string,
      name: string,
      email: string,
      password: string,
      two_factory: boolean,
    },

    todos: {
      id: string,
      task: string,
      complete: boolean,
      user_id: string,
    },

    hashs: {
      id: string,
      time_created: Date,
      email: string,
      hash: number,
    }
  }
}