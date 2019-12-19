import React, { useState } from 'react'
import { Picker, View, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Input, Button, Icon } from 'react-native-elements'

function PaymentForm(props) {
    const [dueDate, setDueDate] = useState(new Date())
    const [institution, setInstitution] = useState('')
    const [amount, setAmount] = useState(0)
    const [payOut, setPayOut] = useState(0)
    const [showPicker, setShowPicker] = useState(false)
    const [paymentType, setPaymentType] = useState('Credit Card')

    const institutionIcon = (<Icon name='credit-card' type='font-awesome' />)
    const moneyIcon = (<Icon name='money' type='font-awesome' />)
    const calendarIcon = (<Icon name='calendar' type='font-awesome' />)

    return (
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={props.show}
        onRequestClose={props.onPageDismiss}>
        <View style={styles.backdrop}>
          <View style={styles.container}>
            <View style={styles.input}>
              <Picker
                selectedValue={paymentType}
                onValueChange={(itemValue) => setPaymentType(itemValue)}
              >
                <Picker.Item label='Credit Card' value='Credit Card' />
                <Picker.Item label='Cash' value='Cash' />
              </Picker>
            </View>
            <View style={styles.input}>
              <Input
                placeholder="Establecimiento"
                placeholderTextColor="#CCCEC8"
                leftIcon={institutionIcon}
                onChangeText={setInstitution}
                value={institution}
              />
            </View>
            <View style={styles.input}>
              <Input
                placeholder="Registra una cantidad"
                keyboardType="numeric"
                placeholderTextColor="#CCCEC8"
                autoFocus
                leftIcon={moneyIcon}
                onChangeText={setAmount}
                value={amount}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
              <View style={styles.input}>
                <Input
                  placeholder="Fecha"
                  keyboardType="numeric"
                  placeholderTextColor="#CCCEC8"
                  leftIcon={calendarIcon}
                  value={dueDate}
                  disable={true}
                  editable={false}
                />
                {showPicker && (
                  <DateTimePicker
                    value={new Date(dueDate)}
                    mode="date"
                    display="default"
                    onChange={(_, date) => {
                      setDueDate(date);
                    }}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            <Button title="Save" style={styles.button} onPress={() => {}} />
          </View>
        </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#337CA0',
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    flex: 1
  },
  modal: {
    flex: 1
  },
  input: {
    marginTop: 30,
    width: '100%'
  }
});
export default PaymentForm
