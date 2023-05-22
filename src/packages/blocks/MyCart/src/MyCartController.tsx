import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { showToast } from "../../../components/src/ShowToast";
const configJSON = require('../config.js')
export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  showLoader: boolean;
  productsList:Array<any>;
  discountCode:string;
}

interface SS {
  id: any;
}

export default class MyCartController extends BlockComponent<Props, S, SS> {
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
      productsList:[],
      discountCode:''
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  cartCallId:string ='';
  removeItemCallId:string='';
  increaseCartCallId:string='';

  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.cartCallId != null &&
      this.cartCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let blogDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
      } else {
        if(blogDetails?.data[0]?.attributes?.order_items?.data)
        {
          this.setState({productsList:blogDetails?.data[0]?.attributes?.order_items?.data,showLoader:false})

        }else{
          this.setState({productsList:[],showLoader:false})
        }
       
      }
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.removeItemCallId != null &&
      this.removeItemCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let increaseCartResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log('increaseCartResponse ',increaseCartResponse);
      
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
      } else {
        showToast('success')
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
      configJSON.getCart
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.httpGetMethod
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
  async increaseCartQuatity(id:number,type:boolean){    
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.increaseCartCallId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${type ? configJSON.increaseCartQuantity : configJSON.decreaseCartQuantity}${id}`
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.httpPostMethod
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
  async removeItemFromCart(id:number){
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.removeItemCallId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.removeItemEndpoint}${id}`
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.httpDeleteMethod
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
}
