import React from "react"
import { Text, View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native"
import { styles } from './MyOrdersScreen'
import { DARK_RED, LIGHT_GREY, PRIMARY } from "../../../../components/src/constants";
//@ts-ignore
import meatimage from '../../../../components/src/meatimage@2.jpg';
import moment from 'moment';
import { APP_BACKGROUND, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../../landingpage/src/assets";
const RenderProducts = ({ item, index }: any) => {   
    const frequency = item.attributes?.frequency;      
    return (
        <View key={index} style={rstyles.imageContainer}>
        <Image style={{height:50,width:50,borderRadius:10}} source={meatimage}/>
        <View style={rstyles.inner}>
            <View style={styles.row}>
                <Text style={[styles.productName,{fontWeight:"bold"}]}>
                    {item?.attributes?.catalogue_variant?.data?.attributes?.variantType||item?.attributes?.catalogue?.data?.attributes?.name}
                    {frequency &&  <Text style={[styles.productName,{fontSize:8}]}>{"(S)"}</Text>}
                    </Text>
                    <View>
                <Text style={styles.price}>
                    {`$ ${item?.attributes?.catalogue?.data?.attributes?.price
                        } X ${item?.attributes?.quantity}`}
                        </Text>
                        <Text style={{color:SECONDARY_TEXT_COLOR,fontSize:16,fontWeight:"bold",textAlign:"right"}}>{`$${(Number(item?.attributes?.catalogue?.data?.attributes?.price)*Number(item?.attributes?.quantity)).toFixed(2)}`}</Text>
                    </View>
            </View>
        </View>
    </View>
    )
}
const getDeliveryPercentage = (startDate: Date, endDate: Date) => {
    if (!(startDate && endDate)) {
        return 0;
    }
    const currentDate = new Date();
    if (endDate.getTime() <= currentDate.getTime() && startDate.getTime() <= currentDate.getTime()) {
        return 100;
    }
    const findDateDifference = (startDate: Date, endDate: Date) => {
        const timeDifferenceMillisecond = endDate.getTime() - startDate.getTime();
        return (timeDifferenceMillisecond / (1000 * 60 * 60 * 24));
    }
    if (startDate.getTime() < endDate.getTime()) {
        const totalDayDifference = findDateDifference(startDate, endDate);
        const remainingDayDifference = findDateDifference(currentDate, endDate);
        const passedDays = totalDayDifference - remainingDayDifference;
        const percentage = Math.round(((passedDays / totalDayDifference) * 100));
        if (typeof percentage === 'number') {
            return percentage < 0 ? 0 : percentage;
        }
        return 0;
        
    }
}
const RenderItem = ({ item, cancelOrder, selectedStatus }: any) => {     
    const isCompleted = item?.attributes?.status === 'completed';
    const isCanceled = item?.attributes?.status === 'cancelled';    
    const onPressCancel = () => {
        Alert.alert('Alert', "Are you sure to cancel order", [{ text: 'cancel' },{text:"yes",onPress:()=>cancelOrder(item?.id)}])
    }
    const date = new Date(item?.attributes?.created_at);    
    const deliveryDate = new Date(item?.attributes?.delivery_date);
    if ((selectedStatus === 'completed' && item?.attributes?.status === 'on_going')) {
        return <></>;
    }
    if ((selectedStatus === 'ongoing' && (isCompleted || isCanceled))) {
        return <></>;
    }
    return (
        <View style={{paddingHorizontal:20}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={[rstyles.date,{color:SECONDARY_TEXT_COLOR}]}>
                {moment(date).format('MMM Do, YYYY')?.toUpperCase() || ''}
            </Text>
               {(isCompleted || isCanceled)?  <Text style={{fontSize:17,color:isCanceled ? "red" : "green"}}>{isCanceled ? 'Cancelled':'Delivered'}</Text>:<TouchableOpacity onPress={onPressCancel}>
                    <Text style={{color:TEXT_COLOR,fontSize:16,fontWeight:"bold"}}>{ "Cancel Order"}</Text>
                </TouchableOpacity> }            
            </View>
        <View style={rstyles.main}>
                {
                    item?.attributes?.order_items?.data.map((item:any,i:number) => {
                        return <RenderProducts  item={item} index={i} />
                        
                    })
           }
                
                {
                    (isCompleted || isCanceled )? <></> :
                        <><View style={rstyles.duration}>
                            <Text style={{ color: TEXT_COLOR, fontSize: 16 }}>Estimated Delivery</Text>
                            <Text style={rstyles.deliveryDate}>
                                {moment(deliveryDate).format('MMM Do, YYYY')?.toUpperCase() || ''}
                            </Text>
                        </View>
                            <View style={rstyles.deliveryEstimater}>
                                <View style={{ ...rstyles.estimater, width: `${getDeliveryPercentage(date, deliveryDate)}%` }} />
                                
                            </View>
                        </>}
        </View>
        </View>
    )
}

const rstyles = StyleSheet.create({
    main: { width: '100%', paddingBottom: 15, backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 20 },
    date: { fontWeight: 'bold', color: TEXT_COLOR, fontSize: 15, paddingBottom: 10 },
    duration: { flexDirection: "row", paddingTop: 25, justifyContent: 'space-between', paddingBottom: 10 },
    deliveryDate: { fontWeight: 'bold', color: SECONDARY_TEXT_COLOR, fontSize: 15, paddingBottom: 10 },
    imageContainer: { flexDirection: 'row', width: '100%',paddingVertical:10 },
    price: { color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold' },
    inner: { flex: 1, paddingLeft: 10, justifyContent: 'space-between' },
    estimater: { backgroundColor: PRIMARY_COLOR, width: '70%', height: '100%' },
    deliveryEstimater:{ height: 5, backgroundColor: TEXT_COLOR, width: '100%' }
})
export default RenderItem;