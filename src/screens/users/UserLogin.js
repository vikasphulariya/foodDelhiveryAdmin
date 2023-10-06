import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth'
import Loader from '../common/loader';
export default function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('vikas')
  const [modalVisible, setModalVisible] = useState(false)
  const [failedCheck, setFailedCheck] = useState(false)
  const [failedMsg, setFailedMsg] = useState('')
  // useEffect(() => {
  //   // console.log('Login')
  //   getData()
  // }, [])

  const UserLogin =async()=>{
    setModalVisible(true)
    let tempemail=email.toLowerCase()
    // let adminemail=temouser.email.toLowerCase()
    console.log(tempemail)
    auth()
  .signInWithEmailAndPassword(tempemail, password)
  .then(() => {
    console.log('User account loges & signed in!');
    navigation.navigate('Home')
    setModalVisible(false)
  })
  .catch(error => {
    if (error.code === 'auth/network-request-failed') {
      setModalVisible(false)
      console.log('That email address is already in use');
      setFailedMsg('Network request failed,Try again later')
    }
    
    if (error.code === 'auth/wrong-password') {
      console.log('Wrong Password!');
      setFailedMsg('Wrong Password!')
      setModalVisible(false)
    }
    if(error.code === 'auth/user-not-found'){
      console.log('That email address doesnt exists');
      setFailedMsg('That email address does not exist')
      setModalVisible(false)
      
    }
    if(error.code === 'auth/invalid-email'){
      console.log('invalid email address');
      setFailedMsg('Invalid email address entered');
      setModalVisible(false)
      
    }
    setModalVisible(false)

    console.log(error);
  });
  }
  const getData = async () => {
    const users = await firestore().collection('Admin').get()
    console.log(users.docs[0]._data)
  }
  return (
    <ScrollView>

      <View style={style.container}>

        <Text onPress={()=>{
          setModalVisible(true)
        }} style={style.headerTitle}
          >User Login</Text>
        {/* errorMsg.l */}
        <TextInput placeholder='User ID' textContentType={'emailAddress'} value={email}
          placeholderTextColor={'#c0c0c0'}
          style={style.inputStyle} 
          onChangeText={(value)=>{setEmail(value)
          }}></TextInput>

        <TextInput placeholder='Password'
          placeholderTextColor={'#c0c0c0'} value={password}
          secureTextEntry style={style.inputStyle}
          onChangeText={(value)=>{setPassword(value)}}></TextInput>

          {failedCheck?<Text></Text>:null}
          <Text style={style.inputCheckTxt}>{failedMsg}</Text>

        <TouchableOpacity style={style.loginBtn} onPress={()=>{UserLogin()}}>
          <Text style={style.loginTxt}>Login</Text>
        </TouchableOpacity>
        <Text style={style.newACC} onPress={()=>{
            navigation.navigate('userSignUp')
        }}>Create New Account</Text>
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
    fontSize: 28,
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
  },
  newACC:{
    color: '#000',
    fontWeight:'900',
    // textDecorationStyle:'double',
    textDecorationLine:'underline',
    marginTop:100,
    fontSize:16
    // Color:'red'
  },
  inputCheckTxt: {
    color: 'red',
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: "6%",
    width: '88%',
    textAlign: 'center',
}
})