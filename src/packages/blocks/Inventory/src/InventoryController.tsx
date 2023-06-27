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
  searchText:string;
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
      searchText:''
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  removeItemCallId: string = "";
  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.removeItemCallId != null &&
      this.removeItemCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
    }
  }
}