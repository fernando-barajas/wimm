import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/ui/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/Expenses/ExpensesScreen';
import ExpenseFormScreen from '../screens/Expenses/ExpenseFormScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


// Home Tab Router
const HomeStack = createStackNavigator({ Home: HomeScreen }, config);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
HomeStack.path = '';

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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-wallet'} />
  ),
};
ExpensesStack.path = '';

// Settings Tab Router
const SettingsStack = createStackNavigator( { Settings: SettingsScreen }, config);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};
SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ExpensesStack,
  SettingsStack,
});
tabNavigator.path = '';

export default tabNavigator;
