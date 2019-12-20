import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'

import PaymentService from '../../services/payments';

function PaymentList(props) {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    PaymentService.get((data) => {
      setPayments(data)

    }, (error, error2) => {
      console.log('error on payments')
      console.error({error})
      console.error({error2})
    })

  }, [props.refresh])

  return (
    <ScrollView>
      {
        payments.map((item, i) => (
          <ListItem
            key={i}
            title={item.institution}
            subtitle={item.due_date}
            rightTitle={`$ ${item.amount}`}
            rightSubtitle={`Depositos: $ ${item.pay_out}`}
            leftIcon={{ name: 'monetization-on' }}
            bottomDivider
            chevron
          />
        ))
      }
    </ScrollView>
  )
}

export default PaymentList
