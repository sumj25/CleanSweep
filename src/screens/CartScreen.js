import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/reducer/CartReducer";
import { decrementQty, incrementQty } from "../redux/reducer/ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const userUid = auth.currentUser.uid;
  const dispatch = useDispatch();
  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );
  };
  return (
    <>
      <ScrollView style={styles.scrollView}>
        {total === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View style={styles.headerContainer}>
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
            </View>

            <Pressable style={styles.cartContainer}>
              {cart.map((item, index) => (
                <View style={styles.cartItemContainer} key={index}>
                  <Text style={styles.cartItemName}>{item.name}</Text>

                  <Pressable
                    style={styles.quantityButtonContainer}
                    onPress={() => {
                      dispatch(decrementQuantity(item)); // cart
                      dispatch(decrementQty(item)); // product
                    }}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </Pressable>

                  <Text style={styles.cartItemQuantity}>{item.quantity}</Text>

                  <Pressable
                    style={styles.quantityButtonContainer}
                    onPress={() => {
                      dispatch(incrementQuantity(item)); // cart
                      dispatch(incrementQty(item)); //product
                    }}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>

                  <Text style={styles.cartItemPrice}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={styles.billingDetailsContainer}>
              <Text style={styles.billingDetailsTitle}>Billing Details</Text>
              <View style={styles.billingDetailsContent}>
                <View style={styles.billingDetailsRow}>
                  <Text style={styles.billingDetailsLabel}>Total Bill</Text>
                  <Text style={styles.billingDetailsValue}>₹{total}</Text>
                </View>

                <View style={styles.billingDetailsRow}>
                  <Text style={styles.billingDetailsLabel}>
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text style={styles.billingDetailsValue}>FREE</Text>
                </View>

                <View style={styles.billingDetailsRow}>
                  <Text style={styles.billingDetailsFreeDelivery}>
                    Free Delivery on Your order
                  </Text>
                </View>

                <View style={styles.billingDetailsSeparator} />

                <View style={styles.billingDetailsRow}>
                  <Text style={styles.billingDetailsLabel}>Selected Date</Text>
                  <Text style={styles.billingDetailsValue}></Text>
                </View>

                <View style={styles.billingDetailsRow}>
                  <Text style={styles.billingDetailsLabel}>No Of Days</Text>
                  <Text style={styles.billingDetailsValue}>
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View style={styles.billingDetailsRow}>
                  <Text style={styles.billingDetailsLabel}>
                    Selected Pick Up Time
                  </Text>
                  <Text style={styles.billingDetailsValue}>
                    {route.params.selectedTime}
                  </Text>
                </View>

                <View style={styles.billingDetailsSeparator} />

                <View style={styles.billingDetailsRow}>
                  <Text style={styles.billingDetailsTotalLabel}>To Pay</Text>
                  <Text style={styles.billingDetailsTotalValue}>{total}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={styles.placeOrderButton} onPress={placeOrder}>
          <View style={styles.placeOrderButtonContent}>
            <Text style={styles.placeOrderButtonTitle}>
              {cart.length} items | $ {total}
            </Text>
            <Text style={styles.placeOrderButtonSubTitle}>
              extra charges might apply
            </Text>
          </View>
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 50,
  },
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    marginTop: 40,
  },
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cartContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    padding: 14,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  cartItemName: {
    width: 100,
    fontSize: 16,
    fontWeight: "500",
  },
  quantityButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderColor: "#BEBEBE",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  cartItemQuantity: {
    fontSize: 19,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "500",
  },
  billingDetailsContainer: {
    marginHorizontal: 10,
  },
  billingDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
  },
  billingDetailsContent: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    marginTop: 15,
  },
  billingDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  billingDetailsLabel: {
    fontSize: 18,
    fontWeight: "400",
    color: "gray",
  },
  billingDetailsValue: {
    fontSize: 18,
    fontWeight: "400",
  },
  billingDetailsFreeDelivery: {
    fontSize: 18,
    fontWeight: "500",
    color: "gray",
  },
  billingDetailsSeparator: {
    borderColor: "gray",
    height: 1,
    borderWidth: 0.5,
    marginTop: 10,
  },
  billingDetailsTotalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  billingDetailsTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "grey",
    marginTop: "auto",
    padding: 10,
    marginBottom: 40,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeOrderButtonContent: {},
  placeOrderButtonTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  placeOrderButtonSubTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginVertical: 6,
  },
  placeOrderButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
});

export default CartScreen;
