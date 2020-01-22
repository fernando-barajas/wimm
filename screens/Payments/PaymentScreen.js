import React, { useState } from 'react'
import PaymentList from '../../components/payments/PaymentList'
import PaymentForm from '../../components/payments/PaymentForm'
import AppLayout from '../../components/ui/AppLayout'

export default function PaymentScreen() {
  const [showForm, setShowForm] = useState(false)

  return (
    <AppLayout
      floatPress={() => setShowForm(true)}
      headerLeftText="Pagos">
      <PaymentList refresh={showForm}/>
      <PaymentForm
        show={showForm}
        onPageDismiss={() => setShowForm(false)}
      />
    </AppLayout>
  )
}

// export default class PaymentScreen extends React.Component {
//   state = {
//     date: new Date(),
//     show: false,
//     institution: '',
//     amount: 0,
//     payOut: 0,
//     paymentType: 'Credit Card',
//   }

//   setDate = (_event, date) => {
//     date = date || this.state.date;

//     this.setState({
//       show: Platform.OS === 'ios' ? true : false,
//       date,
//     });
//   }

//   showdatepicker = () => {
//     this.setState({
//       show: true,
//     });
//   }


//   render() {
//     const { show, date } = this.state;
//     return (
//     )
//   }
// }
