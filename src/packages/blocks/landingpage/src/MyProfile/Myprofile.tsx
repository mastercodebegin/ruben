import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  Linking 
} from "react-native";
import {
  LIGHT_GREY,
  PRIMARY,
  MID_PEACH,
  DARK_RED,
  WHITE,
  whatsapp,
  mail,
  phone,
  instagram,
  facebook,
  CART,
  cow,
} from "../assets";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import RenderItems from "../RenderItems/RenderItems";
import CommonStyle from "../commonStyles";
import CommonLoader from "../../../../components/src/CommonLoader";
//@ts-ignore
import Modal from "./UpdateProfileModal";
export default class Myprofile extends LandingPageController {
  constructor(props: any) {
    super(props);
    this.receive = this.receive.bind(this);
  }
  //@ts-ignore
  componentDidMount(){
    if(this.props?.route?.params?.firstTime){
      this.setState({showProfileModal:true})
    }else{
      this.getProfileDetails()
    }
  }
  openFacebookProfile = () => {
    Linking.openURL(`${this.state.facebook_link}`).catch(() => {
      this.showAlert('Invalid User name please update your profile')
    });
  };

  redirectToInstagramProfile = () => {
    Linking.openURL(`${this.state.instagram_link}`).catch(() => {
      this.showAlert('Invalid User name please update your profile')
    });
  };

  redirectToWhatsAppProfile = () => {
    Linking.openURL(`${this.state.whatsapp_link}`).catch(() => {
      this.showAlert('Invalid User name please update your profile')
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
              <Text style={CommonStyle.header}>My Profile</Text>
              <View style={styles.orderAlert}>
                <TouchableOpacity onPress={this.userdetailsProps.getuserDetails} style={styles.cartContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.cart}
                    source={CART}
                  />
                </TouchableOpacity>
                <View style={{flex:1}}>
                  <Text style={styles.alertHeader}>New Order Alert</Text>
                  <Text  style={styles.deliverydate}>
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
                  {this.state.profileImage != '' && (<Image style={styles.profileImage}
                  source={
                    {uri:this.state.profileImage?.path ?
                      this.state.profileImage?.path :
                      this.state.profileImage}
                  } 
                  />)}
                  <Text style={styles.name}>{this.state.name}</Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.socialbutton} 
                     onPress={this.redirectToInstagramProfile} >
                      <Image style={styles.socialIcon} source={instagram} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialbutton}
                     onPress={this.redirectToWhatsAppProfile}>
                      <Image style={styles.socialIcon} source={whatsapp} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialbutton} 
                    onPress={this.openFacebookProfile}>
                      <Image style={styles.socialIcon} source={facebook} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={styles.headerText}>ABOUT ME</Text>
                  <Text numberOfLines={3} style={styles.description}>{
                    this.state.about_me
                  }
                  </Text>
                  <Text style={styles.headerText}>MY CONTACT</Text>
                  <View style={styles.contact}>
                    <Image
                      resizeMode="contain"
                      style={styles.contactIcon}
                      source={mail}
                    />
                    <Text style={styles.contactText}>{this.state.email}</Text>
                  </View>
                  <View style={styles.contact}>
                    <Image
                      resizeMode="contain"
                      style={styles.contactIcon}
                      source={phone}
                    />
                    <Text style={styles.contactText}>{'+91 '}{this.state.phone_number}</Text>
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
                onPress={() => this.setState({ selectedTab: "MyFavoritesScreen" })}
              >
                <Text
                  style={[
                    styles.selections,
                    this.state.selectedTab === "MyFavoritesScreen" && styles.selected,
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
            {this.state.selectedTab == "remaining" ?
              <View style={styles.remainingInvContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={styles.invImageContainer}>
                    <Image
                      resizeMode="contain"
                      style={styles.invImgStyle}
                      source={cow}
                    />
                  </View>
                  <View style={styles.invDesContainer}>
                    <Text style={styles.invDesText}>Total Available cuts</Text>
                    <Text style={styles.invTotalText}>10</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.CreditsButton}
                  onPress={() => { this.props.navigation.navigate("MyCreditScreen") }} >
                  <Text style={styles.viewDetail}>My Credits</Text>
                </TouchableOpacity>
              </View>
              :
              <>
                <RenderItems rating={false} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.state.selectedTab)} style={styles.seeBtn}>
                  <Text style={styles.seeText}>see All</Text>
                </TouchableOpacity>
              </>
            }
          </View>
        </ScrollView>
        {
            <CommonLoader visible={this.state.loader}/>
        }
        {!this.props?.route?.params?.firstTime && <BottomTab navigation={this.props.navigation} tabName="Myprofile" />}
        
        <Modal
          setVisibleProfileModal={() =>
            this.setState({ showProfileModal: false })
          }
          //@ts-ignore
          getProfileDetails={this.getProfileDetails.bind(this)}
          state={this.state}
          firstTime={this.props?.route?.params?.firstTime}
          navigation={this.props.navigation}
          setState={(state={})=>{                        
            this.setState({...state})}}
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
  innerContainer:{ flex: 1, paddingHorizontal: 20 },
  remainingInvContainer: {
    backgroundColor: WHITE,
    margin: 20,
    overflow: "hidden",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20
  },
  invImageContainer: {
    width: '40%',
    height: 120,
  },
  invImgStyle: {
    width: '100%',
    height: '100%'
  },
  invDesContainer: {
    width: '60%',
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  invDesText: {
    color: MID_PEACH,
    fontSize: 14,
    textTransform: "uppercase"
  },
  invTotalText: {
    color: DARK_RED,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  CreditsButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
    marginTop: 15
  }
});
