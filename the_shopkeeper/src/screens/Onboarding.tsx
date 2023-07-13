import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SwiperComponent from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import Swiper from './Swiper';

const Onboarding = () => {
    const navigation:any = useNavigation(); 
  //   const images = [
  //     {
  //       image: require('../assets/images/onboarding1.png'),
  //       imageText: 'First second third fourth fifth sixth seventh and eighth',
  //       sliderStyle: styles.slide1,
  //     },
  //     {
  //       image: require('../assets/images/onboarding2.png'),
  //       imageText: 'Second third fourth sixth seventh and eighth',
  //       sliderStyle: styles.slide2,
  //     },
  //     {
  //       image: require('../assets/images/onboarding3.png'),
  //       imageText: 'Third fourth fifth sixth seventh eight nine',
  //       sliderStyle: styles.slide3,
  //     },
  //   ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Swiper Container */}
      <View style={styles.swiperWrapper}>
        <SwiperComponent
          style={styles.wrapper}
          showsButtons={true}
          showsPagination={true}
          dotColor="black">
          <Swiper
            viewStyle={styles.slide1}
            textStyle={styles.text}
            textData="Hello from First Slide"
            imageName={require('../assets/images/onboarding1.png')}
          />
          <Swiper
            viewStyle={styles.slide2}
            textStyle={styles.text}
            textData="Hello from Second Slide"
            imageName={require('../assets/images/onboarding2.png')}
          />
          <Swiper
            viewStyle={styles.slide3}
            textStyle={styles.text}
            textData="Hello from Third Slide"
            imageName={require('../assets/images/onboarding3.png')}
          />
        </SwiperComponent>
      </View>

      {/* Login & Sign up buttons ROW */}
      <View style={styles.btnRow}>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('Login')}
        style={[styles.btn,{backgroundColor:'#fdfdfd'}]}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('Signup')}
        style={[styles.btn,{backgroundColor:'#8585f5'}]}>
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Text ROW */}
      <View style={styles.textRow}>
        <Text style={styles.bottomRowText1}>Don't want to Login/Signup, </Text>
        <TouchableOpacity>
            <Text style={styles.bottomRowText2}>process later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    alignItems: 'center',
  },
  swiperWrapper: {
    height: '60%',
    width: responsiveScreenWidth(100),
    // backgroundColor:'red'
  },
  wrapper: {
    height: '65%',
    width: responsiveScreenWidth(100),
    // backgroundColor:'green'
  },
  slide1: {
    height: responsiveScreenHeight(55),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: responsiveScreenHeight(55),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    height: responsiveScreenHeight(55),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnRow:{
    height: '20%',
    width: responsiveScreenWidth(100),
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
    height: responsiveScreenHeight(7.5),
    width: responsiveScreenWidth(40),
    borderRadius:12,
    elevation:1,
    boxShadow:5,
    alignItems:'center',
    justifyContent:'center',
    margin: 15,
    shadowOpacity:0.8
  },
  btnText:{
    fontSize: responsiveFontSize(2.8),
    fontWeight:'500',
    color:'black'
  },
  textRow:{
    flexDirection:'row',
    alignItems:'center'
  },
  bottomRowText1:{
    fontSize: responsiveFontSize(1.78),
    fontWeight:'500',
    color:'gray'
  },
  bottomRowText2:{
    fontSize: responsiveFontSize(1.9),
    fontWeight:'600',
    color:'gray'
  } 
});

export default Onboarding;
