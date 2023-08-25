import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
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
          {params?.lifetimeSubscriptionCharge ? <Text style={styles.text}>Lifetime Subscription</Text>:null}
          <Text style={styles.boldText}>Total</Text>
        </View>
        <View>
          <Text style={[styles.text,{textAlign:"right"}]}>{`$${subTotal?.toFixed(2)}`}</Text>
          <Text style={[styles.text,{textAlign:"right"}]}>{`$${new Number(params?.shipping).toFixed(2)}`}</Text>
          {params?.discount ? <Text style={[styles.text,{textAlign:"right"}]}>{`-$${new Number(params?.discount).toFixed(2)}`}</Text> : null}
          <Text style={[styles.text, { textAlign: "right" }]}>{`$${new Number(params?.deliveryCharge).toFixed(2)}`}</Text>
          {params?.lifetimeSubscriptionCharge ? <Text style={[styles.text, { textAlign: "right" }]}>{`$${new Number(params?.lifetimeSubscriptionCharge).toFixed(2)}`}</Text> : null}
          <Text style={[styles.boldText, { textAlign: "right" }]}>{`$${new Number(total)?.toFixed(2)}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderFooter;
