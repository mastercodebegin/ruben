import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/src/ShowToast";
import { Alert } from 'react-native';
const configJSON = require("../config.js");
export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  showLoader: boolean;
  selectedAddress: any;
  selectedTab: "delivery" | "shipping" | "pickup";
  show_modal: boolean;
  addressList: Array<any>;
  availableSlotsList: Array<string>;
  name: string;
  addressType: string;
  flatNo: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  state: string;
  country: string;
  keyboardHeight: number;
  showAddressModal: boolean;
  showAddAddress: boolean;
  estimatedDeliveryDate: string;
}

interface SS {
  id: any;
}

export default class PersonelDetailsController extends BlockComponent<
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
      selectedAddress: null,
      selectedTab: "delivery",
      show_modal: false,
      addressList: [],
      availableSlotsList: [],
      address: '',
      addressType: '',
      country: '',
      flatNo: "",
      name: '',
      phoneNumber: '',
      state: '',
      zipCode: '',
      keyboardHeight: 0,
      showAddressModal: false,
      showAddAddress: false,
      estimatedDeliveryDate:''
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getPersonelDetails: string = "";
  getAvailableSlotsCallId: string ;
  addAddressCallId: string = "";
  addAddressToOrderCallId: string = '';
  estimatedDeliveryDateCallId: string = '';
  addressId:any = null;
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
        this.setState({ addressList: PersonelDetails.data,showLoader:false });
      } else {
        this.setState({ showLoader: false });
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.addAddressCallId != null &&
    this.addAddressCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
        const PersonelDetails = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        const error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        if (
          !error &&
          PersonelDetails
        ) {
          this.setState({ showLoader: false, showAddAddress: false });
          this.getAddressList()
        } else {
          this.setState({ showLoader: false });
          showToast("something went wrong");
        }
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAvailableSlotsCallId != null &&
      this.getAvailableSlotsCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let availableSlots = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!error && availableSlots?.avilable_sloat) {
        this.setState({availableSlotsList:availableSlots?.avilable_sloat[availableSlots?.avilable_sloat.length -1 ]?.available_slot,showLoader:false})
      } else {
        this.setState({ showLoader: false });
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.estimatedDeliveryDateCallId != null &&
      this.estimatedDeliveryDateCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const estimatedDeliverDate = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!error && estimatedDeliverDate?.delivery_date) {
        this.setState({ estimatedDeliveryDate: estimatedDeliverDate?.delivery_date ,showLoader:false,selectedTab:'shipping'});
      } else {
        this.setState({ showLoader: false });
      }
    } else if (  getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.addAddressToOrderCallId != null &&
    this.addAddressToOrderCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
        const addAddressResponse = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        const error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
      if (!error && addAddressResponse?.message === 'address choosed') {
        this.setState({ selectedAddress: this.addressId,showLoader:false });
        this.addressId = null;
      } else {
        showToast('Something went wrong');
        this.setState({ showLoader: false });
      }
      
    }
  }
  getExpectedDeliveryDate() {
    const date = new Date(this.state.estimatedDeliveryDate);
    const findDateDifference = (startDate: Date, endDate: Date) => {
      const timeDifferenceMillisecond = endDate.getTime() - startDate.getTime();
      return (timeDifferenceMillisecond / (1000 * 60 * 60 * 24));
  }
    const currentDate = new Date();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getDate();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];

    let suffix;
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
    suffix = "nd";
    } else if (day === 3 || day === 23) {
    suffix = "rd";
    } else {
    suffix = "th";
    }
    return `Within ${Math.round(findDateDifference(currentDate,date))} days ${(day + suffix + " " + month + ", " + dayName)} - 9:00 AM to 6:00 PM`;
  }
  async addAddress(attrs:any) {
    this.setState({ showLoader: true })
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const usr_data: any = JSON.parse(userDetails);

      const header = {
        token: usr_data?.meta?.token,
        "Content-Type": 'application/json',
      }
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.addAddressCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
       configJSON.getPersonelDetails
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(attrs)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
     'POST'
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
  
    
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
  async getEstimatedDeliveryDate() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const PersonalDetails = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.estimatedDeliveryDateCallId = PersonalDetails.messageId;
    PersonalDetails.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_shopping_cart/orders/delivery_date'
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
  async getAvailableSlots() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const PersonalDetails = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAvailableSlotsCallId = PersonalDetails.messageId;
    PersonalDetails.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.availableSlots
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
  async addAddressToTheOrder(id:number) {
    this.setState({ showLoader: true });
    this.addressId = id;
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const PersonalDetails = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addAddressToOrderCallId = PersonalDetails.messageId;
    PersonalDetails.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.addAddressToTheOrder}${this.state.addressList[id]?.attributes?.id}`
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

  onPressContinue() {
    if (this.state.selectedTab === 'delivery') {
      if (!this.state.addressList.length) {
        Alert.alert("Alert", "Please add address");
      } else if (this.state.selectedAddress === null) {
        Alert.alert("Alert", "Please select an address");
      } else {
        this.getEstimatedDeliveryDate();
      }
    } else if (this.state.selectedTab === 'shipping') {
      this.setState({selectedTab:'pickup'})
    } else {
      this.setState({ show_modal: true });
    }
  }
}
