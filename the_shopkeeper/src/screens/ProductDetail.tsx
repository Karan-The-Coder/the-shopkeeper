import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import React,{useState,useEffect} from 'react';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const ProductDetail = ({ route }: any) => {
    const [productList, setProductList] = useState([]);
    
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const item = route?.params.currentItem;
    const index = route?.params.itemIndex;

    useEffect(()=>{
        getData();
      },[isFocused]);
    
    const getData = async () => {
        try {
          const localData:any = await AsyncStorage.getItem('ProductsList');
          const res = JSON.parse(localData);
          if (res?.length > 0) {
            setProductList(res);
          }
          // console.log(res);
          // console.log(productList);
        } catch (error) {
          console.log('Error storing array in AsyncStorage:', error);
        }
      };

    const handleEditItem = async () => {
        navigation.navigate('AddProduct', {
            editableItem: item,
            comeFrom: 'editableItemDetailPage',
            itemIndex: index,
        });
    }

    const handleDeleteItem = async (c_item:any) => {
        try{
          // const dltProducts:any = await AsyncStorage.getItem('ProductsList');
          const res:any = [...productList];
        //   console.log(res.length);
          const productsList = res.filter((e:any)=>{return e.name !== c_item.name});
        //   console.log(res.length);
          setProductList(productsList);
          await AsyncStorage.setItem('ProductsList', JSON.stringify(productsList));
          navigation.navigate('Dashboard');
        }catch(err){
          console.log('Error while deleting the item from the list...', err);
        }
      }

    const deleteItemAlert = (item:any) =>
        Alert.alert('Alert', 'Are you sure to delete that item?', [
        {
            text: 'CANCEL',
            onPress: () => {},
            style: 'cancel',
        },
        {text: 'OK', onPress: () => handleDeleteItem(item)},
        ]);

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
                <TouchableOpacity onPress={() => { }} style={styles.menuContainer}>
                    <Icon name="ios-menu" size={35} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Detail Container- Row2 */}
            <ScrollView 
            showsVerticalScrollIndicator={false}    
            style={{marginTop:-15,}}>
                {/* Image Box */}
                <Image
                    resizeMode="contain"
                    source={{
                        uri: 'https://img.freepik.com/free-photo/side-view-plant-growing-smartphone_23-2149198311.jpg?w=740&t=st=1688726819~exp=1688727419~hmac=31240583dcc778c10ffc4867db435c19c6ce8c74723ec7552befab1b6f9d22c4',
                    }}
                    style={styles.productListImg}
                />
                <Text numberOfLines={3} style={styles.productName}>{item.name}</Text>
                <Text style={styles.productText }>Description:</Text>
                <Text style={styles.productDesc}>{item.description}</Text>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                    <Text style={styles.productText}>Price:</Text>
                    <Text style={[styles.productText,{color:'#8585f5'}]}>₨.{item.price}/-</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                    <Text style={styles.productText}>Quantity:</Text>
                    <Text style={[styles.productText,{color:'#8585f5'}]}>{item.quantity}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                    <Text style={styles.productText}>Category:</Text>
                    <Text style={[styles.productText,{color:'#8585f5'}]}>{item.category}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:12,justifyContent:'space-between'}}>
                    <TouchableOpacity 
                        onPress={()=>{handleEditItem()}}
                    >
                        <MCIcon name="pencil-box-outline" size={45} color="#8585f5" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>{
                            deleteItemAlert(item);
                        }}
                    >
                        <MCIcon name="delete-outline" size={45} color="#8585f5" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        height: responsiveScreenHeight(100),
        width: responsiveScreenWidth(100),
        backgroundColor: '#fff',
        flex: 1,
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
        zIndex: 4
    },
    menuContainer: {},
    row1Text: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
        color: '#fff',
    },
    productListImg: {
        height: responsiveScreenHeight(40),
        width: responsiveScreenWidth(100),
        borderRadius: 8,
        marginBottom: 8,
    },
    productName:{
        fontSize: responsiveFontSize(2.5),
        color: "#000",
        fontWeight: '700',
        marginBottom: 8,
        paddingHorizontal:12
    },
    productText:{
        fontSize: responsiveFontSize(2), 
        color: "#000",
        fontWeight: '600',
        paddingHorizontal:12,
        marginBottom:8
    },
    productDesc:{
        fontSize: responsiveFontSize(2),
        color: "#000",
        fontWeight: '400',
        opacity:0.7,
        marginBottom: 8,
        paddingHorizontal:12
    }
})