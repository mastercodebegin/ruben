import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const configJSON = require("./config.js");
export interface Props {
  navigation: any;
  id: string;
}

interface S {
  recomentedProducts: Array<object>;
  show_loader:boolean;
}

interface SS {
  id: any;
}

export default class OrdersController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      recomentedProducts: [],
      show_loader:false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  validationApiCallId: string;

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      return;
    }
     if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.validationApiCallId != null &&
      this.validationApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let receomentedProduct = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(errorResponse){
        this.setState({show_loader:false})
        Alert.alert('Alert',"Something went wrong")
      }else{
        
        this.setState({recomentedProducts:receomentedProduct?.data,show_loader:false})
      }
      
      }else {
      runEngine.debugLog("GOIT");
    }
  }
  async callRecomentationsApi() {
    this.setState({show_loader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)

    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token':data?.meta?.token
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.recomentationUrl
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
