import React from "react"
import { View, ImageBackground, TouchableOpacity, FlatList, Text, Image, Dimensions, StyleSheet } from "react-native"
import { MEAT_IMAGE1, MEAT_IMAGE2, MEAT_IMAGE3, DARK_RED, MID_PEACH, WHITE, PRIMARY, LIGHT_GREY, CART, RATING, badge } from '../assets'
const list_data = [{ name: 'Vegetable Salad', price: '22.99', image: MEAT_IMAGE1 }, { name: 'Meat Dish1', price: '22.99', image: MEAT_IMAGE2 }, { name: 'Meat Dish2', price: '22.99', image: MEAT_IMAGE3 }, { name: 'Vegetable Salad', price: '22.99', image: MEAT_IMAGE1 }]
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
interface Types {
    rating: boolean,
    header?: false,
    item?: any
}
const RenderItem = ({ item, rating }: Types) => {
    return (
        <View style={styles.renderContainer}>
            <ImageBackground resizeMode="stretch"
                style={styles.itemImage} source={item?.image} >
                <View style={styles.offerContainer}>
                    {rating ?
                        (<View style={styles.ratingContainer}>
                            <TouchableOpacity style={styles.badgeContainer}>
                                <Image style={styles.badge} source={RATING} />
                            </TouchableOpacity>
                            <Text style={styles.rating}>{'4.8/5'}</Text>
                        </View>)
                        : <Text style={styles.offer}>{'-10% off'}</Text>}
                    <TouchableOpacity style={styles.badgeContainer}>
                        <Image resizeMode="contain" style={styles.badge} source={badge} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.productName}>{item?.name}</Text>
                <Text style={styles.description} numberOfLines={1}>Are you searching for ...</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{`$ ${item?.price}`}</Text>
                    <TouchableOpacity style={styles.cartContainer}>
                        <Image resizeMode="contain" style={styles.cart} source={CART} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
}
const RenderItems = ({ rating, header }: Types) => {
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
                renderItem={({ item }) => <RenderItem rating={rating} item={item} />}
                data={list_data} />
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
