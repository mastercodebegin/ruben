import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
ordersList:Array<object>
}

interface SS {
  id: any;
}

export default class OrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  getOrdersListCallId:any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      ordersList:[]
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
    }
    else {
      runEngine.debugLog("GOIT");
    }
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
      'bx_block_shopping_cart/orders?filter_by=scheduled'
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
