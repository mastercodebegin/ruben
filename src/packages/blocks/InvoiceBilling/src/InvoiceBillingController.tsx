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
const { baseURL } = require('../../../framework/src/config');
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
  showModal: boolean;
  subTotal: number;
  createdDate: string;
  billingAddress: any;
  shippingAddress: any;
  pdfUrl: any;
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
  cartCallId: string = '';
  getInvoiceDetailsId: string = '';
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
      productsList: [],
      showModal: false,
      billingAddress: '',
      shippingAddress: '',
      createdDate: '',
      subTotal:0,
      pdfUrl:'',
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
      this.getInvoiceDetailsId != null &&
      this.getInvoiceDetailsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let invoiceDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );      
      let invoiceError = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!invoiceError && invoiceDetails) {
        this.setState({
          productsList: invoiceDetails?.data?.attributes?.order_items?.data,
          showLoader: false,
          subTotal: Number(invoiceDetails?.data?.attributes?.subtotal[0]),
          billingAddress: invoiceDetails?.data?.attributes?.bill_to,
          shippingAddress:invoiceDetails?.data?.attributes?.shipping_address
        })
      } else {
        this.setState({showLoader:false})
      }
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
    if (this.state.pdfUrl !== '') {
      this.setState({showModal:showAlert });
      return;
    }
    let url;
    try {
      this.setState({ showLoader: true });
      const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const header = {
      token: data?.meta?.token,
    };
      url = await downloadFiles(
        `${baseURL}/bx_block_invoicebilling/invoices/download_invoice_pdf`,
        `invoice-${new Date().getTime()}.pdf`,
        "invoice",
        "application/pdf",
        "invoice",
        true,
        true,
        header
      )
      this.setState({ showLoader: false,showModal:showAlert,pdfUrl:url });
    } catch (e) {
      Alert.alert("Error", e?.message || 'Something went wrong',
        [{ text: 'OK', onPress: () => this.setState({ showLoader: false }) }]);
    }
    return url;
  }
  async shareInvoice(filePath: string) {

    try {
      const fileName = "example.pdf";
      const shareOptions = {
        url: `file://${filePath}`,
        fileName
      };
      await Share.open(shareOptions);
    } catch (error) {
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
  async getInvoiceDetails() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getInvoiceDetailsId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_invoicebilling/invoices'
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
