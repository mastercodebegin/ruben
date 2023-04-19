import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY, DARK_RED, backArrow, cow, } from "../assets";
import Button from "../../../../components/src/CustomButton";

export default class Alert extends LandingPageController {

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
                        Alerts
                    </Text>
                </View>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.innercontainer}>
                        <View style={styles.imageDescription}>
                            <View style={styles.imageContainer}>
                                <Image source={cow} style={styles.imageStyle} />
                            </View>
                        </View>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{
                                    width: '48%',
                                    backgroundColor: '#fff',
                                    borderRadius: 20,
                                    marginVertical: 20,
                                    padding: 15,
                                    height: 120
                                }}>
                                    <Text style={{ fontSize: 16, color: 'grey' }}>
                                        Current Animal purchased</Text>
                                    <Text style={{
                                        fontSize: 22, fontWeight: '700',
                                        color: DARK_RED, position: 'absolute', bottom: 15, paddingHorizontal: 20
                                    }}>Cow</Text>
                                </View>
                                <View style={{
                                    width: '48%',
                                    backgroundColor: '#fff',
                                    borderRadius: 20,
                                    marginVertical: 20,
                                    padding: 15,
                                    height: 120
                                }}>
                                    <Text style={{ fontSize: 16, color: 'grey' }}>
                                        Total Cuts</Text>
                                    <Text style={{ fontSize: 22, fontWeight: '700', color: DARK_RED, position: 'absolute', bottom: 15, paddingHorizontal: 20 }}>10</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{
                                    width: '48%',
                                    backgroundColor: '#fff',
                                    borderRadius: 20,
                                    padding: 15,
                                    height: 120
                                }}>
                                    <Text style={{ fontSize: 16, color: 'grey' }}>
                                        Used Cuts</Text>
                                    <Text style={{
                                        fontSize: 22, fontWeight: '700',
                                        color: DARK_RED, position: 'absolute', bottom: 15, paddingHorizontal: 20
                                    }}>7</Text>
                                </View>
                                <View style={{
                                    width: '48%',
                                    backgroundColor: '#fff',
                                    borderRadius: 20,
                                    padding: 15,
                                    height: 120
                                }}>
                                    <Text style={{ fontSize: 16, color: 'grey' }}>
                                        Remaining Cuts</Text>
                                    <Text style={{ fontSize: 22, fontWeight: '700', color: DARK_RED, position: 'absolute', bottom: 15, paddingHorizontal: 20 }}>3 (10%)</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ marginTop: 80 }}>
                            <Button label={"Purchase New Animal"} onPress={() => alert('coming soon')} />
                        </View>
                    </View>


                </ScrollView>
                {/* <BottomTab navigation={this.props.navigation} tabName="Settings" /> */}
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: LIGHT_GREY,
    },
    innercontainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
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
    header: {
        fontSize: 27,
        fontWeight: "500",
        color: DARK_RED,
    },
    imageDescription: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginVertical: 10,
        alignSelf: 'center',
        // padding: 15
    },
    featuredFarmContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginVertical: 20,
        alignSelf: 'center',
        padding: 15
    },
    imageContainer: {

    },
    imageStyle: {
        height: 200,
        width: '100%',
        borderRadius: 20,
    },
    productImageStyle: {
        height: 150,
        width: '100%',
        borderRadius: 20
    }
});
