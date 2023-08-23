import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
const RenderFooter = ({ subTotal, total }: any) => {
  return (
    <View
      style={{
        alignItems: "flex-end",
        borderTopWidth: 0.5,
        borderTopColor: "grey",
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>Sub Total</Text>
        <Text style={styles.text}>{`$${subTotal?.toFixed(2)}`}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.boldText}>Total</Text>
        <Text style={styles.boldText}>{`$${total?.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

export default RenderFooter;
