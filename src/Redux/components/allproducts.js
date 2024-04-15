import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToCart, removeFromCart} from '../action';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useState} from 'react';

const Allproductdata = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);

  const [cartItemsdata, setCartitemsdata] = useState({});
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
    setCartitemsdata(item);
  };

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item.id));
  };

  // useEffect(() => {
  //   if (cartItems && cartItems.length) {
  //     cartItems.forEach(element => {
  //       if (element.name === cartItemsdata.name) {
  //         setIsAdded(true);
  //       }
  //     });
  //   }
  // }, [cartItems, cartItemsdata]);

  const products = [
    {
      id: 1,
      name: 'Samsung s22 ultra',
      price: 35000,
      image:
        'https://lh3.googleusercontent.com/EqZxdzf_OWuPwPS6ERcjdbR7VaZVCvOwUi5KwP1fu8-_3NRyiT3cfFb4jImhE3do7qovhd5bHFp4N6gDi6LAUYqt53QQ4NyVU8U',
    },
    {
      id: 2,
      name: 'iphone 13',
      price: 135000,
      image:
        'https://www.mobilehub.co.ke/wp-content/uploads/2023/09/apple-iphone-11-pro-maxv-1-300x300.png',
    },
    {
      id: 3,
      name: 'OnePlus Mobile',
      price: 40000,
      image:
        'https://img.etimg.com/photo/msid-99124255,imgsize-14640/OnePlus10Pro5G.jpg',
    },
    {
      id: 4,
      name: 'Samsung s22 ultra',
      price: 35000,
      image:
        'https://lh3.googleusercontent.com/EqZxdzf_OWuPwPS6ERcjdbR7VaZVCvOwUi5KwP1fu8-_3NRyiT3cfFb4jImhE3do7qovhd5bHFp4N6gDi6LAUYqt53QQ4NyVU8U',
    },
    {
      id: 5,
      name: 'iphone 13',
      price: 135000,
      image:
        'https://www.mobilehub.co.ke/wp-content/uploads/2023/09/apple-iphone-11-pro-maxv-1-300x300.png',
    },
    {
      id: 6,
      name: 'OnePlus Mobile',
      price: 40000,
      image:
        'https://img.etimg.com/photo/msid-99124255,imgsize-14640/OnePlus10Pro5G.jpg',
    },
    {
      id: 7,
      name: 'Samsung s22 ultra',
      price: 35000,
      image:
        'https://lh3.googleusercontent.com/EqZxdzf_OWuPwPS6ERcjdbR7VaZVCvOwUi5KwP1fu8-_3NRyiT3cfFb4jImhE3do7qovhd5bHFp4N6gDi6LAUYqt53QQ4NyVU8U',
    },
    {
      id: 8,
      name: 'iphone 13',
      price: 135000,
      image:
        'https://www.mobilehub.co.ke/wp-content/uploads/2023/09/apple-iphone-11-pro-maxv-1-300x300.png',
    },
    {
      id: 9,
      name: 'OnePlus Mobile',
      price: 40000,
      image:
        'https://img.etimg.com/photo/msid-99124255,imgsize-14640/OnePlus10Pro5G.jpg',
    },
  ];

  const renderProducts = () => {
    return products.map(product => {
      const itemInCart = cartItems.some(item => item.id === product.id);

      return (
        <View key={product.id} style={styles.itemContainer}>
          <Image source={{uri: product.image}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          {itemInCart ? (
            <TouchableOpacity
              onPress={() => {
                handleRemoveFromCart(product);
              }}>
              <Icons name="delete" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handleAddToCart(product);
              }}>
              <Icon name="cart-plus" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  return <ScrollView style={styles.container}>{renderProducts()}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
    justifyContent: 'space-evenly',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 3,
  },
});

export default Allproductdata;
