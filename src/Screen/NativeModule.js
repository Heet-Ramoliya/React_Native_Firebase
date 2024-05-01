import {View, Text} from 'react-native';
import React from 'react';
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;

CalendarModule.createCalandarEvent(res => console.log(res));

const NativeModule = () => {
  return (
    <View>
      <Text>NativeModule</Text>
    </View>
  );
};

export default NativeModule;
