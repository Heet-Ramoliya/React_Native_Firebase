import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
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
        products.push(doc.data());
      });

      setMyproduct(products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const listItemView = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          marginHorizontal: 5,
          margin: 5,
          backgroundColor: 'rgba(236,240,245,255)',
        }}>
        {item.image && (
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'cover',
              borderRadius: 20,
              margin: 20,
            }}
          />
        )}
        <View style={{flexDirection: 'column', padding: 5}}>
          <Text style={styles.text}>Name: {item.name}</Text>
          <Text style={styles.text}>Price: ₹{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={myProduct}
        renderItem={({item}) => listItemView(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 18,
  },
});

export default MyProduct;
