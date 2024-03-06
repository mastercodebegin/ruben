import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { TEXT_COLOR } from "../../landingpage/src/assets";
const RenderFooter = ({ subTotal, total, params }: any) => {  
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
        <View>
          <Text style={styles.text}>Sub Total</Text>
          <Text style={styles.text}>Shipping Charges</Text>
          {params?.discount ? <Text style={styles.text}>Discount</Text> : null}
          <Text style={styles.text}>Delivery Charges</Text>
          {params?.lifetimeSubscription ? <Text style={styles.text}>Lifetime Subscription</Text> : null}
          {params?.product_discount ? <Text style={styles.text}>Product Discount</Text> : null}
          {params?.deliveryIn24Hours ? <Text style={styles.text}>Deliver in 24 hrs</Text> : null}
          {params?.meat_storage_amount ? <Text style={styles.text}>Meat Storage </Text> : null}
          <Text style={styles.boldText}>Total</Text>
        </View>
        <View>
          <Text style={[styles.text,{textAlign:"right",color:TEXT_COLOR}]}>{`$${Number(params?.subTotal).toFixed(2)}`}</Text>
          <Text style={[styles.text,{textAlign:"right",color:TEXT_COLOR}]}>{`$${Number(params?.shippingCharge).toFixed(2)}`}</Text>
          {params?.discount ? <Text style={[styles.text,{textAlign:"right"}]}>{`-$${Number(params?.discount).toFixed(2)}`}</Text> : null}
          <Text style={[styles.text, { textAlign: "right" }]}>{`$${Number(params?.deliveryCharge).toFixed(2)}`}</Text>
          {params?.lifetimeSubscription ? <Text style={[styles.text, { textAlign: "right" }]}>{`$${Number(params?.lifetimeSubscription).toFixed(2)}`}</Text> : null}
          {params?.product_discount  ? <Text style={[styles.text, { textAlign: "right" }]}>{`$${Number(params?.params?.product_discount ).toFixed(2)}`}</Text> : null}
          {params?.deliveryIn24Hours ?<Text style={[styles.text, { textAlign: "right" }]}>{`$${Number(params?.deliveryIn24Hours).toFixed(2)}`}</Text>: null}
          
          {params?.meat_storage_amount ?<Text style={[styles.text, { textAlign: "right" }]}>{`$${Number(params?.meat_storage_amount).toFixed(2)}`}</Text>: null}
          <Text style={[styles.boldText, { textAlign: "right" }]}>{`$${Number(params?.total).toFixed(2)}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderFooter;
