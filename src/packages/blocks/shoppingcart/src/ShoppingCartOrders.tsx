import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
// Customizable Area Start

import ShoppingCartOrdersController, {
  Props,
} from "./ShoppingCartOrdersController";

export default class ShoppingCartOrders extends ShoppingCartOrdersController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.defaultContainer}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"hideKeyboard"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={styles.innerContainer}>
              {this.state.orderList.map((item: any, index: number) => {
                const value = item.attributes;
                const order_id = item.id;
                return (
                  <View key={index} style={styles.tableBox}>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Total Fees:{"  "}</Text>
                      {value?.total_fees}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Total Items:{"  "}</Text>
                      {value?.total_items}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Total Tax:{"  "} </Text>
                      {value?.total_tax}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Customer:{"  "}</Text>
                      {value?.customer?.data?.attributes?.first_name +
                        " " +
                        value?.customer?.data?.attributes?.last_name}
                    </Text>
                    <TouchableOpacity
                      style={styles.viewBtn}
                      testID="showOrderItems"
                      onPress={() => {
                        this.setState({ order_id: order_id });
                        this.showOrder(order_id);
                      }}
                    >
                      <Text style={styles.viewBtnText}>View Order Items</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

              <View style={styles.modalBox}>
                <Modal
                  animationType={"fade"}
                  transparent={false}
                  visible={this.state.isVisible}
                >
                  <View style={styles.modal}>
                    <View style={styles.buttonTop}>
                      <TouchableOpacity
                        style={styles.addMore}
                        testID="btnNavigateToAddOrderItem"
                        onPress={() => {
                          this.setState({ isVisible: false });
                          this.navigateToAddShoppingCartOrderItem();
                        }}
                      >
                        <Text style={styles.add}>Add</Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.orderItems.map((item: any, index: number) => {
                      const value = item.attributes;
                      const order_item_id = item.id;
                      return (
                        <View key={index} style={styles.tableBox}>
                          <Text style={styles.infoText}>
                            <Text style={styles.labelText}>Price:{"  "}</Text>
                            {value?.price}
                          </Text>
                          <Text style={styles.infoText}>
                            <Text style={styles.labelText}>
                              Quantity:{"  "}
                            </Text>
                            {value?.quantity}
                          </Text>
                          <Text style={styles.infoText}>
                            <Text style={styles.labelText}>
                              Taxable:{"  "}{" "}
                            </Text>
                            {value?.taxable ? "true" : "false"}
                          </Text>
                          <Text style={styles.infoText}>
                            <Text style={styles.labelText}>
                              Taxable Value:{"  "}
                            </Text>
                            {value?.taxable_value}
                          </Text>
                          <Text style={styles.infoText}>
                            <Text style={styles.labelText}>
                              Cataloue:{"  "}
                            </Text>
                            {value?.catalogue?.data?.attributes?.name}
                          </Text>
                          <TouchableOpacity
                            style={styles.viewBtn}
                            testID="deleteOrderItem"
                            onPress={() =>
                              this.deleteOrderItem(
                                this.state.order_id,
                                order_item_id
                              )
                            }
                          >
                            <Text style={styles.viewBtnText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                    <View style={styles.buttonBox}>
                      <TouchableOpacity
                        style={[styles.viewBtnWidth, styles.closeBtn]}
                        testID="closeModal"
                        onPress={() => {
                          this.setState({ isVisible: !this.state.isVisible });
                        }}
                      >
                        <Text style={styles.closeBtnText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  defaultContainer: {
    height: "99%",
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  innerContainer: {
    marginBottom: 30,
  },
  buttonTop: {
    display: "flex",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  addMore: {
    backgroundColor: "blue",
    marginBottom: 10,
    width: 80,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
  },
  add: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  tableBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue",
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  closeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15,
  },
  viewBtnWidth: {
    width: "48%",
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
});
// Customizable Area End
