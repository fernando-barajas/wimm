import * as SQLite from 'expo-sqlite';

export const initializeDB = async function() {
  console.log('Initializing DB.....')
  const db = SQLite.openDatabase('wimm.db');
  await db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS payments( '
    + 'payment_id INTEGER PRIMARY KEY NOT NULL, '
    + 'payment_type VARCHAR(20) NOT NULL, '
    + 'institution VARCHAR(50)  NOT NULL, '
    + 'amount NUMERIC(10,2) NOT NULL DEFAULT 0, '
    + 'pay_out NUMERIC(10,2) NOT NULL DEFAULT 0, '
    + 'due_date DATE NOT NULL, '
    + 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL );')
  });
}

export function createPayment(paymentType, institution, amount, payOut, dueDate) {
  const db = SQLite.openDatabase('wimm.db');
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO payments (payment_type, institution, amount, pay_out, due_date) VALUES (?, ?, ?, ?, ?)',
     [paymentType, institution, amount, payOut, dueDate]
    )
  },
  (_, error) => console.log("error: ", error)
  );
}