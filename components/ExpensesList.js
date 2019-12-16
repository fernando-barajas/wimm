import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'

import { getAllExpenses } from '../utils/expenses'

function ExpensesList(props) {

  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getAllExpenses((data) => {
      setExpenses(data)

      const total = data.reduce((acc, value) => {
          return parseFloat(acc + parseFloat(value.amount))
      }, 0)

      setTotal(total)

    }, (error) => {
      console.error(error)

    })

  }, [])

  return (
    <View>
      <View style={{ padding: 5, alignItems: 'center' }}>
        <Text style={{ fontSize: 40 }}>${total}</Text>
      </View>
      <Divider style={{ backgroundColor: 'blue' }} />
      {
        expenses.map((item, i) => (
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

export default ExpensesList
