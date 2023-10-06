import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export default function Notification() {
  // useEffect(() => {
  //   console.log('Use effect');
  //   const unsubscribe = firestore()
  //     .collection('NewOrders')
  //     .onSnapshot(onResult, onError);

  //   return () => unsubscribe();
  //   // getItem();
  // });
  // function onResult(querySnapshot) {
  //   console.log('Got Users collection result.');
  //   // saveToDevice(querySnapshot);
  //   // getItem(querySnapshot);
  // }

  // function onError(error) {
  //   console.error('ss', error);
  // }

  const getItem = querySnapshot => {
    // querySnapshot.forEach;
    let k = querySnapshot._data.cart;
    let v = k.length;
    console.log(v);
    setItems(v);
  };
  return (
    <View style={{flex: 1}}>
      <Text>notification</Text>
    </View>
  );
}
