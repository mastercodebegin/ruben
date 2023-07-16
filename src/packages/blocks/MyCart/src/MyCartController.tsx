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
import { store } from "../../../components/src/utils";
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
  discountPercentage:number;
  show_modal:boolean;
  order_id:number | null;
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
      discountCode:'',
      discountPercentage:0,
      show_modal:false,
      order_id:null
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  cartCallId:string ='';
  removeItemCallId:string='';
  increaseCartCallId:string='';
  fetchDiscountCode:string='';
  showAlert(){
    Alert.alert('Alert',"something went wrong please try again",[{text:'OK',onPress:()=>this.setState({showLoader:false})}])

  }
  async receive(from: string, message: Message) {
  if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.removeItemCallId != null &&
      this.removeItemCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
      } else {
        showToast('success');
        this.getCart();
      }
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.fetchDiscountCode != null &&
      this.fetchDiscountCode ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let discoundCode = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );      
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.discoundCodeCallback(discoundCode,error)
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.cartCallId != null &&
      this.cartCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let productsList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );      
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      const prodList = productsList?.data[0]
      this.getCartCallBack(prodList,error)
      
    }else if(  getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.increaseCartCallId != null &&
    this.increaseCartCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){   
        let error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );        
        if(error){
          this.showAlert()
        }else{
          this.getCart()
        }
    }
    
  }
  removeFromCart(id:number) {
    Alert.alert("Alert",
      "Are you sure delete it from cart", [
      { text: 'yes', onPress: () => this.removeItemFromCart(id) },
      {
        text:'cancel',
      }
    ])
  }
  getCartCallBack(prodList:any,error=false){
    if(error){
      this.showAlert()
    } else {      
      if(prodList?.attributes?.order_items?.data?.length){
      store.dispatch({type:'UPDATE_CART_DETAILS',payload:prodList?.attributes?.order_items?.data});
      this.setState({
        productsList:prodList?.attributes?.order_items?.data,
        order_id:prodList?.id,showLoader:false
      })
      } else {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: [] });        
        this.props.navigation.pop()
      }
    }
  }
  discoundCodeCallback(discoundCode:any,error=false){
    if (error) {
      Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
    } else if(discoundCode?.promo_code) {
      this.setState({discountCode:discoundCode?.promo_code,showLoader:false,discountPercentage:discoundCode?.discount});
      showToast('Discound code fetched successfully')
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
  async increaseCartQuatity(catalogue_id:number,order_id:number|null,type:boolean){    
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.increaseCartCallId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${type ? configJSON.increaseCartQuantity :
         configJSON.decreaseCartQuantity
        }?catalogue_id=${catalogue_id}&order_id=${order_id}`
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
  async getDiscountCode() {
    this.setState({showLoader:true})
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.fetchDiscountCode = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.fetchDiscoundCode
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
}
