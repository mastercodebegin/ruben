import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { DARK_RED, WHITE } from "../../assets/constants";
import { BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, CHICKEN, PRIMARY_COLOR,  } from "../assets";
const RenderCategories = ({ item, index, onpress, selectedCategory }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onpress(item?.attributes?.id)
      }}
      key={index}
      style={[styles.scrollerItemContainer, {backgroundColor: selectedCategory === item?.id ? PRIMARY_COLOR : WHITE}]}
    >
      <Image style={[styles.scrollerImg, { tintColor: selectedCategory === item?.id ? BUTTON_COLOR_SECONDARY : BUTTON_COLOR_PRIMARY}]} source={CHICKEN} />
      <Text style={[styles.scrollerText, {color: selectedCategory === item?.id ? BUTTON_TEXT_COLOR_PRIMARY : BUTTON_TEXT_COLOR_SECONDARY}]}>{item?.title}</Text>
    </TouchableOpacity>
  );
};
export default RenderCategories;
const styles = StyleSheet.create({
  scrollerText: {
    fontWeight: "bold",
    fontSize: 16,
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
