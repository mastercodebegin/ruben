import React from "react";
import { View, Text } from "react-native";
import { styles as cstyle } from "./styles";

interface ListType {
  index: number;
  item: any;
}
const RenderProductList = ({ index, item }: ListType) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 5 }}>
      <View style={cstyle.indexContainer}>
        <Text style={cstyle.index}>{index+1}</Text>
      </View>
      <View style={cstyle.container}>
        <Text style={cstyle.boldText}>
          {item?.attributes?.catalogue?.data?.attributes?.categoryCode}
        </Text>
      </View>
      <View style={cstyle.container}>
        <Text style={cstyle.text}>
          {`$${item?.attributes?.catalogue?.data?.attributes?.price} X ${item?.attributes?.quantity}`}
        </Text>
      </View>
      <View style={cstyle.container}>
        <Text style={cstyle.boldText}>{`$${(Number(
          item?.attributes?.catalogue?.data?.attributes?.price
        ) * Number(item?.attributes?.quantity)).toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

export default RenderProductList;
