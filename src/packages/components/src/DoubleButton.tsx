import React from "react";
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PRIMARY, LIGHT_GREY, WHITE } from "./constants";
interface ButtonTypes {
  button1Label: string;
  button2Label: string;
  button1_Onpress: () => void;
  button2_Onpress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}
const DoubleButton = ({
  button1Label,
  button1_Onpress = () => {},
  button2Label,
  button2_Onpress = () => {},
  containerStyle,
}: ButtonTypes) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={button1_Onpress}
        style={[styles.button, styles.button1Style]}
      >
        <Text style={[styles.textStyles, { color: WHITE }]}>
          {button1Label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={button2_Onpress}
        style={[styles.button, styles.button2Style]}
      >
        <Text style={[styles.textStyles, { color: PRIMARY }]}>
          {button2Label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default DoubleButton;
const styles = StyleSheet.create({
  container: {},
  button: { alignItems: "center" },
  textStyles: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 14,
  },
  button2Style: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: PRIMARY,
    marginTop: 10,
  },
  button1Style: { backgroundColor: PRIMARY, borderRadius: 30 },
});
