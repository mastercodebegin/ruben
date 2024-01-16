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
import { BUTTON_COLOR_PRIMARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR } from "../../blocks/landingpage/src/assets";
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
    <View style={[styles.container, containerStyle]} testID="doubleButton">
      <TouchableOpacity
        onPress={button1_Onpress}
        style={[styles.button, styles.button1Style,
          {backgroundColor:BUTTON_COLOR_PRIMARY,elevation:1}] }
        testID="doneFirstButtonEvent"
      >
        <Text style={[styles.textStyles, { color: BUTTON_TEXT_COLOR_PRIMARY }]}>
          {button1Label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={button2_Onpress}
        style={[styles.button, styles.button2Style]}
      >
        <Text style={[styles.textStyles, { color: BUTTON_TEXT_COLOR_SECONDARY }]}>
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
    borderRadius: 30,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    marginTop: 10,
    elevation:1,
    backgroundColor:'white'
  },
  button1Style: { backgroundColor: PRIMARY, borderRadius: 30 },
});
