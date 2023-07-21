import React from "react"
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { styles } from './MyOrdersScreen'
import { DARK_RED, LIGHT_GREY } from "../../../../components/src/constants";
//@ts-ignore
import meatimage from '../../../../components/src/meatimage@2.jpg';

const monthShortNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

const RenderItem = ({ item }: any) => {
    const date = new Date(item?.attributes?.delivered_at)

    return (
        <View style={rstyles.main}>
            <Text style={rstyles.date}>
                {`${monthShortNames[date.getMonth()]} ${date.getDay()}TH, ${date.getFullYear()}`}
            </Text>
            <View style={rstyles.imageContainer}>
                <Image style={{height:50,width:50,borderRadius:10}} source={meatimage}/>
                <View style={rstyles.inner}>
                    <View style={styles.row}>
                        <Text style={styles.productName}>
                            {item?.attributes?.catalogue?.data?.attributes?.name}
                        </Text>
                        <Text style={styles.price}>
                            {`$ ${item?.attributes?.price
                                } X ${item?.attributes?.quantity}`}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.count}>{'-'}</Text>
                            </TouchableOpacity>
                            <Text style={styles.counter}>{item?.attributes?.quantity}</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.count}>{'+'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={rstyles.price}>
                            {`$${Number(item?.attributes?.price) * Number(item?.attributes?.quantity)}`}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={rstyles.duration}>
                <Text style={{ color: DARK_RED, fontSize: 16 }}>Estimated Delivery</Text>
                <Text style={rstyles.deliveryDate}>
                    {`${monthShortNames[date.getMonth()]} ${date.getDay()}TH, ${date.getFullYear()}`}
                </Text>
            </View>
            <View style={rstyles.deliveryEstimater}>
                <View style={rstyles.estimater} />
            </View>
        </View>
    )
}

const rstyles = StyleSheet.create({
    main: { width: '100%', paddingBottom: 15, backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 20 },
    date: { fontWeight: 'bold', color: 'grey', fontSize: 15, paddingBottom: 10 },
    duration: { flexDirection: "row", paddingTop: 25, justifyContent: 'space-between', paddingBottom: 10 },
    deliveryDate: { fontWeight: 'bold', color: 'grey', fontSize: 15, paddingBottom: 10 },
    imageContainer: { flexDirection: 'row', width: '100%' },
    price: { color: DARK_RED, fontSize: 16, fontWeight: 'bold' },
    inner: { flex: 1, paddingLeft: 10, justifyContent: 'space-between' },
    estimater: { backgroundColor: DARK_RED, width: '50%', height: '100%' },
    deliveryEstimater:{ height: 5, backgroundColor: LIGHT_GREY, width: '100%' }
})
export default RenderItem;