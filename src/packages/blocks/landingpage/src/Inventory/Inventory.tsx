import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    TextInput,
    FlatList
} from "react-native";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY, DARK_RED, backArrow, SEARCH, EXPLORE_BTN, } from "../assets";
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
];


export default class Inventory extends LandingPageController {

    onChangeSearch = (searchText: string) => {
        this.setState({ searchText: searchText })
    }


    renderItem = (item: any) => {
        return (
            <View style={{ backgroundColor: '#fff', }}>
                <View style={{ marginHorizontal: 10, }}>
                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#fff' }}>
                        <View style={{ backgroundColor: '#E7E4DF', height: 15, width: 15, borderRadius: 20, }}></View>
                        <View style={{ flexDirection: 'row', left: 17 }}>
                            <Text style={{ color: DARK_RED, }}>ID :</Text>
                            <Text style={{ color: DARK_RED, }}>  {item.title}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: DARK_RED, fontWeight: '700', paddingHorizontal: 40 }}>Nonkoshi joyi</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '40%', }}>
                            <Text style={{ color: DARK_RED, fontWeight: '700' }}>Domestic</Text>
                            <Text style={{ color: 'yellow' }}>Pending</Text>
                        </View>
                        <Image source={backArrow} style={{ height: 10, width: 10 }} />
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
                        <Text style={{ color: DARK_RED }}>Date: </Text>
                        <Text style={{ color: DARK_RED }}>03/03/22</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
                        <Text style={{ color: DARK_RED }}>Items: </Text>
                        <Text style={{ color: DARK_RED }}>x3</Text>
                    </View>
                </View>


            </View>
        )
    }

    ItemSeparatorComponent = () => {
        return (

            <View style={{ backgroundColor: '#E7E4DF', height: 1, width: '100%', }}></View>

        )
    }

    render() {
        return (
            <SafeAreaView style={styles.main}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 20, paddingTop: 30,
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.header}>
                        Inventory
                    </Text>
                    <TouchableOpacity>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "700",
                            color: '#9B4850',
                        }}>
                            + New Order
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.innercontainer}>
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            width: '80%',
                            borderRadius: 40,
                        }}>
                            <Image source={SEARCH} style={{ height: 20, width: 20, left: 10 }} />
                            <TextInput
                                style={{ left: 20, color: '#E7E4DF', width: '70%' }}
                                value={this.state.searchText}
                                onChangeText={(searchText) => this.onChangeSearch(searchText)}
                                placeholder="Search any Product..."
                            />
                        </View>
                        <TouchableOpacity style={{ backgroundColor: '#fff', padding: 15, borderRadius: 30 }}>
                            <Image source={EXPLORE_BTN} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff', width: '30%', padding: 15, borderRadius: 30
                        }}>
                            <Text style={{ color: '#9B4850', }}>
                                Date
                            </Text>
                            <Image source={backArrow} style={{ height: 15, width: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff', width: '30%', padding: 15, borderRadius: 30
                        }}>
                            <Text style={{ color: '#9B4850', }}>
                                Offers
                            </Text>
                            <Image source={backArrow} style={{ height: 15, width: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff', width: '30%', padding: 15, borderRadius: 30
                        }}>
                            <Text style={{ color: '#9B4850', }}>
                                Status
                            </Text>
                            <Image source={backArrow} style={{ height: 15, width: 15 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    backgroundColor: '#fff', padding: 20, marginTop: 20, alignItems: 'center',
                }}>
                    <View style={{ backgroundColor: '#E7E4DF', height: 15, width: 15, borderRadius: 20, }}></View>
                    <Text style={{ color: '#E7E4DF', right: 40 }}>#Details</Text>
                    <Text style={{ color: '#E7E4DF', }}>Destination</Text>
                    <Text style={{ color: '#E7E4DF', right: 20 }}>Status</Text>
                </View>
                <View style={{height:'60%' , backgroundColor:'#fff'}}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                    />
                </View>
                {/* </ScrollView> */}
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
        // flex: 1,
        paddingHorizontal: 20,
    },
    label: {
        color: "grey",
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
