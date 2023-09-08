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
import moment from "moment";
import { store } from "../../../components/src/utils";
import DisplayCalendar from "../../../components/src/DisplayCalendar";
import {DARK_RED, LIGHT_GREY, PRIMARY} from "../../../components/src/constants";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  animalSelectedValue: string;
  // Customizable Area End
}

// Customizable Area Start
export interface SoldChartI {
  x: number;
  y: number;
  sold: number;
  remaining: number;
  isShow: boolean;
  lineHeight: number;
}

export type ChickenParts = 'chicken_Defult'
    | 'chicken_Breast'
    | 'chicken_Back'
    | 'chicken_leg'
    | 'chicken_Neck'
    | 'chicken_Thigh'
    | 'chicken_Wing'
    | 'chicken_tail';

export type PigParts = 'pig'
    | 'pigHead'
    | 'pigJowl'
    | 'pigNeck'
    | 'pigShoulder'
    | 'pigPicnic'
    | 'pigHock'
    | 'pigBacon'
    | 'pigLegham'
    | 'pigRibs'
    | 'pigBackFat'
    | 'pigLoin';

export type CowParts = 'chuck'
    | 'cow_Defult'
    | 'cowHead'
    | 'cow_Fore_Shank'
    | 'cow_Short_plate'
    | 'cow_Flank'
    | 'cow_shank'
    | 'cow_Round'
    | 'cow_Sirllion'
    | 'cow_Short_lion'
    | 'cow_Brisket'
    | 'cow_Rib';
// Customizable Area End
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
  chicken_tail: boolean;
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
  pigBackFat: boolean;
  totalCuts: number;
  usedCuts: number;
  remianingCuts: number;
  totaAmount: number;
  numberOfSpendCount: number;
  numberOfSpend: number;
  startDate: string;
  endDate: string;
  chartArray: Array<object>;
  chartObject: any;
  markedDays: any;
  soldChart: SoldChartI
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AnalyticsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  categoaryCallId: string = '';
  myCreditCallId: string = '';
  calendarRef:  React.RefObject<DisplayCalendar>;
  showAlert() {
    Alert.alert('Alert', "something went wrong please try again", [{ text: 'OK', onPress: () => this.setState({ showLoader: false }) }])
  }
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    const today = moment(new Date(),  "YYYY-MM-DD");
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
      startDate: today,
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
      animalSelectedValue: '',
      chicken_Defult: true,
      chicken_Breast: false,
      chicken_Back: false,
      chicken_leg: false,
      chicken_Neck: false,
      chicken_Thigh: false,
      chicken_Wing: false,
      chicken_tail: false,
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
      pigBackFat: false,
      chartObject: {
        labels: this.formattedDateRange(today),
        datasets: [
          { data: [ 0, 0, 0, 0, 0, 0, 0 ],
            colors: [
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#ee5e5d`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`]
          }
        ]
      },
      soldChart: {
        x: 0,
        y: 0,
        sold: 0,
        remaining: 0,
        isShow: false,
        lineHeight: 0
      }
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
        Alert.alert("Error", "Something went wrong", [{ text: 'OK', onPress: () => { this.setState({ showLoader: false }) } }]);
      } else {
        this.setState({ categoryList: list.data });
        this.setState({ category_id: list.data[0]?.id })
        this.setState({ category_title: list.data[0]?.attributes?.name })
        this.getAnalyticData(list.data[0]?.id)
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
        Alert.alert("Error", "Something went wrong", [{ text: 'OK', onPress: () => { this.setState({ showLoader: false }) } }]);
      } else {
       this.setState({chartObject: this.convertToChartFormat(list.chart_data, this.state.startDate)})     
        let amount = list.tota_amount.toFixed(2);
        let numberOfSpend = list.no_of_spend.toFixed(2)
        let numberOfSpendCount = list.no_of_spend_count.toFixed(2)
        this.setState({ usedCuts: list.used_cuts });
        this.setState({ remianingCuts: list.remaining_cuts });
        this.setState({ totalCuts: list.total_cuts });
        this.setState({ totaAmount: amount });
        this.setState({ numberOfSpendCount: numberOfSpendCount });
        this.setState({ numberOfSpend: numberOfSpend });
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
      let momentObj = moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ");
      let startDateString = moment(momentObj).format("YYYY-MM-DD");
      startDate = startDateString
      this.setState({startDate: startDate})
    } else {
      let momentObj = moment(startDate, "YYYY-MM-DD");
      let startDateString = moment(momentObj).format("YYYY-MM-DD'T'HH:mm:ss.sssZ");
      startDate = startDateString
      console.log("cehcking start-->", startDate)
    }
    let endDate = this.state.endDate
    if (!endDate) {
      let date = new Date();
      let momentObj = moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ");
      let endDateString = moment(momentObj).format("YYYY-MM-DD'T'HH:mm:ss.sssZ");
      endDate = endDateString
      this.setState({endDate: endDate})
    }
    let params: string;
    if (store.getState().currentUser === "user") {
      params = `?category_id=${categoryId}`
    } else {
      params = `?query=${this.state.category_title}&category_id=${categoryId}&start_date=${startDate}&end_date=${endDate}`
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

  calendarToggle (value: boolean){
    this.setState({ showCalendar: value });
  }

  generateDateObject(startDate:Date, endDate:Date) {
    if (startDate > endDate) {
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }
    const result :any = {};
    let currentDate = new Date(startDate.toString());
    while (currentDate <= endDate) {
      const currentDateStr = currentDate.toISOString().split("T")[0];
      const dayData:any = { color: LIGHT_GREY, textColor: DARK_RED };
      if (currentDate.getTime() === startDate.getTime()) {
        dayData.startingDay = true;
        dayData.color = PRIMARY;
        dayData.textColor = "white";
      } else if (currentDate.getTime() === endDate.getTime()) {
        dayData.endingDay = true;
        dayData.color = PRIMARY;
        dayData.textColor = "white";
        dayData.dotColor = "white";
      }
      result[currentDateStr] = dayData;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return result;
  }

  soldChart(type: string) {
    const typesProps:{ [type: ChickenParts | PigParts | CowParts ]: Partial<SoldChartI>} = {
      chuck: {
        isShow: true,
        x: 150,
        y:-60,
        lineHeight: 15,
        sold: 100,
        remaining: 220
      },
      cow_Fore_Shank: {
        isShow: true,
        x: 145,
        y:-60,
        lineHeight: 80,
        sold: 105,
        remaining: 220
      },
      cowHead: {
        isShow: true,
        x: 210,
        y:-50,
        lineHeight: 15,
        sold: 100,
        remaining: 73
      },
      cow_Rib: {
        isShow: true,
        x: 120,
        y:-50,
        lineHeight: 15,
        sold: 100,
        remaining: 22
      },
      cow_Short_lion: {
        isShow: true,
        x: 90,
        y:-50,
        lineHeight: 15,
        sold: 100,
        remaining: 22
      },
      cow_Sirllion: {
        isShow: true,
        x: 70,
        y:-50,
        lineHeight: 15,
        sold: 100,
        remaining: 22
      },
      cow_Round: {
        isShow: true,
        x: 50,
        y:-50,
        lineHeight: 15,
        sold: 100,
        remaining: 22
      },
      cow_shank: {
        isShow: true,
        x: 30,
        y:-60,
        lineHeight: 80,
        sold: 100,
        remaining: 80
      },
      cow_Flank: {
        isShow: true,
        x: 70,
        y:-60,
        lineHeight: 80,
        sold: 20,
        remaining: 80
      },
      cow_Short_plate: {
        isShow: true,
        x: 110,
        y:-60,
        lineHeight: 65,
        sold: 20,
        remaining: 65
      },
      cow_Brisket: {
        isShow: true,
        x: 170,
        y:-60,
        lineHeight: 65,
        sold: 20,
        remaining: 65
      },
      chicken_Defult: {
        isShow: false,
        x: 0,
        y:0,
      },
      chicken_Breast: {
        isShow: true,
        x: 55,
        y:-90,
        lineHeight: 80,
        sold: 100,
        remaining: 73
      },
      chicken_Back: {
        isShow: true,
        x: 80,
        y:-80,
        lineHeight: 80,
        sold: 90,
        remaining: 120
      },
      chicken_leg: {
        isShow: true,
        x: 115,
        y:-50,
        lineHeight: 110,
        sold: 90,
        remaining: 30
      },
      chicken_Neck: {
        isShow: true,
        x: 40,
        y:-90,
        sold: 28,
        remaining: 73
      },
      chicken_Thigh: {
        isShow: true,
        x: 130,
        y:-50,
        lineHeight: 100,
        sold: 90,
        remaining: 100
      },
      chicken_tail: {
        isShow: true,
        x: 200,
        y:-50,
        lineHeight: 30,
        sold: 150,
        remaining: 100
      },
      chicken_Wing: {
        isShow: true,
        x: 115,
        y:-40,
        lineHeight: 48,
        sold: 90,
        remaining: 100
      },
      pig: {
        isShow: false,
        x: 0,
        y:0,
      },
      pigHead: {
        isShow: true,
        x: 30,
        y: -35,
      },
      pigJowl: {
        isShow: true,
        x: 40,
        y: -35,
        lineHeight: 65
      },
      pigNeck: {
        isShow: true,
        x: 55,
        y: -50,
        lineHeight: 30,
      },
      pigShoulder: {
        isShow: true,
        x: 80,
        y: -50,
        lineHeight: 22,
      },
      pigPicnic: {
        isShow: true,
        x: 85,
        y: -50,
        lineHeight: 80,
      },
      pigHock: {
        isShow: true,
        x: 190,
        y: -50,
        lineHeight: 100,
      },
      pigBacon: {
        isShow: true,
        x: 140,
        y: -50,
        lineHeight: 80,
      },
      pigLegham: {
        isShow: true,
        x: 180,
        y: -50,
        lineHeight: 20,
      },
      pigRibs: {
        isShow: true,
        x: 130,
        y: -50,
        lineHeight: 70,
      },
      pigLoin: {
        isShow: true,
        x: 120,
        y: -50,
        lineHeight: 50,
      },
      pigBackFat: {
        isShow: true,
        x: 120,
        y: -50,
        lineHeight: 15,
      },
    }

   this.setState({
      soldChart: {
        sold: 1,
        remaining: 1,
        lineHeight: 30,
        ...typesProps[type]
      }})
  }

  handleDateSelected = (data: string) => {
    const startDate = new Date(data);
    const endDate = new Date(data);
    endDate.setDate(startDate.getDate() + 6);
    this.setState({
      startDate: data,
      endDate: moment(endDate, "YYYY-MM-DD"),
      markedDates: this.generateDateObject(startDate, endDate)
    });
    this.getAnalyticData(this.state.category_id);
    this.setState({ showCalendar: false });
  };

  handleDropdownChange = (item: any) => {
    this.setState({ category_id: item?.id });
    this.setState({ category_title: item?.attributes?.name });
    this.getAnalyticData(this.state.category_id);
    this.getDataOfCat(item);
  };

  convertToChartFormat = (chartData: any[], startDate: string) => {
    const data = [0, 0, 0, 0, 0, 0, 0];
    const labels: string[] = this.formattedDateRange(startDate);
    const colors = [(opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`,
    (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`]
    
    let maxSell = 0;
    let maxSellIdx = 0;
    chartData.forEach(item => {
        const date = new Date(item.date)
        const day = date.getDay();
        data[day] = item.sell;
        
        if((parseFloat(item.sell)) > maxSell) {
            maxSell = parseFloat(item.sell);
            maxSellIdx = day;
        }
    })
    
    colors[maxSellIdx] = (opacity = 1) => `#ee5e5d`;
    
    const datasets = [
        {
            data,
            colors
        }
    ]
    
    console.log("checking lables", labels);
    console.log("checking, dataset", datasets);
    return {
        labels,
        datasets
    };
}

  formattedDateRange(startDate: string, daysNum: number = 7, format="MM/DD"){
    const result = []
    const date = new Date(startDate);
    for(let i = 0; i < daysNum; i++) {
      result.push(moment(date).format(format));
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  dateStringToLabelFormat = (date: string)=> {
    let _date = new Date(date);
    return moment(_date).format('MMMM, YYYY');
  }

  onCowClick(partOfCow: CowParts){
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
      [partOfCow]: true,
    });

    this.soldChart(partOfCow);
  }

  // Chicken
  onChickenClick(partOfChicken: ChickenParts) {
    this.setState({
      chicken_Defult: false,
      chicken_Breast: false,
      chicken_Back: false,
      chicken_leg: false,
      chicken_Neck: false,
      chicken_Thigh: false,
      chicken_Wing: false,
      chicken_tail: false,
      [partOfChicken]: true
    });
    this.soldChart(partOfChicken);
  }

  onPigClick(partOfPig: PigParts){
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
      pigBackFat: false,
      [partOfPig]:true,
    });
    this.soldChart(partOfPig);
  }

  getDataOfCat(item: any) {
    this.setState({ animalSelectedValue: item?.attributes?.name });
  }
  // Customizable Area End
}
