import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

import Share from "react-native-share";

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ShareController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  btnShareProps = {
    onPress: () => this.doButtonPressed()
  };

  doButtonPressed() {
    if (typeof Share.open === "function") {
      const url = "https://www.builder.ai/";
      const title = "We make software so easy, everyone can do it";
      const message = "Please check this out.";

      const options = {
        title,
        url,
        message
      };

      //@ts-ignore
      Share.open(options)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          err && console.log(err);
        });
    }
  }
  // Customizable Area End
}
