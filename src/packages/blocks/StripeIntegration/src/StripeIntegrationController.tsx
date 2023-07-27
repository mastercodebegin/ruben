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
import { Alert } from "react-native";
import { showToast } from "../../../components/src/ShowToast";
export const configBase = require('../../../framework/src/config')
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: {
    params: {
      name: string,
      address: string,
      phone_number: number,
      zip_code: number,
      subtotal: number,
      shipping: number,
      discount: number,
      storageClass: "Basic" | "Gold" | "Platinum",
      orderId: number,
      orderNumber: number
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
  cardName: string;
  cardNumber: string;
  backspaceFlag: boolean;
  expirtyDate: string;
  cvv: string;
  isOrderSuccess: boolean;
  paymentMethodType: "Card" | "Cod";
  paymentAlerttype: "PaymentFailed" | "PaymentSuccess" | "ThankYouForYourOder" | "ContinueToEmail";
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
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      showPaymentAlert: false,
      showPaymentLoading: false,
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
      console.log("check paymentData", paymentData.errors);
      
      if (paymentData.errors || error) {
        this.setState({ paymentAlerttype: "PaymentFailed" })
        this.handlePaymentFailed()
      } else {
        this.setState({ paymentAlerttype: "PaymentSuccess" })
        this.handlePaymentSuccess()
      }
    } else if (
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
      console.log("check paymentData", paymentData.success);
      
      if (error) {
        this.setState({ paymentAlerttype: "PaymentFailed" })
        this.handlePaymentFailed()
      }else  {
        this.setState({ paymentAlerttype: "ThankYouForYourOder" })
        this.handlePaymentSuccess()
      } 
    }
    // Customizable Area Start
    // Customizable Area End
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

  async getPaymentMethod(card: string, cvv:string, month:string, year:string) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc");
    myHeaders.append("Content-Type", "text/plain");
    let raw = "\n";

    let requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let url = `https://api.stripe.com/v1/payment_methods?card[number]=${card}&card[exp_month]=${month}&card[exp_year]=${year}&card[cvc]=${cvv}&type=card`
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("result-->", result);
        let json = JSON.parse(result)
        this.paymentApi(json.id, this.props.route.params.orderId)
      })
      .catch(error => {
        this.setState({ customAlertText: "Payment Failed" });
        this.setState({ showPaymentLoading: false })
        this.setState({ showPaymentAlert: false })
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
    if (this.state.paymentAlerttype === "PaymentSuccess") {
      this.setState({ customAlertText: "Payment Successful" })
      this.setState({ customAlertDesc: "You earned a discount coupon code. You can check this out in your profile or Reed Now!" })
    } else if (this.state.paymentAlerttype === "ThankYouForYourOder") {
      this.setState({ customAlertText: "Thank you for your order" })
      this.setState({ customAlertDesc: `Your order number is ${this.props.route.params.orderNumber}` })
    } else {
      this.setState({ customAlertText: "Check your E-mail" })
      this.setState({ customAlertDesc: "Check your email for order details" })
    }
  }
  // Customizable Area End
}
