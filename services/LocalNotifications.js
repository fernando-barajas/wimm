import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const scheduleReminder = async function(institution, amount, dueDate) {
  let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (result.status !== 'granted') {
    console.log('Notification permissions failed');
    return;
  }

  console.log('Notification permissions granted.')
  let localNotification ={
    title: `Un pago esta por expirar: ${institution}`,
    body: `$ ${amount} Fecha limite: ${dueDate.toLocaleDateString()}`
  }

  // schedule to the day before
  let schedulingOptions = {
    time: (dueDate).getTime() - 86400000
  }

  Notifications.scheduleLocalNotificationAsync(
    localNotification, schedulingOptions
  );
}
