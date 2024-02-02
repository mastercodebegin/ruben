import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import LandingPageController from "../LandingPageController";
import { DARK_RED, badge, MID_PEACH, TEXT_COLOR, SECONDARY_TEXT_COLOR } from "../assets";
import CommonLoader from "../../../../components/src/CommonLoader";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import { SCREEN_WIDTH } from "../../../../components/src/constants";
const ImageData = [
  {
    id: "1",
    image: require("../../assets/meatimage2.jpg"),
  },
  {
    id: "2",
    image: require("../../assets/meatimage3.jpg"),
  },
  {
    id: "3",
    image: require("../../assets/meatimage1.jpg"),
  },
  {
    id: "4",
    image: require("../../assets/meatimage3.jpg"),
  },
];

export default class AboutUs extends LandingPageController {
  async componentDidMount(): Promise<void> {
    this.getAboutUs.bind(this)();
   // this.getProductList(false)
  }
  renderItem = (item: any) => {
    return (
      <View style={styles.imageContainerr}>
        <Image source={item.image} style={styles.productImage} />
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <HeaderWithBackArrowTemplate
        headerText="About Us"
        navigation={navigation}
      >
        <>
          {!this.state.show_loader ? (
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View style={styles.innercontainer}>
                <View style={styles.imageDescription}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={ {
                        uri: this.state.aboutUsData?.data?.length?
                        this.state.aboutUsData?.data[0]?.attributes?.images[0]?.url :''
                      }}
                      style={styles.imageStyle}
                    />
                    {console.log('',this.state.aboutUsData?.data?.length?this.state.aboutUsData?.data[0]?.attributes:null)
                    }
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.desc}>
                      {this.state.aboutUsData?.data?.length?this.state.aboutUsData?.data[0]?.attributes.description:''}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.featured,{color:TEXT_COLOR}]}>FEATURED FARMS</Text>
                </View>
                <View style={styles.featuredFarmContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={ {
                        uri: this.state.aboutUsData?.data?.length?
                        this.state.aboutUsData?.data[0]?.attributes?.images[0]?.url :''
                      }}
                      style={{ height: 70, width: 70, borderRadius: 20 }}
                    />
                    <View style={{ left: 10 }}>
                      <Text style={styles.farmName}>
                      {this.state.aboutUsData?.data?.length?this.state.aboutUsData?.data[0]?.attributes.title:''}

                      </Text>
                      <Text style={[styles.farmAdd,{color:SECONDARY_TEXT_COLOR}]}>
                        7460 Redwood Blvd California, 94945 , USA
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.descr}>
                    {this.state.aboutus?.attributes?.description}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.photos}>PHOTOS</Text>
                    <View>
                      <FlatList
                        testID="photosList"
                        horizontal
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        data={ImageData}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.product,{color:TEXT_COLOR}]}>PRODUCTS</Text>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <Image
                      source={{uri:this.state.productList[0]?.attributes?.images[0]?.url}}
                      style={[styles.productImageStyle,!this.state.productList[0]?.attributes?.images[0]?.url && {backgroundColor:MID_PEACH}]}
                    />
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productName}>{this.state.productList[0]?.attributes?.categoryCode}</Text>
                    <Text style={[styles.price,{color:TEXT_COLOR}]}>{`$ ${this.state.productList[0]?.attributes?.price}`}</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                      {this.state.productList[0]?.attributes?.description}
                    </Text>
                    <TouchableOpacity testID="add_to_fav_test_id" onPress={()=>this.AddToFavorites(this.state.productList[0]?.id)} style={styles.badgeContainer}>
                      <Image source={badge} style={styles.badge} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          ) : (
            <CommonLoader visible={this.state.show_loader} />
          )}
        </>
      </HeaderWithBackArrowTemplate>
    );
  }
}
const styles = StyleSheet.create({
  innercontainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageDescription: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 20,
    alignSelf: "center",
    padding: 15,
  },
  featuredFarmContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 20,
    alignSelf: "center",
    padding: 15,
  },
  imageContainer: {},
  imageStyle: {
    height: 250,
    width: "100%",
    borderRadius: 20,
  },
  productImageStyle: {
    height: 150,
    width: "100%",
    borderRadius: 20,
  },
  badgeContainer: {
    borderWidth: 1,
    borderColor: DARK_RED,
    borderRadius: 50,
    padding: 7,
    backgroundColor: "#F9F4F3",
  },
  featured: {
    fontWeight: "700",
    color: "grey",
    marginVertical: 10,
  },
  farmName: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_COLOR,
  },
  description: {
    color: "grey",
    marginVertical: 10,
    fontSize: 14,
    width: "75%",
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  farmAdd: { fontSize: 14, color: "grey", width: SCREEN_WIDTH - 150 , marginRight: 10,flexWrap: 'wrap', },
  photos: { fontWeight: "700", color: "grey" },
  badge: { height: 20, width: 20, tintColor: DARK_RED },
  productName: {
    fontWeight: "700",
    color: DARK_RED,
    marginVertical: 10,
    fontSize: 16,
  },
  price: {
    fontWeight: "700",
    color: DARK_RED,
    marginVertical: 10,
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  product: {
    fontWeight: "700",
    color: "grey",
    marginVertical: 10,
  },
  desc: { fontSize: 16, color: SECONDARY_TEXT_COLOR },
  descr: { fontSize: 14, color: SECONDARY_TEXT_COLOR },
  imageContainerr: { paddingHorizontal: 5, marginVertical: 10 },
  productImage: { height: 70, width: 70, borderRadius: 15 },
});
