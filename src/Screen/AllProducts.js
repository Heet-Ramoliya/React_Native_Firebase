import React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {View, Text, Image, StyleSheet, Alert, StatusBar} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {db} from '../Firebase/Config';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import messaging from '@react-native-firebase/messaging';

const AllProducts = ({navigation}) => {
  const [allProduct, setAllproduct] = useState([]);
  const [storedUserId, setStoredUserId] = useState('');
  const [cartitems, setCartitems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState({});
  const [quantitycount, setQuantitycount] = useState('');

  useEffect(() => {
    getDeviceToken();
  }, [cartitems]);

  useFocusEffect(
    React.useCallback(() => {
      getUserIdFromStorage();
      getData();
    }, []),
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    let DeviceToken = await messaging().getToken();
    console.log('DeviceToken ==> ', DeviceToken);
  };

  const getData = async () => {
    await getDocs(collection(db, 'Products')).then(docSnap => {
      let products = [];
      docSnap.forEach(doc => {
        products.push({...doc.data(), id: doc.id});
        setAllproduct(products);
      });
    });
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

  const increase = async (id, item) => {
    setLoading(true);

    const updatedCount = (count[id] || 0) + 1;
    setCount(prevCounts => ({...prevCounts, [id]: updatedCount}));

    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'CartItems'), where('userid', '==', storedUserId)),
      );
      const fetchedCartItems = [];
      querySnapshot.forEach(doc => {
        fetchedCartItems.push({...doc.data(), id: doc.id});
      });

      setCartitems(fetchedCartItems);

      const existingCartItem = fetchedCartItems.find(
        cartItem => cartItem.productid === item.id,
      );

      if (existingCartItem) {
        const updatedCartItems = [...fetchedCartItems];
        const existingCartItemIndex = updatedCartItems.findIndex(
          cartItem => cartItem.productid === item.id,
        );
        updatedCartItems[existingCartItemIndex].quantity = updatedCount;
        setCartitems(updatedCartItems);

        await updateDoc(doc(db, 'CartItems', existingCartItem.id), {
          quantity: updatedCount,
        });
        console.log('Product quantity updated successfully!');
      } else {
        await addDoc(collection(db, 'CartItems'), {
          userid: storedUserId,
          productid: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: updatedCount,
        });
        console.log('Product inserted into cart successfully!');
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    }

    setLoading(false);
  };

  const decrease = async (id, item) => {
    const updatedCount = Math.max((count[id] || 0) - 1, 0);
    setCount(prevCounts => ({...prevCounts, [id]: updatedCount}));

    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'CartItems'), where('userid', '==', storedUserId)),
      );
      const fetchedCartItems = [];
      querySnapshot.forEach(doc => {
        fetchedCartItems.push({...doc.data(), id: doc.id});
      });

      const existingCartItem = fetchedCartItems.find(
        cartItem => cartItem.productid === item.id,
      );

      if (existingCartItem) {
        if (updatedCount === 0) {
          const updatedCartItems = fetchedCartItems.filter(
            cartItem => cartItem.productid !== item.id,
          );
          setCartitems(updatedCartItems);
          await deleteDoc(doc(db, 'CartItems', existingCartItem.id));
          console.log('Product removed from cart successfully!');
        } else {
          const updatedCartItems = fetchedCartItems.map(cartItem =>
            cartItem.productid === item.id
              ? {...cartItem, quantity: updatedCount}
              : cartItem,
          );
          setCartitems(updatedCartItems);
          await updateDoc(doc(db, 'CartItems', existingCartItem.id), {
            quantity: updatedCount,
          });
          console.log('Product quantity updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="black" />
      <View>
        <FlatList
          data={allProduct}
          renderItem={({item}) => (
            <>
              <View>
                <View style={styles.container}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 120,
                        width: 120,
                        borderRadius: 20,
                      }}
                    />
                  </View>
                  <View style={styles.text_container}>
                    <Text style={styles.pname}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 5,
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => decrease(item.id, item)}
                        style={styles.button}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            padding: 5,
                            fontSize: 18,
                          }}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 50,
                          width: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 25,
                          marginLeft: 7,
                          marginRight: 7,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            fontSize: 18,
                          }}>
                          {count[item.id] || 0}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          increase(item.id, item);
                        }}
                        style={styles.button}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            padding: 5,
                            fontSize: 18,
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 10,
  },
  text_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: '50%',
    marginLeft: 20,
  },
  pname: {
    color: 'black',
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 5,
  },
  button: {
    height: 50,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 0.5,
    backgroundColor: 'rgba(236,240,245,255)',
  },
});

export default AllProducts;
