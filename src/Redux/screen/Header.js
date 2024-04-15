import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={{backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{justifyContent: 'center', padding: 10}}>
          <Text style={{color: 'white', fontSize: 18}}>Header</Text>
        </View>
        <View style={{paddingRight: 7}}>
          <TouchableOpacity>
            <Icon
              name="shopping-cart"
              size={30}
              color="white"
              style={{padding: 12}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
