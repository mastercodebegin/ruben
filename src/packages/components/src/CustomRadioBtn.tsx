import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../blocks/landingpage/src/assets";
interface CheckBoxTypes {
  checked: boolean;
  setChecked?: (value: boolean) => void;
  testID?: string;
  backgroundColor?: string;
  disabled?: boolean;
  selectorTestID?: string;
}
const CheckBox = ({
  checked,
  setChecked,
  testID,
  backgroundColor = "white",
  disabled,
  selectorTestID
}: CheckBoxTypes) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      testID={testID}
      //@ts-ignore
      onPress={() =>  setChecked(!checked)}
      style={{ ...styles.checkBox, backgroundColor: backgroundColor }}
    >
      {checked && <View testID={selectorTestID} style={styles.dot} />}
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
    borderWidth:.1
  },
  dot: {
    backgroundColor: PRIMARY_COLOR,
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
});
