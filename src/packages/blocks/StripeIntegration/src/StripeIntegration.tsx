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
import TextInput from "../../../components/src/CustomTextInput";
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
import { SCREEN_WIDTH } from "../../../components/src/constants";
import moment from "moment";

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
import PaymentCustomeAlert from "./PaymentCustomeAlert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



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
  handleExpiryDate = (text: string) => {
    console.log("change-->", text)
    let year = moment().format("YY");
    let textTemp = text;
    if (textTemp[0] !== "1" && textTemp[0] !== "0") {
      textTemp = "";
    }
    if (textTemp.length === 2) {
      if (
        parseInt(textTemp.substring(0, 2)) > 12 ||
        parseInt(textTemp.substring(0, 2)) == 0
      ) {
        textTemp = textTemp[0];
      } else if (text.length === 2 && !this.state.backspaceFlag) {
        textTemp += "/";
        this.setState({ backspaceFlag: true });
      } else if (text.length === 2 && this.state.backspaceFlag) {
        textTemp = textTemp[0];
        this.setState({ backspaceFlag: false });
      } else {
        textTemp = textTemp[0];
      }
    }
    if (textTemp.length > 3) {
      if (parseInt(textTemp[3]) < parseInt(year / 10)) {
        textTemp = textTemp.slice(0, 3);
      }
      if (parseInt(textTemp[4]) < year % 10) {
        textTemp[4] = "";
        textTemp = textTemp.slice(0, 4);
      }
    }
    this.setState({ expirtyDate: textTemp })
  };

  handleCVVTextInput = (text: string) => {
    if (text === undefined) {
      return;
    }
    this.setState({ cvv: text });
  };


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
          <KeyboardAwareScrollView 
          contentContainerStyle={{flexGrow: 1}} 
          keyboardShouldPersistTaps='handled'
          style={{marginBottom:150}}
          extraScrollHeight={100}
          >
            <MileStone
              list={["My Cart", "Personel Details", "Summary", "Payment"]}
              selected="Payment"
            />
            <View style={{ paddingTop: 20 }} />
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
            <View style={{ paddingTop: 20 }} />
            <View style={styles.paymentContainer}>
              <Text style={styles.headerTextPayment}>CARD DETAILS</Text>
              <View style={styles.seperatorPayment} />
              <View style={styles.checkContainer}>
                <View style={{ paddingTop: 20 }}>
                  <TextInput
                    textInputStyle={styles.cardTextinput}
                    labeStyle={styles.label}
                    value={this.state.cardName}
                    testID="name_test_id"
                    onchangeText={(text) => {
                      this.setState({ cardName: text })
                    }
                    }
                    label="Name on card"
                    placeholder="Enter name on card"
                  />
                  <TextInput
                    textInputStyle={styles.cardTextinput}
                    labeStyle={styles.label}
                    keyBoardtype="number-pad"
                    value={this.state.cardNumber}
                    testID="name_test_id"
                    onchangeText={(text) => {
                      let formattedCard = cardNumberFormatter(text, this.state.cardNumber);
                      this.setState({ cardNumber: formattedCard })
                    }
                    }
                    label="Card number"
                    placeholder="Enter card number"
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <TextInput
                      textInputStyle={styles.expirtyDate}
                      labeStyle={styles.label}
                      value={this.state.expirtyDate}
                      keyBoardtype="number-pad"
                      testID="name_test_id"
                      maxLenth={5}
                      onchangeText={(text) => {
                        this.handleExpiryDate(text);
                      }
                      }
                      label="Expiry Date"
                      placeholder="12/12"
                    />
                    <View><Text>{"  "}</Text></View>
                    <TextInput
                      textInputStyle={styles.cvv}
                      labeStyle={styles.label}
                      value={this.state.cvv}
                      keyBoardtype="number-pad"
                      testID="name_test_id"
                      maxLenth={3}
                      onchangeText={(text) => {
                        this.handleCVVTextInput(text)
                      }
                      }
                      label="CVV"
                      placeholder="123"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <MyDetails
                header="MY DETAILS"
                list={[
                  { question: "name", ans: "Lerna Tofimova" },
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
              //this.setState({ showPaymentAlert: true })
              button1_Onpress={() => {this.getPaymentMethod()}}
              button2Label="Cancel"
              button2_Onpress={() => { }}
              containerStyle={{ paddingTop: 20 }}
            />
          </KeyboardAwareScrollView>
        </HeaderWithBackArrowTemplate>
        {this.state.showPaymentAlert && (
          <PaymentCustomeAlert visible={this.state.showPaymentAlert} onpressClose={() => {
            this.setState({ showPaymentAlert: false })
          }} onpressContinue={() => {
            this.setState({ showPaymentAlert: false })
          }} customeText={"Sample testing"} iconImage={require("../../OrderSummary/assets/cart.png")} isLoading={false} />
        )}
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}
export const cardNumberFormatter = (value: string, previousValue: string) => {
  // return nothing if no value
  if (!value) {
    return value;
  }
  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    // returns: "x", "xx", "xxx"
    if (cvLength < 5) {
      return currentValue;
    }

    if (cvLength < 9) {
      let d1 = `${currentValue.slice(0, 4)} ${currentValue.slice(4)}`;
      return d1;
    }

    if (cvLength < 13) {
      let d1 = `${currentValue.slice(0, 4)} ${currentValue.slice(
        4,
        8
      )} ${currentValue.slice(8)}`;
      return d1;
    }

    return `${currentValue.slice(0, 4)} ${currentValue.slice(
      4,
      8
    )}-${currentValue.slice(8, 12)} ${currentValue.slice(12, 16)}`;
  } else {
    return value;
  }
};


// Customizable Area Start

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  main: {
    flex: 1,
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
  textInput: { flex: 1, paddingLeft: 25, fontWeight: 'bold', fontSize: 16, color: '#A0272A' },
  cardTextinput: {
    color: "#5C2221",
    flex: 1,
    backgroundColor: "#F8F4F4",
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: "#8D7D75",
    paddingVertical: 10,
  },
  expirtyDate: {
    width: SCREEN_WIDTH / 2 - 40,
    color: "#5C2221",
    backgroundColor: "#F8F4F4",
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
  },
  cvv: {
    color: "#5C2221",
    backgroundColor: "#F8F4F4",
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
    marginBottom: 20,
    width: SCREEN_WIDTH / 2 - 40,
    marginRight: 8,
    paddingHorizontal: 10,

  },
});
// Customizable Area End
