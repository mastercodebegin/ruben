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
    Platform,
    RefreshControl
} from "react-native";
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
    CHICKEN
} from "../assets";
import BottomTab from "../BottomTab/BottomTab";
//@ts-ignore
import RenderItems from '../RenderItems/RenderItems';
import { connect } from 'react-redux';
import DualButton from "../../../../components/src/DualButton";
import CommonLoader from "../../../../components/src/CommonLoader";
import { FlatList } from "react-native-gesture-handler";
//@ts-ignore
import RenderCategories from './RenderCategories'
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
            <ScrollView 
            onLayout={e=>{
                console.log(e);
            }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:80}}
            refreshControl={
                <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={()=>{
                    this.setState({refresh:true})
                    this.getCategory()
                }}
                // enabled={true}
                />
            }
            style={styles.main}>
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
                            <RenderCategories setSubCategory={(category:any)=>this.setState({subcategories:category,selectedSub:null})} item={item} index={index}/>
                        )
                    }}
                    />
                    <View style={styles.subContainer}>
                        {
                            this.state.subcategories.map((value:any,i)=>{
                        return (
                        <TouchableOpacity 
                            onPress={()=>this.setState({selectedSub:i})}
                            style={[styles.subcategory,{backgroundColor:this.state.selectedSub === i ? '#A0272A': WHITE,}]} key={i}>
                            <FastImage 
                             tintColor={this.state.selectedSub === i ? 'white': DARK_RED}
                             style={{height:25,width:25,marginRight:10,}}
                             source={CHICKEN}/>
                            <Text numberOfLines={1} style={{
                                fontSize:20,
                                color:this.state.selectedSub === i ? 'white': DARK_RED,
                                fontWeight:'500',
                                }}>{value?.name}</Text>
                        </TouchableOpacity>)
                            })
                        }
                    </View>
                    <RenderItems rating={false} />
                    <RenderItems rating={true} />
                </View>
            </ScrollView>
            {
                this.props.currentUser==='user'?
                <CartDetails/>:
            <DualButton button2Onpress={()=>this.props.navigation.navigate('AddProducts')} button1Label="Inventory" button2label="+ Add products"/>
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
 const ReduxExplorePage : any= connect(mapStateToProps,mapDispatchToProps)(ExplorePage);
export default ReduxExplorePage;

const styles = StyleSheet.create({
    subContainer:{flexDirection:'row',paddingHorizontal:20,},
    subcategory:{
        flex:1,
        alignItems:'center',
        paddingVertical:15,
        marginLeft:10,
        borderRadius:25,
        marginTop:20,
        flexDirection:'row',
        paddingHorizontal:10,
        overflow:'hidden',
        paddingLeft:14
    },
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

    rating: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
});
