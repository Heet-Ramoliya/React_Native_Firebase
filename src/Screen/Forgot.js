import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [editEmail, setEditEmail] = useState(true);

  const sendOTP = () => {
    setShowOtpField(true);
    setEditEmail(false);
  };

  //   const ForgatePassword = async () => {
  //     try {
  //       await AsyncStorage.removeItem('userData');
  //       await AsyncStorage.removeItem('sessionToken');
  //       navigateLogin();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const navigateLogin = () => {
    navigation.navigate('SignupPage');
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
          <View style={styles.header}>
            <Icon
              name="info-circle"
              size={30}
              color="rgba(249,50,9,255)"
              style={{alignItems: 'center', padding: 10}}
            />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                textAlign: 'left',
                flexWrap: 'wrap',
                flex: 1,
              }}>
              To reset your password, provide your email to receive a code
            </Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <View style={{marginTop: 20}}>
              <TextInput
                editable={editEmail}
                placeholder="Email"
                placeholderTextColor="black"
                style={styles.formfeild1}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              {showOtpField && (
                <TextInput
                  placeholder="OTP"
                  placeholderTextColor="black"
                  style={styles.formfeild2}
                  value={otp}
                  onChangeText={text => setOtp(text)}
                />
              )}
            </View>

            <TouchableOpacity
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
                {editEmail == true ? 'Send my code' : 'Submit'}
              </Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', marginBottom: 25}}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: 'rgba(236,240,245,255)',
                  width: '75%',
                  borderRadius: 30,
                  marginTop: 10,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 17,
                    textAlign: 'center',
                    padding: 8,
                    fontWeight: '500',
                  }}>
                  I don't have an email address
                </Text>
              </TouchableOpacity>
            </View>
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

export default Forgot;
