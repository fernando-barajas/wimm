import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/ui/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/Expenses/ExpensesScreen';
import ExpenseFormScreen from '../screens/Expenses/ExpenseFormScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import PaymentsScreen from '../screens/Payments/PaymentScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    defaultNavigationOptions: {
      header: null
    }
  },
});


// Home Tab Router
const HomeStack = createStackNavigator({ Home: HomeScreen }, config);

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-apps"
    />
  ),
};
HomeStack.path = '';

// Payments Tab Router
const PaymentsStack = createStackNavigator( { Payments: PaymentsScreen }, config);

PaymentsStack.navigationOptions = {
  tabBarLabel: 'Pagos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-card" />
  ),
};
PaymentsStack.path = ''

// Expense Tab Router
const ExpensesStack = createStackNavigator(
  {
    Expenses: ExpensesScreen,
    AddExpense: ExpenseFormScreen
  },
  config
);

ExpensesStack.navigationOptions = {
  tabBarLabel: 'Gastos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-cart" />
  ),
};
ExpensesStack.path = '';

// Settings Tab Router
const SettingsStack = createStackNavigator( { Settings: SettingsScreen }, config);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Config.',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};
SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  PaymentsStack,
  ExpensesStack,
  SettingsStack,
});
tabNavigator.path = '';

export default tabNavigator;
