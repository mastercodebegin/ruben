import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
interface MyDetailsTypes {
    header: string,
    list: Array<any>
}
const MyDetails = ({ header, list }: MyDetailsTypes) => (
    <View style={styles.myDetail}>
        {Boolean(header) &&
            <View style={styles.seperatorLine}>
                <Text style={[styles.headerText,{color:TEXT_COLOR}]}>{header}</Text>
            </View>}
        {
            list.map((item, i) => {
                return (<View style={styles.myDetailContainer} key={item?.question}>
                    <View>
                        <Text style={[styles.question,{color:TEXT_COLOR}]}>{item?.question}</Text>
                    </View>
                    <View style={{width:'70%',}}>
                        <Text numberOfLines={1} style={[styles.answer,
                            {alignSelf:'flex-start',marginLeft:22,color:SECONDARY_TEXT_COLOR}]}>{item?.ans}</Text>
                    </View>
                </View>)
            })
        }
    </View>
)
export default MyDetails;