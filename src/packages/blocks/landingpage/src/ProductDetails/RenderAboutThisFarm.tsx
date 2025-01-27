import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {  BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, MEAT_IMAGE3, PRIMARY, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR, badge } from "../assets";
const RenderAboutThisFarm = ({ item , AddToFavorites,details,props,isProductFavourite,productImage}: any) => {
 
  return (
    <View style={styles.main}>
      <Text style={styles.header}>{"About this farm"}</Text>
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Image style={styles.farmImage} source={MEAT_IMAGE3} />
          <View style={styles.headerInnerContainer}>
          <Text style={styles.farmName}>{details?.attributes?.title}</Text>
            <Text style={styles.address}>
            {details?.attributes?.address}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{details?.attributes?.sub_title}</Text>
        <Text style={styles.photos}>PHOTOS</Text>
        <FlatList
           data={details?.attributes?.images}
          horizontal
          renderItem={({ item }:any) => {
            return (
              <Image style={styles.image} source={{uri:item?.url}} />
            )}}
          />
        <Text style={styles.photos}>PRODUCTS</Text>

        <View>
        <Image style={styles.productImage} source={productImage} />
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{  item?.attributes?.categoryCode }</Text>
            <Text style={styles.price}>{`$ ${ item?.attributes?.price }/kg`}</Text>
          </View>
          <View style={styles.badgeContainer}>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={3}>{item?.attributes?.description}</Text>
            </View>
            <TouchableOpacity testID="add_to_fav_test_id" 
            onPress={()=>AddToFavorites(item?.id)} 
            style={[styles.button,
              {borderColor:isProductFavourite?BUTTON_COLOR_SECONDARY:BUTTON_COLOR_PRIMARY},
            {backgroundColor:isProductFavourite?BUTTON_COLOR_PRIMARY:BUTTON_COLOR_SECONDARY}
            ]}>
              <Image style={[styles.badge,{tintColor:isProductFavourite?BUTTON_COLOR_SECONDARY:BUTTON_COLOR_PRIMARY}]} source={badge} />
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
  price: { color: TEXT_COLOR, fontWeight: "bold", fontSize: 17 },
  productImage: { height: Dimensions.get('window').height * 0.2
    , width: "100%", borderRadius: 20 },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  productName: { color: TEXT_COLOR, fontWeight: "bold", fontSize: 17 },
  badgeContainer: { flexDirection: "row", alignItems: "center",paddingTop:10 },
  badge: { height: "100%", width: "100%", tintColor: PRIMARY },
  button: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    padding: 5,
    borderRadius: 15,
  },
  header: {
    fontSize: 17,
    color: TEXT_COLOR,
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  headerContainer: { backgroundColor: "white", padding: 15, borderRadius: 15 },
  description: { color: "grey", fontSize: 16, paddingTop: 15 },
  image: { height: 60, width: 60, marginRight: 10, borderRadius: 10 },
  photos: { color: TEXT_COLOR, fontWeight: "bold", paddingVertical: 10 },
  headerInnerContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingLeft: 20,
  },
  farmImage: { height: 60, width: 60, borderRadius: 10 },
  farmName: { color: TEXT_COLOR, fontWeight: "bold", fontSize: 18 },
  address: { color: SECONDARY_TEXT_COLOR, fontSize: 15 },
  row: { flexDirection: "row" },
});
