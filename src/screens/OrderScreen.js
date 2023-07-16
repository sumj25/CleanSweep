import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();

  const moveToHomeScreen = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../../assets/thumbs.json")}
        style={styles.animation}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text style={styles.orderText}>Your order has been placed</Text>

      <LottieView
        source={require("../../assets/sparkle.json")}
        style={styles.sparkleAnimation}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <TouchableOpacity style={styles.button} onPress={moveToHomeScreen}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    height: 360,
    width: 300,
    alignSelf: "center",
    marginTop: 40,
  },
  orderText: {
    marginTop: 40,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
  sparkleAnimation: {
    height: 300,
    position: "absolute",
    top: 100,
    width: 300,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#088F8F",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});

export default OrderScreen;
