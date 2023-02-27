import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
} from "react-native";
import {
  LIGHT_GREY,
  PRIMARY,
  MID_PEACH,
  DARK_RED,
  WHITE,
  profile_pic,
  whatsapp,
  mail,
  phone,
  instagram,
  facebook,
  CART,
} from "../assets";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import RenderItems from "../RenderItems/RenderItems";
import CommonStyle from "../commonStyles";
//@ts-ignore
import Modal from "./UpdateProfileModal";
export default class Myprofile extends LandingPageController {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              <Text style={CommonStyle.header}>My Profile</Text>
              <View style={styles.orderAlert}>
                <TouchableOpacity style={styles.cartContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.cart}
                    source={CART}
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.alertHeader}>New Order Alert</Text>
                  <Text style={styles.deliverydate}>
                    Est.delivery: Tuesday , 2nd March
                  </Text>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.viewDetail}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.profileContainer}>
                <View style={styles.blur} />
                <TouchableOpacity onPress={()=> this.setState({ showProfileModal: true })} style={styles.profile}>
                  <Image style={styles.profileImage} source={profile_pic} />
                  <Text style={styles.name}>Valdermar Forbsberg</Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.socialbutton}>
                      <Image style={styles.socialIcon} source={instagram} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialbutton}>
                      <Image style={styles.socialIcon} source={whatsapp} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialbutton}>
                      <Image style={styles.socialIcon} source={facebook} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={styles.headerText}>ABOUT ME</Text>
                  <Text numberOfLines={3} style={styles.description}>
                    Create a page represent who you are and what you do in one
                    link. Professional take control
                  </Text>
                  <Text style={styles.headerText}>MY CONTACT</Text>
                  <View style={styles.contact}>
                    <Image
                      resizeMode="contain"
                      style={styles.contactIcon}
                      source={mail}
                    />
                    <Text style={styles.contactText}>bonewala@gmail.com</Text>
                  </View>
                  <View style={styles.contact}>
                    <Image
                      resizeMode="contain"
                      style={styles.contactIcon}
                      source={phone}
                    />
                    <Text style={styles.contactText}>+1 123 4567 8910</Text>
                  </View>
                  <TouchableOpacity style={styles.historyButton}>
                    <Text style={styles.historyText}>Purchase History</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView
              style={{ marginLeft: 20, marginTop: 25 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => this.setState({ selectedTab: "favorite" })}
              >
                <Text
                  style={[
                    styles.selections,
                    this.state.selectedTab === "favorite" && styles.selected,
                  ]}
                >
                  My Favorites
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ selectedTab: "recomentation" })}
              >
                <Text
                  style={[
                    styles.selections,
                    this.state.selectedTab === "recomentation" &&
                      styles.selected,
                  ]}
                >
                  Recomentation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ selectedTab: "remaining" })}
              >
                <Text
                  style={[
                    styles.selections,
                    this.state.selectedTab === "remaining" && styles.selected,
                  ]}
                >
                  Remaning Inventory
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <RenderItems rating={false} />
            <TouchableOpacity style={styles.seeBtn}>
              <Text style={styles.seeText}>see All</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomTab navigation={this.props.navigation} tabName="Myprofile" />
        <Modal
          setVisibleProfileModal={() =>
            this.setState({ showProfileModal: false })
          }
          visible={this.state.showProfileModal}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cartContainer: {
    paddingVertical: 10,
    backgroundColor: LIGHT_GREY,
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: PRIMARY,
    alignSelf: "flex-start",
    marginRight: 20,
  },
  cart: { height: 30, width: 30 },
  seeText: { color: PRIMARY, fontSize: 17 },
  seeBtn: {
    marginHorizontal: 20,
    alignItems: "center",
    backgroundColor: WHITE,
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 25,
  },
  iconContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  selected: { color: DARK_RED, fontWeight: "bold" },
  historyText: { fontSize: 17, color: PRIMARY },
  contactText: {
    fontSize: 17,
    color: DARK_RED,
    paddingLeft: 20,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  contactIcon: { height: 20, width: 20 },
  blur: {
    backgroundColor: WHITE,
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    opacity: 0.6,
    borderRadius: 27,
  },
  socialbutton: {
    padding: 10,
    backgroundColor: LIGHT_GREY,
    marginHorizontal: 8,
    marginTop: 20,
    borderRadius: 20,
  },
  historyButton: {
    backgroundColor: LIGHT_GREY,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: DARK_RED,
    marginTop: 20,
  },
  selections: {
    marginRight: 15,
    fontSize: 17,
    color: MID_PEACH,
  },
  description: {
    color: DARK_RED,
    fontSize: 16,
    marginTop: 20,
  },
  profile: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: WHITE,
    borderRadius: 27,
  },
  socialIcon: {
    height: 20,
    width: 20,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    color: MID_PEACH,
    marginTop: 20,
  },

  name: {
    fontSize: 19,
    fontWeight: "bold",
    color: DARK_RED,
  },
  main: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    paddingTop: 40,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: DARK_RED,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  profileContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  orderAlert: {
    marginTop: 20,
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 30,
    flexDirection: "row",
  },
  alertHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: DARK_RED,
  },
  deliverydate: {
    color: MID_PEACH,
    fontSize: 17,
    marginVertical: 10,
  },
  detailsButton: {
    backgroundColor: PRIMARY,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
  },
  viewDetail: {
    color: WHITE,
    fontSize: 17,
  },
});
