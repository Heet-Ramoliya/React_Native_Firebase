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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState(true);
  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '52184306944-30pfsdm4stb7lfdb3hl10uc06ui114hl.apps.googleusercontent.com',
    });
  }, []);

  const showPasswordonInputField = () => {
    setShowpassword(!showpassword);
  };

  const navigateForget = () => {
    navigation.navigate('Forgot');
  };

  const FinalForgatePassword = () => {
    navigateForget();
  };

  const Googlelogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const id = userInfo.user.id;
      console.log('Google userInfo ==> ', userInfo);
      console.log('successfully login using google!!');
      await AsyncStorage.setItem('UserId', id).then(() => {
        console.log('Successfully set UserId in using Google signin!');
      });
      AsyncStorage.setItem('sessionToken', '12345');
      navigation.navigate('DrawerNavigators');
      setUserinfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log('else part');
      }
    }
  };

  const FacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      await auth()
        .signInWithCredential(facebookCredential)
        .then(userCredential => {
          const id = userCredential.user.uid;
          console.log('Successfully logged in with Facebook');
          AsyncStorage.setItem('UserId', id)
            .then(() => {
              console.log('successfully set UserId!');
            })
            .catch(error => {
              console.log('Error in setting userID: ', error);
            });
          AsyncStorage.setItem('sessionToken', '12345');
          navigation.navigate('DrawerNavigators');
        })
        .catch(error => {
          console.log('Error:', error);
        });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSignin = () => {
    if (email != '' && password != '') {
      try {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            const id = res.user.uid;
            const emailname = res.user.email;
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
                paddingRight: 8,
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
              style={{width: '65%', paddingHorizontal: 10, marginTop: 5}}>
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
                  width: '100%',
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
        <GoogleSigninButton
          style={{
            paddingHorizontal: 10,
            width: '90%',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            borderRadius: 30,
          }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            Googlelogin();
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            FacebookLogin();
          }}>
          <View style={styles.content}>
            <Icon
              name="facebook"
              size={20}
              color="#ffffff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Sign in with Facebook</Text>
          </View>
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
    marginTop: 22,
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
    fontWeight: '500',
    color: 'black',
  },
  button: {
    paddingHorizontal: 10,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,
  },
});

export default Signin;
