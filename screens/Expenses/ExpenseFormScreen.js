import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ExpenseForm from '../../components/expenses/ExpenseForm'

export default function ExpenseFormScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <ExpenseForm />
      </ScrollView>
    </View>
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
