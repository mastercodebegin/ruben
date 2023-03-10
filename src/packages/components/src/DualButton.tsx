import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
const PRIMARY = "#A0272A";
interface ButtonTypes {
  button1Label: string;
  button2label: string;
  button1Onpress?: () => void;
  button2Onpress?: () => void;
}
const DualButton = ({
  button1Label = "",
  button1Onpress = () => {},
  button2Onpress = () => {},
  button2label = "",
}: ButtonTypes) => {
  return (
    <View style={styles.inventoryContainer}>
      <TouchableOpacity
        onPress={button1Onpress}
        style={[styles.bottomButton, styles.inventory]}
      >
        <Text style={{ color: PRIMARY, ...styles.buttonText }}>
          {button1Label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={button2Onpress}
        style={{ backgroundColor: PRIMARY, ...styles.bottomButton }}
      >
        <Text style={{ color: "white", ...styles.buttonText }}>
          {button2label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default DualButton;
const styles = StyleSheet.create({
  buttonText: { fontSize: 17, textAlign: "center", fontWeight: "600" },
  inventory: {
    color: "red",
    borderColor: "red",
    borderWidth: 1,
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  inventoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
