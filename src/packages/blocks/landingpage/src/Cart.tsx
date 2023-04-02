import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CartDetails = () => {
  return (
    <View style={styles.bottomIconContainer}>
      <Text style={styles.cart}>MY CART</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.numContainer}>
          <Text style={styles.number}>12</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.checkout}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartDetails;
const styles = StyleSheet.create({
  bottomIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
    paddingHorizontal: 20,
    marginTop: -40,
    alignItems: "center",
    position: "absolute",
    bottom: 7,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },

  numContainer: {
    backgroundColor: "#F8F8F4",
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkout: {
    fontSize: 17,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: "#F8F8F4",
    marginLeft: 15,
    borderRadius: 17,
    color: "#A0272A",
    borderWidth: 1,
    borderColor: "#A0272A",
  },
  number: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#5c2221",
  },
  cart: {
    color: "#5c2221",
    fontWeight: "bold",
    fontSize: 17,
  },
});
