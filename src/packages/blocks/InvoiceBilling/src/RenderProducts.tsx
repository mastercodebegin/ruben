import React from "react";
import { View, Text } from "react-native";
import { styles as cstyle } from "./styles";

interface ListType {
  index: number;
}
const RenderProductList = ({ index }: ListType) => {
  return (
    <View style={{ flexDirection: "row",paddingVertical:5 }}>
      <View style={cstyle.indexContainer}>
        <Text style={cstyle.index}>{index}</Text>
      </View>
      <View style={cstyle.container}>
        <Text style={cstyle.boldText}>Vegetable</Text>
      </View>
      <View style={cstyle.container}>
        <Text style={cstyle.text}>
          {"$34.00 X 3"}
        </Text>
      </View>
      <View style={cstyle.container}>
        <Text style={cstyle.boldText}>{"$120.00"}</Text>
      </View>
    </View>
  );
};

export default RenderProductList;
