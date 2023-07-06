import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import MyButton from '../components/Button/MyButton';

const Login = () => {
  const navigation:any = useNavigation();
  const [currentTab, setCurrentTab] = useState('P');
  const [passVisible, setPassVisible] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FAIcon
          name="caret-left"
          size={35}
          color="#000"
          style={styles.backLogo}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Log in</Text>

      {/* Tab Row */}
      <View style={styles.TabsRow}>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab('P');
          }}
          style={{
            flex: 1,
            borderBottomColor: currentTab == 'P' ? '#000' : '#fff',
            borderBottomWidth: currentTab ? 2 : 0,
            paddingVertical: 5,
          }}>
          <Text style={styles.tabText}>Phone Number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab('E');
          }}
          style={{
            flex: 1,
            borderBottomColor: currentTab == 'E' ? '#000' : '#fff',
            borderBottomWidth: currentTab ? 2 : 0,
            paddingVertical: 5,
          }}>
          <Text style={styles.tabText}>Email</Text>
        </TouchableOpacity>
      </View>

      {/* Phone Number Form */}
      {currentTab === 'P' ? (
        <View style={styles.inputContainer}>
          {/* Phone Number Container */}
          <View style={[styles.inputBox, {alignItems: 'center'}]}>
            <Icon
              name="call-outline"
              size={25}
              color="black"
              style={{position: 'absolute', left: 22, top: 25}}
            />
            <TextInput
              maxLength={10}
              autoComplete="cc-number"
              inputMode="numeric"
              placeholder="Enter your phone number"
              placeholderTextColor="gray"
              keyboardType="number-pad"
              style={styles.numberInput}
              onChangeText={num => {
                setPhoneNumber(num);
              }}
              value={phoneNumber}
            />
          </View>

          {/* Password Container */}
          <View style={styles.inputBox}>
            {passVisible ? (
              <MIcon
                name="lock-outline"
                size={25}
                color="black"
                style={{position: 'absolute', left: 22, top: 24}}
              />
            ) : (
              <MIcon
                name="lock-open"
                size={25}
                color="black"
                style={{position: 'absolute', left: 22, top: 24}}
              />
            )}
            <TextInput
              // autoComplete="cc-number"
              inputMode="text"
              // keyboardType='visible-password'
              secureTextEntry={passVisible}
              placeholder="Enter your password"
              style={styles.numberInput}
            />
            <TouchableOpacity
              onPress={() => {
                setPassVisible(!passVisible);
              }}>
              {passVisible ? (
                <Icon
                  name="eye-outline"
                  size={30}
                  color="black"
                  style={{position: 'absolute', top: 22, right: 22}}
                />
              ) : (
                <Icon
                  name="eye-off-outline"
                  size={30}
                  color="black"
                  style={{position: 'absolute', top: 22, right: 22}}
                />
              )}
            </TouchableOpacity>
          </View>
          
          {/* Text container Row - to Sigup & reset password */}
          <View
            style={styles.textContainer}>
            {/* Create account Statement */}
            <View
              style={styles.textWrapper}>
              <Text style={styles.forgetText1}>Don't have account, </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text style={styles.forgetText2}>Create it!</Text>
              </TouchableOpacity>
            </View>

            {/* Forget Container */}
            <View style={styles.textWrapper}>
              <Text style={styles.forgetText1}>Forgot your password? </Text>
              <TouchableOpacity>
                <Text style={styles.forgetText2}>Reset it!</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <MyButton
            backgroundColor={'#8585f5'}
            title="Login"
            iconExists={false}
            iconName="null"
            iconColor="null"
          />

          {/* Or Statement */}
          <View style={styles.orStatement}>
            <Text style={styles.orText}>Or</Text>
          </View>

          {/* Google Sign In Button */}
          <MyButton
            backgroundColor={'#1aa260'}
            title="Continue with Google"
            iconExists={true}
            iconName="google"
            iconColor="#fff"
          />

          {/* Google Sign In Button */}
          <MyButton
            backgroundColor={'#111e15'}
            title="Continue with Apple"
            iconExists={true}
            iconName="apple"
            iconColor="#fff"
          />

          {/* Google Sign In Button */}
          <MyButton
            backgroundColor={'#0d65af'}
            title="Continue with Facebook"
            iconExists={true}
            iconName="facebook-f"
            iconColor="#fff"
          />

          {/* Guest Entry */}
          <TouchableOpacity>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                fontWeight: '600',
                color: '#1aa260',
                alignSelf: 'center',
              }}>
              Continue as guest
            </Text>
          </TouchableOpacity>
        </View>
      ) : currentTab === 'E' ? (
        <View style={styles.inputContainer}>
          {/* Email Container */}
          <View style={[styles.inputBox, {alignItems: 'center'}]}>
            <MIcon
              name="mail-outline"
              size={25}
              color="black"
              style={{position: 'absolute', left: 22, top: 25}}
            />
            <TextInput
              autoComplete="email"
              inputMode="email"
              placeholder="Enter your email address"
              placeholderTextColor="gray"
              style={styles.numberInput}
              onChangeText={email => {
                setUserEmail(email);
              }}
              value={userEmail}
            />
          </View>

          {/* Password Container */}
          <View style={styles.inputBox}>
            {passVisible ? (
              <MIcon
                name="lock-outline"
                size={25}
                color="black"
                style={{position: 'absolute', left: 22, top: 24}}
              />
            ) : (
              <MIcon
                name="lock-open"
                size={25}
                color="black"
                style={{position: 'absolute', left: 22, top: 24}}
              />
            )}
            <TextInput
              // autoComplete="cc-number"
              inputMode="text"
              // keyboardType='visible-password'
              secureTextEntry={passVisible}
              placeholder="Enter your password"
              style={styles.numberInput}
            />
            <TouchableOpacity
              onPress={() => {
                setPassVisible(!passVisible);
              }}>
              {passVisible ? (
                <Icon
                  name="eye-outline"
                  size={30}
                  color="black"
                  style={{position: 'absolute', top: 22, right: 22}}
                />
              ) : (
                <Icon
                  name="eye-off-outline"
                  size={30}
                  color="black"
                  style={{position: 'absolute', top: 22, right: 22}}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Text container Row - to Sigup & reset password */}
          <View
            style={styles.textContainer}>

            {/* Create account Statement */}
            <View
              style={styles.textWrapper}
              >
              <Text style={styles.forgetText1}>Don't have account, </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text style={styles.forgetText2}>Create it!</Text>
              </TouchableOpacity>
            </View>

            {/* Forget Container */}
            <View style={styles.textWrapper}>
              <Text style={styles.forgetText1}>Forgot your password? </Text>
              <TouchableOpacity>
                <Text style={styles.forgetText2}>Reset it!</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <MyButton
            backgroundColor={'#8585f5'}
            title="Login"
            iconExists={false}
            iconName="null"
            iconColor="null"
          />

          {/* Or Statement */}
          <View style={styles.orStatement}>
            <Text style={styles.orText}>Or</Text>
          </View>

          {/* Google Sign In Button */}
          <MyButton
            backgroundColor={'#1aa260'}
            title="Continue with Google"
            iconExists={true}
            iconName="google"
            iconColor="#fff"
          />

          {/* Google Sign In Button */}
          <MyButton
            backgroundColor={'#111e15'}
            title="Continue with Apple"
            iconExists={true}
            iconName="apple"
            iconColor="#fff"
          />

          {/* Google Sign In Button */}
          <MyButton
            backgroundColor={'#0d65af'}
            title="Continue with Facebook"
            iconExists={true}
            iconName="facebook-f"
            iconColor="#fff"
          />

          {/* Guest Entry */}
          <TouchableOpacity>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                fontWeight: '600',
                color: '#1aa260',
                alignSelf: 'center',
              }}>
              Continue as guest
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: responsiveScreenHeight(100),
    backgroundColor: '#fff',
  },
  backLogo: {
    marginTop: 35,
    marginLeft: 25,
  },
  headerText: {
    fontSize: responsiveFontSize(4.5),
    color: '#000',
    fontWeight: '600',
    marginLeft: 25,
    marginBottom: 10,
  },
  TabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: 'gray',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 50,
  },
  inputBox: {
    flexDirection: 'row',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  numberInput: {
    height: responsiveScreenHeight(6.5),
    width: responsiveScreenWidth(85),
    alignSelf: 'center',
    // flex:1,
    borderBottomWidth: 2,
    borderColor: 'gray',
    // borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  textContainer:{
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
    width: responsiveScreenWidth(85),
    alignSelf: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
  },
  forgetText1: {
    fontSize: responsiveFontSize(1.38),
    fontWeight: '500',
    color: 'gray',
  },
  forgetText2: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: 'black',
  },
  orStatement: {
    height: 1,
    backgroundColor: '#666',
    width: responsiveScreenWidth(70),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  orText: {
    fontSize: responsiveFontSize(1.5),
    color: 'gray',
    fontWeight: '500',
    height: 20,
    width: 40,
    textAlign: 'center',
    backgroundColor: '#fff',
    textAlignVertical: 'center',
  },
});
