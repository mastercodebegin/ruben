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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/src/ShowToast";

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
  categoryList: any;
  isFilter: boolean;
  category: any
  date:any
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
      selectedStatus: null,
      categoryList: [],
      isFilter: false,
      category: '',
      date:''
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  removeItemCallId: string = "";
  getInventoryDataCallId: string = "";
  getCategoriesId = '';
  handleLoadMoreDebounced = debounce(this.fetchMore, 500);
  filterByCategoryApiId = '';
  getOrderByOrderIdApiId = '';


  fetchMore() {

    const { currentPage, totalPages } = this.state;
    if ((currentPage + 1) <= totalPages) {
      // this.getInventoryData(currentPage +1)
      if(this.state.category.length>1)
      {
        this.filterByCategory(currentPage + 1, this.state.category)
      }
      else{
               this.getInventoryData(currentPage +1)


      }
    }
  }
  async componentDidUpdate() {
    console.log('============================',this.state.inventoryList)

  }
  async componentDidMount() {
    this.getInventoryData(1);
    this.getCategory.bind(this)()
  }
  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.removeItemCallId != null &&
      this.removeItemCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
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
          loading: false,
        })
      } else {
        this.setState({ loading: false })
      }

    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getCategoriesId != null &&
      this.getCategoriesId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const categoryList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (!error && categoryList?.data?.length) {
        this.setState({ categoryList: categoryList?.data });
        return
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.filterByCategoryApiId != null &&
      this.filterByCategoryApiId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const filteredList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      console.log("LandingPageController FilteredList--", filteredList.meta)

      if (filteredList?.message === 'No Inventory Present') {
        showToast('No order present');
      }

      if (filteredList?.inventory?.data?.length) {
        const list = filteredList.order_items?.data.map((item: any) => ({ data: item }))
        this.setState({ showLoader: false, inventoryList: list });
        return
      }
      this.setState({ showLoader: false });
    }

    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getOrderByOrderIdApiId != null &&
      this.getOrderByOrderIdApiId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const filteredList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      console.log("<===============================getOrderByOrderIdApiId ===================", filteredList)
      console.log("<===============================getOrderByOrderIdApiId ===================", filteredList?.orders)

      if (filteredList?.message === 'No Inventory Present') {
        showToast('No order present');
      }

      if (filteredList?.orders?.data?.length) {
        console.log('if block>>>>>>>>>>>>>>>')
        const list = filteredList.orders?.data.map((item: any) => ({ data: item }))
        this.setState({ showLoader: false, inventoryList: list,loading:false });
        return
      }
      this.setState({ showLoader: false,loading:false });
    }
  }
  getStatus(status: string) {
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
  async getInventoryData(page: number, date = '') {
    console.log("getInventoryData--", this.state.category)
    this.setState({ loading: true })
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
      // `account_block/accounts/search_on_inventory?query=${this.state.category}&page=${page}&per=10${this.state.selectedDate ?
      //   `&date=${date}` : ''}${this.state.selectedStatus
      //   ? `&status=${this.getStatus(this.state.selectedStatus)}` : ''}`
      `account_block/accounts/view_inventory?page=${page}&per=10${this.state.selectedDate ?
        `&date=${date}` : ''}${this.state.selectedStatus
          ? `&status=${this.getStatus(this.state.selectedStatus)}` : ''}`
    );
    //account_block/accounts/search_on_inventory?query=${this.state.InventoryCategory}&page=${this.state.page + 1}&per=10


    //   getName(MessageEnum.RestAPIResponceEndPointMessage),
    //   `accounts/search_on_inventory?query=${this.state.selectedStatus
    //     ? `&status=${this.getStatus(this.state.selectedStatus)}` : ''} &per=10${this.state.selectedDate ?
    //     `&date=${date}` : ''}`
    // );
    //accounts/search_on_inventory?query=brisketp&page=2&per=10
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
  async getCategory() {
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const category = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCategoriesId = category.messageId;
    category.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_categories/categories`
    );
    category.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    category.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );
    runEngine.sendMessage(category.id, category);
  }

  async filterByCategory(page: number, categoryName: string) {
    this.setState({ loading: true, category: categoryName })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const filterCategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getInventoryDataCallId = filterCategory.messageId;
    filterCategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
        //     `account_block/accounts/search_on_inventory?query=${categoryName}&page=${page}&per=10${this.state.selectedDate ?
        // `&date=${this.state.date}` : ''}${this.state.selectedStatus
        // ? `&status=${this.getStatus(this.state.selectedStatus)}` : ''}`
        `account_block/accounts/search_on_inventory?query=${categoryName}&page=${page}&per=10
        `


      // `account_block/accounts/view_inventory?page=${1}&per=10${this.state.selectedDate ?
      //   `&date=${this.state.selectedDate}` : ''}${this.state.selectedStatus
      //     ? `&status=${this.getStatus(this.state.selectedStatus)}` : ''}`
    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );
    runEngine.sendMessage(filterCategory.id, filterCategory);
  }

  async filterByCategoryApi(categoryName: string) {
    this.setState({ loading: true, category: categoryName })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const filterCategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.filterByCategoryApiId = filterCategory.messageId;
    filterCategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      //`account_block/accounts/search_on_inventory?query=brisket&page=2&per=10`
      `account_block/accounts/view_inventory?page=${1}&per=10${this.state.selectedDate ?
        `&date=${this.state.selectedDate}` : ''}${this.state.selectedStatus
          ? `&status=${this.getStatus(this.state.selectedStatus)}` : ''}`
    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );
    runEngine.sendMessage(filterCategory.id, filterCategory);
  }
  async getOrderByOrderId(orderId: string) {
    console.log('get order function called ===========>>>>>>>>>>>>>>>>>>>>>>>>>>',orderId);
    
    this.setState({ loading: true, category: orderId })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const filterCategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getOrderByOrderIdApiId = filterCategory.messageId;
    filterCategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `account_block/accounts/search_order?order_no=${orderId}`
    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );
    runEngine.sendMessage(filterCategory.id, filterCategory);
  }
}
