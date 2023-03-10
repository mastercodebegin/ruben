import React from "react";
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    SafeAreaView,
    Platform } from "react-native";
import CartDetails from "../Cart";
import LandingPageController from "../LandingPageController";
import {
    LIGHT_GREY,
    DARK_RED,
    WHITE,
    PRIMARY
    //@ts-ignore
} from "../../assets/constants";
import {
    SEARCH,
    EXPLORE_BTN,
    CHICKEN, PORK,
    beef_image,
    lamp_image,
    honey_image
} from "../assets";
import BottomTab from "../BottomTab/BottomTab";
const scrollerData = [{ name: 'Pork', image: PORK }, { name: 'Beef', image: beef_image }, { name: 'Poul', image: CHICKEN }, { name: 'Lamp', image: lamp_image },{name:'Honey',image:honey_image}];
//@ts-ignore
import RenderItems from '../RenderItems/RenderItems';
import { connect } from 'react-redux';
import DualButton from "../../../../components/src/DualButton";
  class ExplorePage extends LandingPageController {
    render() {
        
        return (
            <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:80}} style={styles.main}>
                <View style={styles.innerContainer}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <Text style={styles.header}>Store</Text>
                        <View style={styles.textInputContainer}>
                            <View style={styles.searchContainer}>
                                <Image resizeMode="stretch" style={styles.search} source={SEARCH} />
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
                    bounces={false}
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
            {
                this.props.currentUser==='user'?
                <CartDetails/>:
            <DualButton button1Label="Inventory" button2label="+ Add products"/>
            }
            </View>
            <BottomTab navigation={this.props.navigation} tabName={'Explore'}/>
            </SafeAreaView>
        );
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
      updateUser: () => {
        dispatch({type:'UPDATE_USER',payload:'merchant'})},
    };
  };
  
const mapStateToProps = (reducer:any) => {    
   return {
     currentUser: reducer?.currentUser,
   };
 };
export default connect(mapStateToProps,mapDispatchToProps)(ExplorePage);

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
        paddingVertical:Platform.OS === 'ios'? 15:undefined
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
        paddingLeft: 15
    },
    scrollerImg: { height: 20, width: 20,tintColor:DARK_RED},
    scrollerItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: WHITE,
        marginRight: 10,
        borderRadius: 27,
        alignItems: 'center'
    },
    rating: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
});
