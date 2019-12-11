import * as SQLite from "expo-sqlite";

import SCHEMA from './schema.json'

const TABLES = Object.keys(SCHEMA).map(t => {
  return { [t.toUpperCase()]: t }
})

let database = null;

function db() {
  if (!database) {
    console.log('[DB_LOG]: No database. Creating database')
    database = SQLite.openDatabase("wimm.db");
  }

  return database
}

function get(table, criteria, onSuccess, onError) {

  db()
    .transaction(tx => {
      let query = `select * from ${table}`
      let where = ''
      let args = []
      if (Object.keys(criteria).length) {
        where += ' where '
        Object.keys(criteria).forEach((k, i) => {
          where += i == 0 ? k + '=? ' : `and ${k}=?`
          args.push(criteria[k])
        })
      }

      tx.executeSql(query + where, args, (t, data) => {
        onSuccess(data.rows._array)
      }, onError)

    })
}

function insert(table, data, onSuccess, onError) {

  db()
    .transaction(tx => {
      const fields = Object.keys(data).join(', ')
      const values = Object.values(data).map(v => "'" + v + "'").join(', ')
      const sql =`insert into ${table} (${fields}) values (${values})`

      tx.executeSql(sql)

    }, onError, onSuccess)

}

function migrate() {
  db()
    .transaction(tx => {
      console.log('[DB_LOG]: Running migrations')
      const sql = Object
        .keys(SCHEMA)
        .map(k => `create table if not exists ${k} (${SCHEMA[k].definitions.join(', ')})`)

      return tx.executeSql(sql.join(';'))
    })
}

export default {
  get,
  insert,
  init: async () => {
    console.log('[DB_LOG]: Init database')

    // Run migrations
    await migrate()
  },
  tables: TABLES
}
