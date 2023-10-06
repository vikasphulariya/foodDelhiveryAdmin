import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Splash from './screens/Splash';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import UserSelect from './screens/users/userSelect';
import Item from './tabs/items';
import Home from './screens/users/home';
import EditItem from './screens/editItem';
import UserLogin from './screens/users/UserLogin';
import userSignUp from './screens/users/userSignUp';
import Emp from './screens/users/emp';
import {Alert} from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
// import messaging from '@react-native-firebase/messaging';
export default function AppNavigator() {
  useEffect(() => {
    console.log('appNavigator');
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage.data);
      if (remoteMessage.data.for === 'admin') {
        onDisplayNotification(remoteMessage);
      } else {
        console.log('User Not Valid');
      }
    });
    return unsubscribe;
  }, []);

  async function onDisplayNotification(noti) {
    console.log('fw4f');
    // Request permissions (required for iOS)
    await notifee.requestPermission();

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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen  component={Splash}
        name="Splash"
        options={{headerShown:false}}
        /> */}

        {/* <Stack.Screen  component={UserSelect}
        name="UserSelect"
        options={{headerShown:false}}
        /> */}
        {/* <Stack.Screen  component={UserLogin}
        name="userLogin"
        options={{headerShown:false}}
        />
        <Stack.Screen  component={userSignUp}
        name="userSignUp"
        options={{headerShown:false}}
        />

        <Stack.Screen  component={Login}
        name="Login"
        options={{headerShown:false}}
        />

        <Stack.Screen  component={Emp}
        name="Emp"
        options={{headerShown:false}}
        />

        */}
        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={EditItem}
          name="Edit"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
