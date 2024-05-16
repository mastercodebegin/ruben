import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "./../../../components/src/utils";
import { Alert } from "react-native";
import moment from "moment";
export const configBase = require('../../../framework/src/config')
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: {
    params: {
      is24HourDelivery: boolean;
      name: string,
      email: string,
      address: string,
      phone_number: number,
      zip_code: number,
      subtotal: number,
      shipping: number,
      discount: number,
      discountPercentage : number,
      storageClass: string,
      orderId: number,
      orderNumber: number,
      deliveryCharge: number,
      total?: number,
      lifetimeSubscriptionCharge:any
      billingDetails?: any[];
      isUserAlreadySubscribed:boolean;
      deliveryDate:string
    }
  }
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  showPaymentAlert: boolean;
  showPaymentLoading: boolean;
  customAlertText: string;
  customAlertDesc: string;
  saveCard:boolean;
  cardName: string;
  cardNumber: string;
  backspaceFlag: boolean;
  expirtyDate: string;
  cvv: string;
  isOrderSuccess: boolean;
  savedCards:Array<{cardNumber:string,name:string,card_number:string}>
  cardId:string
  isLoading:boolean
  paymentMethodType: "Card" | "Cod";
  paymentAlerttype: "PaymentFailed" | "PaymentSuccess" | "ThankYouForYourOder" | "ContinueToEmail" | "CodConfirmation";
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class StripeIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      cardId:'',
      isLoading:false,
      savedCards:[],
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      showPaymentAlert: false,
      showPaymentLoading: false,
      saveCard:false,
      cardName: "",
      cardNumber: "",
      backspaceFlag: false,
      expirtyDate: "",
      cvv: "",
      isOrderSuccess: false,
      paymentMethodType: "Card",
      paymentAlerttype: "PaymentSuccess",
      customAlertText: "",
      customAlertDesc: "You earned a discount coupon code. You can check this out in your profile or Redeem Now!",
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    
    // Customizable Area End
  }
  paymentId: string = '';
  codId: string = '';
  saveCardApiCallId: string = '';
  getSavedCardsCallId: string = '';

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.paymentId != null &&
      this.paymentId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let paymentData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log("check paymentData", paymentData);
      console.log("check paymentData error", error);
      
      if (paymentData.errors || error) {
        this.setState({ paymentAlerttype: "PaymentFailed" })
        this.handlePaymentFailed()
      } else {
        this.setState({ paymentAlerttype: "PaymentSuccess" })
        this.handlePaymentSuccess()
      }
    } 
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.codId != null &&
      this.codId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let paymentData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      
      if (error) {
        this.setState({ paymentAlerttype: "PaymentFailed" })
        this.handlePaymentFailed()
      }else  {
        this.setState({ paymentAlerttype: "ThankYouForYourOder" })
        this.handlePaymentSuccess()
      } 
    }
   this.subAsync(message)
    
    // Customizable Area Start
    // Customizable Area End
  }

subAsync(message:Message){
   if (
    getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.getSavedCardsCallId != null &&
    this.getSavedCardsCallId ===
    message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
  ) {
    let saveCards = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let error = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    
    if (error) {
      console.log('getSavedCardsCallId error res',error);

    }else  {
      console.log('getSavedCardsCallId res',saveCards);
      this.setState({savedCards:saveCards,isLoading:false})
    } 
  }
  else if (
    getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.saveCardApiCallId != null &&
    this.saveCardApiCallId ===
    message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
  ) {
    let saveCards = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let error = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    
    if (error) {
      console.log('error res',error);

    }else  {
      console.log('sacecards res',saveCards?.customer);
      this.getSavedCards(saveCards?.customer)
      
    } 
  }
}
setCardNameState(text:string)
{
  this.setState({ cardName: text })
}
cardNumberFormatter (value: string, previousValue: string)  {
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

handleExpiryDate = (text: string) => {
  console.log('text===', text);

  let year: string = moment().format("YY");
  console.log('year', year);


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

setCardNumberState(text:string)
{
  let formattedCard = this.cardNumberFormatter(text, this.state.cardNumber);
                  this.setState({ cardNumber: formattedCard })
}
  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  onSaveCard(){
    console.log('this.state.cardNumber',this.state.cardNumber);
    console.log('this.state.cardName',this.state.cardName);
    console.log('this.state.expirtyDate',this.state.expirtyDate);
    console.log('this.state.cvv',this.state.cvv);
    if(this.state.cardNumber == "" 
    || this.state.cardName == ""
     || this.state.cvv == "" ||
      this.state.expirtyDate == "" )
      {
      return Alert.alert("Alert", "Please enter correct card details");
    }
    else if (this.state.cardNumber.length !== 19)
     {
      return Alert.alert("Alert", "Please enter a valid card number");
    }
    else if (this.state.expirtyDate.length !== 5) 
    {
      return Alert.alert("Alert", "Please enter a valid expiry date");
    } 
    else if (this.state.cvv.length !== 3)
     {
      return Alert.alert("Alert", "Please enter a valid CVV");
  }
  else{
    this.setState({saveCard:!this.state.saveCard})
    this.saveCardApiCalled();
  }
  }
  changeCard(data:{cardNumber:string,name:string,card_number:string}){
    console.log('card',data);
    console.log('card number',data?.card_number);
    
this.setState({cardNumber:data?.card_number,cardName:data?.name,cardId:data?.card_number})


  }
  async saveCardApiCalled() {
    console.log('expirary',this.state.expirtyDate);
    this.setState({isLoading:true})
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
      "Content-Type": "application/json"
    };

    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.saveCardApiCallId = subcategory.messageId;
    console.log('expiry date',this.state.expirtyDate);
    
    let raw = JSON.stringify({
      "payments":{
        "exp_month":11,
        "exp_year": 2024,
        "cvc": 314,
        "number":"4242 4242 4242 4242",
        "name": this.state.cardName
    }
    });
    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_stripe_integration/payments/save`
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      raw
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }

  async paymentApi(payment_methods: string, order_id: number) {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
      "Content-Type": "application/json"
    };

    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.paymentId = subcategory.messageId;
    let raw = JSON.stringify({
      payment: {
        order_id: order_id,
        payment_method_id: payment_methods,
      }
    });
    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.paymentApi}`
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      raw
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }

  async codeApiCalled(order_id: number) {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
      "Content-Type": "application/json"
    };

    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.codId = subcategory.messageId;
    let raw = JSON.stringify({
      payment: {
        order_id: order_id,
      }
    });
    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.codApi}`
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      raw
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }

  async getSavedCards(cardId:string) {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const getSavedCards = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getSavedCardsCallId = getSavedCards.messageId;
    getSavedCards.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_stripe_integration/payments/retrive?customer='+cardId
    );
    getSavedCards.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getSavedCards.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getSavedCards.id, getSavedCards);
  }
  async getPaymentMethod(card: string, cvv:string, month:string, year:string, test=false) {
    let myHeaders: any; 
    if (test === false) {
       myHeaders = new Headers();
       myHeaders.append("Authorization", "Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc");
       myHeaders.append("Content-Type", "text/plain");   
    }
    let raw = "\n";
    let requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let url = `https://api.stripe.com/v1/payment_methods?card[number]=${card}&card[exp_month]=${month}&card[exp_year]=${year}&card[cvc]=${cvv}&type=card&&key=${configJSON.pub_key}`
    if (test) {
      return url
    } 
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("result-->", result);
        let json = JSON.parse(result)
        this.paymentApi(json.id, this.props.route.params.orderId)
      })
      .catch(error => {
        this.handlePaymentFailed()
      });
      
  }
async handleSubmit()
{
  if (this.state.paymentMethodType === "Card") {
    if (this.state.cardNumber == "" || this.state.cardName == "" || this.state.cvv == "" || this.state.expirtyDate == "") {
      return Alert.alert("Alert", "Please enter correct card details");
    }
    else if (this.state.cardNumber.length !== 19) {
      return Alert.alert("Alert", "Please enter a valid card number");
    }
    else if (this.state.expirtyDate.length !== 5) {
      return Alert.alert("Alert", "Please enter a valid expiry date");
    }
    else if (this.state.cvv.length !== 3) {
      return Alert.alert("Alert", "Please enter a valid CVV");
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
      this.setState({ showPaymentAlert: false })
    }
  }
}
getMeatStorage = () => {
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

getButtonName()
{
  return( this.state.paymentMethodType === "Card" ? "Pay" : "Continue")
}
  handlePaymentFailed = () => {
    this.setState({ customAlertText: this.state.paymentMethodType === "Card" ? "Payment Failed" : "Order Failed" });
    this.setState({ customAlertDesc: "Please contact to admin Or Try again." })
    this.setState({ showPaymentLoading: false })
  }

  handlePaymentSuccess = () => {
    this.setState({ isOrderSuccess: true })
    this.setAlertText()
    this.setState({ showPaymentLoading: false })
  }
  setAlertText = () => {
    store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: [] })

    if (this.state.paymentAlerttype === "PaymentSuccess") {
      this.setState({ customAlertText: "Payment Successful" })
      this.setState({ customAlertDesc: "You earned a discount coupon code. You can check this out in your profile or Reed Now!" })
    } else if (this.state.paymentAlerttype === "ThankYouForYourOder") {
      this.setState({ customAlertText: "Thank you for your order" })
      this.setState({ customAlertDesc: `Your order number is ${this.props.route.params.orderNumber}` })
    } else if (this.state.paymentAlerttype === "CodConfirmation"){
      this.setState({customAlertText: "We are glad to inform you that we have confirmed your order as COD", customAlertDesc: "" })
    } else {
      this.setState({ customAlertText: "Check your E-mail" })
      this.setState({ customAlertDesc: "Check your email for order details" })
    }
  }

  // Customizable Area End
}
