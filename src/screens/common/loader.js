import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';

import LottieView from 'lottie-react-native';
export default function Loader({
  modalVisible,
  setModalVisible,
  textData,
  animation,
}) {
  const signUp = './9844-loading-40-paperplane.json';
  const upload = './27938-upload-files.json';
  const loading = './98432-loading.json';
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {animation == 'signUp' ? (
            <LottieView
              source={require(signUp)}
              style={styles.animation}
              autoPlay
            />
          ) : null}
          {animation == 'loading' ? (
            <LottieView
              source={require(loading)}
              style={styles.animation}
              autoPlay
            />
          ) : null}
          {animation == 'upload' ? (
            <LottieView
              source={require(upload)}
              style={styles.animation}
              autoPlay
            />
          ) : null}

          <Text
            style={{
              color: 'black',
              fontWeight: '800',
              fontSize: 19,
              paddingBottom: 10,
              paddingTop: -10,
              marginTop: -30,
            }}>
            {textData}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: ,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: -100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  animation: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
});
