import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { getStorageData } from "../../../framework/src/Utilities";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  ordersList: Array<object>;
  ongoingOrdersList: Array<any>;
  completedOrdersList: Array<any>;
  selectedTab: 'ongoing' | 'completed';
  showLoader: boolean;
}

interface SS {
  id: any;
}

export default class OrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  getOrdersListCallId: any;
  getOngoingOrdersAPI: any;
  getCompletedOrderCallId: string;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      ordersList: [],
      ongoingOrdersList: [],
      completedOrdersList: [],
      selectedTab: 'ongoing',
      showLoader:false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      return;
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getOrdersListCallId != null &&
      this.getOrdersListCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let ordersList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(error){
        Alert.alert('Error','something went wrong please try again later')
      }else{
        this.setState({ordersList:ordersList?.data})
      }  
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getOngoingOrdersAPI != null &&
      this.getOngoingOrdersAPI ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let ongoingOrders = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let ongoingOrdersError = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (ongoingOrders?.message === "No completed orders are present" && !ongoingOrdersError) {
        this.setState({ongoingOrdersList:[],showLoader:false})

      } else {
        this.setState({ongoingOrdersList:ongoingOrders?.data,showLoader:false})
      }   
    }
    else {
      runEngine.debugLog("GOIT");
    }
  }
  async getOnGoingOrder() {
    this.setState({showLoader:true})
    const data:any =await getStorageData("userDetails",true)
    const headers = {
      'token':data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getOngoingOrdersAPI = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_shopping_cart/orders/ongoing_orders'
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  async getCompletedOrder() {
    const data:any =await getStorageData("userDetails",true)
    const headers = {
      'token':data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCompletedOrderCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_shopping_cart/orders/completed_orders'
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  async getOrdersList() {
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)
    const headers = {
      'token':data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getOrdersListCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_shopping_cart/orders/index_share'
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
