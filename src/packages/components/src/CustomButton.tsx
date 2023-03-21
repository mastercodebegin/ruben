import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  Image,
  View,
  TextStyle
} from "react-native";

interface ButtonType {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  label: String;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
}
const Button = ({ style = {}, onPress, label = "", labelStyle = {}, containerStyle }: ButtonType) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress} style={[styles.continue, style]}>
        <Text style={[styles.text, labelStyle]}>{label}</Text>
      </TouchableOpacity>
      <Image resizeMode="stretch" source={require('./shadow.png')} style={styles.shadow} />
    </View>
  );
};
export default Button;
const styles = StyleSheet.create({
  continue: {
    borderRadius: 28,
    alignItems: "center",
    backgroundColor: "#a0272a",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    paddingVertical: 15,
  },
  shadow: { height: 50, width: "100%", top: -10, zIndex: -10, },
});
