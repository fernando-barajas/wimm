import React, { Component, } from 'react'
import { View, Text, ListView } from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import PaymentItem from './PaymentItem';

var styles = require('../styles/styles');

class PaymentsList extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: ds.cloneWithRows([{type: 'credit-card', name: 'Banamex', amount: '1000', dueDate: '01/05/2017'},
                                                 {type: 'money', name: 'Telmex', amount: '390', dueDate: '03/05/2017'},
                                                 {type: 'credit-card', name: 'Bancomer', amount: '1500', dueDate: '15/05/2017'},
                                                 {type: 'credit-card', name: 'Santander', amount: '600', dueDate: '10/05/2017'}]) };
  }

  _renderRow(rowData) {
    return (
      <PaymentItem  payment={rowData}></PaymentItem>
    );
  }
  
  render() {
    return (
      <View style={styles.container} >
       <ListView
         style={styles.list}
         dataSource={this.state.dataSource}
         renderRow={this._renderRow}
         enableEmptySections={true} />
        <ActionButton buttonColor='rgba(12, 212, 142, 1)' offsetY={30}>
          <ActionButton.Item buttonColor='rgba(12, 212, 142, 1)' title=''>
            <Icon name='credit-card' style={styles.actionButtonIcon}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='rgba(12, 212, 142, 1)' title=''>
            <Icon name='money' style={styles.actionButtonIcon}/>
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

export default PaymentsList