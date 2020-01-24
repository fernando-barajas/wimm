import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Modal, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Button, CheckBox, Icon, Input } from 'react-native-elements'
import { createPayment, createRecurringPayment } from '../../services/payments'
import { scheduleReminder } from '../../services/LocalNotifications'

function PaymentForm(props) {
    const [dueDate, setDueDate] = useState(new Date())
    const [institution, setInstitution] = useState('')
    const [amount, setAmount] = useState(0)
    const [payOut, setPayOut] = useState(0)
    const [showPicker, setShowPicker] = useState(false)
    const [recurring, setRecurring] = useState(false)

    const institutionIcon = (<Icon name='credit-card' type='font-awesome' />)
    const moneyIcon = (<Icon name='money' type='font-awesome' />)
    const calendarIcon = (<Icon name='calendar' type='font-awesome' />)

    const savePayment = () => {
      const payment = {
        institution,
        amount,
        payOut,
        dueDate,
      }

      createPayment(payment)

      if(recurring) { createRecurringPayment(payment) }

      scheduleReminder(institution, amount, dueDate).then(() => {
        props.onPageDismiss()
      })
   }

   const closeDatePicker = (date) => {
     setShowPicker(false)
     if (date) { setDueDate(date) }
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
           <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
             <Text style={styles.title}>Add new payment</Text>
             <Input
               placeholder='Institucion'
               label='Institucion'
               rightIcon={institutionIcon}
               onChangeText={(institution) => setInstitution(institution)}
             />
             <Input
               placeholder='Monto'
               label='Monto'
               keyboardType='numeric'
               rightIcon={ moneyIcon }
               onChangeText={(amount) => setAmount(amount)}/>
             <TouchableOpacity
               onPress={() => setShowPicker(true)}
               activeOpacity={1}>
               <Input
                 disabled
                 label='Fecha limite'
                 rightIcon={ calendarIcon }
                 >
                 {dueDate && dueDate.toLocaleDateString() || ''}
                 </Input>
             </TouchableOpacity>
             { showPicker && (
                 <DateTimePicker
                  value={dueDate}
                  mode='date'
                  display="default"
                  onChange={(_, date) => closeDatePicker(date)}
                />
             )}
           </View>
           <View>
             <CheckBox title="Pago recurrente?" onPress={() => setRecurring(!recurring)} checked={recurring} />
           </View>
           <View style={styles.controls}>
             <Button title='Guardar' type="outline" onPress={() => savePayment()} />
             <Button title='Cancelar' type="outline" onPress={() => {props.onPageDismiss()}} />
           </View>
         </View>
       </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '60%',
    margin: 20,
    padding: 15
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  }
});
export default PaymentForm
