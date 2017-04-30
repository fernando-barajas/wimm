import React, { Component, } from 'react'
import { View, Text, TouchableHighlight, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import accounting from 'accounting'
import moment from 'moment';

var styles = require('../styles/PaymentItemStyle');

class PaymentItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

   static propTypes = {
    payment: React.PropTypes.object.isRequired,
    db: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={'#F1F1F1'}
          onPress={() => Actions.EditPayment({payment: this.props.payment, db: this.props.db})}>
          <View style={styles.paymentItemContainer}>
            <View style={styles.paymentType}>
              <Icon name={this.props.payment.payment_type} style={styles.paymentIcon}/>
              <Text style={styles.paymentItemName}>{this.props.payment.institution}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentData}>Payment</Text>
              <Text style={styles.paymentData, styles.paymentAmount}>
                {accounting.formatMoney(this.props.payment.amount)}
              </Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentData}>Pay out</Text>
              <Text style={styles.paymentData, styles.payOut}>
               - {accounting.formatMoney(this.props.payment.pay_out)}
              </Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentData}>To Pay</Text>
              <Text style={styles.paymentData, styles.toPay}>
                {accounting.formatMoney(this.props.payment.amount - this.props.payment.pay_out)}
              </Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentData}>Due Date</Text>
              <Text style={styles.paymentData}>{moment(this.props.payment.due_date).format('DD-MMM-YYYY')}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default PaymentItem
