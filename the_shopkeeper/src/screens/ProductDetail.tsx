import { StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity } from 'react-native';
import React from 'react';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const ProductDetail = ({route}: any) => {
    const navigation = useNavigation();
    const item = route?.params.currentItem;
    const index = route?.params.itemIndex;
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar  
            translucent={true} 
            backgroundColor={'transparent'} 
            barStyle={'dark-content'} 
        />
        {/* Back and Menu container */}
        <View style={styles.row1}>
            <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
            style={styles.menuContainer}>
            <FAIcon name="caret-left" size={35} color="#000" />
            </TouchableOpacity>
            <Text style={styles.row1Text}>{item.name}</Text>
            <TouchableOpacity onPress={() => {}} style={styles.menuContainer}>
            <Icon name="ios-menu" size={35} color="#000" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
    container:{
        height: responsiveScreenHeight(100),
        width: responsiveScreenWidth(100),
        backgroundColor: '#fff',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    row1: {
        height: responsiveScreenHeight(9.5),
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#8585f5',
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        paddingTop: 30,
    },
    menuContainer: {},
    row1Text: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
        color: '#fff',
    },
})