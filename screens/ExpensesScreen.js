import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";

export default function ExpensesScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={styles.container}>
        <Text>Testing</Text>
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
