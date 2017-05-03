import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: 'white',
  },
  navigationBar: {
    backgroundColor: '#4397DF',
  },
  navBarTitle: {
    color: 'white',
    fontWeight: 'bold'
  },
  paymentStatus: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 10
  },
  totalPayment: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
    height: 20
  },
  payOut: {
    color: 'blue',
    fontSize: 17,
    fontWeight: 'bold',
    height: 20
  },
  toPay: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    height: 20
  }
});

module.exports = styles;