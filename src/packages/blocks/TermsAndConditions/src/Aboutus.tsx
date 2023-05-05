import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import TermsAndConditionsController from "./TermsAndConditionsController";
import {
  LIGHT_GREY,
  DARK_RED,
  backArrow,
  MEAT_IMAGE3,
  MEAT_IMAGE2,
  badge,
} from "../../landingpage/src/assets";
import CommonLoader from "../../../components/src/CommonLoader";

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

export default class AboutUs extends TermsAndConditionsController {

  renderItem = (item: any) => {
    return (
      <View style={styles.imagesCon}>
        <Image source={item.image} style={styles.renderImage} />
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.main}>
        {!this.state.showLoader ? (
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backContainer}
              >
                <Image style={styles.back} source={backArrow} />
              </TouchableOpacity>
              <Text style={styles.header}>About Us</Text>
            </View>
            <View style={styles.innercontainer}>
              <View style={styles.imageDescription}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: this.state.aboutus?.attributes?.photo?.url }}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.margin}>
                  <Text style={styles.description}>
                    {this.state.aboutus?.attributes?.description}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.featured}>FEATURED FARMS</Text>
              </View>
              <View style={styles.featuredFarmContainer}>
                <View style={styles.row}>
                  <Image source={MEAT_IMAGE2} style={styles.image} />
                  <View style={styles.left}>
                    <Text style={styles.farmName}>Mark Jhon's Farm</Text>
                    <Text style={styles.address}>
                      7460 Redwood Blvd California , 94945 , USA
                    </Text>
                  </View>
                </View>
                <View style={styles.descContainer}>
                  <Text style={styles.descr}>
                    the original words and form of a written or printedw work .
                    an edited on ambede copy of a original work containing such
                    text . 2a : the main body of printed or written matter on a
                    page
                  </Text>
                </View>
                <View>
                  <Text style={styles.photos}>PHOTOS</Text>
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
                  <Text style={styles.products}>PRODUCTS</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Image
                    source={MEAT_IMAGE3}
                    style={styles.productImageStyle}
                  />
                </View>
                <View style={styles.rowDir}>
                  <Text style={styles.text}>Meat</Text>
                  <Text style={styles.text}>$ 22.99/kg</Text>
                </View>
                <View style={styles.productContainer}>
                  <Text style={styles.productDesc}>
                    Filter text is the text tht shares some characteristics of a
                    real written text , but is a random or otherwise generated .
                  </Text>
                  <View style={styles.badge}>
                    <Image source={badge} style={styles.badgeIcon} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <CommonLoader visible={this.state.showLoader} />
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  margin: { marginVertical: 10 },
  left: { left: 10 },
  description: { fontSize: 16, color: "grey" },
  rowDir: { flexDirection: "row" },
  renderImage: { height: 70, width: 70, borderRadius: 20 },
  image: { height: 70, width: 70, borderRadius: 20 },
  imagesCon: { paddingHorizontal: 5, marginVertical: 10 },
  address: { fontSize: 14, color: "grey", width: "90%" },
  descContainer: { marginVertical: 10 },
  descr: { fontSize: 14, color: "grey" },
  photos: { fontWeight: "700", color: "grey" },
  iconContainer: { marginVertical: 5 },
  farmName: {
    fontSize: 22,
    fontWeight: "700",
    color: DARK_RED,
  },
  products: {
    fontWeight: "700",
    color: "grey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "700",
    color: DARK_RED,
    marginVertical: 10,
    fontSize: 16,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeIcon: { height: 20, width: 20, tintColor: DARK_RED },
  productDesc: {
    color: "grey",
    marginVertical: 10,
    fontSize: 14,
    width: "75%",
  },
  badge: {
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  main: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  innercontainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backContainer: {
    padding: 5,
    alignSelf: "flex-start",
  },
  back: {
    height: 15,
    width: 15,
  },
  header: {
    fontSize: 23,
    fontWeight: "500",
    color: DARK_RED,
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
});
