import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
interface MyDetailsTypes {
    header: string,
    list: Array<any>
}
const MyDetails = ({ header, list }: MyDetailsTypes) => (
    <View style={styles.myDetail}>
        {Boolean(header) &&
            <View style={styles.seperatorLine}>
                <Text style={styles.headerText}>{header}</Text>
            </View>}
        {
            list.map((item, i) => {
                return (<View style={styles.myDetailContainer} key={item?.question}>
                    <View>
                        <Text style={styles.question}>{item?.question}</Text>
                    </View>
                    <View style={styles.flex}>
                        <Text  style={styles.answer}>{item?.ans}</Text>
                    </View>
                </View>)
            })
        }
    </View>
)
export default MyDetails;