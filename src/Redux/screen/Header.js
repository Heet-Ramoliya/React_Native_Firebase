import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

const Header = () => {
  const cartData = useSelector(state => state.reducer);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setCartItems(cartData.length);
    }
    console.log('cartData ==> ', cartData);
  }, [cartData]);

  return (
    <>
      <StatusBar backgroundColor="black" />
      <View style={{backgroundColor: 'black'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{justifyContent: 'center', padding: 10}}>
            <Text style={{color: 'white', fontSize: 18}}>Header</Text>
          </View>
          <View style={{paddingRight: 7}}>
            <TouchableOpacity onPress={() => {}}>
              <Icon
                name="shopping-cart"
                size={30}
                color="white"
                style={{padding: 12}}
              />
              {cartItems > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    minWidth: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}>
                  <Text style={{color: 'white', fontSize: 12}}>
                    {cartItems}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;
