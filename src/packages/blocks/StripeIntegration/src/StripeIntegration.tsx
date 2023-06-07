import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./../../PersonelDetails/src/MyDetails";
import DoubleButton from "../../../components/src/DoubleButton";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import MileStone from "../../../components/src/MilestoneComponent";
import { LIGHT_GREY, PRIMARY, WHITE } from "../../../components/src/constants";
import { DARK_RED } from "../../landingpage/src/colors";
import CheckBox from "../../../components/src/CustomRadioBtn";

//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End
interface ImageBoxType {
  text: string;
  image: ImageSourcePropType;
  selected: boolean;
  onpress: () => void;
}

import StripeIntegrationController, {
  Props,
  configJSON,
} from "./StripeIntegrationController";



export default class StripeIntegration extends StripeIntegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start

    return (
      <SafeAreaView style={styles.safearea}>
        <HeaderWithBackArrowTemplate
          headerText="Payment"
          navigation={this.props.navigation}
          scrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <MileStone
              list={["My Cart", "Personel Details", "Summary", "Payment"]}
              selected="Payment"
            />
            <View style={{ paddingTop: 20 }}/>
            <View style={styles.paymentContainer}>
              <Text style={styles.headerTextPayment}>CHOOSE PAYMENT METHOD</Text>
              <View style={styles.seperatorPayment} />
              <View style={styles.checkContainer}>
                <View style={styles.checkBoxContainer}>
                  <CheckBox checked={true} setChecked={() => { }} />
                  <Text
                    style={styles.address}
                  >{`Credit/Debit Card`}</Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <CheckBox checked={false} setChecked={() => { }} />
                  <Text
                    style={styles.address}
                  >{`Cash on Delivery`}</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <MyDetails
                header="MY DETAILS"
                list={[
                  { question: "name", ans: "Maria Tofimova" },
                  { question: "email", ans: "test@gmail.com" },
                  { question: "phone", ans: "+ 121212122121" },
                  {
                    question: "Shipping Add.",
                    ans: "12, AB Building ,Near Taxibillling, Dallas, TX",
                  },
                  { question: "Zipcode", ans: "123456" },
                ]}
              />
            </View>
            <View style={styles.paymentContainer}>
              <Text style={styles.headerTextPayment}>PAYMENT DETAILS</Text>
              <View style={styles.seperatorPayment} />
              <View style={styles.answerContainer}>
                <View style={styles.row}>
                  <Text style={styles.paymentText}>Subtotal</Text>
                  <Text style={styles.answer}>{'$600'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paymentText}>Discount</Text>
                  <Text style={styles.answer}>{'-$60 (10%'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paymentText}>Shipping Charges</Text>
                  <Text style={styles.answer}>{"$0.00"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.paymentText}>{"Meat Storage(Gold)"}</Text>
                  <Text style={styles.answer}>{"$4.99"}</Text>
                </View>
              </View>
              <View style={styles.seperatorPayment} />
              <View style={[styles.row, { paddingHorizontal: 20 }]}>
                <Text style={styles.paymentText}>Total</Text>
                <Text style={styles.answer}>{'$540'}</Text>
              </View>
            </View>
            <DoubleButton
              button1Label="Pay"
              button1_Onpress={() => { }}
              button2Label="Cancel"
              button2_Onpress={() => { }}
              containerStyle={{ paddingTop: 20 }}
            />
          </View>
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingVertical: 20,
  },
  safearea: { flex: 1, backgroundColor: LIGHT_GREY },
  seperator: { width: responsiveWidth(3) },
  dotContainer: {
    backgroundColor: LIGHT_GREY,
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    paddingVertical: responsiveHeight(2.5),
    borderRadius: 20,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  imageContainer: { flexDirection: "row", paddingTop: 20 },
  answer: { textAlign: "right", color: DARK_RED, fontSize: 15 },
  question: { color: "grey", fontSize: 15 },
  headerText: {
    letterSpacing: 3,
    color: "grey",
    fontWeight: "bold",
    paddingVertical: 15,
  },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: "#A0272A",
    borderRadius: 7.5,
  },
  myDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  myDetail: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 20,
  },
  seperatorLine: { borderBottomColor: "lightgrey", borderBottomWidth: 1 },
  availableSlot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slotContainer: {
    paddingVertical: 12,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,

    elevation: 3,
  },
  blur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    opacity: 0.6,
    borderRadius: 15,
  },
  checkBoxContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  availableText: { color: DARK_RED, fontSize: 17, paddingVertical: 15 },
  address: { fontSize: 16, color: DARK_RED, paddingHorizontal: 12 },
  slots: { marginTop: 20, paddingBottom: 20 },
  container: { paddingHorizontal: 15 },
  estimation: {
    fontSize: 17,
    color: "grey",
  },
  delivery: {
    borderColor: PRIMARY,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: LIGHT_GREY,
  },
  emptySlot: { flex: 1, marginHorizontal: 5, marginVertical: 5 },
  addressContainer: { flexDirection: "row", alignItems: "center" },
  padding: { padding: 3 },
  addressText: { paddingVertical: 10, paddingLeft: 10 },
  answerContainer: { paddingHorizontal: 20, paddingBottom: 10 },
  checkContainer: { paddingHorizontal: 20 },
  termsAndCondition: { color: "grey", fontSize: 17, paddingVertical: 15 },
  contentContainer: { paddingBottom: 20, paddingHorizontal: 20 },
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
  // answer: {
  //   color: "#A0272A",
  //   fontSize: 17,
  //   fontWeight: "bold",
  // },
  seperatorPayment: { height: 1, backgroundColor: "lightgrey" },
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
    paddingTop: 20,
  },
  direct: { fontSize: 16, fontWeight: "bold", color: "grey", paddingVertical: 25 },
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
    paddingRight: 25,
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
  headerTextPayment: {
    fontSize: 15,
    color: "grey",
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontWeight: "bold"
  },
  textInput: { flex: 1, paddingLeft: 25, fontWeight: 'bold', fontSize: 16, color: '#A0272A' }

});
// Customizable Area End
