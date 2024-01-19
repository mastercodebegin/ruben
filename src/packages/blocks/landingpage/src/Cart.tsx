import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, TEXT_COLOR } from "./assets";

const CartDetails = ({numberOfItem}:any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomIconContainer}>
      <Text style={[styles.cart,{color:TEXT_COLOR}]}>MY CART</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.numContainer}>
          <Text style={styles.number}>{numberOfItem}</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
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
    backgroundColor: BUTTON_COLOR_SECONDARY,
    marginLeft: 15,
    borderRadius: 17,
    color: BUTTON_TEXT_COLOR_SECONDARY,
    borderWidth: 1,
    borderColor: BUTTON_COLOR_PRIMARY,
  },
  number: {
    fontSize: 17,
    fontWeight: "bold",
    color: TEXT_COLOR,
  },
  cart: {
    color: "#5c2221",
    fontWeight: "bold",
    fontSize: 17,
  },
});
