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
import { DARK_RED, LIGHT_GREY, PRIMARY } from "../../../components/src/constants";

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
  selectedDate: string;
  startDate: string;
  endDate: string;
  refresh: boolean;
  orderNo: string;
  persistedData: any[]
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
  cancelOrderAPiCallId: string;
  searchOrderId: string;

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
      showLoader: false,
      selectedDate: '',
      startDate: '',
      endDate: '',
      refresh: false,
      orderNo: '',
      persistedData: []
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
      if (ongoingOrders?.message === "No completed orders are present" && !ongoingOrdersError && ongoingOrders?.data?.length) {
        this.setState({ongoingOrdersList:[],showLoader:false,refresh:false})

      } else {
        const ordersList =ongoingOrders?.data?.length  ? ongoingOrders?.data : []
        this.setState({ongoingOrdersList: ordersList,showLoader:false,refresh:false,persistedData:ordersList})
      }   
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.searchOrderId != null &&
      this.searchOrderId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let ongoingOrders = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let ongoingOrdersError = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (ongoingOrders?.data && !ongoingOrdersError) {
        this.setState({ongoingOrdersList:[ongoingOrders?.data],showLoader:false})

      } else {
        this.setState({ongoingOrdersList:[],showLoader:false})
      }   
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.cancelOrderAPiCallId != null &&
      this.cancelOrderAPiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) { 
      let cancelOrderResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let cancelOrderErrorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (cancelOrderResponse?.message === "cancelled order successfully" && !cancelOrderErrorResponse) {
        Alert.alert('Success', 'Order cancelled successfully', [{
          text: 'okay', onPress: () => {
            if (this.state.selectedTab === "completed") {
              this.getCompletedOrder()
            } else {
              this.getOnGoingOrder()
            }
            this.setState({ ongoingOrdersList:[],showLoader:false})
        }}])
      } else {
        Alert.alert('Error', 'Something went wrong', [{text:'OK',onPress:()=>this.setState({showLoader:false})}])
      }
    }
    else {
      runEngine.debugLog("GOIT");
    }
  }
  getSelectedDates() {
    let startDate:any = new Date(this.state.startDate);
    let endDate:any = new Date(this.state.endDate);
    if (startDate > endDate) {
      const temp = this.state.startDate;
      startDate = this.state.endDate;
      endDate = temp;
    } else {
      startDate = this.state.startDate;
      endDate = this.state.endDate;
    }
    return {
      startDate,
      endDate
    }
  }
   generateDateObject(startDateStr:string, endDateStr:string) {
      let startDate = new Date(startDateStr);
     let endDate = new Date(endDateStr);
     if (startDate > endDate) {
       const temp = startDate;
       startDate = endDate;
       endDate = temp;
     }
      const result :any = {};
      let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const currentDateStr = currentDate.toISOString().split("T")[0];
        const dayData:any = { color: LIGHT_GREY, textColor: DARK_RED };
        if (currentDate.getTime() === startDate.getTime()) {
        dayData.startingDay = true;
        dayData.color = PRIMARY;
        dayData.textColor = "white";
      } else if (currentDate.getTime() === endDate.getTime()) {
        dayData.endingDay = true;
        dayData.color = PRIMARY;
        dayData.textColor = "white";
        dayData.dotColor = "white";
      }
        result[currentDateStr] = dayData;
        currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return result;
  }
  async searchOrder(id:string) {
    this.setState({showLoader:true})
    const data:any =await getStorageData("userDetails",true)
    const headers = {
      'token':data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.searchOrderId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_shopping_cart/orders/search_order?order_no=${id}`
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
  async cancelOrder(id:number) {
    this.setState({showLoader:true})
    const data:any =await getStorageData("userDetails",true)
    const headers = {
      'token':data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.cancelOrderAPiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_shopping_cart/orders/destroy?id=${id}`
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'DELETE'
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  async getCompletedOrder() {
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
  async filterByDate() {
    this.setState({showLoader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails);
    const { startDate, endDate } = this.getSelectedDates();
    console.log(' startDate ,endDate  startDate ,endDate  ', startDate ,endDate );
    
    const headers = {
      'token':data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getOngoingOrdersAPI = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_shopping_cart/orders/filter_order?start_date=${startDate}&end_date=${endDate}`
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
