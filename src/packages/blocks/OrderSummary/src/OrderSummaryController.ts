import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {showToast} from "../../../components/src/ShowToast";

const configJSON = require("../config.js");
export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  showLoader: boolean;
  selectedAddress: number;
  selectedTab: "delivery" | "shipping" | "pickup";
  show_modal: boolean;
  addressList: Array<any>;
  productsList:Array<any>;
  currentStorageClass: "Basic" | "Gold" | "Platinum";
  subtotal: number;
  discount: number;
  shipping: number;
  orderId: number;
  orderNumber: number;
  deliverWithinADay: boolean;
  lifetimeSubscription: boolean;
  emailId:string;
}

interface SS {
  id: any;
}

export default class OrderSummaryController extends BlockComponent<
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
      selectedAddress: 0,
      selectedTab: "delivery",
      show_modal: false,
      addressList: [],
      productsList: [],
      currentStorageClass: 'Basic',
      subtotal: 0,
      discount: 0,
      shipping: 12,
      orderId: 4,
      orderNumber: 12121212,
      deliverWithinADay: false,
      lifetimeSubscription: false,
      emailId: "",
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getPersonelDetails: string = "";
  getCartId: string = "";
  removeItemCallId: string = ""
  increaseCartCallId: string = ""
  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getPersonelDetails != null &&
    this.getPersonelDetails ===
  message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let PersonelDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (
        !error &&
        PersonelDetails.data &&
      PersonelDetails.data.length &&
    PersonelDetails.data.length > 0
      ) {
        this.setState({emailId: PersonelDetails.data[0]?.attributes?.email})
        this.setState({ addressList: PersonelDetails.data });
      }
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getCartId != null &&
    this.getCartId ===
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

    }
    else if (
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
  }else if(  getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.increaseCartCallId != null &&
    this.increaseCartCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){   
        let error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );        
        if(error){
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
        }else{
          this.getCart()
        }
    }
  }
  async getAddressList() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const PersonalDetails = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPersonelDetails = PersonalDetails.messageId;
    PersonalDetails.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPersonelDetails
    );

    PersonalDetails.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    PersonalDetails.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
    runEngine.sendMessage(PersonalDetails.id, PersonalDetails);
  }
  async getCart() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getCartId = subcategory.messageId;

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
  async increaseCartQuatity(catalogue_id:number,orderId:number|null,type:boolean){
    this.setState({ showLoader: true });
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
        }?catalogue_id=${catalogue_id}&order_id=${orderId}`
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

  getCartCallBack(prodList:any,error=false){
    if(error){
      this.setState({showLoader: false})
      alert('Error getting items in cart!')
    }else{

      if(prodList?.attributes?.order_items?.data?.length === 0) {
        Alert.alert("No products left in the cart!")
        this.props.navigation.replace('LandingPage')
      }

      let subtotal = 0;
      this.setState({orderId:prodList?.id})
      this.setState({orderNumber:prodList?.attributes?.order_no})
      for (const item of prodList?.attributes?.order_items?.data) {
        subtotal += (+item.attributes?.catalogue?.data?.attributes?.price * +item?.attributes?.quantity);
      }
      const sortedProductList = prodList?.attributes?.order_items?.data.sort(function(a:any, b:any) {
        const nameA = a.attributes?.catalogue?.data?.attributes?.categoryCode.toUpperCase();
        const nameB = b.attributes?.catalogue?.data?.attributes?.categoryCode.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0; 
      })
      this.setState({
        showLoader: false,
        productsList:sortedProductList,
        subtotal,
        discount: subtotal * 0.1
      })
    }
  }

  deliverWithinADayClicked = () => {
    this.setState({deliverWithinADay: true, shipping:25.99})
  }
  lifetimeSubClicked = () => {
    this.setState({lifetimeSubscription: true})
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
}
