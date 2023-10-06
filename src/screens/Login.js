import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './common/loader';
export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    // console.log('Login')
    getData()
  }, [])

  const login = async () => {
    setModalVisible(true)
    const users = await firestore().collection('Admin').get()
    let temouser = users.docs[0]._data
    let tempemail = email.toLowerCase()
    let adminemail = temouser.email.toLowerCase()
    console.log(adminemail)
    if (tempemail == adminemail && password == temouser.password) {
      console.log('Login successful')
      await AsyncStorage.setItem('user', adminemail)
      setModalVisible(false)
      navigation.navigate('Dashboard')
    
    }
    else {
      setModalVisible(false)
      ToastAndroid.show("Login failed", 100)
      console.log('Login failed')
    }
  }
  const getData = async () => {
    const users = await firestore().collection('Admin').get()
    console.log(users.docs[0]._data)
  }
  return (
    <ScrollView>

      <View style={style.container}>

        <Text onPress={() => { console.log(email) }} style={style.headerTitle}>Admin Login</Text>

        <TextInput placeholder='Admin ID'
          textContentType={'emailAddress'}
          value={email}
          placeholderTextColor={'#c0c0c0'}
          style={style.inputStyle}
          onChangeText={(value) => {
            setEmail(value)
          }}></TextInput>

        <TextInput placeholder='Password'
          placeholderTextColor={'#c0c0c0'} value={password}
          secureTextEntry style={style.inputStyle}
          onChangeText={(value) => { setPassword(value) }}></TextInput>

        <TouchableOpacity style={style.loginBtn} onPress={() => { login() }}>
          <Text style={style.loginTxt}>Login</Text>
        </TouchableOpacity>
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} textData={"Logging In..."} animation={'loading'} />
    </ScrollView>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
    // justifyContent:'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontWeight: '900',
    fontSize: 20,
    padding: 10,
    marginTop: 100,
    marginBottom: 50
  },
  inputStyle: {
    paddingHorizontal: 15,
    padding: 10,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    backgroundColor: '#fff',
    margin: 10,
    width: '90%',
    borderRadius: 10,
    color: 'black',
    fontSize: 20,
  },
  loginBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 44,
    marginTop: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  loginTxt: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
  }
})