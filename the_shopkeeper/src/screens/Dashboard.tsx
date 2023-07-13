import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Modal,
  Alert
} from 'react-native';
import React,{useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Dashboard = () => {
  const isFocused = useIsFocused();
  const [productList, setProductList] = useState([]);

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

  const handleDeleteItem = async (item:any) => {
    try{
      // const dltProducts:any = await AsyncStorage.getItem('ProductsList');
      const res:any = [...productList];
      console.log(res.length);
      const productsList = res.filter((e:any)=>{return e.name !== item.name});
      console.log(res.length);
      setProductList(productsList);
      await AsyncStorage.setItem('ProductsList', JSON.stringify(productsList));
    }catch(err){
      console.log('Error while deleting the item from the list...', err);
    }
  }
  
  const handleEditItem = async (item:any,index:number) => {
    navigation.navigate('AddProduct', {
      editableItem: item,
      comeFrom: 'editableItem',
      itemIndex: index,
    })  
  }

  const renderProductList = ({item, index}: any) => {
    return (
    <TouchableOpacity 
      style={styles.listContainer} 
      onPress={()=>{
        navigation.navigate('ProductDetail',{
          currentItem: item,
          itemIndex: index,
        });
      }}
    >
      {/* Image Box */}
      <Image
        resizeMode="contain"
        source={{
          uri: 'https://img.freepik.com/free-photo/side-view-plant-growing-smartphone_23-2149198311.jpg?w=740&t=st=1688726819~exp=1688727419~hmac=31240583dcc778c10ffc4867db435c19c6ce8c74723ec7552befab1b6f9d22c4',
        }}
        style={styles.productListImg}
      />

      {/* Detail Box */}
      <View
        style={styles.detailBox}>
        <Text style={styles.p_name}>{item?.name}</Text>
        <Text numberOfLines={3} style={styles.p_desc}>{item?.description}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.priceText}>Price : {item?.price} |</Text>
          <Text style={styles.quantityText}> Qty : {item?.quantity}</Text>
        </View>
      </View>

      {/* Action Box */}
      <View style={styles.actionBox}>
        <TouchableOpacity
          onPress={()=>{
            handleEditItem(item,index);
          }}
        >
          <MCIcon name="pencil-box-outline" size={35} color="#8585f5" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{
            deleteItemAlert(item);
          }}
        >
          <MCIcon name="delete-outline" size={35} color="#8585f5" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>)
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

  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />

      {/* Back and Menu Container - row1 */}
      <View style={styles.row1}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.menuContainer}>
          <FAIcon name="caret-left" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.row1Text}>Products</Text>
        <TouchableOpacity onPress={() => {}} style={styles.menuContainer}>
          <Icon name="ios-menu" size={35} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Product List - row2 */}
      <View style={styles.row2}>
        <FlatList
          data={productList}
          keyExtractor={(item:any) => item.description}
          renderItem={renderProductList}
        />
        
      </View>

      {/* Add Item Button - Row 3 */}
      <View
        style={styles.row3}>
        <Text
          style={styles.row3Text}>
          Add Products
        </Text>
        <TouchableOpacity
          onPress={()=>{
            navigation.navigate('AddProduct',{
              comeFrom: 'Normal Button',
            });
          }}
        >
          <Icon name="add-circle-outline" size={35} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    paddingTop:30
  },
  row1Text: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: '#fff',
  },
  menuContainer: {
    
  },
  row2: {height: responsiveHeight(84.5),},
  listContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    // backgroundColor: 'gray',
    flexDirection: 'row',
  },
  productListImg: {
    height: responsiveScreenHeight(10),
    width: responsiveScreenWidth(22),
    borderRadius: 8,
  },
  p_name: {
    marginLeft: 6,
    color: '#000',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    // textAlign: 'center',
    width: '75%',
  },
  p_desc: {
    marginLeft: 6,
    color: 'gray',
    fontSize: responsiveFontSize(1.4),
    fontWeight: '600',
    width: '75%',
    height: '55%'
  },
  quantityText: {
    marginLeft: 6,
    color: 'purple',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
  },
  priceText: {
    marginLeft: 6,
    color: 'purple',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
  },
  detailBox:{
    flexDirection: 'column',
    width: responsiveScreenWidth(63),
    height: responsiveScreenHeight(10),
    justifyContent:'space-between'
  },
  actionBox: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row3:{
    height: responsiveScreenHeight(8.5),
    backgroundColor: '#8585f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    // paddingTop:-30,
  },
  row3Text:{
    fontSize: responsiveFontSize(2.2),
    fontWeight: '500',
    color: '#fff',
  },
  // Modal Style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});
