import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { styles } from "../ExploreStore/ExplorePage";
import LandingPageController from "../LandingPageController";
import CommonLoader from "../../../../components/src/CommonLoader";
import {
  DARK_RED,
  EXPLORE_BTN,
  SEARCH,
  MEAT_IMAGE1,
  MEAT_IMAGE2,
  shareIcon,
  PRIMARY,
  PRIMARY_COLOR,
  BUTTON_TEXT_COLOR_PRIMARY,
  BUTTON_COLOR_PRIMARY,
  TEXT_COLOR,
  BUTTON_COLOR_SECONDARY,
} from "../assets";
import { deepLinkingURL } from "../../../../components/src/constants";
import RenderSteps from "./RenderSteps";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import RenderCategoriesList from "../RenderCategoriesList";
import RenderAboutThisFarm from "./RenderAboutThisFarm";
import { RecurringModal } from "../ProductDetails/RecurringModal";
import { showToast } from "../../../../components/src/ShowToast";
import CustomDropdown from "../../../PersonelDetails/src/CustomDropDown";

export const ImageData = [
  {
    id: "1",
    image: MEAT_IMAGE1,
  },
  {
    id: "2",
    image: MEAT_IMAGE2,
  },
  {
    id: "3",
    image: MEAT_IMAGE1,
  },
  {
    id: "4",
    image: MEAT_IMAGE2,
  },
];
export const sampleText =
  "Filter text is the text tht shares some characteristics of a real written text , but is a random or otherwise generated.Filter text is the text tht shares some characteristics of a real written text , but is a random or otherwise generated.Filter text is the text that shares some characteristics of a real written text , but is a random or otherwise generated.";
export default class ProductDetailScreen extends LandingPageController {
  async componentDidMount() {
    this.getProductDetailsByCategoryId(this.props?.route?.params?.id)
    console.log('this.props?.route?.params?.id', this.props?.route?.params?.id);

    this.farmDetails();
    this.updateProductViewCount(this.props?.route?.params?.id)
  }

  render() {
    const { id = '', description = '', name = '', price = '', productList = [], image = "" } = {
      id: this.props?.route?.params?.id,
      description: this.props?.route?.params?.description,
      name: this.props?.route?.params?.name,
      price: this.props?.route?.params?.price,
      productList: this.props?.route?.params?.productList,
      image: this.props?.route?.params?.image
    }
    console.log('this.props?.route?.params', this.props?.route?.params);

    return (
      <SafeAreaView style={style.flex}>
        <HeaderWithBackArrowTemplate
          headerText={name}
          scrollView
          showsVerticalScrollIndicator={false}
          navigation={this.props.navigation}
        >
          <>
            {this.state.showRecurringModal && (
              <RecurringModal
                visible={this.state.showRecurringModal}
                setVisible={() => this.setState({ showRecurringModal: false })}
                recurringOrder={async (quantity, frequency) => {
                  const res = await this.addToCart(id, 1, frequency);
                  this.setState({ showRecurringModal: false })
                  setTimeout(() => {
                    if (res) {
                      this.props.navigation.navigate('MyCart');
                    }
                  }, 1000);
                }} />
            )}
            <View
              style={{ ...styles.textInputContainer, paddingTop: undefined }}
            >

            </View>

            <View style={style.imageContainer}>
          
              <View style={style.flex}>
                <Image
                  resizeMode="stretch"
                  style={style.image}
                  source={this.state.variantObject.productImage?{uri:this.state.variantObject.productImage}:MEAT_IMAGE2}
                />
              </View>
            </View>
            <Text style={style.headerText}>
              {`All you know about the ${name}`}
            </Text>
            <Text style={style.desc}>{description}</Text>
            <View style={style.priceContainer}>
              <Text style={style.text}>
                <Text style={style.text}>$</Text>
                <Text style={style.price}>{this.state.variantObject.price}</Text>/kg
              </Text>

            </View>
            <View style={{ height: 80, flexDirection: 'row' }}>
              <View style={{ flex: .6, }}>
                <CustomDropdown data={

                  this.state.variantObject.variantArray
                }
                  onChange={(item: any) => this.updateVariant(item)}
                  placeholder={this.state.variantObject.variantType}

                />
              </View>

              <View style={{ flex: .4, justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    disabled={this.state.availableQuantity <= 0 ? true : false}
                    onPress={() => this.handleIcreameantORDecreamentVariantCount(false)}
                    style={styles.button}
                  >
                    <Text style={{ color: BUTTON_COLOR_PRIMARY }}>{"-"}</Text>
                  </TouchableOpacity>
                  <Text style={styles.counter}>{this.state.variantQuantity}</Text>
                  <TouchableOpacity
                    onPress={() => this.handleIcreameantORDecreamentVariantCount(true)}
                    style={styles.button}
                  >
                    <Text style={{ color: BUTTON_COLOR_PRIMARY, }}>{"+"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {
              !this.state.showLoader&&this.state.availableQuantity >0 ?null:
                <Text style={{ color: 'red', fontWeight: '400' }}>The product is out of stock</Text> 
                
            }
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <View style={{ flex: 0.15, justifyContent: "center" }}>
                <TouchableOpacity
                  testID="copy_link_test_id"
                  onPress={() => {
                    Clipboard.setString(
                      `${deepLinkingURL}?/product=${this.props?.route?.params?.id}`
                    );
                    showToast("Link copied");
                  }}
                  style={style.shareButton}
                >
                  <Image style={style.shareImage} source={shareIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.4, justifyContent: "center" }}>
                <TouchableOpacity
                  testID="adToCart"
                  onPress={() => {
                    this.state.variantQuantity > 0 ? this.addToCart.bind(this)(
                      this.props?.route?.params?.id,
                      this.state.variantQuantity,
                      this.state.variantId) : alert('Please add quantity')
                  }
                  }
                  style={[style.cartButton,]}
                >
                  <Text style={style.cartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.45, justifyContent: "center" }}>
                <TouchableOpacity
                  testID="Subscription"
                  onPress={() => this.setState({ showRecurringModal: true })}
                  style={style.subsciptionButton}
                >
                  <Text style={style.cartText}>Subscriptions</Text>
                </TouchableOpacity>
              </View>
            </View>
            <RenderSteps
              images={this.state.productDetails?.attributes?.step1_images}
              header="Step 01:"
              description={this.state.productDetails?.attributes?.step_1}
            />
            <RenderSteps
              images={this.state.productDetails?.attributes?.step2_images}
              header="Step 02:"
              description={this.state.productDetails?.attributes?.step_2}
            />
            {/* <RenderSteps
              images={ImageData}
              header="Step 03:"
              description={sampleText}
            />
            <RenderSteps
              images={ImageData}
              header="Step 04:"
              description={sampleText}
            />
            <RenderSteps
              images={ImageData}
              header="Step 05:"
              description={sampleText}
            /> */}
            {productList.length ? <RenderAboutThisFarm AddToFavorites={this.AddToFavorites.bind(this)} item={productList[0]} details={this.state.productDetails} props={this.props.route.params} /> : <></>}
            <CommonLoader visible={this.state.show_loader} />
          </>
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  desc: { color: "grey", fontSize: 16, paddingTop: 10 },
  cartText: {
    color: BUTTON_TEXT_COLOR_PRIMARY,
    fontSize: 15,
    fontWeight: "bold",
    padding: 8,
    paddingHorizontal: 16,
    textAlign: 'center'
  },
  cartButton: {
    backgroundColor: BUTTON_COLOR_PRIMARY,
    justifyContent: "center",
    borderRadius: 20,
    width: '95%',
    alignSelf: "center"
  },
  subsciptionButton: {
    backgroundColor: BUTTON_COLOR_PRIMARY,
    justifyContent: "center",
    borderRadius: 20,
    width: '95%',
    alignSelf: "center"
  },
  imageContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 200,
    marginTop: 20,
    padding: 10,
    width: "100%",
    borderRadius: 20,
  },
  image: { height: "100%", width: "100%", borderRadius: 15 },
  seperator: { width: 10 },
  flex: { flex: 1 },
  headerText: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: TEXT_COLOR,
  },
  price: { color: TEXT_COLOR, fontSize: 19, fontWeight: "bold" },
  text: { fontSize: 15, fontWeight: "bold", color: TEXT_COLOR },
  shareButton: {
    height: 40,
    width: 40,
    backgroundColor: PRIMARY_COLOR,
    padding: 7,
    borderRadius: 21,
    alignSelf: "center"
  },
  shareImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    tintColor: BUTTON_TEXT_COLOR_PRIMARY,
  },
  counter: {
    paddingHorizontal: 10,
    color: TEXT_COLOR,
    fontSize: 17,
  },
  button: {
    height: 25,
    width: 25,
    backgroundColor: BUTTON_COLOR_SECONDARY,
    borderRadius: 12.5,
    borderWidth: .6,
    borderColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },

  counterContainer: { flexDirection: "row", alignItems: "center" },

  count: {
    color: BUTTON_COLOR_PRIMARY,
  },
});
