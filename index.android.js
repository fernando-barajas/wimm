/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import PaymentsList from './components/PaymentsList';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "Payments.db";
const database_version = "1.0";
const database_displayname = "SQLite Payments Database";
const database_size = 200000;
let db;

var styles = require('./styles/styles');

export default class wimm extends Component {
  componentDidMount() {
    console.log("Opening database ...");
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
    this.verifyDB(db);
  }

  componentWillUnmount(){
    this.closeDatabase();
  }

  errorCB(err) {
      console.log("error: ", err);
      return false;
  }

  successCB() {
      console.log("SQL executed ...");
  }

  openCB() {
    console.log("Database OPEN");
  }

  closeCB() {
    console.log("Database CLOSED");
  }

  verifyDB(db){
    var that = this;
    console.log("Database integrity check");
    db.executeSql('SELECT 1 FROM Version LIMIT 1', [],
      function () {
        console.log("Database is ready ... executing query ...");
        db.transaction(that.queryEmployees,that.errorCB,function() {
            console.log("Processing completed");
        });
      },
      function (error) {
          console.log("received version error:", error);
          console.log("Database not yet ready ... populating data");
          db.transaction(that.setupDB, that.errorCB, function () {
            console.log("Database populated ...");
          });
      });
  }

  setupDB(tx) {
    console.log("Executing CREATE stmts");
    tx.executeSql('CREATE TABLE IF NOT EXISTS payments( '
      + 'payment_id INTEGER PRIMARY KEY NOT NULL, '
      + 'payment_type VARCHAR(20), '
      + 'institution VARCHAR(50), '
      + 'amount NUMERIC(10,2), '
      + 'due_date DATE); ', [], this.successCB, this.errorCB);

    console.log("Executing INSERT stmts");
    console.log("all config SQL done");
  }

  closeDatabase(){
    var that = this;
    if (db) {
        console.log("Closing database ...");
        db.close(that.closeCB,that.errorCB);
    } else {
        console.log("Database was not OPENED");
    }
  }

  render() {
    return (
      <Router>
        <Scene key='root' navigationBarStyle={styles.navigationBar}>
          <Scene key='PaymentsList' component={PaymentsList} title='WIMM' initial={true} sceneStyle={styles.scene} />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('wimm', () => wimm);
