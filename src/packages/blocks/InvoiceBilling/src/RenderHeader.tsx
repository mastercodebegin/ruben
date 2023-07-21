import React from "react";
import { View, Text } from "react-native";
import { styles } from "./InvoiceBilling";
import { DARK_RED } from "../../../components/src/constants";
import { styles as cstyle } from "./styles";
const RenderHeader = ({ data}:any) => {
  const date = new Date();
  
const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }
  return (
    <View>
      <Text style={styles.date}>
        {"Date : "} <Text style={styles.boldDate}>{formattedDate}</Text>
      </Text>
      <Text style={styles.date}>
        {"Due Date : "} <Text style={styles.boldDate}>{getDeliveryDate()}</Text>
      </Text>
      <View style={styles.greyContainer}>
        <Text style={{ color: DARK_RED, fontSize: 17, fontWeight: "bold" }}>
          {"Bill to"}
        </Text>
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.text}>{data.address}</Text>
        <Text style={cstyle.bill}>{"Shipping Address"}</Text>
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.text}>{data.address}</Text>
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
