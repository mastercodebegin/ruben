import React from "react";
import { View, Text } from "react-native";
import { styles } from "./InvoiceBilling";
import { DARK_RED } from "../../../components/src/constants";
import { styles as cstyle } from "./styles";
import moment from 'moment';
import { PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";

const RenderHeader = ({billingAddress,shippingAddress, deliveryDate }: any) => {
  
  function getDeliveryDate(date:Date) {
   return moment(date).format('DD MMM YYYY');

  }
  return (
    <View>
      <Text style={styles.date}>
        {"Date : "} <Text style={styles.boldDate}>{getDeliveryDate(new Date())}</Text>
      </Text>
      <Text style={styles.date}>
        {"Due Date : "} <Text style={styles.boldDate}>{getDeliveryDate(deliveryDate)}</Text>
      </Text>
      <View style={styles.greyContainer}>
        <Text style={{ color: TEXT_COLOR, fontSize: 17, fontWeight: "bold" }}>
          {"Bill to"}
        </Text>
        <Text style={styles.text}>{billingAddress?.name}</Text>
        <Text style={styles.text}>{billingAddress?.address}</Text>
        <Text style={styles.text}>{billingAddress?.zip_code}</Text>
        <Text style={cstyle.bill}>{"Shipping Address"}</Text>
        <Text style={styles.text}>{shippingAddress?.name}</Text>
        <Text style={styles.text}>{shippingAddress?.address}</Text>
        <Text style={styles.text}>{shippingAddress?.zip_code}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 3,
          borderBottomWidth: 0.5,
          borderBottomColor: PRIMARY_COLOR,
          paddingTop:20,
        }}
      >
        <View style={cstyle.number}>
          <Text style={[cstyle.text,{color:TEXT_COLOR}]}>{"#"}</Text>
        </View>
        <View style={{flex:1,flexDirection:"row",          justifyContent: "space-between"
}}>

          <Text style={[cstyle.text,{color:TEXT_COLOR}]}>{"Product"}</Text>
          <Text style={[cstyle.text,{paddingRight:0,color:SECONDARY_TEXT_COLOR}]}>{"Total"}</Text>
        </View>
      </View>
    </View>
  );
};
export default RenderHeader;
