import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import Share from "react-native-share";
import { downloadFiles } from "../../../components/src/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/src/ShowToast";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  showLoader: boolean;
  productsList: Array<any>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class InvoiceBillingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  cartCallId:string=''
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess)
      // Customizable Area Start
      ,getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.CountryCodeMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      showLoader: false,
      productsList:[]
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    else  if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.cartCallId != null &&
      this.cartCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let productsList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );      
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      const prodList = productsList?.data[0]
      this.getCartCallBack(prodList,error)
      
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
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
    }
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed()
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
  async downloadInvoice(showAlert = false) {
    let url;
    try {
      this.setState({ showLoader: true });
      url = await downloadFiles(
        "https://www.africau.edu/images/default/sample.pdf",
        `${new Date().getTime()}invoice.pdf`,
        "invoice",
        "application/pdf",
        "invoice",
        true,
        true
      );
      this.setState({ showLoader: false });
         showToast("invoice downloaded in downloads/rubensftcapp")
    } catch (e) {
      Alert.alert("Error", e.message);
      this.setState({ showLoader: false });
    }
    return url;
  }
  async shareInvoice(filePath: string) {
    console.log("filePathfilePath ", filePath);

    try {
      const fileName = "example.pdf";
      const shareOptions = {
        url: `file://${filePath}`,
        fileName
      };
      await Share.open(shareOptions);
    } catch (error) {
      // Alert.alert('Error',error.message)
    }
  }
  getCartCallBack(prodList:any,error=false){
    if (error) {
      this.setState({
        productsList:[],showLoader:false
      })
    } else {      
      if(prodList?.attributes?.order_items?.data?.length){
      this.setState({
        productsList:prodList?.attributes?.order_items?.data,showLoader:false
      })
      } 
    }
  }
  async getCart() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.cartCallId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_shopping_cart/orders/order_alerts'
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     'GET'
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
  // Customizable Area End
}
