import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
interface CheckBoxTypes {
  checked: boolean;
  setChecked: (value: boolean) => void;
  testID?: string;
  backgroundColor: string | undefined;
  disabled?: boolean;
}
const CheckBox = ({
  checked,
  setChecked,
  testID,
  backgroundColor = "white",
  disabled,
}: CheckBoxTypes) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      testID={testID}
      onPress={() => setChecked(!checked)}
      style={{ ...styles.checkBox, backgroundColor: backgroundColor }}
    >
      {checked && <View style={styles.dot} />}
    </TouchableOpacity>
  );
};
export default CheckBox;
const styles = StyleSheet.create({
  checkBox: {
    height: 18,
    width: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 9,
  },
  dot: {
    backgroundColor: "#A0272A",
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
});
