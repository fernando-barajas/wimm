import { StyleSheet } from 'react-native'

const PaymentFormStyle = StyleSheet.create({
  actions: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    height: 25,
    justifyContent: 'space-around',
    marginTop: 20
  },
  actionBtn: {
    color: '#4397DF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    bottom: 0,
    left: 0,
    marginTop: 64,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'absolute',
    right: 0,
    top: 0
  },
  datePickerBox:{
    marginTop: 9,
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent:'center'
  },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#121212',
  }
});

module.exports = PaymentFormStyle;
