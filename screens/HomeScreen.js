import React, { useEffect } from 'react';

import AppLayout from '../components/ui/AppLayout';

function HomeScreen(props) {

  return (
    <AppLayout
      linkTo="Payments"
      headerLeftText="Pago Mensual Actual:"
      headerCenterText="$0"
    >
    </AppLayout>
  );
}

export default HomeScreen
