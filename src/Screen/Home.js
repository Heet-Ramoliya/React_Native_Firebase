import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.main}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        source={require('../../assets/image/homePageImage.jpg')}
        style={styles.img}>
        <Text style={styles.heading}>HELLO</Text>
        <Text style={styles.text}>Welcome to the app</Text>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signin');
            }}
            style={{
              padding: 7,
              backgroundColor: 'blue',
              borderRadius: 100,
              margin: 10,
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                textAlign: 'center',
                padding: 5,
                fontWeight: '600',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{
              padding: 7,
              backgroundColor: 'blue',
              borderRadius: 100,
              margin: 15,
              backgroundColor: 'rgba(43,5,90,255)',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                padding: 5,
                fontWeight: '600',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  heading: {
    color: 'white',
    fontSize: 50,
    paddingLeft: 20,
    marginTop: 60,
  },
  text: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
});

export default Home;
