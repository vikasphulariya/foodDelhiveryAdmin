import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import Main from './tabs/Main'
export default function Home() {
  return (
    <View>
      <Main
    />
    <Text style={{color:'black'}}>home</Text>
    
    </View>
  )
}

 const styles=StyleSheet.create({
    bottomView:{
        width: '100%',
        height:60,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        backgroundColor:'#fff',
      },
      bottomTab:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'20%'
      },
      bottomTabIcon:{
        width:38,
        height:38,
      }
 })