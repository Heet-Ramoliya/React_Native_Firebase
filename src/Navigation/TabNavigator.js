import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllProducts from '../Screen/AllProducts';
import MyProduct from '../Screen/MyProduct';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AllProducts"
        component={AllProducts}
        options={{title: 'All Products'}}
      />
      <Tab.Screen
        name="myProduct"
        component={MyProduct}
        options={{title: 'My Product'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
