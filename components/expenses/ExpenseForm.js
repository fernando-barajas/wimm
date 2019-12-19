import React, { useState } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Modal } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { saveExpense } from '../../services/expenses'

function ExpenseForm(props) {

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState()
  const [dueDate, setDueDate] = useState(new Date().toDateString())
  const [showPicker, setShowPicker] = useState(false)

  const dollarIcon = <Icon name='dollar' size={24} color='white'/>
  const dateIcon = <Icon name='calendar' size={24} color='white'/>
  const descriptionIcon = <Icon name='google-wallet' size={24} color='white'/>

  const createExpense = () => {

    const expense = {
      amount,
      description,
      dueDate
    }

    saveExpense(expense)
  }

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
            <Input
              placeholder="Concepto"
              placeholderTextColor="#CCCEC8"
              leftIcon={descriptionIcon}
              onChangeText={setDescription}
              value={description}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="Registra una cantidad"
              keyboardType="numeric"
              placeholderTextColor="#CCCEC8"
              autoFocus
              leftIcon={dollarIcon}
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
                leftIcon={dateIcon}
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
          <Button title="Save" style={styles.button} onPress={() => createExpense()} />
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

export default ExpenseForm
