import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
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
  show_modal:boolean;
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
      show_modal:false
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    console.log("receiveCalled");
  }
}
