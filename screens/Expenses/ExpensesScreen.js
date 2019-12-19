import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ExpensesList from '../../components/expenses/ExpensesList'
import ExpensesForm from '../../components/expenses/ExpenseForm'
import AppLayout from '../../components/ui/AppLayout'

export default function ExpensesScreen(props) {
  const [showForm, setShowForm] = useState(false)

  return (
    <AppLayout
      floatText="AddExpenses"
      floatPress={() => setShowForm(true)}
      headerLeftText="Gastos"
    >
      <ScrollView style={styles.container}>
        <ExpensesList refresh={showForm}/>
        <ExpensesForm
          show={showForm}
          onPageDismiss={() => setShowForm(false)}
        />
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
