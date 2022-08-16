import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  promocodes: any[];
  loading: boolean;
  cityId: any;
  token: any;
  promocode: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PromocodesController extends BlockComponent<Props, S, SS> {
  apiPromoCodeCallId: string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      promocodes: [],
      loading: true,
      cityId: null,
      token: '',
      promocode: null
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
    const { navigation } = this.props;
    try {
      let promocode = navigation?.state?.params?.promocode;
      promocode = JSON.parse(promocode);
      this.setState({promocode: promocode})
    } catch {
    }
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
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getPromocodesData(token, this.state.cityId);
    }
    
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.apiPromoCodeCallId) {
        console.log("Notifications Response: ", responseJson);
        if (responseJson.data) {
          this.setState({ promocodes: responseJson.data, loading: false });
        } else {
          this.setState({ loading: false });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async getPromocodesData(token: any, cityId: any) {
    const header = {
      "Content-Type": configJSON.loginApiContentType,
      token: token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiPromoCodeCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPromocodesEndPoint + cityId || 3
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getPromocodesAPIMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleRedirection(promocode: any) {
    this.props.navigation.navigate("PromocodeDetails", {
      promocode: JSON.stringify(promocode),
    });
  }
  // Customizable Area End
}
