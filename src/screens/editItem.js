import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  ToastAndroid,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
export default function EditItem({route}) {
  const navigation = useNavigation();
  const [Cat, setCat] = useState('');
  const [type, setType] = useState('');
  const categories = [
    // {Cat: 'All'},
    {Cat: 'Noodle'},
    {Cat: 'Roll'},
    {Cat: 'Rice'},
    {Cat: 'Burger'},
    {Cat: 'Pasta'},
  ];
  const [itemName, setItemName] = useState(
    route.params.dataofItem.item.data.name,
  );
  // const [modal, setModal] = useState(true)
  const [image, setImage] = useState({
    assets: [{uri: route.params.dataofItem.item.data.itemUrl}],
  });
  const [price, setPrice] = useState(
    route.params.dataofItem.item.data.itemPrice,
  );
  const [discountedPrice, setDiscountedPrice] = useState(
    route.params.dataofItem.item.data.itemdiscountedPrice,
  );
  const [Discription, setDiscription] = useState(
    route.params.dataofItem.item.data.itemDiscription,
  );
  const [imageUrl, setImageUrl] = useState('');
  const [inputCheck, setInputCheck] = useState(false);
  const [imageAvailble, setImageAvailble] = useState(true);
  const [imageUpdated, setImageUpdated] = useState(false);

  const imageUpload = async () => {
    if (
      imageAvailble &&
      itemName.length > 3 &&
      price.length > 1 &&
      discountedPrice.length > 1 &&
      Discription.length > 2
    ) {
      console.log('image upload', imageUrl);
      const reference = storage().ref(image.assets[0].fileName);
      const pathToFile = image.assets[0].uri;
      console.log(pathToFile);
      await reference.putFile(pathToFile);
      const url = await storage()
        .ref(image.assets[0].fileName)
        .getDownloadURL();
      console.log(url);
      // setImageUrl(url);
      console.log('Right Url', imageUrl);
      UploadItem(url);
    } else {
      setInputCheck(true);
      console.log('Wrong');
    }
  };

  const pickImage = async () => {
    setImageUpdated(true);
    const result = await launchImageLibrary({mediaType: 'photo'});
    console.log('assets' in result);
    console.log(typeof result);
    if ('assets' in result) {
      setImage(result);
      setImageAvailble(true);
    } else if ('didCancel' in result) {
      null;
    } else {
      ToastAndroid.show('Something went wrong');
    }
  };

  const UploadItem = async urlofImage => {
    if (
      imageAvailble &&
      itemName.length > 3 &&
      price.length > 1 &&
      discountedPrice.length > 1 &&
      Discription.length > 2
    ) {
      console.log('item Upload', urlofImage);
      firestore()
        .collection('items')
        .doc(route.params.dataofItem.item.id)
        .update({
          name: itemName,
          itemPrice: price,
          itemdiscountedPrice: discountedPrice,
          itemDiscription: Discription,
          itemUrl: urlofImage,
        })
        .then(() => {
          setImage('null');
          console.log('User added!');
          ToastAndroid.show('Item Updated', 100);
          setDiscountedPrice('');
          setPrice('');
          setImageAvailble(false);
          setItemName('');
          setDiscription('');
          setInputCheck(false);
          navigation.goBack();
        });
    } else {
      setInputCheck(true);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text
          onPress={() => {
            console.log(image.assets[0].uri);
          }}
          style={styles.header}>
          Add Item
        </Text>
      </View>
      <ScrollView>
        {image != 'null' ? (
          <Image
            source={{uri: image.assets[0].uri}}
            style={{
              width: '90%',
              height: 250,
              alignSelf: 'center',
              borderRadius: 15,
              marginTop: 10,
            }}
          />
        ) : // <Image source={{ uri: imageUrl }} style={{ width: '90%', height: 250, alignSelf: 'center', borderRadius: 15, marginTop: 10 }} />
        null}
        <TextInput
          placeholder="Enter Item Name"
          placeholderTextColor={'#c0c0c0'}
          style={styles.textInput}
          onChangeText={value => {
            setItemName(value);
          }}
          value={itemName}></TextInput>

        {itemName.length < 3 ? (
          inputCheck ? (
            <Text style={styles.inputCheckTxt}>Please Enter Item Name</Text>
          ) : null
        ) : null}

        <TextInput
          // returnKeyType={'next'}
          placeholder="Enter Item Price"
          placeholderTextColor={'#c0c0c0'}
          style={styles.textInput}
          onChangeText={value => {
            setPrice(value);
          }}
          value={price}
          keyboardType={'phone-pad'}></TextInput>

        {price.length < 2 ? (
          inputCheck ? (
            <Text style={styles.inputCheckTxt}>Please Enter Item Price</Text>
          ) : null
        ) : null}

        <TextInput
          placeholder="Enter Discounted Price"
          placeholderTextColor={'#c0c0c0'}
          style={styles.textInput}
          onChangeText={value => {
            setDiscountedPrice(value);
          }}
          value={discountedPrice}
          inputMode={'numeric'}></TextInput>

        {discountedPrice.length < 2 ? (
          inputCheck ? (
            <Text style={styles.inputCheckTxt}>
              Please Enter Discounted Price
            </Text>
          ) : null
        ) : null}

        <TextInput
          placeholder="Enter Item Discription"
          placeholderTextColor={'#c0c0c0'}
          style={styles.textInput}
          onChangeText={value => {
            setDiscription(value);
          }}
          value={Discription}></TextInput>

        {Discription.length < 3 ? (
          inputCheck ? (
            <Text style={styles.inputCheckTxt}>Please Enter Discription</Text>
          ) : null
        ) : null}

        {/* <TextInput
                    placeholder='Enter Image URL' placeholderTextColor={'#c0c0c0'}
                    style={styles.textInput} onChangeText={(value) => {
                        setImageUrl(value);
                    }} value={imageUrl}></TextInput> */}

        {/* <Text
          style={{
            color: '#c0c0c0',
            alignSelf: 'center',
            margin: 20,
            fontSize: 18,
            fontWeight: '500',
          }}>
          - OR -
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              setType('Veg');
            }}>
            <Text
              style={{
                color: '#000',
                paddingHorizontal: 15,
                padding: 5,
                elevation: 5,
                borderRadius: 19,
                fontSize: 18,
                fontWeight: '700',
                backgroundColor: type === 'Veg' ? '#34ed53' : '#c0c0c0',
              }}>
              Veg
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setType('Non-Veg');
            }}>
            <Text
              style={{
                color: '#000',
                paddingHorizontal: 15,
                padding: 5,
                elevation: 5,
                borderRadius: 19,
                fontSize: 18,
                fontWeight: '700',
                backgroundColor: type === 'Non-Veg' ? '#fa2a2e' : '#c0c0c0',
              }}>
              Non-Veg
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // flexWrap: 'nowrap',
            paddingHorizontal: 7,
            marginTop: 15,
          }}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => {
              return (
                <View style={{marginHorizontal: 5, paddingVertical: 10}}>
                  <TouchableOpacity
                    onPress={() => setCat(item.item.Cat)}
                    style={{
                      borderColor: '#c0c0c0',
                      borderWidth: Cat === item.item.Cat ? 1 : 0.2,
                      backgroundColor:
                        Cat === item.item.Cat ? '#39edbd' : '#d3d3d3',
                      elevation: Cat === item.item.Cat ? 8 : 0,
                      padding: 8,
                      borderRadius: 19,
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: 5,
                        fontWeight: '700',
                        color: '#fff',
                      }}>
                      {item.item.Cat}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            pickImage();
            //    imageUpload();
          }}>
          <Text style={styles.imagePicker}>Update Image</Text>
        </TouchableOpacity>
        {!imageAvailble ? (
          inputCheck ? (
            <Text style={styles.inputCheckTxt}>Please Pick Item Image</Text>
          ) : null
        ) : null}

        <TouchableOpacity
          onPress={() => {
            //    pickImage();
            {
              imageUpdated
                ? imageUpload()
                : UploadItem(route.params.dataofItem.item.data.itemUrl);
            }
            // console.log('mid upload',imageUrl)
          }}>
          <Text style={styles.uploadBtn}>Update Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  textInput: {
    marginHorizontal: '4%',
    width: '92%',
    backgroundColor: '#FFFFFF',
    margin: 13,
    borderRadius: 10,
    paddingHorizontal: 10,
    // textAlign:'center'
    fontSize: 15,
    borderWidth: 0.5,
    color: 'black',
    fontWeight: '700',
    borderColor: '#c0c0c0',
    // elevation:10,
  },
  imagePicker: {
    alignSelf: 'center',
    backgroundColor: 'orange',
    width: '92%',
    marginHorizontal: '4%',
    fontSize: 17,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0.5,
    // elevation:7,
    margin: 13,
  },
  uploadBtn: {
    alignSelf: 'center',
    backgroundColor: '#62f5f0',
    width: '92%',
    marginHorizontal: '4%',
    fontSize: 17,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0.5,
    // elevation:7,
    margin: 13,
  },
  inputCheckTxt: {
    color: 'red',
    marginTop: -12,
    marginBottom: 5,
    marginHorizontal: '4%',
    width: '92%',
  },
});
