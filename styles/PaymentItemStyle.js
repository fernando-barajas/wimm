import { StyleSheet } from 'react-native'

const PaymentItemStyle = StyleSheet.create({
  paymentItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  paymentInfoRight: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  paymentInfoLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  paymentIcon: {
    fontSize: 26,
    padding: 5,
    width: 42
  },
  paymentItemName: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    width: 80
  },
  paymentAmount: {
    color: '#F42F5A',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'right',
    width: 80
  },
  payOut: {
    color: '#6296EF',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'right',
    width: 80
  },
  toPay: {
    color: '#8B969C',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'right',
    width: 80
  },
  dueDate: {
    color: '#6195ED',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'right',
    width: 60
  },
  actionButtonsEdit: {
    backgroundColor: '#27C484',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButtonsDelete: {
    backgroundColor: '#F2372C',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButtonsIcon: {
    color: 'white',
    fontSize: 26,
    marginLeft: 24
  }
});

module.exports = PaymentItemStyle;
