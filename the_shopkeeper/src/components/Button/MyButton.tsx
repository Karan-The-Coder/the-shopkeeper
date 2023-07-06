import { StyleSheet, Text, View,TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react';
import {
    responsiveFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
  } from 'react-native-responsive-dimensions';
import FAicon from 'react-native-vector-icons/FontAwesome5Pro';

interface ButtonOptionalProps {
    backgroundColor: string,
    title: string,
    iconName: string,
    iconColor: string,
    iconExists: boolean,
}

const MyButton = (props: ButtonOptionalProps) => {

 const {backgroundColor, title, iconName, iconColor, iconExists} = props;

  return (
    <TouchableOpacity style={[styles.loginBtn, { backgroundColor: backgroundColor }]}>
        { iconExists 
            ? (<FAicon name={iconName} size ={25} color={iconColor} style={{marginRight:20}} />) 
            : null
        }
        <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    loginBtn: {
        height: responsiveScreenHeight(7.5),
        width: responsiveScreenWidth(85),
        borderRadius: 12,
        elevation: 1,
        shadowOpacity: 0.8,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        flexDirection:'row',
        justifyContent: 'center',
      },
      btnText: {
        fontSize: responsiveFontSize(2.8),
        fontWeight: '500',
        color: '#fff',
      },
})

export default MyButton;
