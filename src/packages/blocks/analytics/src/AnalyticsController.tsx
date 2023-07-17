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
  category_id: number;
  category_title: string;
  showLoader: boolean;
  categoryList:Array<object>;
  animalSelectedValue:string;
  chicken_Defult:boolean;
  chicken_Breast:boolean;
  chicken_leg:boolean;
  chicken_Neck:boolean;
  chicken_Back:boolean;
  chicken_Wing:boolean;
  chicken_Thigh:boolean;
  totalCuts: number;
  usedCuts: number;
  remianingCuts: number;
  totaAmount: number;
  numberOfSpendCount: number;
  numberOfSpend: number;
  startDate: string;
  endDate: string;
  chartArray:Array<object>;
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
      categoryList:[],
      chartArray: [],
      numberOfSpend: 0,
      numberOfSpendCount:  0,
      usedCuts: 0,
      totaAmount: 0,
      totalCuts: 0,
      remianingCuts:0,
      animalList: [{
        title: 'Cow',
        id: 0
      },
      {
        title: 'Chicken',
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
      animalSelectedValue:'Cow',
      chicken_Defult:true,
      chicken_Breast:false,
      chicken_Back:false,
      chicken_leg:false,
      chicken_Neck:false,
      chicken_Thigh:false,
      chicken_Wing:false
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
        console.log("error===>",error);
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
      } else {
        this.setState({categoryList: list.data});
        this.setState({category_id: list.data[0]?.id})
        this.setState({category_title: list.data[0]?.attributes?.name})
        this.getAnalyticData(list.data[0]?.id)  
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
        console.log("error===>",error);
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>{this.setState({showLoader:false})}}]);
      } else {
        
        this.setState({usedCuts: list.used_cuts});
        this.setState({remianingCuts: list.remaining_cuts});
        this.setState({totalCuts: list.total_cuts});
        this.setState({totaAmount: list.tota_amount});
        this.setState({numberOfSpendCount: list.no_of_spend_count});
        this.setState({numberOfSpend: list.no_of_spend});  
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
    let startDate = this.state.startDate
    if (!startDate) {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      let result: string = date.toLocaleString();
      console.log(result);
      startDate = result
    }
    let endDate = this.state.endDate
    if (!endDate) {
      let date = new Date();
      let result: string = date.toLocaleString();
      console.log(result);
      endDate = result
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

  clickOnChuck() {
    this.setState({ 
      chuck: true,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:false   
    })
  }
  clickOnCowhead() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: true,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:false   
    })
  }
  clickOnCowRib() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: true,
      cow_Brisket:false   
    })
  }
  clickOnShortlion() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: true,
      cow_Rib: false,
      cow_Brisket:false   
    })
  }
  clickOnSirlion() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: true,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:false   
    })
  }
  clickOnRound() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: true,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:false   
    })
  }
  clickOnShank() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:true,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:false   
    })
  }
  clickOnFlank() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:true,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false ,
      cow_Brisket:false  
    })
  }
  clickOnShortPlate() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:true,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:false   
    })
  }
  clickOnForeShank() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:true,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:false  
    })
  }
  clickOnBrisket() {
    this.setState({ 
      chuck: false,
      cow_Defult: false,
      cowHead: false,
      cow_Fore_Shank:false,
      cow_Short_plate:false,
      cow_Flank:false,
      cow_shank:false,
      cow_Round: false,
      cow_Sirllion: false,
      cow_Short_lion: false,
      cow_Rib: false,
      cow_Brisket:true 
    })
  }
  // Chicken
  clickOnChickenNeck(){
    this.setState({
      chicken_Defult:false,
      chicken_Breast:false,
      chicken_Back:false,
      chicken_leg:false,
      chicken_Neck:true,
      chicken_Thigh:false,
      chicken_Wing:false
    })
  }
  clickOnChickenBack(){
    this.setState({
      chicken_Defult:false,
      chicken_Breast:false,
      chicken_Back:true,
      chicken_leg:false,
      chicken_Neck:false,
      chicken_Thigh:false,
      chicken_Wing:false
    })
  }
  clickOnChickenBreast(){
    this.setState({
      chicken_Defult:false,
      chicken_Breast:true,
      chicken_Back:false,
      chicken_leg:false,
      chicken_Neck:false,
      chicken_Thigh:false,
      chicken_Wing:false
    })
  }
  clickOnChickenWing(){
    this.setState({
      chicken_Defult:false,
      chicken_Breast:false,
      chicken_Back:false,
      chicken_leg:false,
      chicken_Neck:false,
      chicken_Thigh:false,
      chicken_Wing:true
    })
  }
  clickOnChickenLeg(){
    this.setState({
      chicken_Defult:false,
      chicken_Breast:false,
      chicken_Back:false,
      chicken_leg:true,
      chicken_Neck:false,
      chicken_Thigh:false,
      chicken_Wing:false
    })
  }
  clickOnChickenThigh(){
    this.setState({
      chicken_Defult:false,
      chicken_Breast:false,
      chicken_Back:false,
      chicken_leg:false,
      chicken_Neck:false,
      chicken_Thigh:true,
      chicken_Wing:false
    })
  }
  // Customizable Area End
}
