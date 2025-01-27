import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
interface MyDetailsTypes {
    header: string,
    list: Array<any>
    footer: any,
    isSubscribed: any,
    isUserAlreadySubscribed: boolean
    is24HourDelivery: boolean
}
const PaymentDetails = ({ header, list, footer, isSubscribed, isUserAlreadySubscribed, is24HourDelivery }: MyDetailsTypes) => (
    <View style={styles.myDetail}>
        {Boolean(header) &&
            <View style={styles.seperatorLine}>
                <Text style={styles.headerText}>{header}</Text>
            </View>}
        {
            list.map((item) => {
                return (
                    <View style={styles.myDetailContainer} key={item?.question}>
                        <View style={styles.flex}>
                            <Text style={styles.question}>{item?.question}</Text>
                        </View>
                        <View style={styles.flex}>         
                          <Text style={styles.answer}>{`$${item?.ans}`}</Text>                           
                        </View>
                    </View>
                )
            })
        }
        <View style={styles.seperatorLine} />
        <View style={styles.myDetailContainer}>
            {<View style={styles.flex}>
                <Text style={styles.question}>{footer?.question}</Text>
            </View>}
            <View style={styles.flex}>
                {isUserAlreadySubscribed ?
                    <Text style={styles.answer}> ${footer?.ans}.00</Text> :
                    <Text style={styles.answer}> ${footer?.ans}.00</Text>
                }
            </View>
        </View>
    </View>
)
export default PaymentDetails;
