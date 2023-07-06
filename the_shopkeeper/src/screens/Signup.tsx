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
import DatePicker from 'react-native-date-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Fontisto';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import MyButton from '../components/Button/MyButton';

const Signup = () => {
  const navigation: any = useNavigation();
  const [currentTab, setCurrentTab] = useState('F');
  const [passVisible, setPassVisible] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('');

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
      <Text style={styles.headerText}>Sign up</Text>

      {/* Tab Row */}
      <View style={styles.TabsRow}>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab('F');
          }}
          style={{
            flex: 1,
            borderBottomColor: currentTab == 'F' ? '#000' : '#fff',
            borderBottomWidth: currentTab ? 2 : 0,
            paddingVertical: 5,
          }}>
          <Text style={styles.tabText}>With basic details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab('S');
          }}
          style={{
            flex: 1,
            borderBottomColor: currentTab == 'S' ? '#000' : '#fff',
            borderBottomWidth: currentTab ? 2 : 0,
            paddingVertical: 5,
          }}>
          <Text style={styles.tabText}>With Social Media</Text>
        </TouchableOpacity>
      </View>

      {/* Phone Number Form */}
      {currentTab === 'F' ? (
        <View style={styles.inputContainer}>
          {/* Full name Container */}
          <View style={[styles.inputBox, {alignItems: 'center'}]}>
            <Icon
              name="person-outline"
              size={25}
              color="black"
              style={{position: 'absolute', left: 22, top: 25}}
            />
            <TextInput
              autoComplete="name"
              inputMode="text"
              placeholder="Enter your full name"
              placeholderTextColor="gray"
              keyboardType="default"
              style={styles.numberInput}
              onChangeText={text => {
                setFullName(text);
              }}
              value={fullName}
            />
          </View>

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
          <View style={[styles.inputBox]}>
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
              inputMode="text"
              secureTextEntry={passVisible}
              placeholder="Enter your password"
              style={styles.numberInput}
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
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

          {/* Date of Birth Container */}
          <View style={[styles.inputBox, {alignItems: 'center'}]}>
            <TouchableOpacity
              style={{
                height: responsiveScreenHeight(6.5),
                width: responsiveScreenWidth(85),
                alignSelf: 'center',
                borderBottomWidth: 2,
                borderColor: 'gray',
                marginVertical: 10,
                paddingHorizontal: 40,
                // backgroundColor:'red'
              }}
              onPress={() => {
                setOpen(true);
              }}
              //   value={userEmail}
            >
              <MIcon
                name="calendar-today"
                size={23}
                color="black"
                style={{position: 'absolute', left: 10, top: 18}}
              />
              {dateSelected === false ? (
                <Text
                  style={{
                    paddingTop: 22,
                    color: 'gray',
                    fontSize: responsiveFontSize(1.55),
                  }}>
                  Enter your Date of Birth
                </Text>
              ) : (
                <Text
                  style={{
                    paddingTop: 22,
                    color: 'black',
                    fontSize: responsiveFontSize(1.55),
                  }}>
                  {String(date).substring(3, 16)}
                </Text>
              )}
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              minimumDate={new Date('1900-01-01')}
              maximumDate={new Date('2021-01-01')}
              // androidVariant='iosClone'
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setDateSelected(true);
              }}
              onCancel={() => {
                setOpen(false);
                setDateSelected(false);
              }}
              date={date}
            />
          </View>

          {/* Gender Selection */}
          <View
            style={[
              styles.inputBox,
              {
                alignItems: 'center',
                width: responsiveScreenWidth(85),
                height: responsiveScreenHeight(6.5),
                marginVertical:10,
              },
            ]}>
            <TouchableOpacity
              onPress={()=>{
                setGender('male');
              }}
              style={{
                height: responsiveScreenHeight(6.2),
                width: '30%',
                backgroundColor: gender === 'male' ? '#666' : '#fff',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius:12,
                marginHorizontal:10
              }}>
              <FIcon name="male" size={25} color="black" style={{}} />
              <Text style={{fontSize: responsiveFontSize(1.6),fontWeight: '400',}}>male</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              setGender('female');
            }}
              style={{
                height: responsiveScreenHeight(6.2),
                width: '30%',
                backgroundColor: gender === 'female' ? '#666' : '#fff',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius:12,
                marginHorizontal:10
              }}>
              <FIcon name="female" size={25} color="black" style={{}} />
              <Text style={{fontSize: responsiveFontSize(1.6),fontWeight: '400',}}>male</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              setGender('other');
            }}
              style={{
                height: responsiveScreenHeight(6.2),
                width: '30%',
                backgroundColor: gender === 'other' ? '#666' : '#fff',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius:12,
                marginHorizontal:10
              }}>
              <Icon name="transgender-outline" size={25} color="black" style={{}} />
              <Text style={{fontSize: responsiveFontSize(1.6),fontWeight: '400',}}>other</Text>
            </TouchableOpacity>
          </View>

          {/* Text container Row - to Login */}
          <View style={styles.textContainer}>
            {/* Create account Statement */}
            <View style={styles.textWrapper}>
              <Text style={styles.forgetText1}>Already have an account, </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.forgetText2}>Login it!</Text>
              </TouchableOpacity>
            </View>

            {/* Forget Container
              <View style={styles.textWrapper}>
                <Text style={styles.forgetText1}>Forgot your password? </Text>
                <TouchableOpacity>
                  <Text style={styles.forgetText2}>Reset it!</Text>
                </TouchableOpacity>
              </View> */}
          </View>

          {/* Signup Button */}
          <MyButton
            backgroundColor={'#8585f5'}
            title="Sigup"
            iconExists={false}
            iconName="null"
            iconColor="null"
          />
        </View>
      ) : currentTab === 'S' ? (
        <View style={[styles.inputContainer,{marginTop:70}]}>

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
            // iconPackage='FontAwesome5Pro'
          />
          
          {/* Github Sign In Button */}
          <MyButton
            backgroundColor={'#333444'}
            title="Continue with Github"
            iconExists={true}
            iconName="github"
            iconColor="#fff"
            // iconPackage='FontAwesome'
          />
          
          {/* Twitter Sign In Button */}
          <MyButton
            backgroundColor={'skyblue'}
            title="Continue with Twitter"
            iconExists={true}
            iconName="twitter"
            iconColor="#fff"
            // iconPackage='FontAwesome'
          />

          {/* Guest Entry */}
          {/* <TouchableOpacity>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                fontWeight: '600',
                color: '#1aa260',
                alignSelf: 'center',
              }}>
              Continue as guest
            </Text>
          </TouchableOpacity> */}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Signup;

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
    marginTop: 40,
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
  textContainer: {
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
