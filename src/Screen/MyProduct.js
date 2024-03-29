import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {db} from '../Firebase/Config';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProduct = () => {
  const [myProduct, setMyproduct] = useState([]);
  const [storedUserId, setStoredUserId] = useState('');

  useEffect(() => {
    getDatas();
  }, [storedUserId, myProduct]);

  useFocusEffect(
    React.useCallback(() => {
      getUserIdFromStorage();
    }, []),
  );

  // console.log('myProduct ==> ', myProduct);

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

  // const getData = async () => {
  //   const data = await getDocs(
  //     query(collection(db, 'Products'), where('userid', '==', storedUserId)),
  //   );

  //   data.forEach(doc => {
  //     console.log('doc ==> ', doc.data());
  //     setMyproduct(data);
  //   });
  // };

  const getDatas = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'Products'), where('userid', '==', storedUserId)),
      );

      const products = [];
      querySnapshot.forEach(doc => {
        // Collect each document's data into the products array
        products.push(doc.data());
      });

      // Set the state once with the collected products array
      setMyproduct(products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      <Text>MyProduct</Text>
    </View>
  );
};

export default MyProduct;
