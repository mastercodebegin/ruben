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
  currentStorageClass: string;
  subtotal: number;
  shipping: number;
  orderId: number;
  orderNumber: number;
  deliverWithinADay: boolean;
  lifetimeSubscription: boolean;
  emailId: string;
  deliveryCharge: number;
  meatStoragePlans: any[];
  currentPlan: any;
  availablePlans: any[];
  selectedPlan: any;
  subscriptionCharge: null | number;
  orderDetails: any;
  totalPrice: number | string;
  billingDetails: any[];
  fastDeliveryPice: null | number;
  screenError: boolean;
  showSubscriptionModal:boolean;
  deliveryDetails: {
    address: string;
    phone_number: string;
    zip_code: string;
    name: string;
    email: string;
  };
  fastDeliveryApplied: boolean;
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
      shipping: 10,
      orderId: 4,
      orderNumber: 12121212,
      deliverWithinADay: false,
      lifetimeSubscription: false,
      deliveryCharge:0,
      emailId: "",
      meatStoragePlans: [],
      currentPlan: null,
      availablePlans: [],
      selectedPlan: null,
      subscriptionCharge: null,
      orderDetails: {},
      totalPrice: 0,
      billingDetails: [],
      fastDeliveryPice: null,
      screenError: false,
      showSubscriptionModal:false,
      deliveryDetails: {
        address: '',
        email: '',
        name: '',
        phone_number: '',
        zip_code:''
      },
      fastDeliveryApplied:false
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getPersonelDetails: string = "";
  getCartId: string = "";
  removeItemCallId: string = ""
  increaseCartCallId: string = "";
  applyStoragePlanId: string = '';
  lifeTimeSubscriptionCallId: string = '';
  addFastDeliveryApiCallId: string = '';
  getBillingDetailsCallId: string = '';

  componentDidUpdate(){
    if (this.state.screenError) {
      Alert.alert("Error","Something went wrong please try again later",[{text:"OK",onPress:()=>this.props.navigation.goBack()}])
      }
  }

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
      
      if (productsList?.data?.length ) {
        const prodList = productsList?.data[0];
        const subTotal = productsList?.data[0]?.attributes?.subtotal;
        const total = productsList?.data[0]?.attributes?.total;
        
        const billingAddress = {
          address: productsList?.data[0]?.attributes?.shipping_address?.data?.attributes?.address,
          email: productsList?.data[0]?.attributes?.shipping_address?.data?.attributes?.email,
          name: productsList?.data[0]?.attributes?.shipping_address?.data?.attributes?.name,
          phone_number: productsList?.data[0]?.attributes?.shipping_address?.data?.attributes?.phone_number,
          zip_code :  productsList?.data[0]?.attributes?.shipping_address?.data?.attributes?.zip_code
        }
        
        this.getCartCallBack(prodList, productsList?.data[0]?.attributes?.customer?.data?.attributes?.plans, subTotal, total, billingAddress, error);
      } else {
        showToast('Something went wrong');
      }
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
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.applyStoragePlanId != null &&
      this.applyStoragePlanId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
          let error = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );
      if (error) {
        showToast("Something went wrong");
      } else {
        this.getCart();
      }
    } else if (   getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.addFastDeliveryApiCallId != null &&
    this.addFastDeliveryApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage)))
    {
      const fastDeliveryResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );     
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );      
      if (fastDeliveryResponse && !error) {
        this.getBillingDetails();     
        if (typeof fastDeliveryResponse?.message === 'string') {
          this.setState({ fastDeliveryApplied: true });
        }
      } else {
        this.setState({ showLoader: false });
        showToast('Something went wrong');
      }
    }else if (  getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.getBillingDetailsCallId != null &&
    this.getBillingDetailsCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage)))
    {
      const billingDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );     
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if ((!error && billingDetails)) {
        const list = this.getOrderDetailsArray(billingDetails);
        const totalPrice = billingDetails?.total;
        const fastDelivery = billingDetails?.delivery_hrs;
        const lifetimeSubscription = billingDetails?.life_time_subscription !== null;
        this.setState({
          show_modal: false,
          orderDetails: billingDetails,
          billingDetails: list,
          fastDeliveryPice: fastDelivery || null,
          lifetimeSubscription: lifetimeSubscription,
          showLoader: false,
          showSubscriptionModal:false,
          totalPrice
        });
      } else {
        this.setState({ show_modal: false ,showLoader:false});
      }      
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.lifeTimeSubscriptionCallId != null &&
      this.lifeTimeSubscriptionCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
        const lifetimeSubscriptionResponse = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );     
        const error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
      if (!error && lifetimeSubscriptionResponse?.data?.type === 'subscription') {
        this.getBillingDetails(); 
      }else if(!error){        
        Alert.alert("Success",lifetimeSubscriptionResponse.message,[{text:"OK",onPress:()=>this.setState({showSubscriptionModal:false,showLoader:false})}])
      }
       else {
        this.setState({ screenError: true,showSubscriptionModal:false});
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
  async applyStoragePlan(name:string) {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.applyStoragePlanId = subcategory.messageId;
    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.addStoragePlans}${name}`
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

  async getBillingDetails() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const billingDetails = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getBillingDetailsCallId = billingDetails.messageId;

    billingDetails.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts/fetch_discount'
    );
    billingDetails.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    billingDetails.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
    runEngine.sendMessage(billingDetails.id, billingDetails);
  }

  getCartCallBack(prodList: any, plans: any[],subTotal:number,total:number,billingAddress:any, error = false) {    
    if(error){
      this.setState({showLoader: false})
      alert('Error getting items in cart!');
    }else{
      if(prodList?.attributes?.order_items?.data?.length === 0) {
       showToast("No products left in the cart!")
        this.props.navigation.replace('LandingPage')
      }
      const sortedProductList = prodList?.attributes?.order_items?.data.sort(function (a: any, b: any) {
        const nameA = a.attributes?.catalogue?.data?.attributes?.categoryCode.toUpperCase();
        const nameB = b.attributes?.catalogue?.data?.attributes?.categoryCode.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      let availablePlans: any[] = [];
      let currentPlan = null;
      if (plans?.length && plans[0]?.existing_paln && plans.length && plans[0]?.current_plan) {
        availablePlans = [...plans[0].existing_paln, plans[0].current_plan];
        availablePlans.sort((a: any, b: any) => {
          if (a?.plan_name < b?.plan_name) {
            return -1;
          }
          if (a?.plan_name > b?.plan_name) {
            return 1;
          };
          return 0;
        })
        currentPlan = plans[0]?.current_plan;
      }
      this.setState({
        showLoader: false,
        productsList: sortedProductList,
        subtotal: subTotal,
        meatStoragePlans: plans,
        orderId: prodList?.id,
        orderNumber: prodList?.attributes?.order_no,
        currentPlan,
        availablePlans,
        deliveryDetails:billingAddress
      });
      this.getBillingDetails();
    }
  }
  async addFastDelivery() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const fastDelivery = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.addFastDeliveryApiCallId = fastDelivery.messageId;

    fastDelivery.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/accounts/delivery_hrs'
    );
    fastDelivery.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    fastDelivery.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.httpPostMethod
    );
    runEngine.sendMessage(fastDelivery.id, fastDelivery);
  }

  async addLifeTimeSubscription() { 
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
      "Content-Type": "application/json"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.lifeTimeSubscriptionCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_subscriptions/subscriptions'
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({
        "subscription": {
            "name": "",
            "subscrible_id": 1,
            "status": "paid",
            "enable": true
        }
    })
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  lifetimeSubClicked = () => {
    this.addLifeTimeSubscription();
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
   capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
  numberValue(num: number) {
    if (typeof num === 'number') {
      return num.toFixed(2);
    } else {
      return 0;
    }
  }
  getAddressDetails() {
    return {
      address: this.state.deliveryDetails?.address || '',
      phone_number:this.state.deliveryDetails?.phone_number || '',
      zip_code: this.state.deliveryDetails?.zip_code || '',
      name: this.state.deliveryDetails?.name || '',
      email:this.state.deliveryDetails?.email || '',
    }    
  }
  getOrderDetailsArray(orderDetails:any) {
    const OrderDetailsList: any[] = [];    
    if (orderDetails?.sub_total && orderDetails?.total) {
      OrderDetailsList.push({question:'Subtotal', ans:this.numberValue(orderDetails?.sub_total)});
      if (orderDetails?.shipping_charge) {
        OrderDetailsList.push({ question: "Shipping Charges", ans: this.numberValue(orderDetails?.shipping_charge) });
      }
      if (orderDetails?.delivery_fees) {
        OrderDetailsList.push({ question: "Delivery Fees", ans: this.numberValue(orderDetails?.delivery_fees)});
      }
      if (orderDetails?.discount) {
        OrderDetailsList.push({ question: "Discount", ans: this.numberValue(orderDetails?.discount) });
      }
      if (orderDetails?.delivery_hrs) {
        OrderDetailsList.push({ question: "Delivery in 24 hrs", ans: this.numberValue(orderDetails?.delivery_hrs) });
      }
      if (orderDetails?.life_time_subscription) {
        OrderDetailsList.push({question : "Lifetime Subscription",ans:this.numberValue(orderDetails?.life_time_subscription)})
      }
      if (orderDetails?.meat_storage_amount) {
        OrderDetailsList.push({question : "Meat Storage",ans:this.numberValue(orderDetails?.meat_storage_amount)})
      }
      if (orderDetails?.product_discount) {
        OrderDetailsList.push({question : "Product Discount",ans:this.numberValue(orderDetails?.product_discount)})
      }
    }
    return OrderDetailsList;
  }
}
