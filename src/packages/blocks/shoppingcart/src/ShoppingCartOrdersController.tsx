import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  order_id: any;
  catalogue_id: number;
  quantity: number;
  taxable: boolean;
  taxable_value: number;
  token: string;
  orderList: any;
  orderItems: any;
  isVisible: boolean;
  isRefreshing: boolean;

  id: any;
  name: string;
  description: string;
  price: number;
  currency: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  account_id: number;
  trendingList: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ShoppingCartOrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrdersApiCallId: any;
  showOrderApiCallId: any;
  createOrderItemApiCallId: any;
  deleteOrderItemApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      order_id: 0,
      catalogue_id: 0,
      quantity: 0,
      taxable: false,
      taxable_value: 0,
      token: "",
      orderList: [],
      orderItems: [],
      isVisible: false,
      isRefreshing: false,

      id: 0,
      name: "",
      description: "",
      price: 0,
      currency: "",
      category_id: 0,
      created_at: "",
      updated_at: "",
      account_id: 0,
      trendingList: [],
      // Customizable Area End
    };

    // Customizable Area Start
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

  receive = async (from: String, message: Message) => {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getOrders(token);
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getOrdersApiCallId != null &&
      this.getOrdersApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({ isRefreshing: false });

      if (responseJson && !responseJson.errors && responseJson.data) {
        console.log(
          "[ShoppingCartOrdersController::receive] orderList=",
          responseJson?.data
        );
        this.setState({ orderList: responseJson?.data });
      } else {
        this.showAlert("Alert", "No Data", "");
        this.setState({ orderList: [] });

        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.showOrderApiCallId != null &&
      this.showOrderApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({ isRefreshing: false });

      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({
          orderItems: responseJson?.data?.attributes?.order_items?.data,
        });
      } else {
        this.setState({ orderItems: [] });

        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createOrderItemApiCallId != null &&
      this.createOrderItemApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors && responseJson.data) {
        this.props.navigation.navigate("ShoppingCartOrders");
      } else if (responseJson.errors) {
        this.parseApiCatchErrorResponse(responseJson.errors);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.deleteOrderItemApiCallId != null &&
      this.deleteOrderItemApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors && responseJson.data) {
        this.showOrder(this.state.order_id);
        this.getOrders(this.state.token);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  };

  // Customizable Area Start
  isNumberNull(num: number) {
    return num === null || num === NaN;
  }

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  navigateToAddShoppingCartOrderItem = () => {
    this.props.navigation.navigate("AddShoppingCartOrderItem");
  };

  navigateToShoppingCartOrders = () => {
    this.props.navigation.navigate("ShoppingCartOrders");
  };

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  setModal = (item: any) => {
    this.setState({
      id: item.post?.id,
      name: item.post?.name,
      description: item.post?.description,
      price: item.post?.price,
      currency: item.post?.currency,
      category_id: item.post?.category_id,
      created_at: item.post.created_at,
      updated_at: item.post?.updated_at,
      account_id: item.post?.account_id,
      isVisible: !this.state.isVisible,
    });
  };

  getOrders = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const params = { filter_by: "scheduled" };

    this.getOrdersApiCallId = requestMessage.messageId;
    let urlParams = new URLSearchParams(params).toString();

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getOrdersApiEndPoint}?${urlParams}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({ isRefreshing: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  showOrder = (order_id: any) => {
    this.setState({ isVisible: true });

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.showOrderApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOrdersApiEndPoint + "/" + `${order_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({ isRefreshing: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  createOrderItem = (token: string) => {
    if (
      this.isNumberNull(this.state.catalogue_id) ||
      this.isNumberNull(this.state.quantity) ||
      this.isNumberNull(this.state.taxable_value)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
      return false;
    }

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const order_items = {
      catalogue_id: this.state.catalogue_id,
      quantity: this.state.quantity,
      taxable: this.state.taxable,
      taxable_value: this.state.taxable_value,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createOrderItemApiCallId = requestMessage.messageId;

    const httpBody = {
      order_items,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createOrderItemApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  deleteOrderItem = (order_id: any, order_item_id: any) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteOrderItemApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteOrderItemApiEndPoint +
        "/" +
        `${order_id}` +
        "/order_items/" +
        `${order_item_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
