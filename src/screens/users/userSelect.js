import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function UserSelect({navigation}) {

  
  const btnPress=(dest)=>{
    navigation.navigate(dest)
  }
  return (
    <View style={{ alignContent: 'center', alignItems: 'center', verticalAlign: 'middle', justifyContent: 'center', flex: 1 }}>
      <TouchableOpacity onPress={()=>{
        btnPress('Login');
      }}>
        <View style={styles.buttons}>
          <Image source={require('./icons/admin.png')} />
          <Text style={styles.text}>Admin Login</Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>{
        btnPress('userLogin')
      }}>

        <View style={styles.buttons}>
          <Image source={require('./icons/team.png')} />
          <Text style={styles.text}>User Login</Text>
        </View>
      </TouchableOpacity>
{/*       
      <TouchableOpacity onPress={()=>{
        btnPress('Emp')
      }}>

        <View style={styles.buttons}>
          <Image source={require('./icons/team.png')} />
          <Text style={styles.text}>User Login</Text>
        </View>
      </TouchableOpacity> */}

      {/* <Text>User Login</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    padding: 5,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: 'orange',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal:15
  },
  text: {
    fontWeight: '900',
    fontSize: 20,
    color: 'black',
  }
})