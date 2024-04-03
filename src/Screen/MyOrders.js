import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../Firebase/Config';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
} from 'firebase/firestore';

const MyOrders = () => {
  const [menulist, setMenulist] = useState([]);
  const [storedUserId, setStoredUserId] = useState('');

  useEffect(() => {
    getUserIdFromStorage();
    getMyOrders();
  }, [storedUserId, menulist]);

  const getMyOrders = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'Myorders'), where('userid', '==', storedUserId)),
      );

      const products = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (doc.id) {
          data.id = doc.id;
        }
        products.push(data);
      });

      setMenulist(products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
          <Text style={styles.text}>quantity: {item.quantity}</Text>
          <Text style={styles.text}>Price: ₹{item.price}</Text>
          <Text style={styles.text}>Purches Date: {item.date}</Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            Total: {item.quantity * item.price}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={menulist}
        renderItem={({item}) => listItemView(item)}
        keyExtractor={(item, index) => item.id.toString()}
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

export default MyOrders;
