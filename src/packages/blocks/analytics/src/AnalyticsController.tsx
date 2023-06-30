import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import analytics from "@react-native-firebase/analytics";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  setState: any;
  state: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  ANIMALLIST: Array<object>;
  chuck: boolean;
  cowHead: boolean;
  cow_Defult: boolean;
  cow_Rib: boolean;
  cow_Short_lion: boolean;
  cow_Sirllion: boolean;
  cow_Round: boolean;
  cow_shank: boolean;
  cow_Flank: boolean;
  cow_Short_plate: boolean;
  cow_Fore_Shank: boolean;
  cow_Brisket: boolean;
  showCalendar: boolean;
  selectedDate: string;
  markedDates: any;
  showAnimalList:boolean;
  animalList: Array<object>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AnalyticsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      ANIMALLIST: [
        {
          title: 'one',
          id: 0
        },
        {
          title: 'two',
          id: 1
        },
      ],
      chuck: false,
      cowHead: false,
      cow_Defult: true,
      cow_Rib: false,
      cow_Short_lion: false,
      cow_Sirllion: false,
      cow_Round: false,
      cow_shank: false,
      cow_Flank: false,
      cow_Short_plate: false,
      cow_Fore_Shank: false,
      cow_Brisket: false,
      showCalendar: false,
      selectedDate: "",
      markedDates: {},
      showAnimalList: false,
      animalList: [{
        title: 'Cow',
        id: 0
      },
      {
        title: 'Fish',
        id: 1
      },
      {
        title: 'Beer',
        id: 2
      },
      {
        title: 'Dog',
        id: 3,
      },],
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

  btnExampleProps = {
    onPress: () => this.doButtonPressed()
  };

  async doButtonPressed() {
    await analytics().logEvent("button_click", {
      button: "doButtonPressed",
      screen: "AnalyticsController"
    });
    alert("Analytics Sent!");
  }

  // Customizable Area Start
  clickOnChuck() {
    this.setState({ chuck: true })
    this.setState({ cow_Defult: false })
    this.setState({ cowHead: false })
  }
  clickOnCowhead() {
    this.setState({ cowHead: true })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnCowRib() {
    this.setState({ cow_Rib: true })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnShortlion() {
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
    this.setState({ cow_Short_lion: true })
  }
  clickOnSirlion() {
    this.setState({ cow_Sirllion: true })
    this.setState({ cow_Short_lion: false })
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnRound() {
    this.setState({ cow_Round: true })
    this.setState({ cow_Sirllion: false })
    this.setState({ cow_Short_lion: false })
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnShank() {
    this.setState({cow_shank:true})
    this.setState({ cow_Round: false })
    this.setState({ cow_Sirllion: false })
    this.setState({ cow_Short_lion: false })
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnFlank() {
    this.setState({cow_Flank:true})
    this.setState({cow_shank:false})
    this.setState({ cow_Round: false })
    this.setState({ cow_Sirllion: false })
    this.setState({ cow_Short_lion: false })
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnShortPlate() {
    this.setState({cow_Short_plate:true})
    this.setState({cow_Flank:false})
    this.setState({cow_shank:false})
    this.setState({ cow_Round: false })
    this.setState({ cow_Sirllion: false })
    this.setState({ cow_Short_lion: false })
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnForeShank() {
    this.setState({cow_Fore_Shank:true})
    this.setState({cow_Short_plate:false})
    this.setState({cow_Flank:false})
    this.setState({cow_shank:false})
    this.setState({ cow_Round: false })
    this.setState({ cow_Sirllion: false })
    this.setState({ cow_Short_lion: false })
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  clickOnBrisket() {
    this.setState({cow_Brisket:true})
    this.setState({cow_Fore_Shank:false})
    this.setState({cow_Short_plate:false})
    this.setState({cow_Flank:false})
    this.setState({cow_shank:false})
    this.setState({ cow_Round: false })
    this.setState({ cow_Sirllion: false })
    this.setState({ cow_Short_lion: false })
    this.setState({ cow_Rib: false })
    this.setState({ cowHead: false })
    this.setState({ chuck: false })
    this.setState({ cow_Defult: false })
  }
  // Customizable Area End
}
