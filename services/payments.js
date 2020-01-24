import db from '../db/db'

export function createPayment(data) {
  const tableName = db.tables.PAYMENTS
  const paymentDueDate = formatDate(data.dueDate)
  const payment = {
    institution: data.institution,
    amount: data.amount,
    pay_out: data.payOut,
    due_date: paymentDueDate
  }

  db.insert(tableName, payment, (tx, success) => {
    console.log('success')
    console.log(success)
    console.log(tx)

  }, (tx, error) => {
    console.log(tx)
    console.log(error)
    console.log('error')
  })
}

export function createRecurringPayment(data) {
  const tableName = db.tables.RECURRING_PAYMENTS
  const payment = {
    institution: data.institution,
    amount: data.amount,
    billing_cycle_start_day: data.dueDate.getDate()
  }

  db.insert(tableName, payment, (tx, success) => {
    console.log('success')
    console.log(success)
    console.log(tx)

  }, (tx, error) => {
    console.log(tx)
    console.log(error)
    console.log('error')
  })

}

function getAllPayments(done, error) {

  const tableName = db.tables.PAYMENTS
  let startDate = beginningOfMonth()

  db.get(tableName, { due_date: { operator: '>=', argument: startDate } }, done, error)
}

function dropPayments() {
  const tableName = db.tables.PAYMENTS;
  db.drop(tableName)
}

function beginningOfMonth() {
  const today = new Date();

  let beginDate = new Date(today.getFullYear(), today.getMonth(), 1)
  return formatDate(beginDate)
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'numeric', day: '2-digit'
  }).replace(/\//g, '-')
}

export default {
  create: createPayment,
  get: getAllPayments,
  drop: dropPayments,
}
