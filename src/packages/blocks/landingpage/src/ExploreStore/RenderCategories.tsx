import React from "react";
import { TouchableOpacity,Text,StyleSheet ,Image} from "react-native";
import {
    DARK_RED,
    WHITE
    //@ts-ignore
} from "../../assets/constants";
const RenderCategories = ({item,index,onpress}:any)=>{    
    return(
        <TouchableOpacity 
        onPress={()=>onpress(item?.attributes?.id)} 
        key={index} 
        style={styles.scrollerItemContainer}>
            <Image  style={styles.scrollerImg}
             source={{uri:item?.attributes?.icon?.url}} />
            <Text style={styles.scrollerText}>
                {item?.attributes.name}
            </Text>
        </TouchableOpacity>
    )
}
export default RenderCategories
const styles=StyleSheet.create({
    scrollerText: {
        color: DARK_RED,
        fontWeight: 'bold',
        fontSize: 19,
        paddingLeft: 15
    },
    scrollerImg: { height: 20, width: 20},
    scrollerItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 17,
        backgroundColor: WHITE,
        marginRight: 10,
        borderRadius: 33,
        alignItems: 'center'
    },
})