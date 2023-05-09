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
import LandingPageController from "../LandingPageController";
import {
  LIGHT_GREY,
  DARK_RED,
  backArrow,
  MEAT_IMAGE3,
  MEAT_IMAGE2,
  badge
} from "../assets";
import CommonLoader from "../../../../components/src/CommonLoader";

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
    this.getAboutUs.bind(this)()
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
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.main}>
        {!this.state.show_loader ? <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View
            style={styles.headerContainer}
          >
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
                  source={{uri:this.state.aboutus?.attributes?.photo?.url}}
                  style={styles.imageStyle} />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 16, color: "grey" }}>
                 {this.state.aboutus?.attributes?.description}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{ fontWeight: "700", color: "grey", marginVertical: 10 }}
              >
                FEATURED FARMS
              </Text>
            </View>
            <View style={styles.featuredFarmContainer}>
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
                    keyExtractor={item => item.id}
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
                <Image source={MEAT_IMAGE3} style={styles.productImageStyle} />
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
        </ScrollView>:<CommonLoader visible={this.state.show_loader}/>}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  },
  back: {
    height: 15,
    width: 15,
  },
  header: {
    fontSize: 23,
    fontWeight: "500",
    color: DARK_RED,
    paddingLeft:5
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
