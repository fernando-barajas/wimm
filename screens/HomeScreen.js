import React, { useEffect } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Header, ListItem } from 'react-native-elements'

import PaymentsService from '../services/payments'

function HomeScreen(props) {
  const { navigate } = props.navigation

  useEffect(() => {
    PaymentsService.get((data) => {
      console.log('get payments success')
      console.log(data)
    }, (error) => {
      console.log('get payments error')
      console.log(error)
    })

  }, [])


  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{
          text: "Monthly Payment:",
          style: { color: "#fff", fontSize: 24 }
        }}
        centerComponent={{
          text: '$0',
          style: { color: "#fff", fontSize: 24 }
        }}
      />
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
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
      </View>
      <FloatingAction
        onPressMain={() => {
          navigate("Payment");
        }}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default HomeScreen
