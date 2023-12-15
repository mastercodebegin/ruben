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
  order_id: number | null;
  discountPrice: number;
  totalPrice: number;
  discountFetched: boolean;
  screenError: boolean;
  shippingCharge: number;
  subTotal: number;
  product_discount: null | number;
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
      order_id: null,
      discountPrice: 0,
      totalPrice: 0,
      discountFetched: false,
      screenError: false,
      shippingCharge: 0,
      subTotal: 0,
      product_discount:null
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  cartCallId:string ='';
  removeItemCallId:string='';
  increaseCartCallId:string='';
  fetchDiscountCode: string = '';
  applyDiscountCodeId: string;
  fetchDiscountCallId: string = '';
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
    }else if(  getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.applyDiscountCodeId != null &&
    this.applyDiscountCodeId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){   
        let error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
    );   
    
    let discountPrice = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (discountPrice?.discount === "Discount not present") {
      this.setState({ showLoader: false }, ()=>this.showDiscountMessage("Discount not present"))
    }
    else if (!error) {
      showToast("Discount Applied")
      this.setState({showLoader:false,discountPrice:Number(discountPrice.discount),discountFetched:true}, ()=>this.showDiscountMessage("Discount Applied"))
    } else {
      this.setState({showLoader:false},()=>this.showDiscountMessage("Something went wrong"))
    }
  } else if ( getName(MessageEnum.RestAPIResponceMessage) === message.id &&
  this.fetchDiscountCallId != null &&
  this.fetchDiscountCallId ===
    message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
    let error = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
    let discountPrice = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (!error && discountPrice?.message === "discount fetched") {
      this.fetchDiscountCallBack()
    } else {
      this.showDiscountMessage("Discount not present")
      this.setState({ screenError: false, showLoader: false });
      }
  }
  }

  componentDidUpdate() {    
    if (this.state.screenError) {
      Alert.alert('Error','Something went wrong, please try again later---',[{text:'OK',onPress:()=>this.props.navigation.goBack()}])
    }
      
  }
  fetchDiscountCallBack(){
    this.getDiscountCode();
  }

  showDiscountMessage(message: string) {
    setTimeout(() => {
      showToast(message)
    },300)
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
      this.getDiscountCode();
      if(prodList?.attributes?.order_items?.data?.length){
      store.dispatch({type:'UPDATE_CART_DETAILS',payload:prodList?.attributes?.order_items?.data});
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
        productsList:sortedProductList,
        order_id: prodList?.id,
        showLoader: false,
      })
      } else {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: [] });        
        this.props.navigation.pop()
      }
    }
  }
  discoundCodeCallback(discoundCode:any,error=false){
    if (error) {
      this.showDiscountMessage("Discount not present")
      this.setState({showLoader:false})
    } else if (discoundCode?.promo_code || (discoundCode?.sub_total &&  discoundCode?.total)) {      
      this.setState({
        discountCode: (!!discoundCode?.promo_code && discoundCode?.discount) ? discoundCode?.promo_code : '',
        showLoader: false,
        discountPercentage: discoundCode?.discount,
        discountFetched: (!!discoundCode?.promo_code && discoundCode?.discount) ,
        totalPrice: discoundCode?.total || 0,
        discountPrice: discoundCode?.discount,
        shippingCharge: discoundCode?.shipping_charge || 0,
        subTotal: discoundCode?.sub_total || 0,
        product_discount:discoundCode?.product_discount || null
        
      });
    }
  }
  onpressCancel() {
    Alert.alert('Alert','Are you sure to cancel',[{text:'Ok',onPress:()=>this.props.navigation.goBack()},{text:'Cancel'}])
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
  async applyDiscountCode(code:string) {
    this.setState({showLoader:true})
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.applyDiscountCodeId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.applyDiscountCode}${code}`
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

  async fetchDiscount() {
    this.setState({showLoader:true})
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.fetchDiscountCallId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts/discount'
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
    'POST'
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
}
