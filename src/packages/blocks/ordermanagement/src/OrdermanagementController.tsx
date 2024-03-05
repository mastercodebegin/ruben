import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/src/ShowToast";
//@ts-ignore
import debounce from 'lodash.debounce';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
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
  incomingTotalPage: number;
  incomingCurrentPage: number;
  fetchMoreIncoming: boolean;
  showPaginationLoader: boolean;
  isUpdateOrder:boolean,
  order_number:any
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrdermanagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  getOrdersAPICallId: any;
  getItemDetailAPICallId: any;
  cancelOrderAPICallId: any;
  rateOrderAPICallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      order_number:'',
      isUpdateOrder:false,
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
      searchResult: [],
      incomingCurrentPage: 1,
      incomingTotalPage: 0,
      fetchMoreIncoming: true,
      showPaginationLoader:false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
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
        console.log('response.data.attributes.all_orders====',response.data?.attributes?.all_order_items)
        
        const incomingOrders = response.data.attributes?.all_order_items;
        this.handleIncomingPagination(incomingOrders,response?.meta?.total_pages);
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
      const oreviousOrder = response.data.attributes?.all_order_items;
     this.previousOrderCallBack(oreviousOrder,error)
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.acceptDeclineOrdersId != null &&
      this.acceptDeclineOrdersId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      let response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log('response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',response);
      
     this.acceptDeclineCallback(response,error)
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
      console.log('response====',JSON.stringify(response))
      
     const data =  response?.data?.attributes?.all_order_items[0].order_items?.data.length > 0 ?
        response?.data?.attributes?.all_order_items : []
      this.filterByDateCallBack(data, error);
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
      let data=[]
      console.log('data1=========',error)
      console.log('datares=========',JSON.stringify(response))
      
      if(!response?.message)
      {
        console.log('data2=========')

         data = response?.data?.attributes?.all_order_items[0].order_items?.data.length > 0 ?
        response?.data?.attributes?.all_order_items : []
      }
      console.log('data3=========')


      this.searchOrderCallBack(data, error);
    }
  }
  // Customizable Area Start

  handleLoadMoreDebounced = debounce(() => {
    this.setState({incomingCurrentPage:this.state.incomingCurrentPage+1})
    this.getIncomingOrders();
  }
  , 500);

  handleIncomingPagination(res: any[], totalPage: number) {

    

    if (res.length) {
      this.setState({
        incomingOrders:res,
        showLoader: false,
        searchText:'',
        incomingTotalPage: totalPage,
        fetchMoreIncoming:
          this.state.incomingCurrentPage !== this.state.incomingTotalPage,
          showPaginationLoader:false
      });

    } else {
      showToast('No data found')
      this.setState({
        fetchMoreIncoming:false,
        showLoader:false,
        showPaginationLoader:false
      })
    }
    
  }

  getIncomingOrdersId: string = "";
  getPreviousOrdersId: string = "";
  acceptDeclineOrdersId: string = "";
  filterOrdersWithDateId: string = '';
  searchOrdersWithNumberId: string = '';
  
  previousOrderCallBack(response:any,error:any) {

    if (error && !response?.length) {
      showToast("Some error occurred!");
      this.setState({ showLoader: false });
    } else if (response.length) {
      
      this.setState({ previousOrders: response, showLoader: false });
    }
  }

  searchOrderCallBack(response:any,error:any) {
    console.log('response====',response)
    
    if ( response.message || response.length==0 ) {
      showToast("No orders found");
      this.setState({showLoader:false,searchResult:[]})
    } else {
      console.log('response?.data?.attributes?.all_orders>>>>>>>>>>>>>>>>>>>>>>',response);

      this.setState({showLoader:false,searchResult:response })
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
    console.log('error===============',error);
    console.log('response===============',response);

    if (!error) {
      console.log('error1===============',);
      console.log('response1===============',);

      if (this.state.selected === 'incoming') {
        this.setState({incomingOrders: response,showLoader:false})
      } else {
        this.setState({previousOrders:response,showLoader:false})
      }
    } else {
      this.setState({previousOrders:[],showLoader:false})
    }
  }


  acceptDeclineCallback(response:any,error:any) {
    console.log('acceptDeclineCallback response>>>>>>>>>>>>>>>',response);
    console.log('acceptDeclineCallback error>>>>>>>>>>>>>>>',error);
    
    if (error) {
      alert('something went wrong')
      //this.getIncomingOrders();
    } else {
      if (this.state.selected === 'incoming') {   
        this.getIncomingOrders();
      } else {
        this.getPreviousOrders();
      }
    }
      setTimeout(() => {
          this.setState({showLoader: false})
  
        }, 4000);

  }

  async getIncomingOrders() {
    if (!this.state.fetchMoreIncoming) {
      return;
    }
    
    this.setState({ showPaginationLoader: true,showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };

    const getIncomingOrdersRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getIncomingOrdersId = getIncomingOrdersRequest.messageId;

    getIncomingOrdersRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getIncomingOrders}?page=${this.state.incomingCurrentPage}&per_page=10?status=${1}`
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
    console.log('order number=================');
    
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
      this.state.selected=='incoming'?
      `bx_block_shippingchargecalculator/pickups/pickups/order/search?order_no=${orderNo}&status=${1}`:
     `bx_block_shippingchargecalculator/pickups/pickups/order/search?order_no=${orderNo}}`


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
  async filterWithDate(status: any, startDate: string, endDate: string) {    

    const urlDateParams = startDate&& endDate ? `start_date=${this.formatDateToYYYYMMDD(startDate)}&end_date=${this.formatDateToYYYYMMDD(endDate)}` : '';
//const urlValueParam = value ? `order_no=${value}` : '';
const isIncommingOrders = this.state.selected === 'previous' ? null : `status=${1}`
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const type = this.state.selected === 'incoming' ? 'on_going' : 'completed';

    const getPreviousOrdersRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.filterOrdersWithDateId = getPreviousOrdersRequest.messageId;    
    getPreviousOrdersRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
    //`bx_block_shippingchargecalculator/pickups/pickups/order/search?${[ urlDateParams,isIncommingOrders].filter(param => param).join('&')}`
      // `bx_block_shippingchargecalculator/pickups/pickups/order/search?start_date="2024-02-26"&end_date="2024-02-29"&status=1`
       //"bx_block_shippingchargecalculator/pickups/pickups/order/search?start_date="+{startDate}+end_date+{endDate}"&"+status={1}"
     `bx_block_shippingchargecalculator/pickups/pickups/order/search?start_date=${startDate}&end_date=${endDate}`
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
    this.setState({ showLoader: true,searchText:'',isSearching:false,order_number:orderId });
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
    if (tabName === 'previous' ) {
      this.getPreviousOrders();
      this.setState({incomingOrders:[]})
    }else{
    this.getIncomingOrders();
    }
    this.setState({ selected: tabName , searchResult:[],isSearching:false,previousOrders:[] });
  }
  formatDateToYYYYMMDD=(dateString:any)=> {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onCloseCalendar() {
    if (this.state.selectedDate.startDate && this.state.selectedDate.endDate) {
     
      this.filterWithDate('',this.formatDateToYYYYMMDD(this.state.selectedDate.startDate),
      this.formatDateToYYYYMMDD(this.state.selectedDate.endDate))
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
  onDaySelect(date:string) {
      if (!this.state.selectedDate.startDate) {
        this.setState({selectedDate:{startDate:date,endDate:''}})
      } else {
        this.setState({selectedDate:{...this.state.selectedDate,endDate:date}})
      }
     
  }
  onCalendarOpen() {
      this.setState({
        selectedDate: { startDate: "", endDate: "" },
      });
  }
  onSetOrderNo(no:string) {
      if (no) {
        this.setState({ searchText: no });
      } else {
        this.setState({ isSearching: false, searchText: "" });
      }
  }
  handleCalendarClose() {
      if (
        this.state.selectedDate.startDate &&
        !this.state.selectedDate.endDate
      ) {
        return "no";
      }
      return "yes";
  }

  // Customizable Area End
}
