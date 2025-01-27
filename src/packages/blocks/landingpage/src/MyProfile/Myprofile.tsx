import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  Linking,
  FlatList,
  Dimensions,
} from "react-native";
import {
  LIGHT_GREY,
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
  TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
  BUTTON_COLOR_PRIMARY,
  BUTTON_TEXT_COLOR_PRIMARY,
  PRIMARY_COLOR,
  APP_BACKGROUND,
} from "../assets";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import CommonStyle from "../commonStyles";
import CommonLoader from "../../../../components/src/CommonLoader";
import Modal from "./UpdateProfileModal";
import RenderProducts from "./RenderProducts";
import Dropdown from "../../../Inventory/src/DropDown";



interface Item {
  id: string;
  image:string;
  attributes: {
    additionalDescription?: string;
    description: string;
    categoryCode: string;
    catalogue_id:{},
    catalogue_variants: {
      attributes: {
        price: number;
      };
    }[];
    productImage?: string;
  };
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default class Myprofile extends LandingPageController {
  constructor(props: any) {
    super(props);
    this.receive = this.receive.bind(this);

  }
  async componentDidMount() {
    if (this.props?.route?.params?.firstTime) {
      this.setState({
        showProfileModal: true,
        email: this.props.route?.params?.email
          ? this.props.route?.params?.email
          : "",
      });
    } else {
      this.getProfileDetails();
      this.props.navigation.addListener('focus', () => {
        this.getFavorites();
      });
    }
  }
  flatlistRef: any = React.createRef();
  openFacebookProfile = () => {
    if (this.state.facebook_link === "") {
      this.showAlert("Invalid User name please update your profile");
    } else {
      Linking.openURL(`${this.state.facebook_link}`)?.catch(() => {
        this.showAlert("Invalid User name please update your profile");
      });
    }
  };

  redirectToInstagramProfile = () => {
    if (this.state.instagram_link === "") {
      this.showAlert("Invalid User name please update your profile");
    } else {
      Linking.openURL(`${this.state.instagram_link}`)?.catch(() => {
        this.showAlert("Invalid User name please update your profile");
      });
    }
  };

  redirectToWhatsAppProfile = () => {
    if (this.state.whatsapp_link === "") {
      this.showAlert("Invalid User name please update your profile");
    } else {
      Linking.openURL(`${this.state.whatsapp_link}`)?.catch(() => {
        this.showAlert("Invalid User name please update your profile");
      });
    }
  };
  showButton() {
    if (this.state.selectedTab === 'MyFavoritesScreen' && Array.isArray(this.state.showFavoriteList)) {
      return this.state.showFavoriteList.length !== 0;
    }
    if (this.state.selectedTab === 'Recomendations' && Array.isArray(this.state.productList)) {
      return this.state.productList.length !== 0;
    }
    return true;
  }
  navigateToDetailsPage(item:Item) {
    console.log('pass props-----',this.state.selectedTab,item);
    
    
   this.props.navigation.navigate("ProductDetailScreen", 
   this.state.selectedTab=='MyFavoritesScreen'?{
      id: item?.attributes?.catalogue_id?.data?.id,
      description: item?.attributes?.catalogue_id?.data?.attributes?.additionalDescription?
      item?.attributes?.catalogue_id?.data?.attributes?.additionalDescription: 
      item?.attributes?.catalogue_id?.data?.attributes?.description,
      name: item?.attributes?.catalogue_id?.data?.attributes?.name,
      price:'',
      isFavourite:item?.attributes?.catalogue_id?.data?.attributes?.favouriteable_enable,
      image:item?.attributes?.catalogue_id?.data?.attributes?.productImage,
      productList:[item?.attributes?.catalogue_id?.data]
    }:{
      id: item?.id,
      description: item?.attributes?.additionalDescription?item?.attributes?.additionalDescription:item?.attributes?.description,
      name: item?.attributes?.categoryCode,
      image:item?.attributes?.productImage ,
      isFavourite:item?.attributes?.favouriteable_enable,
mmendations: true,
      productList:[item]
    }
    )
  }

  navigateToNext() {

    if(this.state.remainingproduct[0]?.total_cuts!=undefined)
    {                      
      this.props.navigation.navigate("MyCreditScreen",{selectedCategoryId:this.state.selectedCategoryID,remainingCuts:this.state.remainingproduct[0]?.remaining_cuts});
    }
    else{

      this.showAlert(" Place an order to display the values of the cuts")
    }
  }
  renderItem({ item }: any) {
    const props = this.state.selectedTab === 'MyFavoritesScreen' ? {
      name: item?.attributes?.catalogue_id?.data?.attributes?.categoryCode,
      image:
        Array.isArray(item?.attributes?.catalogue_id?.data?.attributes?.images) ?
          item?.attributes?.catalogue_id?.data?.attributes?.productImage :
          '',
      description: item?.attributes?.catalogue_id?.data?.attributes?.description,
      discount: item?.attributes?.catalogue_id?.data?.attributes?.discount,
      id: item?.id,
      isFavourite:item?.attributes?.catalogue_id?.data?.attributes?.favouriteable_enable,
      navigate: ()=>this.navigateToDetailsPage.bind(this)(item),
      price: item?.attributes?.catalogue_id?.data?.attributes?.price,
      onPressRemoveFromFav: () => {this.setState({isFavouriteFunctionCallingFromProfile:true})
        this.AddToFavorites(item?.attributes?.catalogue_id?.data?.id);
      },
      onPressAddToCart: () => {
        this.navigateToDetailsPage.bind(this)(item)
      },
    } : {
      name: item?.attributes?.categoryCode,
      image:item?.attributes?.productImage ,
      description: item?.attributes?.description,
      discount: item?.attributes?.order_items?.data[0]?.attributes?.catalogue?.data?.attributes?.discount,
      id: item?.id,
      isFavourite:item?.attributes?.favouriteable_enable,
    navigate: ()=>this.navigateToDetailsPage.bind(this)(item),
      price: item?.attributes?.price,
      onPressRemoveFromFav: () => {
        this.setState({ isRecommended:true,isFavouriteFunctionCallingFromProfile:true })
        this.AddToFavorites(item?.id)
      },
      onPressAddToCart: () => {
        this.navigateToDetailsPage.bind(this)(item)
      },
      isRecommendations: false,
    }

    console.log('props----------',props);
    
    return (
      <RenderProducts
        {...props}
      />
    );
  }
  getList() {
    const productsList = this.state.selectedTab === 'MyFavoritesScreen' ? this.state.showFavoriteList : this.state.productList.slice(0, 5);
    return productsList;
  }
  getImage() {
    return this.state.profileImage?.path
      ? this.state.profileImage.path
      : this.state.profileImage
  }
  renderProfileImage() {
    return (
      <>
        {this.state.profileImage != "" ? (
          <Image
            style={styles.profileImage}
            testID="updated_profile_id"
            source={{
              uri: this.getImage(),
            }}
          />
        ) : <View style={ styles.profileImage}></View>}
      </>
    )
  }
  onPressMyFav() {
    this.setState({ selectedTab: "MyFavoritesScreen",isRecommended:false })
    if (this.state.showFavoriteList.length) {
      this.flatlistRef.current?.scrollToIndex({ index: 0, animated: false })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
              <Text style={CommonStyle.header}>My Profile</Text>
              <View style={styles.orderAlert}>
                <TouchableOpacity
                  onPress={this.userdetailsProps.getuserDetails}
                  style={styles.cartContainer}
                >
                  <Image
                    resizeMode="contain"
                    style={[styles.cart,{tintColor:PRIMARY_COLOR}]}
                    source={CART}
                  />

                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.alertHeader,{color:TEXT_COLOR}]}>New Order Alert </Text>
                  <Text style={[styles.deliverydate,{color:SECONDARY_TEXT_COLOR}]}>Est.Delivery:</Text>
                  <TouchableOpacity
                    testID="navigate_myorder_id"
                    onPress={() =>
                      this.props.navigation.navigate("MyOrdersScreen")
                    }
                    style={[styles.detailsButton]}
                  >
                    <Text style={styles.viewDetail}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.profileContainer}>
                <View style={styles.blur} />
                <TouchableOpacity
                  testID="edit_profile_test_id"
                  onPress={() => this.setState({ showProfileModal: true })}
                  style={styles.profile}
                >
                  {this.renderProfileImage()}
                  <Text style={styles.name}>{this.state.name}</Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      style={styles.socialbutton}
                      onPress={this.redirectToInstagramProfile}
                    >
                      <Image style={[styles.socialIcon]} source={instagram} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.socialbutton}
                      onPress={this.redirectToWhatsAppProfile}
                    >
                      <Image style={styles.socialIcon} source={whatsapp} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.socialbutton}
                      onPress={this.openFacebookProfile}
                    >
                      <Image style={styles.socialIcon} source={facebook} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={styles.headerText}>ABOUT ME</Text>
                  <Text numberOfLines={3} style={styles.description}>
                    {this.state.about_me}
                  </Text>
                  <Text style={styles.headerText}>MY CONTACTS </Text>
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
                    <Text style={styles.contactText}>
                      {this.state.phone_number}
                    </Text>
                  </View>
                  <TouchableOpacity style={[styles.historyButton,{backgroundColor:BUTTON_COLOR_PRIMARY}]}>
                    <Text style={[styles.historyText,{color:BUTTON_TEXT_COLOR_PRIMARY}]}>Purchase History</Text>
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
                testID="go_to_favorites_id"
                onPress={this.onPressMyFav.bind(this)}
              >
                <Text
                  style={[
                    styles.selections,
                    this.state.selectedTab === "MyFavoritesScreen" &&
                    styles.selected,
                  ]}
                >
                  My Favorites 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="go_to_recomendations_id"
                onPress={() => {
                  (!this.state.productList.length) && this.getRecommendProduct(false);
                  if (this.state.productList.length) {
                    this.flatlistRef.current?.scrollToIndex({ index: 0, animated: false });
                  }
                  this.setState({ selectedTab: "Recomendations",isFavouriteFunctionCallingFromProfile:false })
                }}
              >
                <Text
                  style={[
                    styles.selections,
                    this.state.selectedTab === "Recomendations" &&
                    styles.selected,
                  ]}
                >
                  Recommendation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ selectedTab: "remaining",isMyProfile:true })
                  this.getCategories()
                  console.log("categories----", this.state.categories);
                }}
              >
                <Text
                  style={[
                    styles.selections,
                    this.state.selectedTab === "remaining" && styles.selected,
                  ]}
                >
                  Remaining inventory
                </Text>
              </TouchableOpacity>
            </ScrollView>
            {this.state.selectedTab == "remaining" ? (
              <View style={styles.remainingInvContainer}>

                <Dropdown 
                searchCategory={(categoryName: string) => {

                  const data:any = this.state.categories.filter((name:any) => name?.attributes?.name == categoryName)
                  this.setState({ selectedCategoryID: data[0].id,selectedCategory:categoryName })
                  console.log('id====================',data[0].id)
                  
                  this.getRemainingProduct(data[0].id)
                }}
                  isCategory selectedDate=""
                   data={this.state.categories} 
                   selectedStatus={this.state.selectedCategory}
                  label="Select Category"
                  />
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >


                  <View style={styles.invImageContainer}>
                    <Image
                      resizeMode="contain"
                      style={styles.invImgStyle}
                      source={cow}
                    />
                  </View>
                  <View style={styles.invDesContainer}>
                    <Text style={styles.invDesText}>Total Available cuts</Text>
                    <Text style={styles.invTotalText}>{this.state.remainingproduct[0]?.remaining_cuts}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <>
                {(this.getList()?.length && (this.state.selectedTab === 'MyFavoritesScreen' || this.state.selectedTab === 'Recomendations')) ?
                  (<>
                    <FlatList
                      data={this.getList()}
                      horizontal
                      testID="favorites_list_id"
                      ref={this.flatlistRef}
                      numColumns={1}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.contentContainer}
                      bounces={false}
                      renderItem={this.renderItem.bind(this)}
                      keyExtractor={(_, index) => {
                        return String(index);
                      }}
                    /></>) :
                  <View style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 17, color: TEXT_COLOR, fontWeight: "bold" }}>{"No products!"}</Text>
                  </View>
                }

                {this.showButton() ? <TouchableOpacity
                  testID="see_all_button"
                  onPress={() => {
                    console.log(`selected tab${this.state.selectedTab}`)
                    this.props.navigation.navigate(this.state.selectedTab)
                  }
                  }
                  style={styles.seeBtn}
                >
                  <Text style={styles.seeText}>See All</Text>
                </TouchableOpacity> : <></>}
              </>
            )}
          </View>
        </ScrollView>
        {<CommonLoader visible={this.state.loader} />}
        {!this.props?.route?.params?.firstTime && (
          <BottomTab navigation={this.props.navigation} tabName="Myprofile" />
        )}

        <Modal
          setVisibleProfileModal={() =>
            this.setState({ showProfileModal: false })
          }
          //@ts-ignore
          getProfileDetails={this.getProfileDetails.bind(this)}
          state={this.state}
          firstTime={this.props?.route?.params?.firstTime}
          navigation={this.props.navigation}
          setState={(state = {}) => {
            this.setState({ ...state });
          }}
          visible={this.state.showProfileModal}
        />
      </SafeAreaView>
    );
  }
}

export const styles = StyleSheet.create({
  cartContainer: {
    paddingVertical: 10,
    backgroundColor: APP_BACKGROUND,
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    alignSelf: "flex-start",
    marginRight: 20,
  },
  cart: { height: 30, width: 30 },
  seeText: { color: BUTTON_TEXT_COLOR_PRIMARY, fontSize: 17 },
  seeBtn: {
    marginHorizontal: 20,
    alignItems: "center",
    backgroundColor: BUTTON_COLOR_PRIMARY,
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
  selected: { color: TEXT_COLOR, fontWeight: "bold" },
  historyText: { fontSize: 17, color: TEXT_COLOR },
  contactText: {
    fontSize: 17,
    color: TEXT_COLOR,
    paddingLeft: 20,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  contactIcon: { height: 20, width: 20,tintColor:PRIMARY_COLOR },
  blur: {
    backgroundColor: WHITE,
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    opacity: 0.6,
    borderRadius: 27,

  },
  socialbutton: {
    padding: 10,
    backgroundColor: APP_BACKGROUND,
    marginHorizontal: 8,
    marginTop: 20,
    borderRadius: 20,
  },
  historyButton: {
    backgroundColor: LIGHT_GREY,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
  },
  selections: {
    marginRight: 15,
    fontSize: 17,
    color: SECONDARY_TEXT_COLOR,
  },
  description: {
    color: TEXT_COLOR,
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
    tintColor:PRIMARY_COLOR
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    color: TEXT_COLOR,
    marginTop: 20,
  },

  name: {
    fontSize: 19,
    fontWeight: "bold",
    color: TEXT_COLOR,
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
    borderColor: PRIMARY_COLOR,
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
    backgroundColor: BUTTON_COLOR_PRIMARY,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
  },
  viewDetail: {
    color: BUTTON_TEXT_COLOR_PRIMARY,
    fontSize: 17,
  },
  innerContainer: { flex: 1, paddingHorizontal: 20 },
  remainingInvContainer: {
    backgroundColor: WHITE,
    margin: 20,
    overflow: "hidden",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  invImageContainer: {
    width: "40%",
    height: 120,
  },
  invImgStyle: {
    width: "100%",
    height: "100%",
  },
  invDesContainer: {
    width: "60%",
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
  },
  invDesText: {
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14,
    textTransform: "uppercase",
  },
  invTotalText: {
    color: TEXT_COLOR,
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 8,
  },
  CreditsButton: {
    width: "100%",
    alignItems: "center",
    backgroundColor: BUTTON_COLOR_PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
    marginTop: 15,
  },
  // fav List Styles
  contentContainer: {
    padding: 0,
    marginTop: 20,
    marginLeft: 20
  },
  FavContainer: {
    padding: 0
  },
  renderContainer: {
    backgroundColor: WHITE,
    width: deviceWidth * 0.77,
    marginRight: 20,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 20,
  },
  favdescription: {
    fontSize: 17,
    color: SECONDARY_TEXT_COLOR,
    paddingBottom: 15,
  },
  price: {
    fontSize: 22,
    color: TEXT_COLOR,
    fontWeight: "bold",
  },
  itemImage: {
    height: deviceHeight * 0.2,
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
  },
  itemNoImage: {
    height: deviceHeight * 0.2,
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: MID_PEACH,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  offerContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  offer: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 17,
  },
  badgeContainer: {
    backgroundColor: APP_BACKGROUND,
    padding: 10,
    borderRadius: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    height: 20,
    width: 20,
    tintColor: PRIMARY_COLOR
  },
  rating: {
    color: "white",
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  productName: {
    fontSize: 22,
    color: TEXT_COLOR,
    fontWeight: "bold",
    marginTop: 15,
  },
  FavcartContainer: {
    paddingVertical: 10,
    backgroundColor: APP_BACKGROUND,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  Favcart: { height: 20, width: 20 },
});