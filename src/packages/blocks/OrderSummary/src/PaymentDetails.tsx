import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
interface MyDetailsTypes {
    header: string,
    list: Array<any>
    footer: any,
    isSubscribed:any
}
const PaymentDetails = ({ header, list, footer,isSubscribed }: MyDetailsTypes) => (
    <View style={styles.myDetail}>
        {Boolean(header) &&
            <View style={styles.seperatorLine}>
                <Text style={styles.headerText}>{header}</Text>
            </View>}
        {
            list.map((item) => {
                return ( item.question=='Lifetime Subscription' && !isSubscribed?null:
                  <View style={styles.myDetailContainer} key={item?.question}>
                    <View style={styles.flex}>
                        <Text style={styles.question}>{item?.question}</Text>
                    </View>
                    <View style={styles.flex}>
                        <Text style={styles.answer}>{item?.ans}</Text>
                    </View>
                  </View>
                )
            })
        }
        <View style={styles.seperatorLine}/>
        <View style={styles.myDetailContainer}>
          {<View style={styles.flex}>
              <Text style={styles.question}>{footer?.question}</Text>
          </View>}
          <View style={styles.flex}>
              <Text style={styles.answer}>{footer?.ans}</Text>
          </View>
        </View>
    </View>
)
export default PaymentDetails;
