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
  ScrollView,
} from "react-native";
import {
  homeBackground,
  splashScreenImage,
  sampleProfile,
  shareIcon,
  blogpostimage,
} from "./assets";
import CartDetails from "./Cart";

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
  onpressExploreStore=()=>{
    this.props.navigation.navigate('ExplorePage')
  }
  // Customizable Area End

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* Customizable Area Start */}
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.landingPageView}>
            <ImageBackground
              style={styles.imageBgr}
              resizeMode="stretch"
              source={homeBackground}
            >
              <Image
                style={styles.appLogo}
                resizeMode="contain"
                source={splashScreenImage}
              />
              <Text style={styles.header}>Back </Text>
              <Text style={styles.header}>to Nature.</Text>
              <Text style={styles.description}>
                The designations employed and the presentation of material in
                the information product do not simply.
              </Text>
              <TouchableOpacity onPress={this.onpressExploreStore} style={styles.explorebtn}>
                <Text style={styles.exploreBtn}>Explore Store</Text>
              </TouchableOpacity>
            </ImageBackground>
            <View style={styles.blogPostContainer}>
              <Text style={styles.post}>Blog Posts</Text>
            </View>
            <View style={styles.card}>
              <View style={{ paddingHorizontal: 15 }}>
                <View style={styles.blogPostHeader}>
                  <Image
                    style={styles.profile}
                    resizeMode="contain"
                    source={sampleProfile}
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>Masool El Toure</Text>
                    <Text style={styles.time}>5 min ago</Text>
                  </View>
                  <TouchableOpacity>
                    <Image
                      resizeMode="contain"
                      style={styles.share}
                      source={shareIcon}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.blogText} numberOfLines={2}>
                  The placeholder text used in design when creating content. It
                  helps designer plan out where the
                </Text>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{ width: "100%", borderRadius: 10, height: 200 }}
                    resizeMode="stretch"
                    source={blogpostimage}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <CartDetails/>
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  landingPageView: {
    flex: 1,
  },
  exploreBtn: {
    fontSize: 20,
    paddingVertical: 14,
    backgroundColor: "#a02721",
    color: "white",
    paddingHorizontal: 30,
    borderRadius: 27,
    marginVertical: 5,
    fontWeight: "700",
  },
  header: {
    fontWeight: "700",
    fontSize: 24,
    color: "#5C2221",
  },
  description: {
    color: "#8D7D75",
    fontSize: 19,
    width: "70%",
  },
  landingPageText: {
    fontSize: 42,
    letterSpacing: 2,
    fontWeight: "bold",
    color: "#323441",
    marginTop: 15,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8F4F4",
  },
  post: {
    color: "#A0272A",
    paddingLeft: 20,
    fontWeight: "600",
    fontSize: 23,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 10,
  },
  blogText: {
    fontSize: 17,
    color: "#5c2221",
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
    color: "#5c2221",
    fontWeight: "bold",
    fontSize: 17,
  },
  name: { fontSize: 20, color: "#5c2221", fontWeight: "700" },
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
    height: 60,
    width: 60,
    marginTop: 20,
    marginBottom: 30,
  },
  imageBgr: { paddingHorizontal: 20 },
  container: { flexGrow: 1 },
  explorebtn: { alignSelf: "flex-start", marginVertical: 20 },
});
// Customizable Area End
