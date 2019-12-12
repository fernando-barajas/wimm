import React from 'react'
import { Picker, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {  Icon, Input } from 'react-native-elements'
import { createPayment } from '../utils/DBAPI'

export default class PaymentScreen extends React.Component {
  state = {
    date: new Date(),
    show: false,
    institution: '',
    amount: 0,
    payOut: 0,
    paymentType: 'Credit Card',
  }

  setDate = (_event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  showdatepicker = () => {
    this.setState({
      show: true,
    });
  }

  savePayment = () => {
    const { paymentType, institution, amount, payOut, date } = this.state
    createPayment(paymentType, institution, amount, payOut, date).then(() => {
      this.props.navigation.navigate('Home')
    })
  }

  render() {
    const { show, date } = this.state;
    return (
      <View style={{ padding: 30, paddingTop: 50 }}>
        <View style={{ display: 'flex', flexDirection: 'column', height: '70%' }}>
          <View style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Add new payment</Text>
            <Picker
              selectedValue={this.state.paymentType}
              onValueChange={(itemValue, itemIndex) => this.setState({paymentType: itemValue})}
            >
              <Picker.Item label='Credit Card' value='Credit Card' />
              <Picker.Item label='Cash' value='Cash' />
            </Picker>
            <Input placeholder='Institution' label='Institution' onChangeText={(institution) => this.setState({ institution })}></Input>
            <Input placeholder='Amount' label='Amount' onChangeText={(amount) => this.setState({ amount })}></Input>
            <TouchableOpacity onPress={this.showdatepicker} activeOpacity={1}>
              <Input
                disabled
                label='Due date'
                rightIcon={
                  <Icon
                    reverse
                    name='calendar'
                    type='font-awesome'
                    color='#466CFB'
                    size={16}
                  />
                }
                >
                {date.toLocaleDateString() || ''}
                </Input>
            </TouchableOpacity>
            { show && <DateTimePicker value={date}
                      mode='date'
                      display="default"
                      onChange={this.setDate} />
            }
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon
              reverse
              type='font-awesome'
              name='check'
              color='#1AC80B'
              onPress={this.savePayment}
            />
            <Icon
              reverse
              type='font-awesome'
              name='times'
              color='#D01919'
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
        </View>

      </View>
    )
  }
}