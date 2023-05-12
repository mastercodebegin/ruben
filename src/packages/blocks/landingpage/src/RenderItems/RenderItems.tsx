import React from "react"
import { View, ImageBackground, TouchableOpacity, FlatList, Text, Image, Dimensions, StyleSheet } from "react-native"
import {DARK_RED, MID_PEACH, WHITE, PRIMARY, LIGHT_GREY, CART, RATING, badge } from '../assets'
import { useNavigation } from "@react-navigation/native"
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
interface Types {
    rating: boolean,
    header?: boolean,
    item?: any,
    onpressFav:(id:number)=>Promise<void>,
    onPressCart:(id:number)=>Promise<void>
}
const RenderItem = ({ item, rating,onpressFav ,onPressCart}: Types) => {
    const total = item?.attributes?.price;
    const partial = item?.attributes?.discount;
    const percentage = (partial / total) * 100;
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen')} style={styles.renderContainer}>
            <ImageBackground resizeMode="stretch"
                style={[item?.attributes?.images[0]?.url ? styles.itemImage : styles.itemNoImage]} source={{uri:item?.attributes?.images[0]?.url}}>
                <View style={styles.offerContainer}>
                    {rating ?
                        (<View style={styles.ratingContainer}>
                            <TouchableOpacity style={styles.badgeContainer}>
                                <Image style={styles.badge} source={RATING} />
                            </TouchableOpacity>
                            <Text style={styles.rating}>{item?.attributes?.average_rating + '/5'}</Text>
                        </View>)
                        : <Text style={styles.offer}>{'-' + percentage.toFixed(0) + '% off'}</Text>}
                    <TouchableOpacity onPress={()=>onpressFav(item?.id)}  style={styles.badgeContainer}>
                        <Image resizeMode="contain" style={styles.badge} source={badge} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.productName}>{item?.attributes?.name}</Text>
                <Text style={styles.description} numberOfLines={1}>{item?.attributes?.description}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{`$ ${item?.attributes?.price}` + "/Kg"}</Text>
                    <TouchableOpacity onPress={()=>onPressCart(item?.id)} style={styles.cartContainer}>
                        <Image resizeMode="contain" style={styles.cart} source={CART} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>)
}
const RenderItems = ({ rating, header, item,onpressFav,onPressCart }: Types) => {
    return (
        <View>
            {header && <View style={styles.itemHeader}>
                <Text style={styles.itemCategory}>PORK</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.seeAll}>{'SEE ALL >'}</Text>
                </TouchableOpacity>
            </View>}
            <FlatList showsHorizontalScrollIndicator={false}
                style={styles.flatList}
                keyExtractor={(item, i) => String(i)}
                horizontal
                renderItem={({ item }) => <RenderItem onPressCart={onPressCart} onpressFav={onpressFav} rating={rating} item={item} />}
                data={item} />
        </View>
    )
}
export default RenderItems


const styles = StyleSheet.create({
   

    flatList: { marginLeft: 20, paddingTop: 20 },
    renderContainer: {
        backgroundColor: WHITE,
        width: deviceWidth * 0.77,
        marginRight: 20,
        overflow: "hidden",
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 20
    },
    description: {
        fontSize: 17,
        color: MID_PEACH,
        paddingBottom: 15
    },
    price: {
        fontSize: 22,
        color: DARK_RED,
        fontWeight: 'bold'
    },
    itemImage: {
        height: deviceHeight * 0.20,
        width: '100%',
        borderRadius: 18,
        overflow: 'hidden'
    },
    itemNoImage: {
        height: deviceHeight * 0.20,
        width: '100%',
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: MID_PEACH
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20
    },
    offerContainer: {
        paddingTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemHeader: {
        paddingHorizontal: 20,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    offer: {
        color: WHITE,
        fontWeight: 'bold',
        fontSize: 17
    },
    badgeContainer: {
        backgroundColor: WHITE,
        padding: 10,
        borderRadius: 20
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: "center"
    },
    badge: { height: 20, width: 20 },
    rating: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    productName: {
        fontSize: 22,
        color: DARK_RED,
        fontWeight: 'bold',
        marginTop:15
    },
    cartContainer: {
        paddingVertical: 10,
        backgroundColor: LIGHT_GREY,
        borderRadius: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: PRIMARY
    },
    cart: { height: 20, width: 20 },
    itemCategory: {
        color: MID_PEACH,
        fontWeight: 'bold',
        fontSize: 17
    },
    seeAll: {
        color: DARK_RED,
        fontWeight: 'bold',
        fontSize: 17
    }
});
