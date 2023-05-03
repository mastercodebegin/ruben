import React from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MileStone from "../../../components/src/MilestoneComponent";
import MyCartController from "./MyCartController";
import ProductDetailComponent from "../../../components/src/ProductDetailComponent";
import Button from "../../../components/src/CustomButton";

export default class MyCart extends MyCartController {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <HeaderWithBackArrowTemplate
          navigation={this.props.navigation}
          headerText="My Cart"
        >
          <FlatList
            data={[{}, {}, {}, {}, {}, {}, {}, {}]}
            ListHeaderComponent={() => (
              <View>
                <MileStone
                  list={["My Cart", "Personel Details", "Summary", "Payment"]}
                  selected="My Cart"
                />
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>{"ADDED ITEMS (4)"}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            style={{}}
            keyExtractor={(item, index) => {
              return String(item) + index;
            }}
            ListFooterComponent={() => (
              <View>
                <View style={styles.bottomRadius} />
                <View style={styles.discountContainer}>
                  <View style={styles.shade} />
                  <Text style={styles.discount}>Enter Discount Code</Text>
                  <Text style={styles.direct}>Fetch Directly</Text>
                </View>
                <View style={styles.paymentContainer}>
                  <Text style={styles.headerText}>PAYMENT DETAILS</Text>
                  <View style={styles.seperator} />
                  <View style={styles.answerContainer}>
                    <View style={styles.row}>
                      <Text style={styles.paymentText}>Subtotal</Text>
                      <Text style={styles.answer}>{"$360.00"}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.paymentText}>Discount</Text>
                      <Text style={styles.answer}>{"-$60.00 (10%)"}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.paymentText}>Shipping Charges</Text>
                      <Text style={styles.answer}>{"$0.00"}</Text>
                    </View>
                  </View>
                  <View style={styles.seperator} />
                  <View style={[styles.row, { paddingHorizontal: 20 }]}>
                    <Text style={styles.paymentText}>Shipping Charges</Text>
                    <Text style={styles.answer}>{"$300.00"}</Text>
                  </View>
                </View>
                <Text style={styles.termsAndCondition}>
                  {"*terms & conditions apply"}
                </Text>
                <Button
                  onPress={() => {}}
                  label="Continue to Personel Details"
                />
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{"Cancel"}</Text>
                </TouchableOpacity>
              </View>
            )}
            renderItem={() => (
              <ProductDetailComponent
                name="Vegetables"
                price={20}
                quantity={2}
              />
            )}
          />
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  answerContainer: { paddingHorizontal: 20, paddingBottom: 10 },
  termsAndCondition: { color: "grey", fontSize: 17, paddingVertical: 15 },
  contentContainer: { paddingBottom: 20 },
  buttonText: {
    color: "#A0272A",
    textAlign: "center",
    fontSize: 17,
  },
  button: {
    borderColor: "#A0272A",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
  },
  answer: {
    color: "#A0272A",
    fontSize: 17,
    fontWeight: "bold",
  },
  seperator: { height: 1, backgroundColor: "lightgrey" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  paymentText: { fontSize: 17, color: "grey" },
  paymentContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 20,
  },
  direct: { fontSize: 16, fontWeight: "bold", color: "grey" },
  discount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A0272A",
  },
  shade: {
    backgroundColor: "#A0272A",
    opacity: 0.1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  discountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#A0272A",
    borderStyle: "dashed",
    overflow: "hidden",
  },
  bottomRadius: {
    height: 20,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontSize: 17,
    color: "grey",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  main: { flex: 1 },
});
