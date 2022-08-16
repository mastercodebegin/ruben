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
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  orders: any;
  isCancelVisible: boolean;
  isRateVisible: boolean;
  cancelDialog: boolean;
  starCount: number;
  comment: string;
  token: string;
  itemDetail: any;
  activeOrderId: number;
  activeItemId: number;
  activeAddress: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrdermanagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  getOrdersAPICallId: any;
  getItemDetailAPICallId: any;
  cancelOrderAPICallId: any;
  rateOrderAPICallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      orders: [],
      isCancelVisible: false,
      isRateVisible: false,
      cancelDialog: false,
      starCount: 0,
      token: "",
      itemDetail: "",
      activeOrderId: 0,
      activeItemId: 0,
      comment: "",
      activeAddress: [],
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
      runEngine.debugLog("Token", message);

      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getOrdersDataRequest(token);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      runEngine.debugLog("API Message Recived", JSON.stringify(message));

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.getOrdersAPICallId) {
          this.setState({ orders: responseJson.data });
        } else if (apiRequestCallId === this.getItemDetailAPICallId) {
          this.props.navigation.navigate("OrderDetails", {
            DATA: responseJson.data,
          });
        } else if (apiRequestCallId === this.rateOrderAPICallId) {
          this.setState({ isRateVisible: !this.state.isRateVisible });
          this.props.navigation.goBack();
        }
        // runEngine.debugLog("API Recived", responseJson.data);
      } else if (apiRequestCallId === this.cancelOrderAPICallId) {
        this.getOrdersDataRequest(this.state.token);
        this.setState({
          activeOrderId: 0,
          activeItemId: 0,
          isCancelVisible: false,
          cancelDialog: true,
        });
      } else if (errorReponse || responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
  }
  // Customizable Area Start

  cancelOrder = (orderId: number, itemId: number) => {
    this.setState({
      activeOrderId: orderId,
      activeItemId: itemId,
      isCancelVisible: !this.state.isCancelVisible,
    });
  };
  rateOrder = () => {
    this.setState({ isRateVisible: !this.state.isRateVisible });
  };
  hideCancelModal = () => {
    this.setState({ isCancelVisible: false });
  };
  selectCancel = () => {
    this.setState({ isCancelVisible: false, cancelDialog: true });
  };

  getOrdersDataRequest = (token: string) => {
    const header = {
      "Content-Type": configJSON.ordersApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrdersAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.ordersAPiEndPoint
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

  getItemDetailDataRequest = (id: number) => {
    const header = {
      "Content-Type": configJSON.ordersApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getItemDetailAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.ordersAPiEndPoint + `/${id}`
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
    return true;
  };

  cancelOrderDataRequest = () => {
    const header = {
      "Content-Type": configJSON.ordersApiContentType,
      token: this.state.token,
    };
    var data = {
      item_id: this.state.activeItemId,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.cancelOrderAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.ordersAPiEndPoint + `/${this.state.activeOrderId}/cancel_order`
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
      configJSON.httpPutMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  rateOrderDataRequest = (id: number) => {
    const header = {
      "Content-Type": configJSON.ordersApiContentType,
      token: this.state.token,
    };
    var data = {
      catalogue_id: id,
      rating: this.state.starCount,
      comment: this.state.comment,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.rateOrderAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.rateAPiEndPoint
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
  };

  // Customizable Area End
}
