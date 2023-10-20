import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  Alert
} from "react-native";
import TextInput from "../../../components/src/CustomTextInput";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./../../PersonelDetails/src/MyDetails";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import MileStone from "../../../components/src/MilestoneComponent";
import { LIGHT_GREY, PRIMARY, WHITE, SCREEN_WIDTH } from "../../../components/src/constants";
import { DARK_RED } from "../../landingpage/src/colors";
import CheckBox from "../../../components/src/CustomRadioBtn";
import moment from "moment";
import PaymentDetails from "../../OrderSummary/src/PaymentDetails";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import { showToast } from "../../../components/src/ShowToast";
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
  
  async componentDidMount() {
    const saveCard_Details = await getStorageData("saveCardDetails", true);
    console.log("saveCard_Details",saveCard_Details);
    this.setState({cardName:saveCard_Details?.cardName,cardNumber:saveCard_Details?.cardNumber,cvv:saveCard_Details?.cvv,expirtyDate:saveCard_Details?.expirtyDate})
  }

  handleExpiryDate = (text: string) => {
    let year: string = moment().format("YY");
    let textTemp: any = text;
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
    this.setState({ expirtyDate: textTemp })
    if (textTemp.length > 3) {
      this.handleExpirtyMorethan3(textTemp, year)
    }
  };

  handleExpirtyMorethan3 = (textTemp: any, year: any) => {
    let yearN = Number(year)
    if (parseInt(textTemp[3]) < (~~(yearN / 10))) {
      textTemp = textTemp.slice(0, 3);
    }
    if (parseInt(textTemp[4]) < yearN % 10) {
      textTemp[4] = "";
      textTemp = textTemp.slice(0, 4);

    }
    this.setState({ expirtyDate: textTemp });
  }

  handleCVVTextInput = (text: string) => {
    this.setState({ cvv: text });
  };
  handleContinueButton = () => {
    if (this.state.isOrderSuccess) {
      if (this.state.paymentAlerttype === "PaymentSuccess") {
        this.setState({ paymentAlerttype: "ThankYouForYourOder" }, () => {
          this.handlePaymentSuccess()
        });
      } else if (this.state.paymentAlerttype === "ThankYouForYourOder" && this.state.paymentMethodType === "Cod") {
        this.setState({ paymentAlerttype: "CodConfirmation" }, () => {
          this.handlePaymentSuccess()
        });
      } else if (this.state.paymentAlerttype === "CodConfirmation" || this.state.paymentAlerttype === "ThankYouForYourOder") {
        this.setState({ paymentAlerttype: "ContinueToEmail" }, () => {
          this.handlePaymentSuccess()
        });
       } else {
        this.setState({ showPaymentAlert: false });
        this.props.navigation.navigate('InvoiceBilling', this.props.route.params);
      }
    } else {
       if (this.state.paymentAlerttype === "PaymentFailed") {
        this.setState({showPaymentAlert: false})
    }
    }
  }
   getMeatStorage = ()=>{
    if (this.props.route.params.storageClass === "Gold") {
      return 3.99
    } else if (this.props.route.params.storageClass === "Platinum") {
      return 9.99
    } else {
      return 0.0
    }
  }

   handleOkPress = () => this.props.navigation.goBack();
   handleCancelPress = () => {
    Alert.alert("Alert", "Are you sure to cancel", [
      { text: "OK", onPress: this.handleOkPress },
      { text: "CANCEL" },
    ]);
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
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
            style={{ marginBottom: 150 }}
            extraScrollHeight={100}
          >
            <MileStone
              list={["My Cart", "Personal Details", "Summary", "Payment"]}
              selected="Payment"
            />
            <View style={{ paddingTop: 20 }} />
            <View style={styles.paymentContainer}>
              <Text style={styles.headerTextPayment}>CHOOSE PAYMENT METHOD</Text>
              <View style={styles.seperatorPayment} />
              <View style={styles.checkContainer}>
                <View style={styles.addressContainer}>
                  <TouchableOpacity style={styles.padding} testID="cardButton" onPress={() => {
                    this.setState({ paymentMethodType: "Card" })
                  }}>
                    <CheckBox
                      backgroundColor={LIGHT_GREY}
                      checked={this.state.paymentMethodType === "Card"}
                      disabled
                      setChecked={() => { }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.question, styles.addressText]}>{`Credit/Debit Card`}</Text>                
                </View>
                <Text style={{ color: DARK_RED }}>{""}
                </Text>
                <View style={styles.addressContainer}>
                  <TouchableOpacity style={styles.padding} testID="codButton" onPress={() => {
                    this.setState({ paymentMethodType: "Cod" })
                  }}>
                    <CheckBox
                      backgroundColor={LIGHT_GREY}
                      checked={this.state.paymentMethodType === "Cod"}
                      disabled
                      setChecked={() => { }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.question, styles.addressText]}>{`Cash on Delivery`}</Text>
                </View>
              </View>
            </View>
            {this.state.paymentMethodType === "Card" && (
              <View style={{ paddingTop: 20 }}>
                <View style={styles.paymentContainer}>
                  <Text style={styles.headerTextPayment}>CARD DETAILS</Text>
                  <View style={styles.seperatorPayment} />
                  <View style={styles.checkContainer}>
                    <View style={{ paddingTop: 20 }}>
                      <TextInput
                        textInputStyle={styles.cardTextinput}
                        labeStyle={styles.label}
                        value={this.state.cardName}
                        testID="cardNameInput"
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
                        testID="cardNumber"
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
                          testID="cardExpiry"
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
                          testID="cardCVV"
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
                    <View style={styles.addressContainer}>
                    <TouchableOpacity style={styles.padding} onPress={this.onSaveCard}>
                      <CheckBox
                        backgroundColor={LIGHT_GREY}
                        checked={this.state.saveCard}
                        disabled
                        setChecked={() => {}}
                      />
                    </TouchableOpacity>
                    <Text style={[styles.question, styles.addressText]}>Save Card Details</Text>
                  </View>
                  </View>
                </View>
              </View>
            )}

            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <MyDetails
                header="MY DETAILS"
                list={[
                  { question: "Name", ans: this.props.route.params.name },
                  { question: "Email", ans: this.props.route.params.email },
                  { question: "Phone", ans: this.props.route.params.phone_number },
                  {
                    question: "Shipping Add.",
                    ans: this.props.route.params.address,
                  },
                  { question: "Zipcode", ans: this.props.route.params.zip_code },
                ]}
              />
            </View>
            <PaymentDetails
                header="PAYMENT DETAILS"
                list={this.props.route?.params.billingDetails || []}
                footer={{question: "Total", ans: `$${this.props.route?.params?.total}`}}
              />
            <View style={styles.containerStyle} testID="doubleButton">
              <TouchableOpacity
                onPress={async ()=> {
                  if (this.state.paymentMethodType === "Card") {
                    if(this.state.cardNumber == "" && this.state.cardName == "" && this.state.cvv == "" && this.state.expirtyDate == "" ){
                      return Alert.alert("Alert", "Please add card details");
                    }
                    if(this.state.saveCard){ 
                      showToast("Card details will be automatically removed upon logout for security reasons")           
                    await setStorageData(
                      "saveCardDetails",
                      JSON.stringify({
                        cardNumber:this.state.cardNumber,
                        cardName:this.state.cardName,
                        cvv:this.state.cvv,
                        expirtyDate:this.state.expirtyDate                  
                      })
                    );
                    }
                    this.setState({ showPaymentLoading: true })
                    this.setState({ customAlertText: "Payment In Process.." });
                    this.setState({ showPaymentAlert: true })
                    let card = this.state.cardNumber.replace(' ', '').replace(' ', '').replace(' ', '');
                    let cvv = this.state.cvv
                    let month = this.state.expirtyDate.slice(0, 2);
                    let year = "20" + this.state.expirtyDate.slice(-2);
                    this.getPaymentMethod(card, cvv, month, year)
                  } else {
                    this.setState({ showPaymentLoading: true })
                    this.setState({ customAlertText: "Order In Process.." });
                    this.codeApiCalled(this.props.route.params.orderId)
                    this.setState({ showPaymentAlert: true })
                  }  
                }}
                style={[styles.buttonDouble, styles.button1Style]}
                testID="doneFirstButtonEvent"
              >
                <Text style={[styles.textStyles, { color: WHITE }]}>
                  {this.state.paymentMethodType === "Card" ? "Pay" : "Continue"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="doneSecondButtonEvent"
                onPress={() => { 
                  this.handleCancelPress()
                }}
                style={[styles.buttonDouble, styles.button2Style]}
              >
                <Text style={[styles.textStyles, { color: PRIMARY }]}>
                  {"Cancel"}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </HeaderWithBackArrowTemplate>
        {this.state.showPaymentAlert && (
          <PaymentCustomeAlert visible={this.state.showPaymentAlert} onpressClose={() => {
            this.setState({ showPaymentAlert: false });
          } } onpressContinue={() => {
            this.handleContinueButton();
          } } customeText={this.state.customAlertText}
          isLoading={this.state.showPaymentLoading} customeDescription={this.state.customAlertDesc} paymentAlerttype={this.state.paymentAlerttype} testID={"paymentAlert"} />
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
    )} ${currentValue.slice(8, 12)} ${currentValue.slice(12, 16)}`;
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
    backgroundColor: WHITE,
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
    backgroundColor: WHITE,
    opacity: 0.6,
    borderRadius: 15,
  },
  checkBoxContainer: {
    flexDirection: "row",
    backgroundColor: WHITE,
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
  fetchDetails:{backgroundColor:"#A0272A",borderRadius:5,color:WHITE,paddingHorizontal:10},
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
    backgroundColor:WHITE,
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
    backgroundColor: WHITE,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: WHITE,
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
  buttonDouble: { alignItems: "center" },
  textStyles: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 14,
  },
  button2Style: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: PRIMARY,
    marginTop: 10,
  },
  button1Style: { backgroundColor: PRIMARY, borderRadius: 30 },
  containerStyle:{ paddingTop: 20 },

});
// Customizable Area End
