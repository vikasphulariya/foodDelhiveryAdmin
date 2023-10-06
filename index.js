/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
// Register the background handler

// Register the background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage);
  if (remoteMessage.data.for === 'admin') {
    onDisplayNotification(remoteMessage);
  } else {
    console.log('User Not Valid');
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
});

async function onDisplayNotification(noti) {
  // Request permissions (required for iOS)
  // await notifee.requestPermission();
  console.log('BacckGround Notification');

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: noti.data.title,
    body: noti.data.body,
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}
// AppRegistry registration and other setup...

AppRegistry.registerComponent(appName, () => App);
