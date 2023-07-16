import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import Carousel from "../component/Carousel";
import Services from "../component/Services";
import DressItem from "../component/DressItem";
import { getProducts } from "../redux/reducer/ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
    if (product.length === 0) {
      fetchProducts();
    }
  }, []);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  const fetchProducts = async () => {
    const colRef = collection(db, "types");
    const docsSnap = await getDocs(colRef);
    const items = docsSnap.docs.map((doc) => doc.data());
    items.map((service) => dispatch(getProducts(service)));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Location and Profile */}
      <View style={styles.locationProfileContainer}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={styles.titleText}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileImageContainer}
        >
          <Image
            style={styles.profileImage}
            source={require("../../assets/deathnote.jpeg")}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search for items or More"
        />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>

      {/* Image Carousel */}
      <Carousel />

      {/* Services Component */}
      <Services />

      {/* Render all the Products */}
      {product.map((item, index) => (
        <DressItem item={item} key={index} />
      ))}

      {/* Proceed to Pickup */}
      {total > 0 && (
        <Pressable
          style={styles.proceedButton}
          onPress={() => navigation.navigate("PickUp")}
        >
          <View>
            <Text style={styles.proceedText}>
              {cart.length} items | $ {total}
            </Text>
            <Text style={styles.extraChargesText}>
              Extra charges might apply
            </Text>
          </View>
          <Text style={styles.proceedText}>Proceed to Pickup</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    marginTop: 50,
  },
  locationProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileImageContainer: {
    marginLeft: "auto",
    marginRight: 7,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBarContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    borderRadius: 7,
  },
  searchBarInput: {
    flex: 1,
  },
  proceedButton: {
    backgroundColor: "#088F8F",
    padding: 10,
    marginBottom: 40,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  proceedText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  extraChargesText: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginVertical: 6,
  },
});

export default HomeScreen;
