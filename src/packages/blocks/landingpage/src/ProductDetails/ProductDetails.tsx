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
} from "../assets";
import { deepLinkingURL } from "../../../../components/src/constants";
import RenderSteps from "./RenderSteps";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import RenderCategoriesList from "../RenderCategoriesList";
import RenderAboutThisFarm from "./RenderAboutThisFarm";
import {RecurringModal} from "../ProductDetails/RecurringModal";
import { showToast } from "../../../../components/src/ShowToast";

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
    this.getCategory(1);
  }
  
  render() {
    const { id = '', description = '', name = '', price = '' ,productList=[],image=""} = {
      id: this.props?.route?.params?.id,
      description: this.props?.route?.params?.description,
      name: this.props?.route?.params?.name,
      price: this.props?.route?.params?.price,
      productList:this.props?.route?.params?.productList,
      image:this.props?.route?.params?.image
    }
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
            setVisible={()=>this.setState({showRecurringModal:false})}/>
          )}

            <View
              style={{ ...styles.textInputContainer, paddingTop: undefined }}
            >
              <View style={styles.searchContainer}>
                <Image
                  resizeMode="stretch"
                  style={styles.search}
                  source={SEARCH}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Search any Product/Video"
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
            <RenderCategoriesList
              onPressCategory={this.getSubcategories.bind(this)}
              onEndReached={() => {
                if (this.categoryPage === null) {
                  return;
                }
                this.categoryPage = this.categoryPage + 1;
                this.getCategory.bind(this)(this.categoryPage);
              }}
              data={this.state.categories}
            />
            <View style={style.imageContainer}>
              <View style={style.flex}>
                <Image
                  resizeMode="stretch"
                  style={style.image}
                  source={MEAT_IMAGE1}
                />
              </View>
              <View style={style.seperator} />
              <View style={style.flex}>
                <Image
                  resizeMode="stretch"
                  style={style.image}
                  source={MEAT_IMAGE2}
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
                <Text style={style.price}>{price}</Text>/kg
              </Text>
              
            </View>
            <View style={{ flexDirection: "row",marginVertical:10 }}>
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
                <TouchableOpacity
                  onPress={() =>
                    this.addToCart.bind(this)(this.props?.route?.params?.id)
                  }
                  style={style.cartButton}
                >
                  <Text style={style.cartText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({showRecurringModal:true})}
                  style={style.subsciptionButton}
                >
                  <Text style={style.cartText}>Subsciptions</Text>
                </TouchableOpacity>
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
            {productList.length ? <RenderAboutThisFarm AddToFavorites={this.AddToFavorites.bind(this)} item={productList[0]} details={this.state.productDetails} props={this.props.route.params}/> :<></>}
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
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  cartButton: {
    backgroundColor: PRIMARY,
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 20,
  },
  subsciptionButton:{
    backgroundColor: PRIMARY,
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 10,
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
    color: DARK_RED,
  },
  price: { color: DARK_RED, fontSize: 19, fontWeight: "bold" },
  text: { fontSize: 15, fontWeight: "bold", color: DARK_RED },
  shareButton: {
    height: 40,
    width: 40,
    backgroundColor: PRIMARY,
    padding: 7,
    borderRadius: 21,
  },
  shareImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    tintColor: "white",
  },
});