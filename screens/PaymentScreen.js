import React from 'react'
import { Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Icon, Input } from 'react-native-elements'

export default class PaymentScreen extends React.Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  render() {
    const { show, date, mode } = this.state;
    return (
      <View style={{ padding: 30, paddingTop: 50 }}>
        <View style={{display: 'flex', flexDirection: 'column', height: '70%'}}>
          <View style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center'}}>Add new payment</Text>
            <Input placeholder='Institution'></Input>
            <Input placeholder='Amount'></Input>
            <Input
            disabled
            placeholder='Due date'
            rightIcon={
              <Icon
                reverse
                name='calendar'
                type='font-awesome'
                color='#466CFB'
                onPress={this.datepicker}
                size={16}
              />
            }
            >
              {date.toLocaleDateString() || ''}
            </Input>
            { show && <DateTimePicker value={date}
                      mode={mode}
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
              onPress={() => this.props.navigation.navigate('Home')}
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