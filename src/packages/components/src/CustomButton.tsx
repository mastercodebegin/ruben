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

interface ButtonType {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  transparentBackground?: boolean;
}
const Button = ({
  style = {},
  onPress,
  label = "",
  labelStyle = {},
  containerStyle,
  transparentBackground = false,
}: ButtonType) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.continue,
          style,
          transparentBackground && styles.transparentContinue,
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
    backgroundColor: "#a0272a",
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
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
