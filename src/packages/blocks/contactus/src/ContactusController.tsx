import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showToast } from "../../../components/src/ShowToast";
import { getStorageData } from "../../../framework/src/Utilities";
import { Linking } from "react-native";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  name: string;
  email: string;
  phoneNumber: string;
  comments: string;
  enableField: boolean;
  token: string;
  contactUsList: any;
  activeId: number;
  activeName: string;
  activeEmail: string;
  activePhoneNumber: string;
  activeDescription: string;
  activeCreatedAt: string;
  isVisible: boolean;
  query: string;
  showSuccessModal: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContactusController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  contactUsApiCallId: any;
  deleteContactApiCallId: any;
  addContactApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.contactUsApiCallId = "";
    this.deleteContactApiCallId = "";
    this.addContactApiCallId = "";

    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      comments: "",
      enableField: false,
      token: "",
      contactUsList: [],
      activeId: 0,
      activeName: "",
      activeEmail: "",
      activePhoneNumber: "",
      activeDescription: "",
      activeCreatedAt: "",
      isVisible: false,
      query: "",
     showSuccessModal:false, 
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
      this.getContactUsList(token);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);

      if (responseJson?.data) {
        if (apiRequestCallId === this.addContactApiCallId) {
          this.setState({showSuccessModal:true})
        }
      } else if (errorReponse) {
        showToast("Something went wrong");
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  txtNameProps = {
    onChangeText: (text: string) => {
      this.setState({ name: text });

      //@ts-ignore
      this.txtNameProps.value = text;
    },
  };

  txtEmailProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtEmailProps.value = text;
    },
  };
  txtPhoneNumberProps = {
    onChangeText: (text: string) => {
      this.setState({ phoneNumber: text });

      //@ts-ignore
      this.txtPhoneNumberProps.value = text;
    },
    // keyboardType: "phone-pad"
  };
  txtCommentsProps = {
    multiline: true,
    onChangeText: (text: string) => {
      this.setState({ comments: text });

      //@ts-ignore
      this.txtCommentsProps.value = text;
    },
  };

  setName = (text: string) => {
    this.setState({ name: text });
  };

  setEmail = (text: string) => {
    this.setState({ email: text });
  };

  setPhoneNumber = (text: string) => {
    this.setState({ phoneNumber: text });
  };

  setComments = (text: string) => {
    this.setState({ comments: text });
  };

  addQuery = () => {
    this.props.navigation.navigate("AddContactus");
  };

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  setModal = (item: any) => {
    this.setState({
      activeId: item.id,
      activeName: item.attributes.name,
      activeEmail: item.attributes.email,
      activeDescription: item.attributes.description,
      activePhoneNumber: item.attributes.phone_number,
      activeCreatedAt: item.attributes.created_at,
      isVisible: !this.state.isVisible,
    });
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail = (Email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(Email) === false) {
      return false;
    } else {
      return true;
    }
  };

  addQueryApi = async () => {
    if (
      this.isStringNullOrBlank(this.state.name) ||
      this.isStringNullOrBlank(this.state.email) ||
      this.isStringNullOrBlank(this.state.comments)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    } else if (!this.isValidEmail(this.state.email.trim())) {
      this.showAlert(configJSON.errorTitle, configJSON.errorEmailNotValid);
      return false;
    } else {
      let data = {
        data: {
          name: this.state.name,
          email: this.state.email,
          phone_number: "",
          description: this.state.comments,
        },
      };
      const usr_details = await getStorageData("userDetails", true);

      const header = {
        "Content-Type": configJSON.contactUsApiContentType,
        token: usr_details.meta.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.addContactApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.submitQueryEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpPostMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  };

  deleteContactUs = (id: number) => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteContactApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getContactUsAPiEndPoint + `/${id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpDeleteMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getContactUsList = (token: string) => {
    const header = {
      "Content-Type": configJSON.contactUsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.contactUsApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getContactUsAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  async openURL(url:string) {
    Linking.canOpenURL(url).then(res => {      
      if (res) {
        Linking.openURL(url);
      }
     })
  }
  handlePressWebIcon() {
    this.openURL('https://www.maranathafarms.com')
  }
  handlePressInstagram() {
    Linking.openURL('https://www.instagram.com/maranathafarmsva/')
  }
  handlePressEmail() {
      const recipient = 'meatlocker@maranathafarms.com';
      const subject = '';
      const body = '';
    
      const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      this.openURL(url)
        .catch((error) => console.error('Failed to open email:', error));
  }
  
  // Customizable Area End
}
