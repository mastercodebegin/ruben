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
  Alert,
  FlatList
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
} from "./StripeIntegrationController";
import PaymentCustomeAlert from "./PaymentCustomeAlert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { APP_BACKGROUND, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
import CommonLoader from "../../../components/src/CommonLoader";


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
    console.log("saveCard_Details", saveCard_Details);
    this.setState({ cardName: saveCard_Details?.cardName || "", cardNumber: saveCard_Details?.cardNumber || "", cvv: saveCard_Details?.cvv || "", expirtyDate: saveCard_Details?.expirtyDate || "" })
  }

  cardUI(){
    return( 
      this.state.paymentMethodType === "Card" && (
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
                  this.setCardNameState(text)
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
                  this.setCardNumberState(text)
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
              <TouchableOpacity style={styles.padding} onPress={() => { this.onSaveCard() }}>
                <CheckBox
                  backgroundColor={APP_BACKGROUND}
                  checked={this.state.saveCard}
                  disabled
                />
              </TouchableOpacity>
              <Text style={[styles.question, styles.addressText]}>Save Card Details</Text>
            </View>
          </View>
        </View>
      </View>
    ))
  }

 
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start

    return (
      <SafeAreaView style={[styles.safearea, { backgroundColor: APP_BACKGROUND }]}>
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
                  <TouchableOpacity style={styles.padding}
                    testID="cardButton" onPress={() => {
                      this.setState({ paymentMethodType: "Card" })
                    }}>
                    <CheckBox
                    testID="CardCheckBoxId"
                      backgroundColor={APP_BACKGROUND}
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
                      backgroundColor={APP_BACKGROUND}
                      checked={this.state.paymentMethodType === "Cod"}
                      disabled
                      setChecked={() => { }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.question, styles.addressText]}>{`Cash on Delivery`}</Text>
                </View>
              </View>
            </View>
            <View style={{ height: 4 }}></View>
            <View style={styles.seperatorPayment} />

            <FlatList
              data={this.state.savedCards}
              renderItem={({ item, index }: { item: {cardNumber:string,name:string,card_number:string}; index: number }) =>
                <View>
                  {index == 0 && <Text style={{
                    fontSize: 15,
                    padding:6,
                    color: TEXT_COLOR,
                    fontWeight: "bold"
                  }}>SAVED CARDS</Text>}
                  <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    padding: 10, flexDirection: 'row'
                  }}>
                    <View style={{ marginTop: 3 }}>
                      <CheckBox
                        backgroundColor={APP_BACKGROUND}
                        checked={item?.cardNumber == this.state.cardId ? true : false}
                        setChecked={() => this.changeCard(item)} />
                        </View>

                    <Text style={{
                      fontSize: 15,
                      color: TEXT_COLOR,
                      fontWeight: "bold",
                      marginLeft: 12
                    }}>{item.name}</Text>

                  </View>
                  <View style={{ marginLeft: 45 }}>
                    <Text>{item.card_number}</Text>
                  </View>
                </View>

              }
            />

            {this.cardUI()}

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
                  { question: "Delivery", ans: this.props.route.params.deliveryDate },
                ]}
              />
            </View>
            <PaymentDetails
              header="PAYMENT DETAILS"
              list={this.props.route.params.billingDetails||[] }
              footer={{ question: "Total", ans: `${this.props.route.params.total}` }}
              isSubscribed={this.props.route.params.lifetimeSubscriptionCharge}
              isUserAlreadySubscribed={this.props.route.params.isUserAlreadySubscribed}
              is24HourDelivery={this.props.route.params.is24HourDelivery}

            />
            <View style={styles.containerStyle} testID="doubleButton">
              <TouchableOpacity
                onPress={ () => {
                  this.handleSubmit()
                }}
                style={[styles.buttonDouble, styles.button1Style]}
                testID="doneFirstButtonEvent"
              >
                <Text style={[styles.textStyles, { color: WHITE }]}>
                { this.getButtonName()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="doneSecondButtonEvent"
                onPress={() => {
                  this.handleCancelPress()
                }}
                style={[styles.buttonDouble, styles.button2Style,
                { borderWidth: 1, borderColor: PRIMARY_COLOR, backgroundColor: BUTTON_COLOR_SECONDARY }]}
              >
                <Text style={[styles.textStyles, { color: BUTTON_TEXT_COLOR_SECONDARY }]}>
                  {"Cancel"}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </HeaderWithBackArrowTemplate>
        {this.state.showPaymentAlert && (
          <PaymentCustomeAlert visible={this.state.showPaymentAlert} onpressClose={() => {
            this.setState({ showPaymentAlert: false });
          }} onpressContinue={() => {
            this.handleContinueButton();
          }} customeText={this.state.customAlertText}
            isLoading={this.state.showPaymentLoading} customeDescription={this.state.customAlertDesc} paymentAlerttype={this.state.paymentAlerttype} testID={"paymentAlert"} />
        )}
        <CommonLoader visible={this.state.isLoading}/>
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
  question: { color: TEXT_COLOR, fontSize: 15 },
  headerText: {
    letterSpacing: 3,
    color: TEXT_COLOR,
    fontWeight: "bold",
    paddingVertical: 15,
  },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: PRIMARY_COLOR,
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
  fetchDetails: { backgroundColor: "#A0272A", borderRadius: 5, color: WHITE, paddingHorizontal: 10 },
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
  seperatorPayment: { height: 1, backgroundColor: PRIMARY_COLOR },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  paymentText: { fontSize: 17, color: "grey" },
  paymentContainer: {
    backgroundColor: WHITE,
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
    color: TEXT_COLOR,
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontWeight: "bold"
  },
  textInput: { flex: 1, paddingLeft: 25, fontWeight: 'bold', fontSize: 16, color: '#A0272A' },
  cardTextinput: {
    color: TEXT_COLOR,
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: TEXT_COLOR,
    paddingVertical: 10,
  },
  expirtyDate: {
    width: SCREEN_WIDTH / 2 - 40,
    color: TEXT_COLOR,
    backgroundColor: SECONDARY_COLOR,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
  },
  cvv: {
    color: TEXT_COLOR,
    backgroundColor: SECONDARY_COLOR,
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
  button1Style: { backgroundColor: PRIMARY_COLOR, borderRadius: 30 },
  containerStyle: { paddingTop: 20 },

});
// Customizable Area End
