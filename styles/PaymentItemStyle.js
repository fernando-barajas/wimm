import { StyleSheet } from 'react-native'

const PaymentItemStyle = StyleSheet.create({
  paymentItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5
  },
  paymentType: {
    flex: 1,
    flexDirection: 'row'
  },
  paymentItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  paymentData: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  paymentIcon: {
    flex: 1,
    paddingTop: 5,
    fontSize: 20
  },
  paymentItemName: {
    flex: 9,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

module.exports = PaymentItemStyle;