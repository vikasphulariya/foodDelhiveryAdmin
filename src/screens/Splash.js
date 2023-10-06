import { View, Text,SafeAreaView,StyleSheet } from 'react-native'
import React,{useEffect} from 'react'

export default function Splash({navigation}) {
useEffect(() => {
  setTimeout(() => {
    navigation.navigate("Login")
  },300)

  
}, [])

  return (
    // <SafeAreaView>

    <View style={[styles.container]}>
      <Text style={styles.title}>FoodTok</Text>
    </View>
    // {/* </SafeAreaView> */}
  )
}
const styles = StyleSheet.create({
container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
},
title: {
    color: 'black',
    fontSize:34,
    color: 'red',
    fontWeight:'900'
}
})