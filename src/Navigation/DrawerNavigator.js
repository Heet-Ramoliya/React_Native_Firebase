import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, TouchableOpacity} from 'react-native';
import TabNavigator from './TabNavigator';
import AddItems from '../Screen/AddItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import MyOrders from '../Screen/MyOrders';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const Drawer = createDrawerNavigator();

const DrawerNavigators = ({navigation}) => {
  const [user, setUser] = useState(null);

  const route = useRoute();
  const email = route.params?.email;
  const signout = async () => {
    try {
      await AsyncStorage.removeItem('sessionToken')
        .then(() => {
          console.log('successfully sessionToken remove!');
        })
        .catch(error => {
          console.log('Error in remove sessionToken: ', error);
        });
      await AsyncStorage.removeItem('UserId')
        .then(() => {
          console.log('successfully set UserId remove!');
        })
        .catch(error => {
          console.log('Error in remove userID: ', error);
        });

      try {
        await GoogleSignin.signOut()
          .then(() => {
            AsyncStorage.removeItem('sessionToken');
          })
          .catch(error => {
            console.log(error);
          });
        setUser(null);
      } catch (error) {
        console.error(error);
      }
      // try {
      //   await LoginManager.logOut()
      //     .then(() => {
      //       AsyncStorage.removeItem('sessionToken');
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
      //   setUser(null);
      // } catch (error) {
      //   console.error(error);
      // }
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Error removing AsyncStorage item:', error);
    }
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          title: 'Products',
          headerRight: () => (
            <>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddToCart');
                  }}>
                  <Icon
                    name="shopping-cart"
                    size={30}
                    color="black"
                    style={{padding: 12}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={signout}>
                  <Icon
                    name="sign-out"
                    size={30}
                    color="black"
                    style={{padding: 12}}
                  />
                </TouchableOpacity>
              </View>
            </>
          ),
        }}
      />
      <Drawer.Screen name="AddItems" component={AddItems} />
      <Drawer.Screen name="MyOrders" component={MyOrders} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigators;
