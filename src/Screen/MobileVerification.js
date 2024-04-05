import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MobileVerification = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');
  const [changebutton, setChangeButton] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const sendVerificationCode = async () => {
    setChangeButton(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log('confirmation ==> ', confirmation);
      setVerificationId(confirmation.verificationId);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const verifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code,
      );
      await auth()
        .signInWithCredential(credential)
        .then(() => {
          AsyncStorage.setItem('sessionToken', '12345');
          navigation.navigate('DrawerNavigators');
        })
        .catch(error => {
          console.log('error ==> ', error);
        });
      console.log('Phone authentication successful');
    } catch (error) {
      console.error('Error verifying code:', error);
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
                placeholder="Enter Phone Number"
                placeholderTextColor="black"
                style={styles.formfeild1}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
              {showOtpField == true ? (
                <TextInput
                  placeholder="Enter OTP"
                  placeholderTextColor="black"
                  style={styles.formfeild2}
                  value={code}
                  onChangeText={text => setCode(text)}
                />
              ) : null}
            </View>

            {changebutton == false ? (
              <TouchableOpacity
                onPress={() => {
                  sendVerificationCode();
                  setChangeButton(true);
                  setShowOtpField(true);
                }}
                style={{
                  padding: 4,
                  backgroundColor: 'rgba(249,50,9,255)',
                  borderRadius: 100,
                  margin: 10,
                  paddingHorizontal: 10,
                  marginTop: 18,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    textAlign: 'center',
                    padding: 7,
                    fontWeight: '600',
                  }}>
                  Send otp
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  verifyCode();
                }}
                style={{
                  padding: 4,
                  backgroundColor: 'rgba(249,50,9,255)',
                  borderRadius: 100,
                  margin: 10,
                  paddingHorizontal: 10,
                  marginTop: 18,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    textAlign: 'center',
                    padding: 7,
                    fontWeight: '600',
                  }}>
                  submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
    marginTop: 70,
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
  formfeild1: {
    margin: 8,
    padding: 10,
    backgroundColor: 'rgba(236,240,245,255)',
    fontSize: 15,
    borderRadius: 10,
    height: 55,
    fontWeight: '500',
    color: 'black',
  },
  formfeild2: {
    margin: 8,
    padding: 10,
    backgroundColor: 'rgba(236,240,245,255)',
    fontSize: 15,
    borderRadius: 10,
    height: 55,
    fontWeight: '500',
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'rgba(236,240,245,255)',
    borderRadius: 10,
    height: '18%',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginTop: 22,
  },
});

export default MobileVerification;
