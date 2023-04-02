import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
const PRIMARY = "#A0272A";
interface ButtonTypes {
  button1Label: string;
  button2label: string;
  button1Onpress?: () => void;
  button2Onpress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
}
const DualButton = ({
  button1Label = "",
  button1Onpress = () => {},
  button2Onpress = () => {},
  button2label = "",
  containerStyle = {},
  disable,
}: ButtonTypes) => {
  return (
    <View style={[styles.inventoryContainer, containerStyle]}>
      <TouchableOpacity
        disabled={disable}
        onPress={button1Onpress}
        style={[styles.bottomButton, styles.inventory]}
      >
        <Text style={{ color: PRIMARY, ...styles.buttonText }}>
          {button1Label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disable}
        onPress={button2Onpress}
        style={{
          backgroundColor: PRIMARY,
          ...styles.bottomButton,
          marginLeft: 5,
        }}
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
    borderColor: PRIMARY,
    borderWidth: 1,
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 30,
    // marginHorizontal: 20,
  },
  inventoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // position: "absolute",
    // bottom: 0,
    // right: 0,
    // left: 0,
    // paddingHorizontal: 20,
    // marginBottom: 20,
  },
});
