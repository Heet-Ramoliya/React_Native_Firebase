import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MobileVerification = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const sendVerificationCode = async () => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      setShowOtpField(true);
    } catch (error) {
      console.error('Error sending verification code:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code,
      );
      const userCredential = await auth().signInWithCredential(credential);
      const userId = userCredential.user.uid;
      await AsyncStorage.setItem('UserId', userId).then(() => {
        console.log('successfully set useris in AsyncStorage');
      });
      AsyncStorage.setItem('sessionToken', '12345').then(() => {
        console.log('successfully set sessionToken in AsyncStorage');
      });
      navigation.navigate('DrawerNavigators');
    } catch (error) {
      console.error('Error verifying code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'rgba(249,50,9,255)'}}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.child}>
            <Image
              source={require('../../assets/image/logo.jpg')}
              style={styles.img}
            />
            <Text style={styles.title}>cookaroo</Text>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <TextInput
              placeholder="Enter Phone Number"
              placeholderTextColor="black"
              style={styles.formField}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
            />
            {showOtpField && (
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor="black"
                style={styles.formField}
                value={code}
                onChangeText={text => setCode(text)}
              />
            )}

            <TouchableOpacity
              onPress={showOtpField ? verifyCode : sendVerificationCode}
              style={styles.button}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>
                  {showOtpField ? 'Submit' : 'Send OTP'}
                </Text>
              )}
            </TouchableOpacity>
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
  title: {
    fontSize: 40,
    fontFamily: 'KodeMono-Bold',
    color: 'black',
    paddingTop: 13,
  },
  formField: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: 'rgba(236,240,245,255)',
    fontSize: 15,
    borderRadius: 10,
    height: 55,
    fontWeight: '500',
    color: 'black',
  },
  button: {
    padding: 12,
    backgroundColor: 'rgba(249,50,9,255)',
    borderRadius: 100,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default MobileVerification;
