import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View } from 'react-native';
import PaymentsList from './components/PaymentsList';
import PaymentForm from './components/PaymentForm';
import loading from './components/loading/loading';
import { StackNavigator } from "react-navigation";

const wimm = StackNavigator ({
  PaymentsList: { screen: PaymentsList },
  PaymentForm: { screen: PaymentForm },
  EditPayment: { screen: PaymentForm }
});

export default wimm

