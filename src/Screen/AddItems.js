import {View, Text, TextInput, StyleSheet, ToastAndroid} from 'react-native';
import {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Imagepicker from '../component/ImagePicker';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import {db} from '../Firebase/Config';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

const AddItems = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [storedUserId, setStoredUserId] = useState('');

  useEffect(() => {
    console.log('storedUserId ==> ', storedUserId);
  }, [storedUserId]);

  const handleSubmit = async () => {
    addDoc(collection(db, 'Products'), {
      userid: storedUserId,
      name: name,
      price: price,
      image: imgURL,
    })
      .then(() => {
        console.log('data insert successfully!');
      })
      .catch(error => {
        console.log('error ==> ', error);
      });
    navigation.navigate('myProduct');
    setName('');
    setPrice('');
    setImgURL('');
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserIdFromStorage();
    }, []),
  );

  const getUserIdFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('UserId');
      if (id !== null) {
        setStoredUserId(id);
      }
    } catch (error) {
      console.error('Error retrieving userId from AsyncStorage:', error);
    }
  };

  const handleImageSelect = imageUri => {
    setImgURL(imageUri);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      }}>
      <View>
        <TextInput
          style={styles.formfeild}
          placeholder="name"
          placeholderTextColor="black"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View>
        <TextInput
          style={styles.formfeild}
          placeholder="price"
          placeholderTextColor="black"
          value={price}
          onChangeText={text => setPrice(text)}
        />
      </View>
      <Imagepicker onImageSelect={handleImageSelect} />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          paddingHorizontal: 10,
          backgroundColor: 'black',
          width: '90%',
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          marginTop: 5,
          borderRadius: 30,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            textAlign: 'center',
            padding: 10,
            fontWeight: '500',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formfeild: {
    margin: 8,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    height: 55,
    fontWeight: '500',
    color: 'black',
    borderWidth: 0.5,
  },
});

export default AddItems;
