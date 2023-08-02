import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showToast} from "../../../../components/src/ShowToast";
import configJSON from './config'

export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  showLoader: boolean;
  incomingOrders: [];
  previousOrders: [];
  selected: string;
}

interface SS {
  id: any;
}

export default class OrderScreenController extends BlockComponent<
Props,
S,
SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.CountryCodeMessage),
    ];

    this.state = {
      showLoader: false,
      incomingOrders: [],
      previousOrders: [],
      selected: "incom"
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getIncomingOrdersId: string = "";
  getPreviousOrdersId: string = "";
  acceptDeclineOrdersId: string = "";

  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getIncomingOrdersId != null &&
      this.getIncomingOrdersId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!error) {
        this.setState({incomingOrders: response?.data, showLoader: false})
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getPreviousOrdersId != null &&
      this.getPreviousOrdersId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!error) {
        this.setState({previousOrders: response?.data, showLoader: false})
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.acceptDeclineOrdersId != null &&
      this.acceptDeclineOrdersId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        showToast("Some error occured!")
      } else {
        this.getIncomingOrders()
        this.getPreviousOrders()
      }
      this.setState({showLoader: false})
    }
  }

  async getIncomingOrders() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };

    const getIncomingOrdersRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getIncomingOrdersId = getIncomingOrdersRequest.messageId;

    getIncomingOrdersRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getIncomingOrders
    );

    getIncomingOrdersRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getIncomingOrdersRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(getIncomingOrdersRequest.id, getIncomingOrdersRequest);
  }

  async getPreviousOrders() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };

    const getPreviousOrdersRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getPreviousOrdersId = getPreviousOrdersRequest.messageId;

    getPreviousOrdersRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPreviousOrders
    );

    getPreviousOrdersRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getPreviousOrdersRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(getPreviousOrdersRequest.id, getPreviousOrdersRequest);
  }

  async acceptDeclineOrders(orderId: number, accept: boolean) {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };

    const acceptDeclineOrdersRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.acceptDeclineOrdersId = acceptDeclineOrdersRequest.messageId;

    acceptDeclineOrdersRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.accptDeclineOrder}/${orderId}?status=${accept ? "completed" : "cancelled"}`
    );

    acceptDeclineOrdersRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    acceptDeclineOrdersRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPutMethod
    );

    runEngine.sendMessage(acceptDeclineOrdersRequest.id, acceptDeclineOrdersRequest);
  }

  setSelected = (tabName: string) => {
    this.setState({selected: tabName})
  }
}

