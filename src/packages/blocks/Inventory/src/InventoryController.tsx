import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { getStorageData } from "../../../framework/src/Utilities";
//@ts-ignore
import debounce from 'lodash.debounce';

const configJSON = require("../config.js");
export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  showLoader: boolean;
  searchText: string;
  currentPage: number;
  totalPages: number;
  inventoryList: Array<any>;
  loading: boolean;
  selectedDate: string;
  selectedStatus: any;
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
      searchText: '',
      currentPage: 1,
      totalPages: 1,
      inventoryList: [],
      loading: false,
      selectedDate: '',
      selectedStatus:null
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  removeItemCallId: string = "";
  getInventoryDataCallId: string = "";
  handleLoadMoreDebounced = debounce(this.fetchMore, 500); 

  fetchMore() {
    
    const { currentPage, totalPages } = this.state;
    if ((currentPage+1) <= totalPages) {
      this.getInventoryData(currentPage +1)
    }
  }
  async componentDidMount() {
      this.getInventoryData(1)
  }
  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.removeItemCallId != null &&
      this.removeItemCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
    }else if( getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.getInventoryDataCallId != null &&
    this.getInventoryDataCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      
      const inventoryData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (inventoryData?.orders?.length) {
        this.setState({
          inventoryList: [
            ...this.state.inventoryList,
            ...inventoryData?.orders
          ],
          totalPages: inventoryData?.meta?.total_pages,
          currentPage: inventoryData?.meta?.current_page,
          loading:false,
        })
      } else {
        this.setState({loading:false})
      }
      
    }
  }
  getStatus(status:string) {
    if (status === 'success') {
      return 'completed'
    }
    if (status === 'pending') {
      return 'scheduled'
    }

    if (status === 'canceled') {
      return 'cancelled'
    }
  }
  async getInventoryData(page: number,date='') {
    this.setState({loading:true})
    const usr_details = await getStorageData("userDetails", true);

    const header = {
      token: usr_details.meta.token,
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getInventoryDataCallId = getValidationsMsg.messageId;
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `account_block/accounts/view_inventory?page=${page}&per=10${this.state.selectedDate ?
        `&date=${date}` : ''}${this.state.selectedStatus
        ? `&status=${this.getStatus(this.state.selectedStatus)}` : ''}`
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
