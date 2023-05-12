import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Clipboard,
} from "react-native";
import { styles } from "../ExploreStore/ExplorePage";
import LandingPageController from "../LandingPageController";
import CommonLoader from "../../../../components/src/CommonLoader";
import {
  CHICKEN,
  DARK_RED,
  EXPLORE_BTN,
  SEARCH,
  WHITE,
  backArrow,
  MEAT_IMAGE1,
  MEAT_IMAGE2,
  MEAT_IMAGE3,
  shareIcon,
  badge,
  PRIMARY,
} from "../assets";
//@ts-ignore
import {deepLinkingURL} from '../../../../components/src/constants';

import RenderCategories from "../ExploreStore/RenderCategories";
import { showToast } from "../../../../components/src/ShowToast";
const Steps = ({ header, description }: any) => (
  <View style={{ paddingTop: 20, width: "100%" }}>
    {/* <View style={{height:20,width:20,backgroundColor:'white',borderRadius:10,marginHorizontal:10}}/> */}
    <Text
      style={{
        color: DARK_RED,
        fontSize: 17,
        fontWeight: "bold",
        paddingBottom: 10,
      }}
    >
      {header}
    </Text>
    <Text
      style={{
        color: "grey",
        fontSize: 15,
      }}
    >
      {description}
    </Text>
    <View
      style={{
        flexDirection: "row",
        height: 100,
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      <Image
        style={{ height: "100%", width: "30%", borderRadius: 8 }}
        source={MEAT_IMAGE1}
      />
      <Image
        style={{ height: "100%", width: "30%", borderRadius: 8 }}
        source={MEAT_IMAGE2}
      />
      <Image
        style={{ height: "100%", width: "30%", borderRadius: 8 }}
        source={MEAT_IMAGE3}
      />
    </View>
  </View>
);
const ImageData = [
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
const sampleText =
  "Filter text is the text tht shares some characteristics of a real written text , but is a random or otherwise generated.Filter text is the text tht shares some characteristics of a real written text , but is a random or otherwise generated.Filter text is the text that shares some characteristics of a real written text , but is a random or otherwise generated.";
export default class ProductDetailScreen extends LandingPageController {
  async componentDidMount() {
    this.getCategory.bind(this)(1);
  }
  renderItem = (item: any) => {
    return (
      <View style={{ paddingHorizontal: 5, marginVertical: 10 }}>
        <Image
          source={item.image}
          style={{ height: 70, width: 70, borderRadius: 20 }}
        />
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          style={styles.main}
        >
          <View style={styles.innerContainer}>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Image style={{ height: 20, width: 20 }} source={backArrow} />
                </TouchableOpacity>
                <Text style={{ ...styles.header, paddingLeft: 15 }}>
                  Beef Head
                </Text>
              </View>
              <View style={styles.textInputContainer}>
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
            </View>
            <FlatList
              data={this.state.categories}
              horizontal
              style={{ marginLeft: 20 }}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              onEndReached={() => {
                if (this.categoryPage === null) {
                  return;
                }
                this.categoryPage = this.categoryPage + 1;
                this.getCategory.bind(this)(this.categoryPage);
              }}
              renderItem={({ item, index }) => {
                return (
                  <RenderCategories
                    onpress={this.getSubcategories.bind(this)}
                    item={item}
                    index={index}
                  />
                );
              }}
            />
            <FlatList
              data={this.state.subcategories}
              horizontal
              bounces={false}
              style={{ marginLeft: 20 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }: any) => {
                const seleceted =
                  this.state.selectedSub === item?.attributes?.id;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ selectedSub: item?.attributes?.id })
                    }
                    style={[
                      styles.subcategory,
                      {
                        backgroundColor: seleceted ? "#A0272A" : WHITE,
                      },
                    ]}
                  >
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginRight: 10,
                        tintColor: seleceted ? "white" : DARK_RED,
                      }}
                      source={CHICKEN}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 20,
                        color: seleceted ? "white" : DARK_RED,
                        fontWeight: "500",
                      }}
                    >
                      {item?.attributes?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 20,
              marginHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image style={style.image} source={MEAT_IMAGE1} />
              <Image style={style.image} source={MEAT_IMAGE2} />
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ color: DARK_RED, fontSize: 20, fontWeight: "bold" }}>
              All you know about the cow's head
            </Text>
            <Text style={{ color: "grey", fontSize: 15, paddingTop: 10 }}>
              {sampleText}
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: DARK_RED,
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingRight: 5,
                  }}
                >
                  {"$"}
                </Text>
                <Text
                  style={{ color: DARK_RED, fontSize: 17, fontWeight: "bold" }}
                >
                  {"22.99"}
                </Text>
                <Text
                  style={{
                    color: DARK_RED,
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingLeft: 5,
                  }}
                >
                  {"/kg"}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                onPress={()=>{
                    Clipboard.setString(
                        `${deepLinkingURL}?/product=${17}`
                      );
                        showToast("Link copied");
                       
                }}
                  style={{
                    backgroundColor: PRIMARY,
                    padding: 10,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
    
                  }}
                >
                  <Image
                    source={shareIcon}
                    resizeMode="contain"
                    style={{
                      height: "100%",
                      width: "100%",
                      tintColor: "white",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=> showToast("Product added to the cart")}
                  style={{
                    justifyContent: "center",
                    backgroundColor: PRIMARY,
                    borderRadius: 20,
                    marginLeft:10
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 17,

                      paddingVertical: 5,
                      paddingHorizontal: 20,

                      overflow: "hidden",
                    }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.container}>
              <View style={style.circle} />
              <Steps header={"Step 01:"} description={sampleText} />
            </View>
            <View style={style.container}>
              <View style={style.circle} />
              <Steps header={"Step 02:"} description={sampleText} />
            </View>
            <View style={style.container}>
              <View style={style.circle} />
              <Steps header={"Step 03:"} description={sampleText} />
            </View>
            <View style={style.container}>
              <View style={style.circle} />
              <Steps header={"Step 04:"} description={sampleText} />
            </View>
            <View style={style.container}>
              <View style={style.circle} />
              <Steps header={"Step 05:"} description={sampleText} />
            </View>
            <View style={style.featuredFarmContainer}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={MEAT_IMAGE2}
                  style={{ height: 70, width: 70, borderRadius: 20 }}
                />
                <View style={{ left: 10 }}>
                  <Text
                    style={{ fontSize: 22, fontWeight: "700", color: DARK_RED }}
                  >
                    Mark Jhon's Farm
                  </Text>
                  <Text style={{ fontSize: 14, color: "grey", width: "90%" }}>
                    7460 Redwood Blvd California , 94945 , USA
                  </Text>
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 14, color: "grey" }}>
                  the original words and form of a written or printedw work . an
                  edited on ambede copy of a original work containing such text
                  . 2a : the main body of printed or written matter on a page
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: "700", color: "grey" }}>PHOTOS</Text>
                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={ImageData}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    color: "grey",
                    marginVertical: 10,
                  }}
                >
                  PRODUCTS
                </Text>
              </View>
              <View style={{ marginVertical: 5 }}>
                <Image source={MEAT_IMAGE3} style={style.productImageStyle} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: DARK_RED,
                    marginVertical: 10,
                    fontSize: 16,
                  }}
                >
                  Meat
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    color: DARK_RED,
                    marginVertical: 10,
                    fontSize: 16,
                  }}
                >
                  $ 22.99/kg
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    marginVertical: 10,
                    fontSize: 14,
                    width: "75%",
                  }}
                >
                  Filter text is the text tht shares some characteristics of a
                  real written text , but is a random or otherwise generated .
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: DARK_RED,
                    borderRadius: 50,
                    padding: 7,
                    backgroundColor: "#F9F4F3",
                  }}
                >
                  <Image
                    source={badge}
                    style={{ height: 20, width: 20, tintColor: DARK_RED }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {this.state.show_loader && (
          <CommonLoader visible={this.state.show_loader} />
        )}
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  image: { height: 230, width: "49%", borderRadius: 15 },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 20,
    marginRight: 10,
  },
  container: { flexDirection: "row", overflow: "hidden" },
  featuredFarmContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 20,
    alignSelf: "center",
    padding: 15,
  },
  productImageStyle: {
    height: 150,
    width: "100%",
    borderRadius: 20,
  },
});
