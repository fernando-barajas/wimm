import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const scheduleReminder = async function(institution, amount, due_date) {
  let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (result.status !== 'granted') {
    console.log('Notification permissions failed');
    return;
  }

  console.log('Notification permissions granted.')
  let localNotification ={
    title: `A payment for ${institution} is about to expire`,
    body: `$ ${amount} Due date: ${due_date.toLocaleDateString()}`
  }

  // schedule to the day before
  let schedulingOptions = {
    time: (due_date).getTime() - 86400000
  }

  Notifications.scheduleLocalNotificationAsync(
    localNotification, schedulingOptions
  );
}
