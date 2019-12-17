import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ExpensesList from '../../components/expenses/ExpensesList'
import AppLayout from '../../components/ui/AppLayout'

export default function ExpensesScreen(props) {
  const { navigate } = props.navigation

  return (
    <AppLayout
      linkTo="AddExpenses"
      headerLeftText="Gastos"
    >
      <ScrollView style={styles.container}>
        <ExpensesList />
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
});
