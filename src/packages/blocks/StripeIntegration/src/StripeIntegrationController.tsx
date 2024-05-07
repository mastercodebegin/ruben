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
      storageClass: "Basic" | "Gold" | "Platinum",
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
  savedCards:Array<{}>
  cardId:number
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
      cardId:0,
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
      this.setState({savedCards:saveCards})
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
    if(this.state.cardNumber == "" || this.state.cardName == "" || this.state.cvv == "" || this.state.expirtyDate == "" ){
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
  else{
    this.setState({saveCard:!this.state.saveCard})
    this.saveCardApiCalled(78);
  }
  }
  changeCard(data:object){
console.log('data==========',data);
this.setState({cardNumber:data.card_number,cardName:data.name,cardId:data.card_number})


  }
  async saveCardApiCalled(order_id: number) {
    console.log('expirary',this.state.expirtyDate);
    
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
    //this.setState({ show_loader: true });
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
