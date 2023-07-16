import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
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
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: delivery,
      });
    }
  };

  return (
    <>
      <SafeAreaView>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.label}>Enter Address</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Pick Up Date</Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date("2023-02-21")}
            endDate={new Date("2023-02-28")}
            initialSelectedDate={new Date("2020-08-22")}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />

          <Text style={styles.label}>Select Time</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedTime(item.time)}
                style={[
                  styles.timeButton,
                  selectedTime.includes(item.time)
                    ? styles.selectedTimeButton
                    : styles.unselectedTimeButton,
                ]}
              >
                <Text style={styles.timeButtonText}>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.label}>Delivery Date</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => setDelivery(item.name)}
                style={[
                  styles.deliveryButton,
                  delivery.includes(item.name)
                    ? styles.selectedDeliveryButton
                    : styles.unselectedDeliveryButton,
                ]}
              >
                <Text style={styles.deliveryButtonText}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable style={styles.cartButton} onPress={proceedToCart}>
          <View>
            <Text style={styles.cartButtonText}>
              {cart.length} items | $ {total}
            </Text>
            <Text style={styles.cartButtonSubText}>
              extra charges might apply
            </Text>
          </View>

          <Text style={styles.proceedButtonText}>Proceed to Cart</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  input: {
    padding: 40,
    borderColor: "gray",
    borderWidth: 0.7,
    paddingVertical: 80,
    borderRadius: 9,
    margin: 10,
  },
  selectedItemTextStyle: {},
  flatListContainerStyle: {},
  timeButton: {
    margin: 10,
    borderRadius: 7,
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.7,
  },
  selectedTimeButton: {
    backgroundColor: "gray",
  },
  unselectedTimeButton: {
    borderColor: "gray",
  },
  timeButtonText: {},
  deliveryButton: {
    margin: 10,
    borderRadius: 7,
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.7,
  },
  selectedDeliveryButton: {
    backgroundColor: "red",
  },
  unselectedDeliveryButton: {
    borderColor: "gray",
  },
  deliveryButtonText: {},
  cartButton: {
    backgroundColor: "#088F8F",
    marginTop: "auto",
    padding: 10,
    marginBottom: 40,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  cartButtonSubText: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginVertical: 6,
  },
  proceedButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
});

export default PickUpScreen;
