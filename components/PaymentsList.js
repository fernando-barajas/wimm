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
let db;
var PushNotification = require('react-native-push-notification');

var styles = require('../styles/styles');

class PaymentsList extends Component {
  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
    PushNotification.configure({
      onNotification: function(notification) {
      }
    });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      totalPayment: 0,
      payOut: 0
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
    let total = 0, payOut = 0;
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
        total += row.amount;
        payOut += row.pay_out;
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rows),
        totalPayment: total,
        payOut: payOut
      });
    }, this.errorCB)
  }

  _renderRow(rowData) {
    return (
      <PaymentItem payment={rowData} db={db} ></PaymentItem>
    );
  }

  render() {
    let paymentProps = {
      db: db,
      PushNotification: PushNotification
    }

    return (
      <View style={styles.container} >
        <View style={styles.paymentStatus}>
          <Text style={styles.totalPayment}>
            {accounting.formatMoney(this.state.totalPayment)}
          </Text>
          <Text style={styles.payOut}>
            {accounting.formatMoney(this.state.payOut)}
          </Text>
          <Text style={styles.toPay}>
            {accounting.formatMoney(this.state.totalPayment - this.state.payOut)}
          </Text>
        </View>
        <View style={{height: 500}}>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderRow}
           enableEmptySections={true} />
        </View>
        <AddPaymentBtn {...paymentProps} />
      </View>
    )
  }
}

export default PaymentsList
