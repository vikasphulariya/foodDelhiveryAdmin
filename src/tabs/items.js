/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import axios from 'axios';
export default function Items({}) {
  const isFocused = useIsFocused();
  const navigation = useNavigation(navigation);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('screen').height;
  const [height, setHeight] = useState(windowHeight);
  const [itemsCopy, setItemsCopy] = useState([]);
  const itemHeight = windowHeight / 6;
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItem();
    // console.log(windowHeight, '  ', itemHeight);
  }, [isFocused, windowHeight, itemHeight]);

  const search = SearchTxt => {
    if (SearchTxt != '') {
      // setCovidData(covidDataCpy)
      const tempData = itemsCopy.filter(item => {
        return (
          item.data.name.toLowerCase().indexOf(SearchTxt.toLowerCase()) > -1
        );
        // const tempItem=item.State?item.State.toUpperCase():''.toUpperCase();
        // const itemData=SearchTxt.toUpperCase()
      });
      setItems(tempData);
    } else {
      setItems(itemsCopy);
    }
  };

  const sendNotification = () => {
    var data = JSON.stringify({
      data: {
        body: 'click to open check Post',
        title: 'New Post Added',
        for: 'Vikasphulariya@gmail.com',
      },
      to: 'foBoldX0TR-soxJYTU-J5O:APA91bES9B_Yo-bVWZyBudiAmnudjE-JJNHl35asK_kz_bW1PXHOE6xaneQ1cVIuhEK6Ydn0wLeym2pozL-mXTssdCdURDPIONsFU4wJW21OmN5fR290zWQ0Yra5KevVFgm1RyZ96d9n',
    });
    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization:
          'key=AAAAj-nQPco:APA91bFQoAuVec_y-taUplK3LvILuTQMQBwucIYbaJTyhfa2M9d0wzwLGyhuaobD9hUpuXmUPK2h7IGmt-Z3obHDvlkNGgmDlqvmi0cVlOCDhoJud4ZywsZsYV3QYeDQZEscxrZECxDv',
        'Content-Type': 'application/json',
      },
      data: data,
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      priority: 'high',
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteItem = ID => {
    firestore()
      .collection('items')
      .doc(ID)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItem();
      });
  };

  const getItem = async () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        let temp = [];
        querySnapshot.forEach(documentSnapshot => {
          //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          temp.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        // console.log('temp', temp);
        setItems(temp);
        setItemsCopy(temp);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          onPress={() => {
            // console.log('price.length');
            // search('vikas');
            sendNotification();
          }}
          style={styles.header}>
          Items
        </Text>
      </View>
      {/* <ScrollView> */}
      {/* <View style={{backgroundColor:'yellow',height:'100%'}}> */}
      <TextInput
        placeholder="Search"
        placeholderTextColor={'#c0c0c0'}
        style={styles.search}
        onChangeText={value => {
          search(value);
        }}
      />
      <FlatList
        data={items}
        renderItem={(items, index) => {
          // console.log(items.item.data.itemUrl);
          return (
            <View style={[styles.items, {height: 125}]}>
              <View style={{width: '30%', height: '100%'}}>
                <Image
                  resizeMode="center"
                  source={{uri: items.item.data.itemUrl}}
                  style={styles.itemIcon}
                />
              </View>

              <View style={styles.itemData}>
                <Text style={styles.itemTxt}>{items.item.data.name}</Text>
                {/* <Text style={[styles.itemTxt, {fontWeight: '400'}]}>
                  {items.item.data.itemDiscription}
                </Text> */}
                {/* 
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[
                    styles.itemTxt,
                    {
                      fontWeight: '200',
                      // backgroundColor: '#8C8A9D',
                      width: '100%',
                      fontSize: 13,
                      textAlign: 'justify',
                      color: '#8C8A9D',
                    },
                  ]}>
                  {items.item.data.itemDiscription}
                </Text> */}
                <View
                  style={{
                    // position: 'absolute',
                    marginTop: 10,
                    marginHorizontal: 2,
                    height: 15,
                    width: undefined,
                    aspectRatio: 1,
                    backgroundColor:
                      items.item.data.type === 'Veg' ? 'green' : 'red',
                    // right: 10,
                    // bottom: 40,
                    borderRadius: 12,
                    // justifyContent: 'center',
                    // alignContent: 'center',
                    // alignItems: 'center',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                    paddingLeft: 10,
                  }}>
                  <Text style={styles.itemPrice}>
                    ₹{items.item.data.itemPrice}
                  </Text>
                  <Text style={styles.itemDiscounterPrice}>
                    ₹{items.item.data.itemdiscountedPrice}
                  </Text>
                </View>
              </View>

              <View style={{justifyContent: 'center', width: '22%'}}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(items.item.id);
                    navigation.navigate('Edit', {
                      dataofItem: items,
                    });
                    // deleteItem()
                  }}>
                  <Image
                    style={styles.itemEdit}
                    source={require('../icons/edit.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // console.log(items.item.id)
                    Alert.alert(
                      'Confirm',
                      'This will delete this item.',
                      [
                        {
                          text: 'Delete Item',
                          onPress: () => deleteItem(items.item.id),
                        },
                      ],
                      {
                        cancelable: true,
                      },
                    );
                  }}>
                  <Image
                    style={[styles.itemEdit, {tintColor: 'red'}]}
                    source={require('../icons/delete.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {/* </View> */}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom:70,
    // backgroundColor: 'red'
    marginBottom: 60,
  },
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    // marginBottom:10
  },
  header: {
    color: 'black',
    padding: 5,
    fontWeight: '700',
    fontSize: 24,
  },
  items: {
    marginHorizontal: '4%',
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#c0c0c0',
    borderWidth: 0.5,
    elevation: 3,
    // alignContent:'center',
    // alignItems:'center'
    // height:height,
    // justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 8,
    margin: 10,
    flexDirection: 'row',
  },
  itemTxt: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  itemIcon: {
    // width: 100,
    height: '100%',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#c0c0c0',
  },
  itemData: {
    paddingHorizontal: 10,
    // borderWidth:1,
    width: '50%',
    paddingVertical: 0,
  },
  itemPrice: {
    color: 'red',
    marginRight: 5,
    // fontStyle:'strikethrough',
    textDecorationLine: 'line-through',
    textDecorationColor: 'black',
    textDecorationStyle: 'solid',
    fontSize: 18,
  },
  itemDiscounterPrice: {
    fontSize: 20,
    color: '#40ed7a',
  },
  itemEdit: {
    width: 44,
    height: 44,
    alignSelf: 'center',
    paddingHorizontal: 2,
    marginVertical: 10,
    aspectRatio: 1.1,
  },
  search: {
    width: '92%',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#c0c0c0',
    alignSelf: 'center',
    margin: 5,
    fontSize: 18,
    elevation: 5,
    paddingHorizontal: 12,
    color: 'black',
  },
});
