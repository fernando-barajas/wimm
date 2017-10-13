import React, { Component, } from 'react'
import { View, } from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
var styles = require('../styles/styles');
class AddPaymentBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ActionButton buttonColor='rgba(12, 212, 142, 1)'offsetX={10} offsetY={10}>
        <ActionButton.Item buttonColor='rgba(12, 212, 142, 1)'
          onPress={() => navigate( 'PaymentForm', {db: this.props.db, payment_type: 'credit-card', PushNotification: this.props.PushNotification })}
          title=''>
          <Icon name='credit-card' style={styles.actionButtonIcon}/>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='rgba(12, 212, 142, 1)'
          onPress={() => navigate('PaymentForm', {db: this.props.db, payment_type: 'money', PushNotification: this.props.PushNotification })}
          title=''>
          <Icon name='money' style={styles.actionButtonIcon}/>
        </ActionButton.Item>
      </ActionButton>
    )
  }
}

export default AddPaymentBtn
