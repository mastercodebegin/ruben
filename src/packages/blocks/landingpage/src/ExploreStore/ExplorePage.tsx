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
    //@ts-ignore
} from "../../assets/constants";
import {
    SEARCH,
    EXPLORE_BTN,
} from "../assets";
import BottomTab from "../BottomTab/BottomTab";
//@ts-ignore
import RenderItems from '../RenderItems/RenderItems';
import { connect } from 'react-redux';
import DualButton from "../../../../components/src/DualButton";
import CommonLoader from "../../../../components/src/CommonLoader";
import { FlatList } from "react-native-gesture-handler";
import FastImage from 'react-native-fast-image'
  class ExplorePage extends LandingPageController {
    constructor(props:any) {
        super(props);
        this.receive = this.receive.bind(this);
    }
    //@ts-ignore
    componentDidMount() {
        this.getCategory.bind(this)()
    }
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
                    <FlatList data={this.state.categories} 
                    horizontal
                    style={{marginLeft:20}}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
                            <TouchableOpacity key={index} style={styles.scrollerItemContainer}>
                                <FastImage style={styles.scrollerImg} source={{uri:item?.attributes?.icon?.url}} />
                                <Text style={styles.scrollerText}>{item?.attributes.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    />
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
            {this.state.show_loader && <CommonLoader visible={this.state.show_loader}/>}
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
