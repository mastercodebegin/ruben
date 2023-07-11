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
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
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
      customAlertText: "",
      customAlertDesc: "You earnd a discount coupon code. You can check this out in your profile or Reed Now!",
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  paymentId: string = '';

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
      console.log('increaseCartResponse ', paymentData);

      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        Alert.alert("Error", "Something went wrong", [{
          text: 'OK', onPress: () => {
            console.log("show loader false")
          }
        }]);
      } else {
        showToast('success')
      }
      // this.discoundCodeCallback(discoundCode,error)
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
  async paymentApi(payment_methods: string, order_id: string) {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.paymentId = subcategory.messageId;
    let paymentparam = {
      "order_id": order_id,
      "payment_method_id": payment_methods
    }
    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.paymentApi}?payment=${paymentparam}`
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
  async getPaymentMethod() {
    this.setState({showPaymentLoading: true})
    this.setState({ showPaymentAlert: true })
    let card =  this.state.cardNumber.replace(' ','').replace(' ','').replace(' ','');
    let cvv =  this.state.cvv
    let month =  this.state.expirtyDate.slice(0, 2);
    let year =  "20" + this.state.expirtyDate.slice(-2);

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
        let json = JSON.parse(result)
        this.paymentApiCalled(json.id, 4)
      })
      .catch(error => {
        this.setState({ customAlertText: "Payment Failed" });
        this.setState({showPaymentLoading: false})
        this.setState ({showPaymentAlert : false})
      });    
  }

  handlePaymentFailed = () => {
    this.setState({ customAlertText: "Payment Failed" });
    this.setState({showPaymentLoading: false})
   }

   handlePaymentSuccess = () => {
    this.setState({isOrderSuccess : true})
    this.setState({ customAlertText: "Thank you for your order" });
    this.setState({ customAlertDesc: "Your order number is 222222423232232" });
    this.setState({showPaymentLoading: false})
   }


  async paymentApiCalled(payment_methods: string, order_id: number) {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    
    let myHeaders = new Headers();
    myHeaders.append("token", data?.meta?.token);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "payment": {
        "order_id": order_id,
        "payment_method_id": payment_methods
      }
    });

    let requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_stripe_integration/payments", requestOptions)
      .then(response => response.text())
      .then(result => {
        let json = JSON.parse(result)
        if (json.errors) {
          this.handlePaymentFailed()
        } else {
          console.log("result-->",result);
          this.handlePaymentSuccess()
        }
      })
      .catch(error => {
        console.log("error par --->",error);
        this.handlePaymentFailed()
      });

  }
  // Customizable Area End
}
