import React, { Component, } from 'react'
import { View, Text, TouchableHighlight, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import accounting from 'accounting'

var styles = require('../styles/PaymentItemStyle');

class PaymentItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

   static propTypes = {
    payment: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={'#F1F1F1'}>
          <View style={styles.paymentItemContainer}>
            <View style={styles.paymentType}>
              <Icon name={this.props.payment.payment_type} style={styles.paymentIcon}/>
              <Text style={styles.paymentItemName}>{this.props.payment.institution}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentData}>Payment</Text>
              <Text style={styles.paymentData}>{accounting.formatMoney(this.props.payment.amount)}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentData}>Due Date</Text>
              <Text style={styles.paymentData}>{this.props.payment.due_date}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default PaymentItem
