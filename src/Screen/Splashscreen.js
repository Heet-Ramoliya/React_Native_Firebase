import {View, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      checkToken();
      navigation.replace('Home');
    }, 4000);
    return () => clearTimeout(timer);
  });

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('sessionToken');
      if (token) {
        navigation.navigate('DrawerNavigators');
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.main}>
        <Image
          source={require('../../assets/image/finalimage.png')}
          style={styles.img}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249,50,9,255)',
  },
  img: {
    height: 300,
    width: 300,
  },
});
