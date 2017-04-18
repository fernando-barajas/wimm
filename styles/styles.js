import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    marginTop: 64,
    position: 'absolute',
    right: 0,
    top: 0
  },
  list: {
    backgroundColor: '#FFFFFF',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDBF61',
    padding: 8,
    elevation: 3,
    shadowColor: '#DDDDDD',
    shadowOffset: {height: 5},
    shadowOpacity: 1
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  navigationBar: {
    backgroundColor: '#4397DF',
  },
  paymentType: {
    flex: 1,
    flexDirection: 'row'
  },
  paymentItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5
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

module.exports = styles;