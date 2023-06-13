import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
const RenderFooter = () => {
  return (
    <View
      style={{
        alignItems: "flex-end",
        borderTopWidth: 0.5,
        borderTopColor: "grey",
        paddingTop: 10,
        paddingBottom:10
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>Sub Total</Text>
        <Text style={styles.text}>{"$600.00"}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.boldText}>Total</Text>
        <Text style={styles.boldText}>{"$600.00"}</Text>
      </View>
    </View>
  );
};

export default RenderFooter;
