import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { DARK_RED, MEAT_IMAGE3, PRIMARY, badge } from "../assets";
import { sampleText, ImageData } from "./ProductDetails";
const RenderAboutThisFarm = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.header}>{"About this farm"}</Text>
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Image style={styles.farmImage} source={MEAT_IMAGE3} />
          <View style={styles.headerInnerContainer}>
            <Text style={styles.farmName}>Mark John's Farm</Text>
            <Text style={styles.address}>
              7460 Redwood BLVD , California USA
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{sampleText}</Text>
        <Text style={styles.photos}>PHOTOS</Text>
        <FlatList
          data={ImageData}
          horizontal
          renderItem={({ item }) => (
            <Image style={styles.image} source={item?.image} />
          )}
        />
        <Text style={styles.photos}>PRODUCTS</Text>

        <View>
          <Image style={styles.productImage} source={MEAT_IMAGE3} />
          <View style={styles.productContainer}>
            <Text style={styles.productName}>Meat</Text>
            <Text style={styles.price}>{"$ 22.99/kg"}</Text>
          </View>
          <View style={styles.badgeContainer}>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={3}>{sampleText}</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Image style={styles.badge} source={badge} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default RenderAboutThisFarm;
const styles = StyleSheet.create({
  main: {},
  price: { color: DARK_RED, fontWeight: "bold", fontSize: 17 },
  productImage: { height: 220, width: "100%", borderRadius: 20 },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  productName: { color: DARK_RED, fontWeight: "bold", fontSize: 17 },
  badgeContainer: { flexDirection: "row", alignItems: "center" },
  badge: { height: "100%", width: "100%", tintColor: PRIMARY },
  button: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: PRIMARY,
    padding: 4,
    borderRadius: 15,
  },
  header: {
    fontSize: 17,
    color: "grey",
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  headerContainer: { backgroundColor: "white", padding: 15, borderRadius: 15 },
  description: { color: "grey", fontSize: 16, paddingTop: 15 },
  image: { height: 60, width: 60, marginRight: 10, borderRadius: 10 },
  photos: { color: "grey", fontWeight: "bold", paddingVertical: 10 },
  headerInnerContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingLeft: 20,
  },
  farmImage: { height: 60, width: 60, borderRadius: 10 },
  farmName: { color: DARK_RED, fontWeight: "bold", fontSize: 18 },
  address: { color: "grey", fontSize: 15 },
  row: { flexDirection: "row" },
});
