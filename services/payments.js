import db from '../db/db'

function createPayment(data) {
  const tableName = db.tables.PAYMENTS
  const paymentDueDate = data.dueDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'numeric', day: '2-digit'
  }).replace(/ /g, '/')
  const payment = {
    payment_type: data.paymentType,
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

function getAllPayments(done, error) {

  const tableName = db.tables.PAYMENTS

  db.get(tableName, {}, done, error)
}

export default {
  create: createPayment,
  get: getAllPayments
}
