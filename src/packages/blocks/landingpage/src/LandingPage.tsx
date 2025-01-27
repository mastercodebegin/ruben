import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { APP_BACKGROUND, BUTTON_TEXT_COLOR_PRIMARY, PRIMARY_COLOR, TEXT_COLOR, homeBackground, splashScreenImage } from "./assets";
import BottomTab from "./BottomTab/BottomTab";
import CartDetails from "./Cart";
import BlogPostCard from "./BlogPostCard";
import CommonLoader from "../../../components/src/CommonLoader";
import { store } from "../../../components/src/utils"; 
import { connect } from 'react-redux';

// Customizable Area End

import LandingPageController, {
  Props,
  configJSON
} from "./LandingPageController";

export default class LandingPage extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  postCard = () => {};
  onpressExploreStore = () => {
    this.props.navigation.navigate("ExplorePage");
  };
  async componentDidMount() {
    super.componentDidMount();
    await this.getblogPosts.bind(this)();
     this.getCart.bind(this)();
    this.getHomePageInfo.bind(this)()
    this.setNotificationToken.bind(this)();
  }
  // Customizable Area End

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* Customizable Area Start */}
        <View style={{ flex: 1 }}>
          <FlatList
            testID="imgBlogPost"
            data={this.state.imageBlogList}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:70}}
            ListHeaderComponent={() => (
              <View style={styles.landingPageView}>
                <ImageBackground
                  style={styles.imageBgr}
                  resizeMode="contain"
                  source={{uri:this.state.homePageInfo?.attributes?.images[0].url}}
                >
                  <Image
                    style={[styles.appLogo,]}
                    resizeMode="contain"
                    source={splashScreenImage}
                  />
                  <Text style={[styles.header,{color:'white'}]}>{this.state.homePageInfo?.attributes?.title} </Text>
                  <Text style={[styles.description,{color:'white'}]}>
                  {this.state.homePageInfo?.attributes?.description}
                  </Text>
                  <TouchableOpacity
                    onPress={()=>this.onpressExploreStore()}
                    style={[styles.explorebtn, {height: 50}]}
                  >
                    <Text style={styles.exploreBtn}>Explore Store</Text>
                  </TouchableOpacity>
                </ImageBackground>
                <View style={styles.blogPostContainer}>
                  <Text style={styles.post}>Blog Posts</Text>
                </View>
              </View>
            )}
            keyExtractor={(_:any,index)=>{
              return _?.id
            }}
            renderItem={({item,index}) =>{
              if(item?.attributes?.enable){
              return  (
              <View style={{marginBottom:10}}>
                <BlogPostCard type={'image'} item={item} />
              </View>
            )}
          return <></>}}
          />
          {store.getState().currentUser === 'user' &&this.props.cartDetails.length>0 && <CartDetails numberOfItem={this.props.cartDetails.length} />}
        </View>
        <BottomTab navigation={this.props.navigation} tabName={"Home"} />
        <CommonLoader visible={this.state.show_loader}/>
        {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const mapDispatchToProps = (dispatch:any) => {
  return {
    updateCartDetails: (payload:any) => {
      dispatch({type:'UPDATE_CART_DETAILS',payload})},
  };
};

const mapStateToProps = (reducer:any) => {    
 return {
  cartDetails: reducer?.cartDetails,
 };
};
export const ReduxLandingPage : any= connect(mapStateToProps,mapDispatchToProps)(LandingPage);
const styles = StyleSheet.create({
  landingPageView: {
    flex: 1,
  },
  exploreBtn: {
    fontSize: 20,
    paddingVertical: 7,
    color: BUTTON_TEXT_COLOR_PRIMARY,
    paddingHorizontal: 30,
    marginVertical: 5,
    fontWeight: "700",
  },
  header: {
    fontSize: 30,
    color: TEXT_COLOR,
    fontFamily: "Gilroy-Heavy",
  },
  description: {
    color: TEXT_COLOR,
    fontSize: 16,
    width: "70%",
    marginTop: 10,
  },
  landingPageText: {
    fontSize: 42,
    letterSpacing: 2,
    fontWeight: "bold",
    color: TEXT_COLOR,
    marginTop: 15,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: APP_BACKGROUND,
  },
  post: {
    color: TEXT_COLOR,
    paddingLeft: 20,
    fontWeight: "600",
    fontSize: 23,
  },
  card: {
    backgroundColor: APP_BACKGROUND,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 10,
  },
  blogText: {
    fontSize: 17,
    color: TEXT_COLOR,
    paddingBottom: 10,
  },
  blogPostHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  blogPostContainer: {
    borderLeftWidth: 4,
    borderLeftColor: "#A0272A",
    marginVertical: 15,
    paddingVertical: 5,
  },
  profile: { height: 40, width: 40, borderRadius: 20 },
  nameContainer: { flex: 1, paddingLeft: 15 },
  share: { height: 20, width: 20 },
  bottomIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
    paddingHorizontal: 20,
    marginTop: -40,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  cart: {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    fontSize: 17,
  },
  name: { fontSize: 20, color: TEXT_COLOR, fontWeight: "700" },
  time: { color: "grey", fontSize: 17 },
  number: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#5c2221",
  },
  numContainer: {
    backgroundColor: "#F8F8F4",
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkout: {
    fontSize: 17,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: "#F8F8F4",
    marginLeft: 15,
    borderRadius: 17,
    color: "#A0272A",
    borderWidth: 1,
    borderColor: "#A0272A",
  },
  appLogo: {
    height: 80,
    width:100,
    marginBottom: 30,
  },
  imageBgr: { paddingHorizontal: 20 },
  container: { flexGrow: 1, paddingBottom: 90 },
  explorebtn: {
    alignSelf: "flex-start",
    marginVertical: 20,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 27,
  },
});
// Customizable Area End
