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
  incomingOrders: any[];
  previousOrders: [];
  selected: "incoming" | "previous";
  searchText: string;
  selectedDate: {
    startDate: string ,
    endDate: string 
  },
  isSearching: boolean;
  searchResult: any[];
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
      selected: "incoming",
      searchText: '',
      selectedDate: {
        endDate: '',
        startDate:'',
      },
      isSearching: false,
      searchResult:[]
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getIncomingOrdersId: string = "";
  getPreviousOrdersId: string = "";
  acceptDeclineOrdersId: string = "";
  filterOrdersWithDateId: string = '';
  searchOrdersWithNumberId: string = '';

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
      if (error) {
        showToast("Some error occurred!");
        this.setState({ showLoader: false });
      } else {
        const incomingOrders = this.filterByStatus(response?.data);
        this.setState({ incomingOrders: incomingOrders.incomingOrders, showLoader: false });
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
      if (error && !response?.data?.length) {
        showToast("Some error occurred!");
        this.setState({ showLoader: false });
      } else if (response?.data?.length) {
        this.setState({ previousOrders: response?.data, showLoader: false });
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
     this.acceptDeclineCallback(error)
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.filterOrdersWithDateId != null &&
      this.filterOrdersWithDateId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.filterByDateCallBack(response, error);
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.searchOrdersWithNumberId != null &&
      this.searchOrdersWithNumberId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.searchOrderCallBack(response, error);
    }
  }
  searchOrderCallBack(response:any,error:any) {
    if (error && !response) {
      showToast("No orders found");
      this.setState({showLoader:false,searchResult:[]})
    } else {
      this.setState({showLoader:false,searchResult:response?.data?.length?response?.data:[] })
    }
  }

   filterByStatus(list: any[]) {
    const incomingOrders:any[] = [];
     const completedOrders: any[] = [];
     if (list?.length) {
       list.forEach((item) => {
         if (item?.attributes?.status === 'on_going') {
           incomingOrders.push(item);
         }else if(item?.attributes?.status === 'completed' || item?.attributes?.status === 'cancelled')
         {
           completedOrders.push(item);
         }
       })
     }
    return {
      incomingOrders,
      completedOrders
    }
    
  }

  filterByDateCallBack(response:any , error=null) {
    if (!error) {
      if (this.state.selected === 'incoming') {
        this.setState({incomingOrders:response?.data?.length ? response?.data :[],showLoader:false})
      } else {
        this.setState({previousOrders:response?.data?.length ? response?.data :[],showLoader:false})
      }
    } else {
      showToast('Something went wrong');
      this.setState({ showLoader: false });
    }
  }
  acceptDeclineCallback(error=null) {
    if (error) {
      showToast("Some error occurred!");
      this.setState({showLoader: false})
    } else {
      if (this.state.selected === 'incoming') {          
        this.getIncomingOrders();
      } else {
        this.getPreviousOrders();
      }
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
  getParams() {
    if (this.state.selected === 'incoming') {
      return '["on_going"]'
    }
    if (this.state.selected === 'previous')
      return '["completed"]'
  }

  async searchOrder(orderNo:number) {
    this.setState({ showLoader: true ,isSearching:true});
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };

    const getPreviousOrdersRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.searchOrdersWithNumberId = getPreviousOrdersRequest.messageId;

    getPreviousOrdersRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_shopping_cart/orders/merchant_inventory?order_no=${orderNo}&status=${this.getParams()}`
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
  async filterWithDate(status:any , startDate:string , endDate:string) {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };

    const getPreviousOrdersRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.filterOrdersWithDateId = getPreviousOrdersRequest.messageId;

    getPreviousOrdersRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_shopping_cart/orders/merchant_inventory?start_date=${startDate}&end_date=${endDate}&status=[${"on_going"}]`
      //bx_block_shopping_cart/orders/merchant_inventory?start_date=2023-08-17&end_date=2023-08-18&status=["on_going"]
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

  setSelected = (tabName: "incoming" | "previous") => {    
    if (tabName === 'previous' && this.state.previousOrders.length ===0 ) {
      this.getPreviousOrders();
    }
    this.setState({ selected: tabName , searchResult:[],isSearching:false });
  }

  onCloseCalendar() {
    if (this.state.selectedDate.startDate && this.state.selectedDate.endDate) {
      this.filterWithDate('',this.state.selectedDate.startDate,this.state.selectedDate.endDate)
      }
  }

  getCorrespondingArray() {
    if (this.state.isSearching) {
      return this.state.searchResult;
    } else if (this.state.selected === 'incoming') {
      return this.state.incomingOrders;
    } else if (this.state.selected === 'previous') {
      return this.state.previousOrders
    }
    return [];
  }
}

