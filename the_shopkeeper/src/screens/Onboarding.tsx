import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import Swiper from 'react-native-swiper';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const Onboarding = () => {
  const [images, setImages] = useState([
    {image: require('../assets/images/onboarding1.png'), imageText: 'FIrst', sliderStyle: styles.slide1},
    {image: require('../assets/images/onboarding2.png'), imageText: 'Second', sliderStyle: styles.slide2},
    {image: require('../assets/images/onboarding3.png'), imageText: 'Third', sliderStyle: styles.slide3},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Swiper Container */}
      <View style={styles.swiperWrapper}>
        <Swiper style={styles.wrapper} showsButtons={false}>
          {images?.map((image, index) => {
            return (
              <View style={styles.slide1}>
                <Image
                  resizeMode="contain"
                  source={image.image}
                  style={{
                    height: responsiveScreenHeight(40),
                    width: responsiveScreenWidth(100),
                  }}
                />
                <Text style={styles.text}>{image.imageText}</Text>
              </View>
            );
          })}
        </Swiper>
      </View>

      {/* Login & Sign up buttons ROW */}
      <View></View>

      {/* Bottom Text ROW */}
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  swiperWrapper: {
    height: responsiveScreenHeight(70),
    width: responsiveScreenWidth(100),
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Onboarding;
