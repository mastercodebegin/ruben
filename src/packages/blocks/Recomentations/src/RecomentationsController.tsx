import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export interface Props {
  navigation: any;
  id: string;
}

interface S {
ordersList:Array<object>
}

interface SS {
  id: any;
}

export default class OrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      ordersList:[]
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      return;
    }
    else {
      runEngine.debugLog("GOIT");
    }
  }
}
