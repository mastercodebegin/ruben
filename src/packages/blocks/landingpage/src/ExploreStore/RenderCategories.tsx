import React from "react";
import { TouchableOpacity,Text,StyleSheet ,Image} from "react-native";
import FastImage from 'react-native-fast-image'
import {
    DARK_RED,
    WHITE
    //@ts-ignore
} from "../../assets/constants";
import { CHICKEN } from "../assets";
const RenderCategories = ({item,index,setSubCategory}:any)=>{
    return(
        <TouchableOpacity onPress={()=>setSubCategory([
            {name:`${item?.attributes.name} sub 1`,icon:item?.attributes?.icon?.url},
            {name:`${item?.attributes.name} sub 2`,icon:item?.attributes?.icon?.url}
        ])} key={index} style={styles.scrollerItemContainer}>
            <Image  style={styles.scrollerImg}
             source={CHICKEN} />
            <Text style={styles.scrollerText}>{item?.attributes.name}</Text>
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
        paddingVertical: 12,
        backgroundColor: WHITE,
        marginRight: 10,
        borderRadius: 27,
        alignItems: 'center'
    },
})