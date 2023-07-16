import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/reducer/CartReducer";
import { decrementQty, incrementQty } from "../redux/reducer/ProductReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item)); // cart
    dispatch(incrementQty(item)); // product
  };

  const isItemInCart = cart.some((c) => c.id === item.id);

  const renderQuantityControls = () => {
    return (
      <View style={styles.quantityContainer}>
        <Pressable
          onPress={() => {
            dispatch(decrementQuantity(item)); // cart
            dispatch(decrementQty(item)); // product
          }}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </Pressable>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <Pressable
          onPress={() => {
            dispatch(incrementQuantity(item)); // cart
            dispatch(incrementQty(item)); // product
          }}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>

      {isItemInCart ? (
        renderQuantityControls()
      ) : (
        <Pressable onPress={addItemToCart} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 14,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    width: 83,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 7,
  },
  priceText: {
    width: 60,
    color: "gray",
    fontSize: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  quantityText: {
    fontSize: 19,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  addButton: {
    width: 80,
    borderColor: "gray",
    borderRadius: 4,
    borderWidth: 0.8,
    marginVertical: 10,
    color: "#088F8F",
    padding: 5,
  },
  addButtonLabel: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DressItem;
