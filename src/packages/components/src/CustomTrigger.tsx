import React, { useRef } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
interface TriggerProps {
  value: boolean;
  setValue: (value: boolean) => void;
  testID?: string;
}

const Trigger = ({
  value = false,
  setValue = () => {},
  testID,
}: TriggerProps) => {
  const animatedValue = useRef(new Animated.Value(value ? 22 : 3)).current;
  const onpressTrigger = () => {
    if (!value) {
      Animated.timing(animatedValue, {
        duration: 600,
        toValue: 22,
        useNativeDriver:true
      }).start(() => setValue(true));
      return;
    }
    Animated.timing(animatedValue, {
      duration: 600,
      toValue: 3,
      useNativeDriver:true
    }).start(() => setValue(false));
  };
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onpressTrigger}
      style={styles.trigger}
    >
      <Animated.View
        style={[
          styles.scroller,
          { transform: [{ translateX: animatedValue }] },
        ]}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  scroller: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    borderRadius: 15,
  },
  trigger: {
    backgroundColor: "#34C759",
    width: 55,
    height: 32,
    justifyContent: "center",
    borderRadius: 25,
  },
});
export default Trigger;
