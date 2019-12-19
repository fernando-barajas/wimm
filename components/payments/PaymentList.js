import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'

import PaymentService from '../../services/payments'

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
    <View>
      {
        payments.map((item, i) => (
          <ListItem
            key={i}
            title={item.description}
            leftIcon={{ name: 'monetization-on' }}
            bottomDivider
            chevron
          />
        ))
      }
    </View>
  )

}

export default PaymentList
