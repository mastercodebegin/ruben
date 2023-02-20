import React from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, ScrollView, ScrollViewBase, FlatList, Dimensions, ImageBackground, SafeAreaView } from "react-native";
import CartDetails from "../Cart";
import LandingPageController from "../LandingPageController";
import {
    LIGHT_GREY,
    DARK_RED,
    WHITE,
    MID_PEACH,
    PRIMARY
} from "../../assets/constants";
import {
    SEARCH,
    EXPLORE_BTN,
    CHICKEN, PORK,
    MEAT_IMAGE1,
    MEAT_IMAGE2,
    MEAT_IMAGE3,
    CART,
    badge,
    RATING
} from "../assets";
import BottomTab from "../BottomTab/BottomTab";
const scrollerData = [{ name: 'Pork', image: CHICKEN }, { name: 'Beef', image: PORK }, { name: 'Poul', image: CHICKEN }, { name: 'Pork', image: CHICKEN }, { name: 'Beef', image: PORK }, { name: 'Poul', image: CHICKEN }, { name: 'Pork', image: CHICKEN }, { name: 'Beef', image: PORK }, { name: 'Poul', image: CHICKEN }];
const list_data = [{ name: 'Vegetable Salad', price: '22.99', image: MEAT_IMAGE1 }, { name: 'Meat Dish1', price: '22.99', image: MEAT_IMAGE2 }, { name: 'Meat Dish2', price: '22.99', image: MEAT_IMAGE3 }, { name: 'Vegetable Salad', price: '22.99', image: MEAT_IMAGE1 }]
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
export default class ExplorePage extends LandingPageController {
    render() {
        const RenderItem = ({ item, rating }) => {
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
        const RenderItems = ({ rating }) => {
            return (
                <View>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemCategory}>PORK</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <Text style={styles.seeAll}>{'SEE ALL >'}</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList showsHorizontalScrollIndicator={false}
                        style={styles.flatList}
                        keyExtractor={(item, i) => String(i)}
                        horizontal
                        renderItem={({ item }) => <RenderItem rating={rating} item={item} />}
                        data={list_data} />
                </View>
            )
        }
        return (
            <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
            <ScrollView contentContainerStyle={{paddingBottom:80}} style={styles.main}>
                <View style={styles.innerContainer}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <Text style={styles.header}>Store</Text>
                        <View style={styles.textInputContainer}>
                            <View style={styles.searchContainer}>
                                <Image resizeMode="contain" style={styles.search} source={SEARCH} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Search any product..."
                                    placeholderTextColor={"#8D7D75"}
                                />
                            </View>
                            <View style={{ height: "100%" }}>
                                <TouchableOpacity style={styles.exploreBtn}>
                                    <Image
                                        style={styles.explore}
                                        resizeMode="contain"
                                        source={EXPLORE_BTN}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false}
                        style={{ marginLeft: 20 }}
                        horizontal>
                        {scrollerData.map((item, i) => (
                            <TouchableOpacity key={i} style={styles.scrollerItemContainer}>
                                <Image style={styles.scrollerImg} source={item?.image} />
                                <Text style={styles.scrollerText}>{item?.name}</Text>
                            </TouchableOpacity>))}
                    </ScrollView>
                    <RenderItems rating={false} />
                    <RenderItems rating={true} />
                </View>
            </ScrollView>
            <CartDetails/>
            </View>
            <BottomTab navigation={this.props.navigation} tabName={'Explore'}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: LIGHT_GREY,
    },
    innerContainer: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: 30
    },
    header: {
        fontWeight: "700",
        fontSize: 24,
        color: DARK_RED,
    },
    textInput: {
        backgroundColor: WHITE,
        paddingRight: 10,
        flex: 1,
        paddingLeft: 10,
        color: "black",
        borderRadius: 22,
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 15
    },
    search: {
        height: 20,
        width: 20,
        borderRadius: 17.5,
        marginLeft: 20,
    },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 22,
        backgroundColor: WHITE,
    },
    exploreBtn: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: WHITE,
        paddingHorizontal: 12,
        marginHorizontal: 10,
        borderRadius: 25,
    },
    flatList: { marginLeft: 20, paddingTop: 20 },
    explore: { height: 25, width: 25 },
    scrollerText: {
        color: DARK_RED,
        fontWeight: 'bold',
        fontSize: 19,
        paddingLeft: 8
    },
    scrollerImg: { height: 33, width: 33 },
    scrollerItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: WHITE,
        marginRight: 10,
        borderRadius: 27,
        alignItems: 'center'
    },
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
        fontWeight: 'bold'
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
