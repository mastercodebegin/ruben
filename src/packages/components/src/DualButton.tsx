import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR } from "../../blocks/landingpage/src/assets";
const PRIMARY = "#A0272A";
interface ButtonTypes {
  button1Label: string;
  button2label: string;
  button1Onpress?: () => void;
  button2Onpress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  buttn1TestID?: string;
  buttn2TestID?: string;
}
const DualButton = ({
  button1Label = "",
  button1Onpress = () => {},
  button2Onpress = () => {},
  button2label = "",
  containerStyle = {},
  disable,
  buttn2TestID,
  buttn1TestID,
}: ButtonTypes) => {
  return (
    <View style={[styles.inventoryContainer, containerStyle]}>
      <TouchableOpacity
        testID={buttn1TestID}
        disabled={disable}
        onPress={button1Onpress}
        style={[styles.bottomButton, styles.inventory]}
      >
        <Text style={{ color: BUTTON_TEXT_COLOR_SECONDARY, ...styles.buttonText }}>
          {button1Label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disable}
        onPress={button2Onpress}
        testID={buttn2TestID}
        style={{
          backgroundColor: BUTTON_COLOR_PRIMARY,
          ...styles.bottomButton,
          marginLeft: 5,
        }}
      >
        <Text style={{ color: BUTTON_TEXT_COLOR_PRIMARY, ...styles.buttonText }}>
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
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 30,
  },
  inventoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
