import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import app from './src/Redux/app';
import Allproductdata from './src/Redux/components/allproducts';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in the Kill mode', remoteMessage);
});

AppRegistry.registerComponent(appName, () => app);
