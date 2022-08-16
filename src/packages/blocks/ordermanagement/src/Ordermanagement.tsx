import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Platform,
  Image,
} from "react-native";
// Customizable Area End

import OrdermanagementController, {
  Props,
  configJSON,
} from "./OrdermanagementController";

import Moment from "moment";

import { emptyMyOrdersIcon } from "./assets";

export default class Ordermanagement extends OrdermanagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <View style={styles.container}>
        {/* Customizable Area Start */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isCancelVisible}
        >
          <View style={styles.mdlCntr}>
            <View style={styles.mdlInnerCntr}>
              <View style={styles.cancelContainer}>
                <Text style={styles.mdlHeader}>Cancel Order</Text>
                <Text style={styles.mdlTxt}>
                  {" "}
                  Are you sure you want to cancel the order?
                </Text>
              </View>
              <View style={styles.mdlBtnCntr}>
                <Text
                  testID={"noCancel"}
                  onPress={() => this.hideCancelModal()}
                  style={styles.mdlCancelTxt}
                >
                  Cancel
                </Text>
                <View style={styles.verticalSep} />
                <Text
                  testID={"yesCancel"}
                  style={styles.mdlYesTxt}
                  onPress={() => this.cancelOrderDataRequest()}
                >
                  Yes
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        {this.state.orders.length === 0 ? (
          <View>
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={emptyMyOrdersIcon} />
              <Text style={styles.imgTitle}>No Order</Text>
              <Text>You haven't order any items. Browse </Text>
              <Text>More items to order</Text>
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{}}>
            {this.state.orders.map((item: any, index: number) => {
              return (
                <View key={index} style={styles.orderContainer}>
                  <View style={styles.mainContainer}>
                    <Text style={styles.txtLeft}>
                      Order Number: {item.attributes.order_number}
                    </Text>
                  </View>
                  <View style={styles.orderInnerContainer}>
                    {item.attributes.order_items.map(
                      (item2: any, index2: number) => {
                        return (
                          <View key={index2}>
                            <TouchableOpacity
                              onPress={() => {
                                this.getItemDetailDataRequest(item2.id);
                              }}
                              style={styles.orderView}
                            >
                              <Image
                                style={styles.image}
                                source={{
                                  uri: item2.attributes.catalogue?.attributes
                                    ?.images[0].url,
                                }}
                              />
                              {/* <View style={styles.image}/> */}
                              <View style={styles.innerOrderView}>
                                <Text style={styles.txt1}>
                                  {
                                    item2.attributes.catalogue?.attributes
                                      ?.category.name
                                  }
                                </Text>
                                <Text style={styles.txt2}>
                                  Ordered on:{" "}
                                  <Text style={styles.txt2Inner}>
                                    {Moment(item.attributes.order_date).format(
                                      "DD MMM yyyy"
                                    )}
                                  </Text>
                                </Text>
                                <Text style={styles.txt3}>
                                  ${item2.attributes.total_price}
                                </Text>
                                <Text style={styles.status}>
                                  {item.attributes.status}{" "}
                                  <Text style={styles.txt3}>
                                    {item.attributes.status === "created"
                                      ? Moment(
                                          item.attributes.created_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status === "placed"
                                      ? Moment(
                                          item.attributes.placed_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status === "confirmed"
                                      ? Moment(
                                          item.attributes.confirmed_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status === "in_transit"
                                      ? Moment(
                                          item.attributes.in_transit_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status === "delivered"
                                      ? Moment(
                                          item.attributes.delivered_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status === "cancelled"
                                      ? Moment(
                                          new Date(item.attributes.cancelled_at)
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status === "refunded"
                                      ? Moment(
                                          item.attributes.refunded_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status ===
                                        "payment_failed"
                                      ? Moment(
                                          item.attributes.payment_failed_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status ===
                                        "payment_pending"
                                      ? Moment(
                                          item.attributes.payment_pending_at
                                        ).format("DD MMM yyyy")
                                      : item.attributes.status === "returned"
                                      ? Moment(
                                          item.attributes.returned_at
                                        ).format("DD MMM yyyy")
                                      : null}
                                  </Text>
                                </Text>
                              </View>
                              <Text style={styles.qtyTxt}>
                                Quantity: {item2.attributes.quantity}
                              </Text>
                            </TouchableOpacity>
                            <View style={styles.seprator} />
                          </View>
                        );
                      }
                    )}
                    {item.attributes.status === "cancelled" ? (
                      <Text testID={"cancelTxt1"} style={styles.cancelTxt}>
                        Cancelled
                      </Text>
                    ) : (
                      <Text
                        testID={"cancelTxt"}
                        onPress={() => {
                          this.cancelOrder(
                            item.id,
                            item.attributes.order_items[0].id
                          );
                        }}
                        style={styles.cancelTxt}
                      >
                        Cancel Order
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
        {this.state.cancelDialog ? (
          <View style={styles.cancelCntr}>
            <Text style={styles.cancelCntrText}>
              Your order has been cancelled
              <Text
                onPress={() => {
                  this.setState({ cancelDialog: false });
                }}
                style={styles.close}
              >
                {" "}
                CLOSE
              </Text>
            </Text>
          </View>
        ) : null}
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
    height: "35%",
    width: "40%",
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
    color: "#575F7B",
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
  innerOrderView: {
    width: "50%",
    marginLeft: 5,
  },
  orderInnerContainer: {
    backgroundColor: "#FFF",
    paddingTop: 10,
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
  },
  txt1: {
    fontSize: 15,
    fontWeight: "bold",
  },
  txt2: {
    fontSize: 13,
    color: "#BBBDBF",
    marginVertical: 2,
  },
  txt2Inner: {
    fontSize: 11,
    color: "#000",
  },
  txt3: {
    fontSize: 14,
    fontWeight: "normal",
  },
  status: {
    fontSize: 15,
    fontWeight: "bold",
  },
  txt4: {
    fontSize: 13,
    color: "#000",
    marginVertical: 2,
  },
  txt4Inner: {
    fontSize: 11,
    color: "#BBBDBF",
  },
  qtyTxt: {
    fontSize: 14,
  },
  mdlCntr: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(49,49,49,0.8)",
  },
  mdlInnerCntr: {
    height: "25%",
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
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
  cancelCntr: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "#FFF",
    alignItems: "center",
    elevation: 2,
    shadowOffset: { height: 2, width: 0 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
  },
  cancelCntrText: {
    fontSize: 15,
  },
  close: {
    fontWeight: "bold",
  },
  cancelContainer: {
    height: "75%",
    alignSelf: "center",
    alignItems: "center",
  },
});
// Customizable Area End
