import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import Apps from './src/Redux/app';
import {Provider} from 'react-redux';
import store from './src/Redux/store';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in the Kill mode', remoteMessage);
});

const AppRedux = () => (
  <Provider store={store}>
    <Apps />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);

// AppRegistry.registerComponent(appName, () => App);
