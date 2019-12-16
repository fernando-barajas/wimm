import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";

import ExpensesList from '../components/ExpensesList'

export default function ExpensesScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <ExpensesList />
      </ScrollView>
      <FloatingAction
        onPressMain={() => {
          navigate("Payment");
        }}
      />
    </View>
  );
}

ExpensesScreen.navigationOptions = {
  title: 'Gastos',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
});
