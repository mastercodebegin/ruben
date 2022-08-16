import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
  Platform,
  Image,
} from "react-native";
// Customizable Area End

import Moment from "moment";
import { WebView } from "react-native-webview";
import OrdermanagementController, {
  Props,
  //   configJSON
} from "./OrdermanagementController";
//@ts-ignore
import StarRating from "react-native-star-rating";

export default class OrderDetails extends OrdermanagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const DATA = this.props.navigation?.state?.params.DATA;
    return (
      //Merge Engine DefaultContainer
      <View style={styles.container}>
        {/* Customizable Area Start */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isRateVisible}
        >
          <View style={styles.mdlCntr}>
            <View style={styles.rateMdlInnerCntr}>
              <View style={styles.starOuter}>
                <Text style={styles.mdlHeader}>Rate and Review</Text>
                <Text style={styles.mdlTxt}>Rate our Product</Text>
                <View style={styles.starView}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating: number) =>
                      this.setState({ starCount: rating })
                    }
                  />
                </View>
                <View style={styles.txtView}>
                  <TextInput
                    placeholder={"Write detailed review for product"}
                    multiline
                    testID="txtInputPhone" //Merge Engine::From BDS
                    style={styles.bgMobileInputMessage} //UI Engine::From Sketch
                    onChangeText={(txt: string) =>
                      this.setState({ comment: txt })
                    }
                  />
                </View>
              </View>
              <View style={styles.mdlBtnCntr}>
                <Text
                  onPress={() => this.rateOrder()}
                  style={styles.mdlCancelTxt}
                >
                  Cancel
                </Text>
                <View style={styles.verticalSep} />
                <Text
                  style={styles.mdlYesTxt}
                  onPress={() =>
                    this.rateOrderDataRequest(DATA?.attributes.catalogue.id)
                  }
                >
                  Submit
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.orderContainer}>
            <View style={styles.mainContainer}>
              <Text style={styles.txtLeft}>
                Order Number: {DATA?.attributes.order.order_number}
              </Text>
              <Text
                onPress={() => {
                  this.rateOrder();
                }}
                style={styles.txtRight}
              >
                Order Date:{" "}
                {Moment(DATA?.attributes.order.order_date).format(
                  "DD MMM yyyy"
                )}
              </Text>
            </View>
            <View style={styles.orderInnerContainer}>
              <View>
                <View style={styles.orderView}>
                  {DATA?.attributes.catalogue.attributes.images?.length > 0 && (
                    <Image
                      style={styles.image}
                      source={{
                        uri: DATA?.attributes.catalogue.attributes.images[0]
                          .url,
                      }}
                    />
                  )}
                  {/* <View style={styles.image}/> */}
                  <View style={styles.product}>
                    <Text style={styles.txt1}>Product 1</Text>
                    <Text style={styles.txt2}>{DATA?.attributes.status}</Text>
                    <Text style={styles.txt3}>
                      ${DATA?.attributes.total_price}
                    </Text>
                    {DATA?.attributes.order.tracking_number ? (
                      <Text style={styles.txt4}>
                        Tracking Id: {DATA?.attributes.order.tracking_number}
                      </Text>
                    ) : null}
                  </View>
                  <Text style={styles.qtyTxt}>Quantity:1</Text>
                </View>
                <View style={styles.seprator} />
              </View>
              <Text
                onPress={() => {
                  this.rateOrder();
                }}
                style={styles.cancelTxt}
              >
                Write a review
              </Text>
            </View>
            {DATA?.attributes.order.tracking_url ? (
              <View style={styles.trackingContainer}>
                <WebView
                  source={{ uri: DATA?.attributes.order.tracking_url }}
                />
              </View>
            ) : null}

            <Text style={styles.shippingTxt}>Shipping Address</Text>
            <View style={styles.orderInnerContainer2}>
              <Text style={styles.txt1}>
                {DATA?.attributes.delivery_addresses?.length > 0 &&
                  DATA?.attributes.delivery_addresses[0].address_type}
              </Text>
              <Text style={styles.txt3}>
                {DATA?.attributes.delivery_addresses?.length > 0 &&
                  DATA?.attributes.delivery_addresses[0].flat_no}
                ,{" "}
                {DATA?.attributes.delivery_addresses?.length > 0 &&
                  DATA?.attributes.delivery_addresses[0].address}
              </Text>
              <Text style={styles.txt3}>
                {DATA?.attributes.delivery_addresses?.length > 0 &&
                  DATA?.attributes.delivery_addresses[0].state}
                ,{" "}
                {DATA?.attributes.delivery_addresses?.length > 0 &&
                  DATA?.attributes.delivery_addresses[0].city}{" "}
                {DATA?.attributes.delivery_addresses?.length > 0 &&
                  DATA?.attributes.delivery_addresses[0].zip_code}
              </Text>
              <Text style={styles.txt3}>
                Phone Number:{" "}
                {DATA?.attributes.delivery_addresses?.length > 0 &&
                  DATA?.attributes.delivery_addresses[0].phone_number}
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* Customizable Area End */}
      </View>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    width: Platform.OS === "web" ? "75%" : "100%",
    backgroundColor: "#F7F8FA",
    alignSelf: "center",
  },
  btnContainer: {
    width: "90%",
    height: 45,
    backgroundColor: "#363F91",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  btntxt: {
    fontSize: 15,
    color: "#FFF",
  },
  imgContainer: {
    height: "85%",
    //justifyContent:"center",
    alignItems: "center",
  },
  img: {
    height: "30%",
    width: "40%",
    backgroundColor: "red",
    marginTop: "15%",
  },
  imgTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  imgText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  mainContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  txtLeft: {
    width: "50%",
    textAlign: "left",
  },
  txtRight: {
    width: "50%",
    textAlign: "right",
  },
  orderContainer: {
    marginVertical: 15,
  },
  orderView: {
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "row",
    padding: 10,
    // height:150,
  },
  orderInnerContainer: {
    backgroundColor: "#FFF",
    paddingTop: 10,
  },
  orderInnerContainer2: {
    backgroundColor: "#FFF",
    paddingTop: 10,
    marginVertical: 10,
    padding: 10,
  },
  trackingContainer: {
    backgroundColor: "#FFF",
    paddingTop: 10,
    marginVertical: 10,
    padding: 10,
    height: 200,
  },
  cancelTxt: {
    textAlign: "center",
    fontSize: 15,
    color: "#525977",
    marginBottom: 10,
  },
  seprator: {
    height: 0.5,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#000",
    marginVertical: 10,
  },
  image: {
    width: "25%",
    height: 70,
    borderWidth: 0.5,
    resizeMode: "cover",
    // backgroundColor:"red"
  },
  txt1: {
    fontSize: 15,
    fontWeight: "bold",
  },
  txt2: {
    fontSize: 13,
    marginVertical: 2,
  },
  txt3: {
    fontSize: 15,
  },
  txt4: {
    fontSize: 13,
    color: "#000",
    marginVertical: 2,
    textDecorationLine: "underline",
  },
  qtyTxt: {
    fontSize: 14,
  },
  mdlCntr: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(49,49,49,0.8)",
  },
  mdlHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  mdlTxt: {
    fontSize: 14,
    width: 240,
    maxWidth: 250,
    textAlign: "center",
  },
  mdlBtnCntr: {
    borderTopWidth: 0.5,
    borderBottomColor: "grey",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    alignItems: "center",
  },
  verticalSep: {
    height: 20,
    width: 0.5,
    backgroundColor: "#000",
  },
  mdlCancelTxt: {
    fontSize: 16,
  },
  mdlYesTxt: {
    fontSize: 16,
  },

  rateMdlInnerCntr: {
    height: "40%",
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
  },
  bgMobileInputMessage: {
    width: 200,
    maxWidth: 250,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    // width:150,
    borderColor: "#c9c9c9",
    height: 80,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  starView: {
    width: "60%",
    alignSelf: "center",
    marginVertical: 5,
  },
  starOuter: {
    height: "85%",
    alignSelf: "center",
    alignItems: "center",
  },
  txtView: {
    width: "100%",
  },
  product: {
    width: "50%",
    marginLeft: 5,
  },
  shippingTxt: {
    fontSize: 16,
    marginTop: 5,
  },
});
// Customizable Area End
