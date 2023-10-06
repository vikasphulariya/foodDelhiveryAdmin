import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState ,useEffect} from 'react'
import Loader from '../common/loader'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmailValidator from 'aj-email-validator'
export default function UserSignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [flat, setFlat] = useState('')
    const [inputCheck, setInputCheck] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [userExists, setUserExists] = useState(false)
    useEffect(() => {
        // console.log(email)
        if ( EmailValidator(email) == true ) {
            setValidEmail(true)
            // console.log("bio")
            // il)
        }
        else{
            // console.log("validEmail")
            setValidEmail(false)
        }
    }, [email])

    const allEntryValid=()=>{
        if(validEmail && phone.length>=10 && name.length>=3 && password.length>=6){
            console.log("validEmail")
            signUp()
        }
        else{
            console.log("NotEmail")
            setInputCheck(true)
        }
    }

    const saveUser = () => {
        setModalVisible(true)
        firestore().collection('user').doc(email).set({
            name: name,
            email: email,
            password: password,
            phone: phone,
        }).then(res => {

            setModalVisible(false)
        }).catch(err => {
            setModalVisible(false)
            console.log(err)
        });
    }

    const signUp = () => {
        setInputCheck(true)
        setModalVisible(true)
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                firestore()
                    .collection('Users')
                    .doc(email).collection('Info')
                    .add({
                        name: name,
                        phone: phone,
                    })
                    .then(() => {
                        setModalVisible(false)
                        setUserExists(false)
                        console.log('User added!');
                    });
            })
            .catch(error => {
                setModalVisible(false)
                if (error.code === 'auth/email-already-in-use') {
                    setUserExists(true)
                }
                
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                
                console.error(error);
            });
        }
        return (
            
            <ScrollView style={style.container}>
                <KeyboardAvoidingView>

         <Text onPress={() => { console.log(email) }} style={style.headerTitle}>User Sign Up</Text>


         {userExists?<Text style={[style.inputCheckTxt,{marginTop:-50,marginBottom:50,alignSelf:'center',textAlign:'center'}]}> User Already exists</Text>:null}
            <TextInput placeholder='User Name' value={name}
                placeholderTextColor={'#c0c0c0'}
                style={style.inputStyle}
                onChangeText={(value) => {
                    setName(value)
                }} ></TextInput>

            {name.length < 3 ? inputCheck ? <Text style={style.inputCheckTxt}>Please Enter Name</Text> : null : null}

            <TextInput placeholder='User Phone Number' textContentType={'telephoneNumber'} value={phone}
                placeholderTextColor={'#c0c0c0'}
                style={style.inputStyle}
                onChangeText={(value) => {
                    setPhone(value)
                }} inputMode={'numeric'}></TextInput>

            {phone.length < 10 ? inputCheck ? <Text style={style.inputCheckTxt}>Please Enter Valid Phone Number</Text> : null : null}

            <TextInput placeholder='Flat Number' value={flat}
                placeholderTextColor={'#c0c0c0'}
                style={style.inputStyle}
                onChangeText={(value) => {
                    setFlat(value)
                }}></TextInput>
            {flat.length < 3 ? inputCheck ? <Text style={style.inputCheckTxt}>Please Enter Valid Flat No. like 317A</Text> : null : null}
            <TextInput placeholder='User Email' textContentType={'emailAddress'} value={email}
                placeholderTextColor={'#c0c0c0'}
                style={style.inputStyle}
                onChangeText={(value) => {
                    setEmail(value)
                }}></TextInput>
            {!validEmail? inputCheck ? <Text style={style.inputCheckTxt}>Please Enter valid email</Text> : null : null}

            <TextInput placeholder='Password'
                placeholderTextColor={'#c0c0c0'} value={password}
                secureTextEntry style={style.inputStyle}
                onChangeText={(value) => { setPassword(value) }}></TextInput>
            {password.length < 6 ? inputCheck ? <Text style={style.inputCheckTxt}>Please Enter 6 Character Password</Text> : null : null}

            <TouchableOpacity style={style.loginBtn} onPress={() => {
                // saveUser()
                // signUp()
                // setModalVisible(true)
                allEntryValid()
                // console.log(name.length)
            }}>

                {<Text style={style.loginTxt}>Sign Up</Text>}
            </TouchableOpacity>

            <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} textData={"Creating User"} animation={'loading'} />
                </KeyboardAvoidingView>
        </ScrollView>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red',
        // justifyContent:'center',
        alignContent: 'center',
        // alignItems: 'center',
    },
    headerTitle: {
        color: 'black',
        fontWeight: '900',
        fontSize: 28,
        padding: 10,
        marginTop: 80,
        marginBottom: 50,
        alignSelf:'center'
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
        alignSelf:'center'

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
    newACC: {
        color: '#000',
        fontWeight: '900',
        // textDecorationStyle:'double',
        textDecorationLine: 'underline',
        marginTop: 100,
        fontSize: 16
        // Color:'red'
    },
    inputCheckTxt: {
        color: 'red',
        marginTop: -10,
        marginBottom: 5,
        marginHorizontal: "6%",
        width: '88%'
    }
})