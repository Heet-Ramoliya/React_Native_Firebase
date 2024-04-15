import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from './screen/Header';
import Product from './screen/Product';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const app = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <KeyboardAwareScrollView>
        <Product />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default app;
