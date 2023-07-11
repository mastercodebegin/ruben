import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      selectedAddress: 0,
      selectedTab: "delivery",
      show_modal: false,
      addressList: [],
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getPersonelDetails: string = "";
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
        this.setState({ addressList: PersonelDetails.data });
      }
    }
  }
  getExpectedDeliveryDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    const date = new Date(currentDate);
    var months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var day = date.getDate();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayName = days[date.getDay()];
    var month = months[date.getMonth()];

    var suffix;
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
    suffix = "nd";
    } else if (day === 3 || day === 23) {
    suffix = "rd";
    } else {
    suffix = "th";
    }
    return (day + suffix + " " + month + ", " + dayName);
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
}
