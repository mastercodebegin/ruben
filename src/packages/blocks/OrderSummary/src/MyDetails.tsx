import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
interface MyDetailsTypes {
    header: string,
    list: Array<any>
}
const MyDetails = ({ header, list }: MyDetailsTypes) => (
    <View style={[styles.myDetail,{backgroundColor:'white'}]}>
        {Boolean(header) &&
            <View style={styles.seperatorLine}>
                <Text style={styles.headerText}>{header}</Text>
            </View>}
        {
            list.map((item, i) => {
                return (<View style={styles.myDetailContainer} key={item?.question}>
                    <View style={{width:'26%',backgroundColor:'white'}}>
                        <Text style={styles.question}>{item?.question}</Text>
                    </View>
                    <View style={{width:'80%',backgroundColor:'white'}}>
                        <Text style={styles.answer}>{item?.ans}</Text>
                    </View>
                </View>)
            })
        }
    </View>
)
export default MyDetails;