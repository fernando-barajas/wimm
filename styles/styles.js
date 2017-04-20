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
  totalPayment: {
    color: '#10879E',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 10,
    textDecorationLine: 'underline'
  }
});

module.exports = styles;