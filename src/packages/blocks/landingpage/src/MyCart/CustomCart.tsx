import React, { useState } from "react";
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
import { MEAT_IMAGE1, plus, remove } from "../assets";

interface CartType {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  label: string;
  imageStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  item: any;
}
const CustomCart = ({ item }: CartType) => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View>
      <View style={styles.continue}>
        <View>
          <Image
            resizeMode="stretch"
            source={MEAT_IMAGE1}
            style={styles.shadow}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold", left: 20 }}>{item.title}</Text>
            <View
              style={{ flexDirection: "row", position: "absolute", right: 30 }}
            >
              <Text style={{ color: "#A0272A" }}>$22.00 *</Text>
              <Text style={{ color: "#A0272A" }}>{count}</Text>
            </View>
            <TouchableOpacity
              style={{ top: 10, backgroundColor: "#F9F4F3", padding: 2 }}
            >
              <Image
                resizeMode="stretch"
                source={remove}
                style={{ height: 20, width: 20, tintColor: "#A0272A" }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={decreaseCount}
                style={{ backgroundColor: "#F9F4F3", borderRadius: 20 }}
              >
                <Image
                  resizeMode="stretch"
                  source={plus}
                  style={{ height: 15, width: 15, tintColor: "#A0272A" }}
                />
              </TouchableOpacity>
              <Text style={{ paddingHorizontal: 10, color: "#A0272A" }}>
                {count}
              </Text>
              <TouchableOpacity
                onPress={increaseCount}
                style={{ backgroundColor: "#F9F4F3", borderRadius: 20 }}
              >
                <Image
                  resizeMode="stretch"
                  source={plus}
                  style={{ height: 15, width: 15, tintColor: "#A0272A" }}
                />
              </TouchableOpacity>
            </View>

            <Text style={{ fontWeight: "bold", color: "#A0272A", right: 10 }}>
              $66.00
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CustomCart;
const styles = StyleSheet.create({
  continue: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    paddingVertical: 15,
  },
  shadow: { height: 50, width: 50 },
});
