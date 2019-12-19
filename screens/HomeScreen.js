import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import AppLayout from '../components/ui/AppLayout';

function HomeScreen(props) {

  return (
    <AppLayout
      linkTo="Payments"
      headerLeftText="Pago Mensual Actual:"
      headerCenterText="$0"
    >
      <ScrollView>
        {/* {paymentsList.map((l, i) => (
          <ListItem
            key={i}
            title={l.institution}
            rightTitle={`$ ${l.amount}`}
            rightSubtitle={`Deposits - $ ${l.pay_out}`}
            subtitle={l.due_date}
            bottomDivider
            chevron
          />
        ))} */}
      </ScrollView>
    </AppLayout>
  );
}

export default HomeScreen
