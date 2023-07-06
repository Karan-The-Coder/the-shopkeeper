import {StyleSheet, Text, View,Image, SafeAreaView} from 'react-native';
import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const Swiper = (
  viewStyle?: any,
  textStyle?: any,
  textData?: String,
  imageName?: any,
) => {
  return (
    <View style={viewStyle}>
      <Image
        source={imageName}
        resizeMode='contain'
        style={{
          height: responsiveScreenHeight(44),
          width: responsiveScreenWidth(100),
        }}
      />
      <Text style={textStyle}>{textData}</Text>
    </View>
  );
};

export default Swiper;

const styles = StyleSheet.create({});
