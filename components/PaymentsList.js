import React, { Component, } from 'react'
import { View, Text, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';
import accounting from 'accounting'
import PaymentItem from './PaymentItem';
import AddPaymentBtn from './AddPaymentBtn';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "Payments.db";
const database_version = "1.0";
const database_displayname = "SQLite Payments Database";
const database_size = 200000;
let db, total_payment = 0;

var styles = require('../styles/styles');

class PaymentsList extends Component {
  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  
  componentDidMount() {
    this._refreshList()
  }
  
  componentWillReceiveProps() {
    this._refreshList()
  }

  errorCB(err) {
      console.log("error: ", err);
      return false;
  }

  openCB() {
    console.log("Database OPEN");
  }
  
  _refreshList() {
    db.executeSql('SELECT * FROM payments WHERE created_at BETWEEN "'
                  + moment().startOf('month').format('YYYY-MM-DD 00:00:00')
                  + '" AND "'
                  + moment().endOf('month').format('YYYY-MM-DD 00:00:00')
                  + '"', [], (results) => {
      var len = results.rows.length;
      var rows = [];
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        rows.push(row);
        total_payment += row.amount;
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rows)
      });
    }, this.errorCB)
  }

  _renderRow(rowData) {
    return (
      <PaymentItem payment={rowData} db={db} ></PaymentItem>
    );
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{height: 490}}>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderRow}
           enableEmptySections={true} />
        </View>
        <View>
          <Text style={styles.totalPayment}>
            Total Payment: {accounting.formatMoney(total_payment)}
          </Text>
        </View>
        <AddPaymentBtn db={db} />
      </View>
    )
  }
}

export default PaymentsList
