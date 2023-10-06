import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Items from '../tabs/items';
import Transaction from '../tabs/transaction';
import Add from '../tabs/add';
import Orders from '../tabs/orders';
import Notification from '../tabs/notification';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export default function Dashboard() {
  const [tokenUpdated, setTokenUpdated] = useState(false);
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    // setToken();
    const unsubscribe = firestore()
      .collection('Admin')
      .doc('token')
      .onSnapshot(onResult, onError);

    return () => unsubscribe();
    // getItem();
  }, []);
  // useEffect(() => {
  //   getToken();
  // }, [tokenUpdated]);

  const getToken = async jj => {
    await PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('token is', token);
    if (!jj.some(item => item === token)) {
      let temp = [];
      temp = [...jj];
      temp.push(token);
      console.log('hi', temp);
      firestore().collection('Admin').doc('token').update({tokend: temp});
    } else {
      // firestore().collection('Admin').doc('token').update({tokend: temp});
      console.log('Token Alread Exits', jj);
    }
  };
  function onResult(querySnapshot) {
    console.log('Got Users collection result.');
    // saveToDevice(querySnapshot);
    // getItem(querySnapshot);
    setTokens(querySnapshot._data.tokend);
    try {
      let temp = querySnapshot._data.tokend;
      getToken(temp);
    } catch (e) {
      console.log(e);
    }
    // setTokenUpdated(!tokenUpdated);
    // console.log("ee",querySnapshot._data.tokend);
  }

  function onError(error) {
    console.error('ss', error);
  }
  const [selectedTab, setSelectedTab] = useState(0);
  // useEffect(() => {
  //   console.log('Use effect');
  //   const unsubscribe = firestore()
  //     .collection('NewOrders')
  //     .onSnapshot(onResult, onError);

  //   return () => unsubscribe();
  //   // getItem();
  // });
  // function onResult(querySnapshot) {
  //   // console.log('Got Users collection result.');
  //   // saveToDevice(querySnapshot);
  //   // getItem(querySnapshot);
  // }

  // function onError(error) {
  //   console.error('ss', error);
  // }
  return (
    // <SafeAreaView style={{flex:1}}>

    <View style={styles.mainContainer}>
      {/* <Text>Dashboard</Text> */}
      {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Transaction />
      ) : selectedTab == 2 ? (
        <Add />
      ) : selectedTab == 3 ? (
        <Orders />
      ) : selectedTab == 4 ? (
        <Notification />
      ) : null}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../icons/items.png')}
            style={[
              styles.bottomTabIcon,
              {tintColor: selectedTab == 0 ? 'red' : 'black'},
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../icons/bill.png')}
            style={[
              styles.bottomTabIcon,
              {tintColor: selectedTab == 1 ? 'red' : 'black'},
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../icons/add.png')}
            style={{
              width: 45,
              height: 45,
              tintColor: selectedTab == 2 ? 'red' : 'black',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../icons/orders.png')}
            style={[
              styles.bottomTabIcon,
              {tintColor: selectedTab == 3 ? 'red' : 'black'},
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={require('../icons/notification.png')}
            style={[
              styles.bottomTabIcon,
              {tintColor: selectedTab == 4 ? 'red' : 'black'},
            ]}
          />
        </TouchableOpacity>

        {/* <Image source={require('C:/food/foodDelhivery/src/screens/Icons/items.png')}/> */}
      </View>
    </View>
    //{/* </SafeAreaView> */}
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    // height:'100%',
    flex: 1,
    // marginBottom:60
    // backgroundColor:'black',
  },
  bottomView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  bottomTab: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '20%',
  },
  bottomTabIcon: {
    width: 38,
    height: 38,
  },
});
