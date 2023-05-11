import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
//@ts-ignore
import { DARK_RED, LIGHT_GREY, removeImage } from "./constants";
//@ts-ignore
import MeatImage from "./meatimage@1.jpg";
const ProductDetailComponent = ({
  name,
  price,
  quantity,
  image,
  onpressRemove,
  onpressIncrease
}: any) => {
  return (
    <View style={styles.main}>
      <View style={styles.rowCon}>
        <Image style={styles.image} source={MeatImage} />
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.price}>{`$ ${price} X ${quantity}`}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={()=>onpressIncrease(1)} style={styles.button}>
                <Text style={styles.count}>{"-"}</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{quantity}</Text>
              <TouchableOpacity onPress={()=>onpressIncrease(1)} style={styles.button}>
                <Text style={styles.count}>{"+"}</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: DARK_RED, fontSize: 16, fontWeight: "bold" }}
            >{`$${Number(price) * Number(quantity)}`}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onpressRemove}
          style={styles.removeContainer}
        >
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20 }}
            source={removeImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  removeContainer:{
    padding: 7,
    backgroundColor: LIGHT_GREY,
    marginLeft: 10,
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
  productName: { fontSize: 16 },
  button: {
    height: 25,
    width: 25,
    backgroundColor: LIGHT_GREY,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: DARK_RED,
  },
  counter: {
    paddingHorizontal: 10,
    color: DARK_RED,
    fontSize: 17,
  },
  counterContainer: { flexDirection: "row", alignItems: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  price: {
    color: DARK_RED,
    fontSize: 17,
  },
});

export default ProductDetailComponent;
