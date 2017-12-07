import React, { Component, } from 'react'
import { DeviceEventEmitter, View, Text, TouchableHighlight, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import accounting from 'accounting'
import moment from 'moment';
import Swipeable from 'react-native-swipeable';

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

  swipeable = null;

  recenter() {
    if (this.swipeable) {
      this.swipeable.recenter();
    }
  }

  rightButtons = () => {
    const {navigate} = this.props.navigation;

    let paymentProps = {
      payment: this.props.payment,
      db: this.props.db,
      navigation: this.props.navigation
    }

    return (
      [
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={'#F1F1F1'}
          onPress={() => navigate('EditPayment', {...paymentProps})}
          style={styles.actionButtonsEdit}>
          <Icon name={'edit'} style={styles.actionButtonsIcon} />
        </TouchableHighlight>,
        <TouchableHighlight
          onPress={() => this.deleteItem(paymentProps.payment.payment_id)}
          style={styles.actionButtonsDelete}>
          <Icon name={'trash-o'} style={styles.actionButtonsIcon} />
        </TouchableHighlight>
      ]
    )
  }

  deleteItem = (paymentId) => {
    Alert.alert(
      'Delete Payment',
      'Are you sure?',
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => {
            this.props.db.executeSql("DELETE FROM payments WHERE payment_id = " + paymentId + ";");
            DeviceEventEmitter.emit('refreshList', {});
          }
        }
      ]
    )
  }


  render() {
    let dueDate = moment(this.props.payment.due_date).format('MMM-DD'),
      amount = this.props.payment.amount,
      payOut = this.props.payment.pay_out,
      toPay = accounting.formatMoney(amount - payOut);
    const {onOpen, onClose} = this.props;

    return (
      <View>
        <Swipeable rightButtons={this.rightButtons()}
          onRef={ref => this.swipeable = ref}
          onRightButtonsOpenRelease={() => onOpen(this)}
          onRightButtonsCloseRelease={() => onClose(this)}>
          <View style={styles.paymentItemContainer}>
            <View style={styles.paymentItem}>
              <View style={styles.paymentInfoRight}>
                <Icon name={this.props.payment.payment_type}
                  style={styles.paymentIcon}/>
                <Text style={styles.paymentItemName}>
                  {this.props.payment.institution}
                </Text>
                <Text style={styles.paymentAmount}>
                  {accounting.formatMoney(amount)}
                </Text>
                <Text style={styles.toPay}>
                  {accounting.formatMoney(toPay)}
                </Text>
              </View>
              <View style={styles.paymentInfoLeft}>
                <Text style={styles.dueDate}>
                  {dueDate}
                </Text>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    )
  }
}

export default PaymentItem
