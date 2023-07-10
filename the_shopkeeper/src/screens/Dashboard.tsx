import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React,{useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const ItemData = [
    {
      id: 'e1',
      title: 'LED Light Bulb',
      name: 'Philips LED Light Bulb',
      description: 'Energy-efficient light bulb',
      category: 'Lighting',
      price: 10.99,
      imageUrl: 'https://example.com/images/led_light_bulb.jpg',
      rating: 4.5,
      specification: '9W, 800 lumens, warm white',
      quantity: 50,
    },
    {
      id: 'e2',
      title: 'Smart Thermostat',
      name: 'Nest Learning Thermostat',
      description: 'Programmable and energy-saving thermostat',
      category: 'Heating & Cooling',
      price: 199.99,
      imageUrl: 'https://example.com/images/smart_thermostat.jpg',
      rating: 4.8,
      specification: 'Wi-Fi enabled, compatible with major HVAC systems',
      quantity: 20,
    },
    {
      id: 'e3',
      title: 'Power Strip',
      name: 'Belkin SurgePlus USB Swivel Surge Protector',
      description: 'Surge-protected power strip with USB ports',
      category: 'Power Accessories',
      price: 24.99,
      imageUrl: 'https://example.com/images/power_strip.jpg',
      rating: 4.6,
      specification: '6 AC outlets, 2 USB ports, 900 Joules',
      quantity: 30,
    },
    {
      id: 'e4',
      title: 'Smart Plug',
      name: 'TP-Link Kasa Smart Plug',
      description: 'Wireless smart plug for remote control',
      category: 'Power Accessories',
      price: 14.99,
      imageUrl: 'https://example.com/images/smart_plug.jpg',
      rating: 4.3,
      specification: 'Wi-Fi enabled, works with Alexa and Google Assistant',
      quantity: 15,
    },
    {
      id: 'e5',
      title: 'Ceiling Fan',
      name: 'Hunter Indoor Ceiling Fan',
      description: 'Quiet and energy-efficient ceiling fan',
      category: 'Fans',
      price: 99.99,
      imageUrl: 'https://example.com/images/ceiling_fan.jpg',
      rating: 4.7,
      specification: '52-inch, 5 reversible blades, remote control included',
      quantity: 25,
    },
    {
      id: 'e6',
      title: 'Power Bank',
      name: 'Anker PowerCore Portable Charger',
      description: 'High-capacity portable charger for mobile devices',
      category: 'Chargers',
      price: 39.99,
      imageUrl: 'https://example.com/images/power_bank.jpg',
      rating: 4.4,
      specification: '20,000mAh, 2 USB ports, PowerIQ technology',
      quantity: 40,
    },
    {
      id: 'e7',
      title: 'Solar Panel',
      name: 'Renogy 100 Watt Monocrystalline Solar Panel',
      description: 'High-efficiency solar panel for renewable energy',
      category: 'Solar',
      price: 159.99,
      imageUrl: 'https://example.com/images/solar_panel.jpg',
      rating: 4.9,
      specification: 'Compact design, weather-resistant',
      quantity: 10,
    },
    {
      id: 'e8',
      title: 'Smart Light Switch',
      name: 'Lutron Caseta Wireless Smart Light Switch',
      description: 'Wireless dimmer switch for smart lighting control',
      category: 'Lighting',
      price: 49.99,
      imageUrl: 'https://example.com/images/smart_light_switch.jpg',
      rating: 4.7,
      specification: 'Works with Alexa, Google Assistant, and Siri',
      quantity: 20,
    },
    {
      id: 'e9',
      title: 'WiFi Range Extender',
      name: 'TP-Link AC750 WiFi Range Extender',
      description: 'Extend wireless coverage and eliminate dead zones',
      category: 'Networking',
      price: 29.99,
      imageUrl: 'https://example.com/images/wifi_range_extender.jpg',
      rating: 4.5,
      specification: 'Dual-band, 2 external antennas',
      quantity: 30,
    },
    {
      id: 'e10',
      title: 'Electric Kettle',
      name: 'Hamilton Beach Electric Tea Kettle',
      description: 'Quick-boiling kettle for hot beverages',
      category: 'Kitchen Appliances',
      price: 19.99,
      imageUrl: 'https://example.com/images/electric_kettle.jpg',
      rating: 4.3,
      specification: '1.7L capacity, auto-shutoff feature',
      quantity: 25,
    },
    {
      id: 'e11',
      title: 'Smart Doorbell',
      name: 'Ring Video Doorbell Pro',
      description: 'Video doorbell with advanced motion detection',
      category: 'Home Security',
      price: 249.99,
      imageUrl: 'https://example.com/images/smart_doorbell.jpg',
      rating: 4.8,
      specification: '1080p HD video, works with Alexa',
      quantity: 15,
    },
    {
      id: 'e12',
      title: 'Cordless Drill',
      name: 'DEWALT 20V MAX Cordless Drill',
      description: 'Powerful drill for various tasks',
      category: 'Tools',
      price: 129.99,
      imageUrl: 'https://example.com/images/cordless_drill.jpg',
      rating: 4.6,
      specification: 'Brushless motor, 2-speed transmission',
      quantity: 10,
    },
    {
      id: 'e13',
      title: 'Smart Power Strip',
      name: 'Gosund WiFi Surge Protector',
      description: 'Smart power strip with voice control',
      category: 'Power Accessories',
      price: 29.99,
      imageUrl: 'https://example.com/images/smart_power_strip.jpg',
      rating: 4.4,
      specification:
        '3 AC outlets, 3 USB ports, compatible with Alexa and Google Assistant',
      quantity: 20,
    },
    {
      id: 'e14',
      title: 'Motion Sensor Light',
      name: 'Mr. Beams Wireless Motion Sensor LED Light',
      description: 'Battery-powered indoor/outdoor light',
      category: 'Lighting',
      price: 19.99,
      imageUrl: 'https://example.com/images/motion_sensor_light.jpg',
      rating: 4.5,
      specification: '120 lumens, auto-shutoff after 20 seconds',
      quantity: 30,
    },
  ];
  const [productList, setProductList] = useState(ItemData);

  const findProducts = async () => {
    const products : any = await AsyncStorage.getItem('ProductsList');
    const result = JSON.parse(products);
    setProductList(result);
    console.log(result);
  } 

  useEffect(()=>{
    const storeData = async () => {
      try {
        // Convert the array to a string using JSON.stringify
        const Items = JSON.stringify(productList);
        // Store the string in AsyncStorage
        await AsyncStorage.setItem('ProductsList', Items);
        // console.log('Array stored Successfull.');
      } catch (error) {
        console.log('Error storing array in AsyncStorage:', error);
      }
    };

    // Call the storeData function when the component mounts
    storeData();
    // findProducts();
  },[]);

  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />

      {/* Back and Menu Container */}
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
          data={ItemData}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View style={styles.listContainer}>
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
                <Text style={styles.p_name}>{item.name}</Text>
                <Text style={styles.p_desc}>{item.description}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.quantityText}>
                    Quantity : {item.quantity} |
                  </Text>
                  <Text style={styles.priceText}>Price : {item.quantity}</Text>
                </View>
              </View>

              {/* Action Box */}
              <View style={styles.actionBox}>
                <TouchableOpacity>
                  <MCIcon name="pencil-box-outline" size={35} color="#8585f5" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MCIcon name="delete-outline" size={35} color="#8585f5" />
                </TouchableOpacity>
              </View>
            </View>
          )}
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
            navigation.navigate('AddProduct');
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
});
