import React, { Component, } from 'react'
import { View, Text, ListView } from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

var styles = require('../styles/styles');

class PaymentsList extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: ds.cloneWithRows([]) }
  }

  _renderHeader() {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.headingText}>
          My Payments
        </Text>
      </View>);
  }
  
  _renderRow(rowData) {
    return (
      <Text>Waka</Text>
    );
  }
  
  render() {
    return (
      <View style={styles.container} >
       <ListView
         style={styles.list}
         dataSource={this.state.dataSource}
         renderRow={this._renderRow}
         stickyHeaderIndices={[0]}
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