import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState(true);

  const showPasswordonInputField = () => {
    setShowpassword(!showpassword);
  };

  const navigateForget = () => {
    navigation.navigate('Forgot');
  };

  const FinalForgatePassword = () => {
    navigateForget();
  };

  const handleSignin = () => {
    if (email != '' && password != '') {
      try {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            const id = res.user.uid;
            const emailname = res.user.email;
            console.log('email ==>', emailname);
            AsyncStorage.setItem('UserId', id)
              .then(() => {
                console.log('successfully set UserId!');
              })
              .catch(error => {
                console.log('Error  in setting userID: ', error);
              });
            AsyncStorage.setItem('sessionToken', '12345');
            navigation.navigate('DrawerNavigators', {
              email: emailname,
            });
            ToastAndroid.show('User signin successfully!', ToastAndroid.SHORT);
          })
          .catch(error => {
            ToastAndroid.show('Invalid email or password!', ToastAndroid.SHORT);
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      ToastAndroid.show(
        'Email and Password fields are empty!',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{flexGrow: 1, backgroundColor: 'rgba(249,50,9,255)'}}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.child}>
            <Image
              source={require('../../assets/image/logo.jpg')}
              style={styles.img}
            />
            <Text
              style={{
                fontSize: 40,
                fontFamily: 'KodeMono-Bold',
                color: 'black',
                paddingTop: 13,
              }}>
              cookaroo
            </Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <View style={{marginTop: 20}}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                style={styles.formfeild}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.formfeild}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={showpassword}
              />
            </View>

            <TouchableOpacity
              onPress={showPasswordonInputField}
              style={{width: '60%', paddingHorizontal: 10, marginTop: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 25,
                  alignItems: 'center',
                }}>
                <Icon name="eye" size={18} style={{padding: 5}} color="black" />
                <Text
                  style={{
                    padding: 5,
                    color: 'black',
                    fontSize: 15,
                    fontWeight: '400',
                  }}>
                  {showpassword ? 'Show' : 'Hide'} Password
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleSignin();
              }}
              style={{
                padding: 4,
                backgroundColor: 'rgba(249,50,9,255)',
                borderRadius: 100,
                margin: 10,
                marginTop: 35,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                  padding: 7,
                  fontWeight: '600',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 4,
                  marginTop: 10,
                  width: '60%',
                  borderRadius: 80,
                  backgroundColor: 'rgba(236,240,245,255)',
                }}
                onPress={FinalForgatePassword}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    padding: 2,
                  }}>
                  Forgate Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{
            paddingHorizontal: 10,
            backgroundColor: 'white',
            width: '90%',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            marginTop: 5,
            borderRadius: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              textAlign: 'center',
              padding: 10,
              fontWeight: '500',
            }}>
            Register a new account here!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MobileVerification');
          }}
          style={{
            paddingHorizontal: 10,
            backgroundColor: 'white',
            width: '90%',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            borderRadius: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              textAlign: 'center',
              padding: 10,
              fontWeight: '500',
            }}>
            Login with Mobile Number
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(249,50,9,255)',
  },
  container: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 35,
    borderRadius: 12,
    paddingBottom: 16,
  },
  img: {
    height: 65,
    width: 65,
    margin: 10,
    borderRadius: 100,
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  formfeild: {
    margin: 8,
    padding: 10,
    backgroundColor: 'rgba(236,240,245,255)',
    fontSize: 15,
    borderRadius: 10,
    height: 55,
    fontWeight: '500',
    color: 'black',
  },
});

export default Signin;
