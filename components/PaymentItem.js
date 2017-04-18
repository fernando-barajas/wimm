import React, { Component, } from 'react'
import { View, Text, TouchableHighlight, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class PaymentItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={'#F1F1F1'}>
          <View>
            <Icon name='credit-card' />
            <Text>
              Bank
            </Text>
          </View>
          <View>
            <Text>
              Payment
            </Text>
            <Text>
              $1,000
            </Text>
          </View>
          <View>
            <Text>
              Due Date
            </Text>
            <Text>
              01/01/1997
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default PaymentItem