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
  cardName: string;
  cardNumber: string;
  backspaceFlag: boolean;
  expirtyDate: string;
  cvv: string;
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
      cardName: "",
      cardNumber: "",
      backspaceFlag: false,
      expirtyDate: "",
      cvv: "",
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
    // this.setState({ showLoader: true });
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
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc");
    myHeaders.append("Content-Type", "text/plain");
    var raw = "\n";
    
    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://api.stripe.com/v1/payment_methods?card[number]=4242424242424242&card[exp_month]=10&card[exp_year]=2024&card[cvc]=314&type=card", requestOptions)
      .then(response => response.text())
      .then(result => {
        let json = JSON.parse(result)
        console.log("json-->", json.id)
        this.paymentApiCalled(json.id, 4)
      })
      .catch(error => console.log('error', error));    
    // fetch("https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_stripe_integration/payment_methods", requestOptions)
    //   .then(response => response.text())
    //   .then(result => {
    //     let json = JSON.parse(result)
    //     console.log("check result-->", json.data.id)
    //     console.log("check result-->", result)
    //     this.paymentApiCalled(json.data.id, 4)
    //   })
    //   .catch(error => console.log('error', error));
    // fetch("https://api.stripe.com/v1/payment_methods?card[number]=4242424242424242&card[exp_month]=10&card[exp_year]=2024&card[cvc]=314&type=card", {
    //   headers: {
    //     "Content-Type": "text/plain",
    //     "Authorization": "Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc"
    //   },
    //   method: "POST",
    // })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     let paymentMethod = JSON.stringify(responseData.id)
    //     this.paymentApiCalled(paymentMethod, 4)
    //     console.log(JSON.stringify(responseData.id));
    //   })
  }
  async paymentApiCalled(payment_methods: string, order_id: number) {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    
    var myHeaders = new Headers();
    myHeaders.append("token", data?.meta?.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "payment": {
        "order_id": order_id,
        "payment_method_id": payment_methods
      }
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_stripe_integration/payments", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


    // fetch("https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_stripe_integration/payments", {
    //   headers: {
    //     token: data?.meta?.token,
    //     "Content-Type": "application/json"
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     "payment": {
    //       "order_id": order_id,
    //       "payment_method_id": payment_methods
    //     }
    //   })
    // })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     let paymentMethod = JSON.stringify(responseData.id)
    //     this.paymentApi(paymentMethod, "4")
    //     console.log(JSON.stringify(responseData.id));
    //   })
  }
  // Customizable Area End
}
