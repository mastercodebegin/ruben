import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  Image,
  View,
  TextStyle,
} from "react-native";
import { BUTTON_COLOR_PRIMARY, BUTTON_TEXT_COLOR_PRIMARY } from "../../blocks/landingpage/src/assets";

interface ButtonType {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  transparentBackground?: boolean;
  testID?:string;
}
const Button = ({
  style = {},
  onPress,
  label = "",
  labelStyle = {},
  containerStyle,
  transparentBackground = false,
  testID
}: ButtonType) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        testID={testID}
        style={[
          styles.continue,
          style,
          transparentBackground && styles.transparentContinue,
          {elevation:1}
        ]}
      >
        {transparentBackground && (
          <View style={styles.shadowContainer}>
            <Image
              resizeMode="cover"
              style={styles.redShadow}
              source={require("./full_shadow.png")}
            />
          </View>
        )}
        <Text
          style={[
            styles.text,
            labelStyle,
            transparentBackground && styles.transparentText,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
      {!transparentBackground && (
        <Image
          resizeMode="stretch"
          source={require("./shadow.png")}
          style={styles.shadow}
        />
      )}
    </View>
  );
};
export default Button;
const styles = StyleSheet.create({
  redShadow: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  continue: {
    borderRadius: 28,
    alignItems: "center",
    backgroundColor: BUTTON_COLOR_PRIMARY,
    overflow: "hidden",
  },
  text: {
    color: BUTTON_TEXT_COLOR_PRIMARY,
    fontWeight: "700",
    fontSize: 18,
    paddingVertical: 15,
  },
  shadow: { height: 20, width: "100%", top: -10, zIndex: -10 },
  transparentText: { color: "#a0272a", fontWeight: "normal" },
  transparentContinue: { backgroundColor: "white" },
  shadowContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
