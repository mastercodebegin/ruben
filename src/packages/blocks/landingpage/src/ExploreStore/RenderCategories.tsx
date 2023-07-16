import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { DARK_RED, WHITE } from "../../assets/constants";
import { CHICKEN } from "../assets";
const RenderCategories = ({ item, index, onpress, selectedCategory }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onpress(item?.attributes?.id)
      }}
      key={index}
      style={[styles.scrollerItemContainer, {backgroundColor: selectedCategory === item?.attributes?.id ? "#A0272A" : WHITE}]}
    >
      <Image style={[styles.scrollerImg, { tintColor: selectedCategory === item?.attributes?.id ? "white" : DARK_RED}]} source={CHICKEN} />
      <Text style={[styles.scrollerText, {color: selectedCategory === item?.attributes?.id ? "white" : DARK_RED}]}>{item?.attributes?.name}</Text>
    </TouchableOpacity>
  );
};
export default RenderCategories;
const styles = StyleSheet.create({
  scrollerText: {
    fontWeight: "bold",
    fontSize: 19,
    paddingLeft: 15,
  },
  scrollerImg: { height: 20, width: 20 },
  scrollerItemContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 17,
    marginRight: 10,
    borderRadius: 33,
    alignItems: "center",
  },
});
