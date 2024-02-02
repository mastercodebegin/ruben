import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../blocks/landingpage/src/assets";
const { DARK_RED, LIGHT_GREY, removeImage } = require("./constants");
const MeatImage = require("./meatimage@1.jpg");
const ProductDetailComponent = ({
  name,
  price,
  quantity,
  image,
  onpressRemove,
  onpressIncrease,
  index,
  subscriptionProduct
}: any) => {
  return (
    <View style={styles.main}>
      <View style={[styles.rowCon]}>
        <Image style={[styles.image]} source={MeatImage} />
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <Text style={styles.productName}>{name} {subscriptionProduct &&  <Text style={[styles.productName,{fontSize:8}]}>{"(S)"}</Text>}</Text>
            <Text style={styles.price}>{`$ ${price} X ${quantity}`}</Text>
          </View>
          <View style={[styles.row,{paddingTop:7}]}>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                onPress={() => onpressIncrease(false)}
                style={[styles.button,quantity === 1 && {display:"none"}]}
              >
                <Text style={styles.count}>{"-"}</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => onpressIncrease(true)}
                style={styles.button}
              >
                <Text style={styles.count}>{"+"}</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: "bold" }}
            >{`$${(Number(price) * Number(quantity)).toFixed(2)}`}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onpressRemove(index)}
          style={styles.removeContainer}
        >
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20,tintColor:PRIMARY_COLOR }}
            source={removeImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  removeContainer: {
    padding: 7,
    backgroundColor: BUTTON_COLOR_SECONDARY,
    marginLeft: 10,
    borderWidth:.6,
    borderColor:PRIMARY_COLOR,
    borderRadius: 5,
  },
  innerContainer: { flex: 1, paddingLeft: 10, justifyContent: "space-between" },
  rowCon: { flexDirection: "row", width: "100%", alignItems: "center" },
  image: { height: 50, width: 50, borderRadius: 10 },
  main: {
    width: "100%",
    paddingBottom: 15,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  productName: { fontSize: 16 ,flex:1, fontWeight: "bold"},
  button: {
    height: 25,
    width: 25,
    backgroundColor: BUTTON_COLOR_SECONDARY,
    borderRadius: 12.5,
    borderWidth:.6,
    borderColor:PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: BUTTON_COLOR_PRIMARY,
  },
  counter: {
    paddingHorizontal: 10,
    color: TEXT_COLOR,
    fontSize: 17,
  },
  counterContainer: { flexDirection: "row", alignItems: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  price: {
    color: TEXT_COLOR,
    fontSize: 17,
  },
});

export default ProductDetailComponent;
