import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Screen/Splashscreen';
import SignUp from '../Screen/Signup';
import Signin from '../Screen/Signin';
import Home from '../Screen/Home';
import Forgot from '../Screen/Forgot';
import DrawerNavigators from './DrawerNavigator';
import TabNavigator from './TabNavigator';
import AllProducts from '../Screen/AllProducts';
import MyProduct from '../Screen/MyProduct';
import AddItems from '../Screen/AddItems';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigators"
          component={DrawerNavigators}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllProducts"
          component={AllProducts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyProduct"
          component={MyProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddItems"
          component={AddItems}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;