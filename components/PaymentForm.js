import React, { Component, } from 'react'
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';

var styles = require('../styles/PaymentFormStyle');
class PaymentForm extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    const editMode = this.props.payment && Object.keys(this.props.payment).length > 0;
    this.state = {
      editPayment: editMode,
      institution: editMode ? this.props.payment.institution : '',
      amount: editMode ? this.props.payment.amount : 0,
      payOut: editMode ? this.props.payment.pay_out : 0,
      dueDate: editMode ? moment(this.props.payment.due_date).format('YYYY-MM-DD') : null,
      dueDateText: editMode ? moment(this.props.payment.due_date).format('YYYY-MM-DD') : '',
    };
    this._onSavePress = this._onSavePress.bind(this);
    this._addPayment = this._addPayment.bind(this);
    this._editPayment = this._editPayment.bind(this);
  }

  onDueDatePress = () => {
    let dueDate = this.state.dobDate;

    if(!dueDate || dueDate == null){
      dueDate = new Date();
      this.setState({
        dobDate: dueDate
      });
    }

    //To open the dialog
    this.refs.dobDialog.open({
      date: dueDate
    });

  }

  onDueDatePicked = (date) => {
    this.setState({
      dueDate: date,
      dueDateText: moment(date).format('YYYY-MM-DD')
    });
  }

  _onCancelPress() {
    Actions.pop();
  }

  _onSavePress() {
    if (this.state.editPayment) {
      this._editPayment()
    } else {
      this._addPayment()
    }
  }

  _addPayment() {
    if( this.state.institution !== '' && this.state.amount !== '' && this.state.dueDate !== '') {
      this.props.db.executeSql('INSERT INTO payments (payment_type, institution, amount, due_date) VALUES ('
                    + '"' + this.props.payment_type + '", '
                    + '"' + this.state.institution + '", '
                    + this.state.amount
                    + ', "' + moment(this.state.dueDate).format('YYYY-MM-DD') + '");', [], () => {
                      Actions.pop({ refresh: {updateList: true}});
                    }, this.errorCB);
    } else {
      this._emptyFieldsAlert()
    }
  }
  
  _editPayment() {
    if( this.state.institution !== '' && this.state.amount !== '' && this.state.dueDate !== '') {
      this.props.db.executeSql('UPDATE payments SET '
                    + 'institution = "' + this.state.institution + '", '
                    + 'amount = ' + this.state.amount + ', '
                    + 'pay_out = ' + this.state.payOut + ', '
                    + 'due_date ="' + moment(this.state.dueDate).format('YYYY-MM-DD') + '"'
                    + ' WHERE payment_id = ' + this.props.payment.payment_id + ';', [], () => {
                      Actions.pop({ refresh: {updateList: true}});
                    }, this.errorCB);
    } else {
      this._emptyFieldsAlert()
    }
  }
  
  _emptyFieldsAlert() {
      Alert.alert(
      'New Payment Error',
      'All the fileds are required',
      [ {text: 'OK', onPress: () => console.log('OK Pressed')} ],
      { cancelable: false }
    )
  }
  
  errorCB(err) {
      console.log("error: ", err);
      return false;
  }
  
  _renderToPay() {
    return (
      <View>
        <Text>Pay Out</Text>
        <TextInput
          value={this.state.payOut.toString()}
          onChangeText={(payOut) => this.setState({payOut})}/>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Institution</Text>
          <TextInput
            value={this.state.institution}
            onChangeText={(institution) => this.setState({institution})} />
        </View>
        <View>
          <Text>Amount</Text>
          <TextInput
            value={this.state.amount.toString()}
            onChangeText={(amount) => this.setState({amount})}/>
        </View>
        {this.state.editPayment && this._renderToPay()}
        <View>
          <Text>Due Date</Text>
          <TouchableOpacity onPress={this.onDueDatePress.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.dueDateText}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={this._onCancelPress}>
            <Text  style={styles.actionBtn}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onSavePress}>
            <Text style={styles.actionBtn}> Save</Text>
          </TouchableOpacity>
        </View>
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDueDatePicked.bind(this)} />
      </View>
    )
  }
}

export default PaymentForm
