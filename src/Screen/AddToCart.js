import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {db} from '../Firebase/Config';
import {async} from '@firebase/util';

const AddToCart = ({navigation}) => {
  const [cartitems, setCartitems] = useState([]);
  const [storedUserId, setStoredUserId] = useState('');

  useEffect(() => {
    getUserIdFromStorage();
    getCartItems();
  }, [storedUserId, cartitems]);

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

  const getCartItems = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'CartItems'), where('userid', '==', storedUserId)),
      );

      const products = [];
      querySnapshot.forEach(doc => {
        products.push({...doc.data(), id: doc.id});
      });

      setCartitems(products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteUser = async id => {
    try {
      await deleteDoc(doc(db, 'CartItems', id)).then(() => {
        console.log('successfully delete product');
      });
    } catch (error) {
      console.log('error ==> ', error);
    }
  };

  let total = 0;
  cartitems.forEach(item => {
    total += item.price * item.quantity;
  });

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <View>
      {cartitems.length == 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 18, textAlign: 'center'}}>
            Cart is empty
          </Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <FlatList
              data={cartitems}
              renderItem={({item}) => (
                <View>
                  <View style={styles.itemContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.text}>Name: {item.name}</Text>
                      <Text style={styles.text}>Price: ₹{item.price}</Text>
                      <Text style={styles.text}>Quantity: {item.quantity}</Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => deleteUser(item.id)}>
                        <Icon name="delete" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Invoice');
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: '500',
                    padding: 8,
                  }}>
                  CheckOut
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'rgba(236,240,245,255)',
    justifyContent: 'space-evenly',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 20,
    margin: 20,
  },
  itemInfo: {
    flexDirection: 'column',
    padding: 5,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  btn: {
    backgroundColor: 'black',
    margin: 5,
    padding: 5,
    borderRadius: 100,
  },
});

export default AddToCart;
