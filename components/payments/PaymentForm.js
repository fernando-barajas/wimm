import React, { useState } from 'react'
import { Picker, Text, TouchableOpacity, View, Modal, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Icon, Input } from 'react-native-elements'

function PaymentForm(props) {
    const [dueDate, setDueDate] = useState(new Date())
    const [institution, setInstitution] = useState('')
    const [amount, setAmount] = useState(0)
    const [payOut, setPayOut] = useState(0)
    const [showPicker, setShowPicker] = useState(false)

    const institutionIcon = (<Icon name='credit-card' type='font-awesome' />)
    const moneyIcon = (<Icon name='money' type='font-awesome' />)
    const calendarIcon = (<Icon name='calendar' type='font-awesome' />)

    const savePayment = () => {
     createPayment(institution, amount, payOut, dueDate).then(() => {
       scheduleReminder(institution, amount, date).then(() => {
         this.props.navigation.navigate('Home')
       } )
     })
   }

    return (
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={props.show}
        onRequestClose={props.onPageDismiss}>
       <View style={styles.backdrop}>
         <View style={{ height: '60%', backgroundColor: 'white', margin: 20, padding: 15 }}>
           <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
             <Text style={styles.title}>Add new payment</Text>
             <Input
               placeholder='Institution'
               label='Institution'
               rightIcon={institutionIcon}
               onChangeText={(institution) => setInstitution(institution)}
             />
             <Input
               placeholder='Amount'
               label='Amount'
               rightIcon={ moneyIcon }
               onChangeText={(amount) => setAmount(amount)}/>
             <TouchableOpacity onPress={() => setShowPicker(true)} activeOpacity={1}>
               <Input
                 disabled
                 label='Due date'
                 rightIcon={ calendarIcon }
                 >
                 {dueDate.toLocaleDateString() || ''}
                 </Input>
             </TouchableOpacity>
             { showPicker && (
                 <DateTimePicker
                  value={new Date(dueDate)}
                  mode='date'
                  display="default"
                  onChange={(_, date) => { setDueDate(date) }}
                />
             )}
           </View>
           <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
             <Icon
               raised
               type='font-awesome'
               name='check'
               color='#1AC80B'
               onPress={() => savePayment()}
             />
             <Icon
               raised
               type='font-awesome'
               name='times'
               color='#D01919'
               onPress={() => {props.onPageDismiss()}}
             />
           </View>
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
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  }
});
export default PaymentForm
