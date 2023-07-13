import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../components/Button/MyButton';

const AddProduct = ({route}:any) => {

  const [allProducts, setAllProducts] = useState([]);

  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const editableItem:any = route?.params.editableItem;
  const comeFrom:any = route?.params.comeFrom;
  const itemIndex:any = route?.params.itemIndex;
  const navigation = useNavigation();

  useEffect(()=>{
    getData();
    if(comeFrom == 'editableItem'){
      editItem();
    }
  },[]);

  const editItem = async () => {
    try{
      if(comeFrom == 'editableItem'){
        setProductName(editableItem?.name);
        setProductDesc(editableItem?.description);
        setProductPrice(editableItem?.price);
        setProductQuantity(editableItem?.quantity);
        setProductCategory(editableItem?.category);
      }
    }catch(err){
      console.log('Error! While editing the item', err);
    }
  }

  const getData = async () => {
    try {
      const localData : any = await AsyncStorage.getItem('ProductsList');
      const res = JSON.parse(localData);
      if (res?.length > 0) {
        setAllProducts(res);
      }
      // console.log(res);
      // console.log(allProducts);
    } catch (error) {
      console.log('Error storing array in AsyncStorage:', error);
    }
  };

  const addProduct = async () => {
    if(comeFrom === 'editableItem') {
    editProduct();
    return;
    }
    const products: any = [...allProducts];
    const data = {
      name: productName,
      description: productDesc,
      price: productPrice,
      quantity: productQuantity,
      category: productCategory,
    };
    products.push(data);
    // Store the object in AsyncStorage
    await AsyncStorage.setItem('ProductsList', JSON.stringify(products));
    navigation.goBack();
  };
  
  const editProduct = async () => {
    const products: any = [...allProducts];

    products[itemIndex].name = productName;
    products[itemIndex].description = productDesc;
    products[itemIndex].price = productPrice;
    products[itemIndex].quantity = productQuantity;
    products[itemIndex].category = productCategory;

    // Store the object in AsyncStorage
    await AsyncStorage.setItem('ProductsList', JSON.stringify(products));
    navigation.goBack();

  };

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
        <Text style={styles.row1Text}>Add Products</Text>
        <TouchableOpacity onPress={() => {}} style={styles.menuContainer}>
          <Icon name="ios-menu" size={35} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Detail Form container */}
      <View style={styles.formContainer}>
        {/* Product Name */}
        <View style={styles.inputBox}>
          <TextInput
            autoComplete="name"
            returnKeyType="next"
            inputMode="text"
            placeholder={ comeFrom === 'editableItem' ? productName :"Enter product name"}
            placeholderTextColor="gray"
            keyboardType="default"
            style={styles.numberInput}
            onChangeText={text => {
              setProductName(text);
            }}
            value={productName}
          />
        </View>

        {/* Product Description */}
        <View style={styles.inputBox}>
          <TextInput
            // autoComplete='name'
            returnKeyType="next"
            inputMode="text"
            placeholder="Enter product description"
            placeholderTextColor="gray"
            keyboardType="default"
            style={styles.numberInput}
            onChangeText={text => {
              setProductDesc(text);
            }}
            value={productDesc}
          />
        </View>

        {/* Product Price */}
        <View style={styles.inputBox}>
          <TextInput
            // autoComplete='name'
            returnKeyType="next"
            inputMode="numeric"
            placeholder="Enter product price"
            placeholderTextColor="gray"
            keyboardType="default"
            style={styles.numberInput}
            onChangeText={text => {
              setProductPrice(text);
            }}
            value={productPrice}
          />
        </View>

        {/* Product Quantity */}
        <View style={styles.inputBox}>
          <TextInput
            // autoComplete='name'
            returnKeyType="next"
            inputMode="numeric"
            placeholder="Enter product quantity"
            placeholderTextColor="gray"
            keyboardType="default"
            style={styles.numberInput}
            onChangeText={text => {
              setProductQuantity(text);
            }}
            value={productQuantity}
          />
        </View>

        {/* Product Quantity */}
        <View style={styles.inputBox}>
          <TextInput
            // autoComplete='name'
            inputMode="text"
            placeholder="Enter product category"
            placeholderTextColor="gray"
            keyboardType="default"
            style={styles.numberInput}
            onChangeText={text => {
              setProductCategory(text);
            }}
            value={productCategory}
          />
        </View>
      </View>

      {/* Button for Add */}
      <MyButton
        iconName=""
        iconColor=""
        iconExists={false}
        title="Add"
        backgroundColor="#8585f5"
        onPress={addProduct}
      />
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
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
  formContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: responsiveScreenWidth(85),
  },
  inputBox: {
    // flexDirection: 'row',
    position: 'relative',
    // alignSelf: 'center',
    // justifyContent: 'center',
    marginBottom: 12,
  },
  numberInput: {
    borderBottomWidth: 2,
    borderColor: 'gray',
    fontSize: responsiveFontSize(1.9),
  },
});
