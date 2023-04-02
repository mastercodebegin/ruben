import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Text,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import {
    LIGHT_GREY,
    DARK_RED,
    backArrow
} from "../assets";
import LandingPageController from "../LandingPageController";
import CustomCart from "./CustomCart";
import Button from "../../../../components/src/CustomButton";
//@ts-ignore
const DATA = [
    {
        title: 'Meat 1',
        title2: 'goo',
    },
    {
        title: 'Beaf Head',
        title2: 'goo'
    },
    {
        title: 'Chicken',
        title2: 'goo'
    },
    {
        title: 'Meat 1',
        title2: 'goo',
    },
    {
        title: 'Beaf Head',
        title2: 'goo'
    },
];


export default class MyCart extends LandingPageController {
    constructor(props: any) {
        super(props);
        this.receive = this.receive.bind(this);
    }
    onpressContinue = () => {
        alert('coming soon')
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.main}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 30, }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backContainer}
                    >
                        <Image style={styles.back} source={backArrow} />
                    </TouchableOpacity>
                    <Text style={styles.header}>
                        My Cart
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ alignSelf: 'center' }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
                            <View style={styles.checkBox}>
                                <View style={styles.dot}></View>
                            </View>
                            <View style={styles.horizontalLine} />
                            <View style={styles.checkBox}></View>
                            <View style={styles.horizontalLine} />
                            <View style={styles.checkBox}></View>
                            <View style={styles.horizontalLine} />
                            <View style={styles.checkBox}></View>
                        </View>
                        <View style={styles.cartProcessDetails}>
                            <Text style={styles.cartTextStyle}>My Cart</Text>
                            <Text style={{ color: 'grey' }}>Personal Details</Text>
                            <Text style={{ color: 'grey' }}>Summary</Text>
                            <Text style={{ color: 'grey' }}>Payment</Text>
                        </View>
                    </View>
                    <View style={styles.cartItemsContainer}>
                        <View style={{ flexDirection: 'row', padding: 15 }}>
                            <Text style={styles.addedTextStyle}>ADDED ITEMS</Text>
                            <Text style={styles.totalItemsCountStyle}>  (03)</Text>
                        </View>
                        <View style={styles.fullHorizontalLine} />
                        <View style={{ height: '80%' }}>
                            <FlatList
                                data={DATA}
                                renderItem={({ item }) => <CustomCart item={item} />}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, paddingHorizontal: 20 }}>
                        {/* <View style={{ alignSelf: 'center' }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
                                <View style={styles.checkBox}>
                                    <View style={styles.dot}></View>
                                </View>
                                <View style={styles.horizontalLine} />
                                <View style={styles.checkBox}></View>
                                <View style={styles.horizontalLine} />
                                <View style={styles.checkBox}></View>
                                <View style={styles.horizontalLine} />
                                <View style={styles.checkBox}></View>
                            </View>
                            <View style={styles.cartProcessDetails}>
                                <Text style={styles.cartTextStyle}>My Cart</Text>
                                <Text style={{ color: 'grey' }}>Personal Details</Text>
                                <Text style={{ color: 'grey' }}>Summary</Text>
                                <Text style={{ color: 'grey' }}>Payment</Text>
                            </View>
                        </View> */}
                        {/* <View style={styles.cartItemsContainer}>
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={styles.addedTextStyle}>ADDED ITEMS</Text>
                                <Text style={styles.totalItemsCountStyle}>  (03)</Text>
                            </View>
                            <View style={styles.fullHorizontalLine} />
                            <View style={{backgroundColor:'red' , height:'80%'}}>
                                <FlatList
                                    data={DATA}
                                    renderItem={({ item }) => <CustomCart item={item} />}
                                    keyExtractor={item => item.id}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>

                        </View> */}
                        <View style={styles.dashedBorderStyle}>
                            <Text style={styles.discountText}>Enter Discount Code</Text>
                            <TouchableOpacity>
                                <Text style={styles.fetchText}>Fetch Directly</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.paymentDetailsContainer}>
                            <View style={{ padding: 15 }}>
                                <Text style={styles.addedTextStyle}>PAYMENT DETAILS</Text>
                            </View>
                            <View style={styles.fullHorizontalLine} />
                            <View>
                                <View style={styles.paymentDetails}>
                                    <Text style={styles.paymentTextStyle}>Subtotal</Text>
                                    <Text style={styles.valueTextStyle}>$360.00</Text>
                                </View>
                                <View style={styles.paymentDetails}>
                                    <Text style={styles.paymentTextStyle}>Discount</Text>
                                    <Text style={styles.valueTextStyle}>-$60.00 (10%)</Text>
                                </View>
                                <View style={styles.paymentDetails}>
                                    <Text style={styles.paymentTextStyle}>Shipping Charges</Text>
                                    <Text style={styles.valueTextStyle}>$0.00</Text>
                                </View>
                                <View style={styles.fullHorizontalLineDetails} />
                                <View style={styles.paymentDetails}>
                                    <Text style={styles.paymentTextStyle}>Total</Text>
                                    <Text style={styles.valueTextStyle}>300.00</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.termsTextStyle}>*terms & conditions apply</Text>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Button label={"Continue to Personal Details"} onPress={this.onpressContinue} />
                            <TouchableOpacity style={styles.cancleButtonStyle}>
                                <Text style={styles.cancleTextButton}>Cancle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    backContainer: {
        padding: 5,
        alignSelf: "flex-start",
        marginTop: 20,
        marginBottom: 20,
    },
    back: {
        height: 20,
        width: 20,
    },
    main: {
        flex: 1,
        backgroundColor: LIGHT_GREY,
        paddingTop: 20,
    },
    header: {
        fontSize: 27,
        fontWeight: "500",
        color: DARK_RED,
    },
    checkBox: {
        height: 18,
        width: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 9,
    },
    dot: {
        backgroundColor: "#A0272A",
        height: 9,
        width: 9,
        borderRadius: 4.5,
    },
    horizontalLine: {
        height: 1,
        backgroundColor: 'grey',
        width: 80
    },
    fullHorizontalLine: {
        height: 0.5,
        backgroundColor: 'grey',
        width: '100%',
    },
    fullHorizontalLineDetails: {
        height: 0.5,
        backgroundColor: 'grey',
        width: '100%',
        marginVertical: 15
    },
    cartProcessDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cartTextStyle: {
        color: '#A0272A'
    },
    cartItemsContainer: {
        height: 300,
        width: '97%',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginVertical: 20,
        alignSelf: 'center'
    },
    paymentDetailsContainer: {
        height: 230,
        width: '97%',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginVertical: 20,
        alignSelf: 'center'
    },
    addedTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color: 'grey',
    },
    totalItemsCountStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color: 'grey',
    },
    dashedBorderStyle: {
        flexDirection: 'row', justifyContent: 'space-between', borderStyle: 'dashed',
        borderWidth: 1, padding: 15, borderRadius: 40, borderColor: '#A0272A'
    },
    discountText: { color: '#A0272A', fontWeight: 'bold' },
    fetchText: { fontWeight: 'bold', color: 'grey' },
    paymentDetails: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 5 },
    paymentTextStyle: { color: 'grey', fontSize: 16 },
    valueTextStyle: { color: '#A0272A', fontSize: 16 },
    termsTextStyle: { color: 'grey', fontSize: 16 },
    cancleButtonStyle: {
        borderRadius: 28,
        alignItems: "center",
        backgroundColor: "#EFDBD8",
        borderColor: '#A0272A',
        borderWidth: 1,
        bottom: 10
    },
    cancleTextButton: {
        color: '#A0272A',
        fontWeight: "300",
        fontSize: 20,
        paddingVertical: 15,
    }
});
