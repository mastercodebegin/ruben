import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DARK_RED } from "../../landingpage/assets/constants";
import { arrowLeft } from "../../landingpage/src/assets";
interface DropDownTypes {
  label: string;
  onpress?: () => void;
}
const Dropdown = ({ label = "", onpress = () => {} }: DropDownTypes) => {
  return (
    <TouchableOpacity onPress={onpress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Image style={styles.image} source={arrowLeft} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: DARK_RED,
    paddingVertical: 15,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  image: {
    height: 15,
    width: 15,
    transform: [{ rotate: "270deg" }],
    tintColor: "black",
  },
});
export default Dropdown;
