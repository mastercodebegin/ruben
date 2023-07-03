import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import analytics from "@react-native-firebase/analytics";

// Customizable Area Start
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { number } from "yup";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showCalendar: boolean;
  selectedDate: string;
  markedDates: any;
  showAnimalList:boolean;
  animalList: Array<object>;
  category_id: number;
  category_title: string;
  showLoader: boolean;
  categoryList:Array<object>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AnalyticsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  categoaryCallId:string ='';
  myCreditCallId:string='';
  showAlert(){
    Alert.alert('Alert',"something went wrong please try again",[{text:'OK',onPress:()=>this.setState({showLoader:false})}])
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
      showCalendar: false,
      selectedDate: "",
      markedDates: {},
      showAnimalList: false,
      showLoader: false,
      category_id: 0,
      category_title: "",
      categoryList:[],
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
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.categoaryCallId != null &&
      this.categoaryCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let list = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({categoryList: list.data});
      console.log("checking list---->", list.data);
      this.setState({category_id: 0})
      this.setState({category_title: list.data[0]?.attributes?.name})
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        console.log("error===>",error);
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
      } else {
        //showToast('success')
      }
    }
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
  DropDownProps = {
    onChangeText: (text: string) => {
      console.log("check that text", text)
      this.setState({ category_id: text });
      //@ts-ignore
      this.DropDownProps.value = text;
    }
  };

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

  async getAnalyticData() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: data?.meta?.token,
    };

    const category = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.myCreditCallId = category.messageId;

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

  // Customizable Area End
}
