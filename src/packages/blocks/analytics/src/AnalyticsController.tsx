import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import analytics from "@react-native-firebase/analytics";

// Customizable Area Start
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  animalSelectedValue: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
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
  showAnimalList: boolean;
  animalList: Array<object>;
  category_id: number;
  category_title: string;
  showLoader: boolean;
  categoryList: Array<object>;
  animalSelectedValue: string;
  chicken_Defult: boolean;
  chicken_Breast: boolean;
  chicken_leg: boolean;
  chicken_Neck: boolean;
  chicken_Back: boolean;
  chicken_Wing: boolean;
  chicken_Thigh: boolean;
  pig: boolean;
  pigHead: boolean;
  pigJowl: boolean;
  pigNeck: boolean;
  pigShoulder: boolean;
  pigPicnic: boolean;
  pigHock: boolean;
  pigBacon: boolean;
  pigLegham: boolean;
  pigRibs: boolean;
  pigLoin: boolean;
  totalCuts: number;
  usedCuts: number;
  remianingCuts: number;
  totaAmount: number;
  numberOfSpendCount: number;
  numberOfSpend: number;
  startDate: string;
  endDate: string;
  chartArray: Array<object>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AnalyticsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  categoaryCallId: string = "";
  myCreditCallId: string = "";
  showAlert() {
    Alert.alert("Alert", "something went wrong please try again", [
      { text: "OK", onPress: () => this.setState({ showLoader: false }) },
    ]);
  }
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
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
      startDate: "",
      endDate: "",
      showAnimalList: false,
      showLoader: false,
      category_id: 0,
      category_title: "",
      categoryList: [],
      chartArray: [],
      numberOfSpend: 0,
      numberOfSpendCount: 0,
      usedCuts: 0,
      totaAmount: 0,
      totalCuts: 0,
      remianingCuts: 0,
      animalList: [
        {
          title: "Cow",
          id: 0,
        },
        {
          title: "Chicken",
          id: 1,
        },
        {
          title: "Beer",
          id: 2,
        },
        {
          title: "Dog",
          id: 3,
        },
      ],
      animalSelectedValue: "",
      chicken_Defult: true,
      chicken_Breast: false,
      chicken_Back: false,
      chicken_leg: false,
      chicken_Neck: false,
      chicken_Thigh: false,
      chicken_Wing: false,
      pig: true,
      pigHead: false,
      pigJowl: false,
      pigNeck: false,
      pigShoulder: false,
      pigPicnic: false,
      pigHock: false,
      pigBacon: false,
      pigLegham: false,
      pigRibs: false,
      pigLoin: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.categoaryCallId != null &&
      this.categoaryCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let list = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        console.log("error===>", error);
        Alert.alert("Error", "Something went wrong", [
          {
            text: "OK",
            onPress: () => {
              this.setState({ showLoader: false });
            },
          },
        ]);
      } else {
        this.setState({ categoryList: list.data });
        this.setState({ category_id: list.data[0]?.id });
        this.setState({ category_title: list.data[0]?.attributes?.name });
        this.getAnalyticData(list.data[0]?.id);
        //showToast('success')
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.myCreditCallId != null &&
      this.myCreditCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let list = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        console.log("error===>", error);
        Alert.alert("Error", "Something went wrong", [
          {
            text: "OK",
            onPress: () => {
              this.setState({ showLoader: false });
            },
          },
        ]);
      } else {
        console.log("check list of data chart--->", list);

        this.setState({ usedCuts: list.used_cuts });
        this.setState({ remianingCuts: list.remaining_cuts });
        this.setState({ totalCuts: list.total_cuts });
        this.setState({ totaAmount: list.tota_amount });
        this.setState({ numberOfSpendCount: list.no_of_spend_count });
        this.setState({ numberOfSpend: list.no_of_spend });
      }
    }

    // Customizable Area End
  }

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  async doButtonPressed() {
    await analytics().logEvent("button_click", {
      button: "doButtonPressed",
      screen: "AnalyticsController",
    });
    alert("Analytics Sent!");
  }

  // Customizable Area Start
  async getCategoryList() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: data?.meta?.token,
    };

    const category = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.categoaryCallId = category.messageId;

    category.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCategories
    );

    category.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    category.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(category.id, category);
  }

  async getAnalyticData(categoryId: number) {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: data?.meta?.token,
    };

    const category = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.myCreditCallId = category.messageId;
    let startDate = this.state.startDate;
    if (!startDate) {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      let momentObj = moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ");
      let startDateString = moment(momentObj).format(
        "YYYY-MM-DD'T'HH:mm:ss.sssZ"
      );
      startDate = startDateString;
    } else {
      let momentObj = moment(startDate, "YYYY-MM-DD");
      let startDateString = moment(momentObj).format(
        "YYYY-MM-DD'T'HH:mm:ss.sssZ"
      );
      startDate = startDateString;
      console.log("cehcking start-->", startDate);
    }
    let endDate = this.state.endDate;
    if (!endDate) {
      let date = new Date();
      let momentObj = moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ");
      let endDateString = moment(momentObj).format(
        "YYYY-MM-DD'T'HH:mm:ss.sssZ"
      );
      endDate = endDateString;
    }
    category.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getAnalytic}?query=${this.state.category_title}&id=${categoryId}&start_date=${startDate}&end_date=${endDate}`
    );

    category.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    category.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(category.id, category);
  }

  handleDateSelected = (data: string) => {
    let newDate = new Date(data);
    newDate.setDate(newDate.getDate() + 7);
    let momentObj = moment(newDate, "MM-DD-YYYY");
    let date = momentObj.format("YYYY-MM-DD'T'HH:mm:ss.sssZ");
    console.log("checking end date-->", date);
    this.setState({ startDate: data });
    this.setState({ endDate: date });
    this.getAnalyticData(this.state.category_id);
    this.setState({ showCalendar: false });
  };

  handleDropdownChange = (item: any) => {
    this.setState({ category_id: item?.id });
    this.setState({ category_title: item?.attributes?.name });
    this.getAnalyticData(this.state.category_id);
    this.getDataOfCat(item);
  };

  common() {
    this.setState({
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank: false,
      cow_Short_plate: false,
      cow_Flank: false,
      cow_shank: false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket: false,
    });
  }

  clickOnChuck() {
    this.common();
    this.setState({
      chuck: true,
    });
  }
  clickOnCowhead() {
    this.common();
    this.setState({ cowHead: true });
  }

  clickOnCowRib() {
    this.common();
    this.setState({
      cow_Rib: true,
    });
  }
  clickOnShortlion() {
    this.common();
    this.setState({
      cow_Short_lion: true,
    });
  }
  clickOnSirlion() {
    this.common();
    this.setState({
      cow_Sirllion: true,
    });
  }
  clickOnRound() {
    this.common();
    this.setState({
      cow_Round: true,
    });
  }
  clickOnShank() {
    this.common();
    this.setState({
      cow_shank: true,
    });
  }
  clickOnFlank() {
    this.common();
    this.setState({
      cow_Flank: true,
    });
  }
  clickOnShortPlate() {
    this.common();
    this.setState({
      cow_Short_plate: true,
    });
  }
  clickOnForeShank() {
    this.common();
    this.setState({
      cow_Fore_Shank: true,
    });
  }
  clickOnBrisket() {
    this.common();
    this.setState({
      cow_Brisket: true,
    });
  }
  // Chicken
  chickenCommn() {
    this.setState({
      chicken_Defult: false,
      chicken_Breast: false,
      chicken_Back: false,
      chicken_leg: false,
      chicken_Neck: false,
      chicken_Thigh: false,
      chicken_Wing: false,
    });
  }
  pigCommn() {
    this.setState({
      pig: false,
      pigHead: false,
      pigJowl: false,
      pigNeck: false,
      pigShoulder: false,
      pigPicnic: false,
      pigHock: false,
      pigBacon: false,
      pigLegham: false,
      pigRibs: false,
      pigLoin: false,
    })
  }
  clickOnChickenNeck() {
    this.chickenCommn();
    this.setState({
      chicken_Neck: true,
    });
  }
  clickOnChickenBack() {
    this.chickenCommn();
    this.setState({
      chicken_Back: true,
    });
  }
  clickOnChickenBreast() {
    this.chickenCommn();
    this.setState({
      chicken_Breast: true,
    });
  }
  clickOnChickenWing() {
    this.chickenCommn();
    this.setState({
      chicken_Wing: true,
    });
  }
  clickOnChickenLeg() {
    this.chickenCommn();
    this.setState({
      chicken_leg: true,
    });
  }
  clickOnChickenThigh() {
    this.chickenCommn();
    this.setState({
      chicken_Thigh: true,
    });
  }
  clickOnPigHead() {
    this.pigCommn()
    this.setState({
      pigHead: true,
    })
  }
  clickOnPigHock() {
    this.pigCommn()
    this.setState({
      pigHock: true
    })
  }

  clickOnPigBacon() {
    this.pigCommn()
    this.setState({
      pigBacon: true
    })
  }

  clickOnPigNeck() {
    this.pigCommn()
    this.setState({
      pigNeck: true
    })
  }

  clickOnPiglegham() {
    this.pigCommn()
    this.setState({
      pigLegham: true
    })
  }

  clickOnPigRib() {
    this.pigCommn()
    this.setState({
      pigRibs: true
    })
  }

  clickOnPigLoin() {
    this.pigCommn()
    this.setState({
      pigLoin: true
    })
  }

  clickOnPigShoulder() {
    this.pigCommn()
    this.setState({
      pigShoulder: true
    })
  }

  clickOnPigPicnic() {
    this.pigCommn()
    this.setState({
      pigPicnic: true
    })
  }

  clickOnPigJowl() {
    this.pigCommn()
    this.setState({
      pigJowl: true
    })
  }

  getDataOfCat(item: any) {
    this.setState({ animalSelectedValue: item?.attributes?.name });
  }
  // Customizable Area End
}
