import React from "react";
import { View, Text } from "react-native";
import { styles } from "./InvoiceBilling";
import { DARK_RED } from "../../../components/src/constants";
import { styles as cstyle } from "./styles";
const RenderHeader = () => {
  return (
    <View>
      <Text style={styles.date}>
        {"Date : "} <Text style={styles.boldDate}>{"09 Mar 2023"}</Text>
      </Text>
      <Text style={styles.date}>
        {"Due Date : "} <Text style={styles.boldDate}>{"09 Mar 2023"}</Text>
      </Text>
      <View style={styles.greyContainer}>
        <Text style={{ color: DARK_RED, fontSize: 17, fontWeight: "bold" }}>
          {"Bill to"}
        </Text>
        <Text style={styles.text}>{"Reactial"}</Text>
        <Text style={styles.text}>{"Vat. No. 123123132"}</Text>
        <Text style={styles.text}>{"11 stone Road"}</Text>
        <Text style={styles.text}>{"Clinton , NJ 0809000"}</Text>
        <Text style={cstyle.bill}>{"Bill to"}</Text>
        <Text style={styles.text}>{"11 stone Road"}</Text>
        <Text style={styles.text}>{"Clinton , NJ 0809000"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 3,
          borderBottomWidth: 0.5,
          borderBottomColor: "grey",
          paddingTop:20
        }}
      >
        <View style={cstyle.number}>
          <Text style={cstyle.text}>{"#"}</Text>
        </View>
        <View style={cstyle.center}>
          <Text style={cstyle.text}>{"Product"}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={cstyle.center}>
          <Text style={cstyle.text}>{"Total"}</Text>
        </View>
      </View>
    </View>
  );
};
export default RenderHeader;
