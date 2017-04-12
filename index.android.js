/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import PaymentsList from './components/PaymentsList';

var styles = require('./styles/styles');

export default class wimm extends Component {
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
