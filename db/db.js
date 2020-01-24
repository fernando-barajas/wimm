import * as SQLite from "expo-sqlite";

import SCHEMA from './schema.json'

let database = null;

const tables = Object.keys(SCHEMA).map(t => ({ [t.toUpperCase()]: t })).reduce((acc, item) => ({ ...acc, ...item}), {})

function db() {
  if (!database) {
    console.log('[DB_LOG]: Open Database')
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
        Object.entries(criteria).forEach(([k, v], i) => {
          where += i == 0 ? `${k} ${v.operator}?` : `${v.logical_operator} ${k} ${v.operator}?`
          args.push(v.argument)
        })
      }
      console.log(`[DB_LOG]: Query (${new Date().toLocaleString()}): ${query + where}`)
      tx.executeSql(query + where, args, (t, data) => {
        onSuccess(data.rows._array)
      }, (t, error) => {
        console.log('t', t)
        console.log('error', error)
        onError(error)
      })

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

function drop(table) {
  db().transaction(tx => { tx.executeSql(`DROP TABLE IF EXISTS ${table};`)},
   (error) => { console.log(error) },
   (success) => { console.log(success)}
  )
}

function migrate() {
  db()
    .transaction(tx => {
      console.log('[DB_LOG]: Running migrations if needed')
      Object
        .keys(SCHEMA)
        .forEach(k => {
          const statement = `create table if not exists ${k} (${SCHEMA[k].definitions.join(', ')})`
          tx.executeSql(statement, (tx, success) => {
            console.log('success migration for table: ', k)
            console.log(tx)
            console.log(success)

          }, (tx, error) => {
            console.log('error migration for table: ', k)
            console.log(tx)
            console.log(error)

          })
        })
    })
}

export default {
  get,
  insert,
  drop,
  init: async () => {
    console.log('[DB_LOG]: Init database')

    // Run migrations
    await migrate()
  },
  tables: tables
}
