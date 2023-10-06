import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from 'C:/food/foodDelhivery/src/AppNavigator.js';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
  };
  return <AppNavigator />;
}
