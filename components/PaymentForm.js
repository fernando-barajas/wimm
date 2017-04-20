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
    this.state = {
      dueDateText: '',
      dueDate: null,
      institution: '',
      amount: ''
    };
    this._onSavePress = this._onSavePress.bind(this);
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
      dueDateText: moment(date).format('DD-MMM-YYYY')
    });
  }

  _onCancelPress() {
    Actions.pop();
  }

  _onSavePress() {
    if( this.state.institution !== '' && this.state.amount !== '' && this.state.dueDate !== '') {
      this.props.db.executeSql('INSERT INTO payments (payment_type, institution, amount, due_date) VALUES ('
                    + '"' + this.props.payment_type + '", '
                    + '"' + this.state.institution + '", '
                    + this.state.amount
                    + ', "' + moment(this.state.dueDate).format('MM/DD/YYYY') + '");', [], () => {
                      Actions.pop();
                    }, this.errorCB);
    } else {
      Alert.alert(
      'New Payment Error',
      'All the fileds are required',
      [ {text: 'OK', onPress: () => console.log('OK Pressed')} ],
      { cancelable: false }
    )
    }
  }

  errorCB(err) {
      console.log("error: ", err);
      return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Institution</Text>
          <TextInput onChangeText={(institution) => this.setState({institution})} />
        </View>
        <View>
          <Text>Amount</Text>
          <TextInput onChangeText={(amount) => this.setState({amount})}/>
        </View>
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
