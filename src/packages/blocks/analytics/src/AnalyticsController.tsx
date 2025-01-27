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
import { DARK_RED, LIGHT_GREY, PRIMARY } from "../../../components/src/constants";
import { PRIMARY_COLOR } from "../../landingpage/src/assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  animalSelectedValue: string;
  isChartDisplay: boolean
  animalPartCallBack: (item: number) => void
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

export enum AnimalParts {
  // chicken
  'chicken_Defult' = 'chicken_Defult',
  'chicken_Breast' = 'chicken_Breast',
  'chicken_Back' = 'chicken_Back',
  'chicken_leg' = 'chicken_leg',
  'chicken_Neck' = 'chicken_Neck',
  'chicken_Thigh' = 'chicken_Thigh',
  'chicken_Wing' = 'chicken_Wing',
  'chicken_tail' = 'chicken_tail',
  // pig
  'pig' = 'pig',
  'pigHead' = 'pigHead',
  'pigJowl' = 'pigJowl',
  'pigNeck' = 'pigNeck',
  'pigShoulder' = 'pigShoulder',
  'pigPicnic' = 'pigPicnic',
  'pigHock' = 'pigHock',
  'pigBacon' = 'pigBacon',
  'pigLegham' = 'pigLegham',
  'pigRibs' = 'pigRibs',
  'pigBackFat' = 'pigBackFat',
  'pigLoin' = 'pigLoin',
  // cow
  'chuck' = 'chuck',
  'cow_Defult' = 'cow_Defult',
  'cowHead' = 'cowHead',
  'cow_Fore_Shank' = 'cow_Fore_Shank',
  'cow_Short_plate' = 'cow_Short_plate',
  'cow_Flank' = 'cow_Flank',
  'cow_shank' = 'cow_shank',
  'cow_Round' = 'cow_Round',
  'cow_Sirllion' = 'cow_Sirllion',
  'cow_Short_lion' = 'cow_Short_lion',
  'cow_Brisket' = 'cow_Brisket',
  'cow_Rib' = 'cow_Rib',
  // lamb
  'lamb' = 'lamb',
  'lambBreast' = 'lambBreast',
  'lambChuck' = 'lambChuck',
  'lambDefault' = 'lambDefault',
  'lambFlank' = 'lambFlank',
  'lambLeg' = 'lambLeg',
  'lambLion' = 'lambLion',
  'lambNeck' = 'lambNeck',
  'lambShank' = 'lambShank',
  'lambShoulder' = 'lambShoulder',
  'lambRibs' = 'lambRibs',
  'lamHead' = 'lamHead',
}

export type ChickenParts = AnimalParts.chicken_Defult
  | AnimalParts.chicken_Breast
  | AnimalParts.chicken_Back
  | AnimalParts.chicken_leg
  | AnimalParts.chicken_Neck
  | AnimalParts.chicken_Thigh
  | AnimalParts.chicken_Wing
  | AnimalParts.chicken_tail;

export type PigParts = AnimalParts.pig
  | AnimalParts.pigHead
  | AnimalParts.pigJowl
  | AnimalParts.pigNeck
  | AnimalParts.pigShoulder
  | AnimalParts.pigPicnic
  | AnimalParts.pigHock
  | AnimalParts.pigBacon
  | AnimalParts.pigLegham
  | AnimalParts.pigRibs
  | AnimalParts.pigBackFat
  | AnimalParts.pigLoin;

export type CowParts = AnimalParts.chuck
  | AnimalParts.cow_Defult
  | AnimalParts.cowHead
  | AnimalParts.cow_Fore_Shank
  | AnimalParts.cow_Short_plate
  | AnimalParts.cow_Flank
  | AnimalParts.cow_shank
  | AnimalParts.cow_Round
  | AnimalParts.cow_Sirllion
  | AnimalParts.cow_Short_lion
  | AnimalParts.cow_Brisket
  | AnimalParts.cow_Rib;

  export type LambParts = 
  | AnimalParts.lambDefault
  | AnimalParts.lambBreast
  | AnimalParts.lambChuck
  | AnimalParts.lambFlank
  | AnimalParts.lambLeg
  | AnimalParts.lambLion
  | AnimalParts.lambNeck
  | AnimalParts.lambShank
  | AnimalParts.lambShoulder
  | AnimalParts.lambRibs
  | AnimalParts.lamHead;



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

  lambDefault: boolean
  lambBreast: boolean,
  lambChuck: boolean
  lambFlank: boolean
  lambLeg: boolean
  lambLion: boolean
  lambNeck: boolean,
  lambShank: boolean,
  lambShoulder: boolean,
  lamHead: boolean,
  lambRibs:boolean

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
  cuts: Array<object>;
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
  selectedAnimalPart: string
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
  calendarRef: React.RefObject<DisplayCalendar> | null = null;
  showAlert() {
    Alert.alert('Alert', "something went wrong please try again", [{ text: 'OK', onPress: () => this.setState({ showLoader: false }) }])
  }
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    const today = moment(new Date(), "YYYY-MM-DD").toString();
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      selectedAnimalPart: '',
      chuck: false,
      markedDays: [],
      lambDefault: true,
      lambBreast: false,
      lambChuck: false,
      lambFlank: false,
      lambLeg: false,
      lambLion: false,
      lambNeck: false,
      lambShank: false,
      lambShoulder: false,
      lamHead: false,
      lambRibs:false,
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
      startDate: today.toString(),
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
      cuts: [
        {
          cuts_name: "pigHead",
          sold: 44,
          remaining: 27
        },
      ],
      chartObject: {
        labels: this.formattedDateRange(today.toString()),
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0],
            colors: [
              (opacity = 1) => PRIMARY_COLOR,
              (opacity = 1) => PRIMARY_COLOR,
              (opacity = 1) => PRIMARY_COLOR,
              (opacity = 1) => PRIMARY_COLOR,
              (opacity = 1) => PRIMARY_COLOR,
              (opacity = 1) => PRIMARY_COLOR,
              (opacity = 1) => PRIMARY_COLOR]
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
        this.setState({ category_title: list.data[0]?.attributes?.name, animalSelectedValue: list.data[0]?.attributes?.name })
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
        Alert.alert("Error", "Something went wrong", [{ text: 'OK', onPress: () => { this.setState({ showLoader: false }) } }]);
      } else {
        this.analyticsRes(list)

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

    const analytics = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.myCreditCallId = analytics.messageId;
    let startDate = this.state.startDate
    let formattedStartDate;
    if (!startDate) {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      formattedStartDate = moment(date).format("YYYY-MM-DD");
      let momentObj = moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ");
      let startDateString = moment(momentObj).format("YYYY-MM-DD");
      startDate = startDateString
      this.setState({ startDate: startDate })
    } else {
      formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      let momentObj = moment(startDate).format("YYYY-MM-DD");
      let startDateString = moment(momentObj).format("YYYY-MM-DD'T'HH:mm:ss.sssZ");
      startDate = startDateString
    }
    let endDate = this.state.endDate
    let formattedEndDate;
    if (!endDate) {
      let date = new Date();
      formattedEndDate = moment(date).format("YYYY-MM-DD");
      let momentObj = moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ");
      let endDateString = moment(momentObj).format("YYYY-MM-DD'T'HH:mm:ss.sssZ");
      endDate = endDateString
      this.setState({ endDate: endDate })
    } else {
      const datePart = endDate.split("'")[0];
      formattedEndDate = moment(datePart).format("YYYY-MM-DD");
    }
    let params: string;
    if (store.getState().currentUser === "user") {
      params = `${configJSON.getAnalytic}?category_id=${categoryId}`
    } else {
      // params = `?query=${this.state.category_title}&category_id=${categoryId}&start_date=${startDate}&end_date=${endDate}`
      params = `${configJSON.getAnalytic}?category_id=${categoryId}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    }

    analytics.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      params
    );

    analytics.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    analytics.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(analytics.id, analytics);
  }

  analyticsRes(list: any) {
    if (list.message != "No Data For This Category" && list.message != "No Order Present for this category") {
      this.setState({ chartObject: this.convertToChartFormat(list.chart_data, this.state.startDate) })
      let amount = list.tota_amount?.toFixed(2);
      let numberOfSpend = list.no_of_spend?.toFixed(2)
      let numberOfSpendCount = list.no_of_spend_count?.toFixed(2)
      this.setState({ usedCuts: list.used_cuts });
      this.setState({ remianingCuts: list.remaining_cuts });
      this.setState({ totalCuts: list.total_cuts });
      this.setState({ totaAmount: amount });
      this.setState({ numberOfSpendCount: numberOfSpendCount });
      this.setState({ numberOfSpend: numberOfSpend });
      this.setState({ showLoader: false });
    } else {
      const today = moment(new Date(), "YYYY-MM-DD").toString();
      this.setState({ showLoader: false, usedCuts: 0, remianingCuts: 0, totalCuts: 0, totaAmount: 0, numberOfSpendCount: 0, numberOfSpend: 0 });
      this.setState({
        chartObject: {
          labels: this.formattedDateRange(today.toString()),
          datasets: [
            {
              data: [0, 0, 0, 0, 0, 0, 0]
            }
          ]
        }
      })
    }
  }

  calendarToggle(value: boolean) {
    this.setState({ showCalendar: value });
  }

  generateDateObject(startDate: Date, endDate: Date) {
    if (startDate > endDate) {
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }
    const result: any = {};
    let currentDate = new Date(startDate.toString());
    while (currentDate <= endDate) {
      const currentDateStr = currentDate.toISOString().split("T")[0];
      const dayData: any = { color: LIGHT_GREY, textColor: DARK_RED };
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

  soldChart(type: AnimalParts, data: any) {
    const typesProps: { [key in AnimalParts]: Partial<SoldChartI> } = {
      [AnimalParts.cow_Defult]: {
        isShow: false,
      },
      [AnimalParts.chuck]: {
        isShow: true,
        x: 170,
        y: 20,
        lineHeight: 25,
        sold: 100,
        remaining: 220
      },
      [AnimalParts.cow_Fore_Shank]: {
        isShow: true,
        x: 155,
        y: 20,
        lineHeight: 80,
        sold: 105,
        remaining: 220
      },
      [AnimalParts.cowHead]: {
        isShow: true,
        x: 210,
        y: 20,
        lineHeight: 30,
        sold: 100,
        remaining: 73
      },
      [AnimalParts.cow_Rib]: {
        isShow: true,
        x: 135,
        y: 20,
        lineHeight: 20,
        sold: 100,
        remaining: 22
      },
      [AnimalParts.cow_Short_lion]: {
        isShow: true,
        x: 110,
        y: 20,
        lineHeight: 25,
        sold: 100,
        remaining: 22
      },
      [AnimalParts.cow_Sirllion]: {
        isShow: true,
        x: 85,
        y: 20,
        lineHeight: 15,
        sold: 100,
        remaining: 22
      },
      [AnimalParts.cow_Round]: {
        isShow: true,
        x: 40,
        y: 20,
        lineHeight: 15,
        sold: 100,
        remaining: 22
      },
      [AnimalParts.cow_shank]: {
        isShow: true,
        x: 40,
        y: 20,
        lineHeight: 80,
        sold: 100,
        remaining: 80
      },
      [AnimalParts.cow_Flank]: {
        isShow: true,
        x: 85,
        y: 20,
        lineHeight: 70,
        sold: 20,
        remaining: 80
      },
      [AnimalParts.cow_Short_plate]: {
        isShow: true,
        x: 110,
        y: 20,
        lineHeight: 65,
        sold: 20,
        remaining: 65
      },
      [AnimalParts.cow_Brisket]: {
        isShow: true,
        x: 185,
        y: 20,
        lineHeight: 65,
        sold: 20,
        remaining: 65
      },
      [AnimalParts.chicken_Defult]: {
        isShow: false,
        x: 0,
        y: 0,
      },
      [AnimalParts.chicken_Breast]: {
        isShow: true,
        x: 90,
        y: 10,
        lineHeight: 80,
        sold: 100,
        remaining: 73
      },
      [AnimalParts.chicken_Back]: {
        isShow: true,
        x: 135,
        y: 25,
        lineHeight: 50,
        sold: 90,
        remaining: 120
      },
      [AnimalParts.chicken_leg]: {
        isShow: true,
        x: 135,
        y: 40,
        lineHeight: 100,
        sold: 90,
        remaining: 30
      },
      [AnimalParts.chicken_Neck]: {
        isShow: true,
        x: 50,
        y: 5,
        lineHeight: 50,
        sold: 28,
        remaining: 73
      },
      [AnimalParts.chicken_Thigh]: {
        isShow: true,
        x: 140,
        y: 40,
        lineHeight: 100,
        sold: 90,
        remaining: 100
      },
      [AnimalParts.chicken_tail]: {
        isShow: true,
        x: 180,
        y: 25,
        lineHeight: 80,
        sold: 150,
        remaining: 100
      },
      [AnimalParts.chicken_Wing]: {
        isShow: true,
        x: 130,
        y: 40,
        lineHeight: 48,
        sold: 90,
        remaining: 100
      },
      [AnimalParts.pig]: {
        isShow: false,
        x: 0,
        y: 0,
      },
      [AnimalParts.pigHead]: {
        isShow: true,
        x: 40,
        y: 25,
        lineHeight: 40,
        sold: data?.sold,
        remaining: data?.remaining
      },
      [AnimalParts.pigJowl]: {
        isShow: true,
        x: 40,
        y: 25,
        lineHeight: 65
      },
      [AnimalParts.pigNeck]: {
        isShow: true,
        x: 70,
        y: 25,
        lineHeight: 30,
      },
      [AnimalParts.pigShoulder]: {
        isShow: true,
        x: 90,
        y: 25,
        lineHeight: 30,
      },
      [AnimalParts.pigPicnic]: {
        isShow: true,
        x: 90,
        y: 25,
        lineHeight: 80,
      },
      [AnimalParts.pigHock]: {
        isShow: true,
        x: 210,
        y: 25,
        lineHeight: 60,
      },
      [AnimalParts.pigBacon]: {
        isShow: true,
        x: 150,
        y: 25,
        lineHeight: 100,
      },
      [AnimalParts.pigLegham]: {
        isShow: true,
        x: 210,
        y: 25,
        lineHeight: 30,
      },
      [AnimalParts.pigRibs]: {
        isShow: true,
        x: 150,
        y: 25,
        lineHeight: 70,
      },
      [AnimalParts.pigLoin]: {
        isShow: true,
        x: 150,
        y: 25,
        lineHeight: 50,
      },
      [AnimalParts.pigBackFat]: {
        isShow: true,
        x: 150,
        y: 25,
        lineHeight: 15,
      },
    }

    this.setState({
      soldChart: {
        isShow: false,
        sold: 1,
        remaining: 1,
        lineHeight: 30,
        x: 0,
        y: 0,
        ...typesProps[type]
      }
    })
  }

  handleDateSelected = (data: string) => {
    const startDate = new Date(data);
    const endDate = new Date(data);
    endDate.setDate(startDate.getDate() + 6);
    this.setState({
      startDate: data,
      endDate: moment(endDate, "YYYY-MM-DD").toString(),
      markedDates: this.generateDateObject(startDate, endDate)
    });
    this.getAnalyticData(this.state.category_id);
    this.setState({ showCalendar: false });
  };

  handleDropdownChange = (item: any) => {
    this.setState({ category_id: item?.id });
    this.setState({ category_title: item?.attributes?.name });
    this.getAnalyticData(item.id);
    this.getDataOfCat(item);
  };

  convertToChartFormat = (chartData: any[], startDate: string) => {
    const data = [0, 0, 0, 0, 0, 0, 0];
    const labels: string[] = this.formattedDateRange(startDate);
    const colors = [(opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`,
    (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`]

    let maxSell = 0;
    let maxSellIdx = 0;
    chartData?.forEach(item => {
      const date = new Date(item.date)
      const chartDataMMDD = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
      const dataIdx = labels.indexOf(chartDataMMDD);
      if (dataIdx !== -1) {
        data[dataIdx] = item.sell;
      }
      if ((parseFloat(item.sell)) > maxSell) {
        maxSell = parseFloat(item.sell);
        maxSellIdx = dataIdx;
      }
    })

    colors[maxSellIdx] = (opacity = 1) => `#ee5e5d`;

    const datasets = [
      {
        data,
        colors
      }
    ]

    return {
      labels,
      datasets
    };
  }

  formattedDateRange(startDate: string, daysNum: number = 7, format = "MM/DD") {
    const result = []
    const date = new Date(startDate);
    for (let i = 0; i < daysNum; i++) {
      result.push(moment(date).format(format));
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  dateStringToLabelFormat = (date: string) => {
    let _date = new Date(date);
    return moment(_date).format('MMMM, YYYY');
  }

  onCowClick(partOfCow: CowParts) {

    // @ts-ignore
    this.setState({
      cow_Defult: false,
      chuck: false,
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

    const data = this.state.cuts.find((item: any) => item.cuts_name === partOfCow);
    console.log('data===', data)
    function getCowPartId(partOfCow: string) {
      switch (partOfCow) {
        case 'chuck':
          return 34173;
        case 'cowHead':
          return 34177;
        case 'cow_Fore_Shank':
          return 34182;
        case 'cow_Short_plate':
          return 34185;
        case 'cow_Flank':
        case 'cow_shank':
          return 34175;
        case 'cow_Round':
          return 34181;
        case 'cow_Sirllion':
          return 34187;
        case 'cow_Short_lion':
          return 34183;
        case 'cow_Rib':
          return 34180;
        case 'cow_Brisket':
          return 34172;
        default:
          return 10;
      }
    }
    let id = getCowPartId(partOfCow);

    this.props.animalPartCallBack(id)

    this.soldChart(partOfCow, data);
  }

  // Chicken
  onChickenClick(partOfChicken: ChickenParts) {
    // @ts-ignore
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
    const data = this.state.cuts.find((item: any) => item.cuts_name === partOfChicken);
    this.soldChart(partOfChicken, data);

    function getChickenPartId(partOfChicken: string) {
      switch (partOfChicken) {
        case 'chicken_Breast':
          return 34207;
        case 'chicken_Back':
          return 34206;
        case 'chicken_leg':
          return 34209;
        case 'chicken_Neck':
          return 34210;
        case 'chicken_Thigh':
          return 34212;
        case 'chicken_Wing':
          return 34214;
        case 'chicken_tail':
          return 1;
        default:
          return 0;
      }
    } let id = getChickenPartId(partOfChicken);

    this.props.animalPartCallBack(id)
  }

  onPigClick(partOfPig: PigParts) {
    // @ts-ignore
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
      [partOfPig]: true,
    });
    const data = this.state.cuts.find((item: any) => item.cuts_name === partOfPig);
    this.soldChart(partOfPig, data);


    function getPigPartId(partOfPig: string) {
      switch (partOfPig) {
        case 'pigHead':
          return 1;
        case 'pigJowl':
          return 34193;
        case 'pigNeck':
          return 34198;
        case 'pigShoulder':
          return 34203;
        case 'pigPicnic':
        case 'pigHock':
          return 34199;
        case 'pigBacon':
          return 34192;
        case 'pigLegham':
          return 34194;
        case 'pigRibs':
          return 34200;
        case 'pigLoin':
          return 34195;
        case 'pigBackFat':
          return 34196;
        default:
          return 34195;
      }
    }
    let id = getPigPartId(partOfPig);
    this.props.animalPartCallBack(id)

  }

  onLambClick(partOfLamb: LambParts) {


    this.setState((prevState) => ({
    ...prevState,
    lamb: false,
    lambBreast: false,
    lambChuck: false,
    lambDefault: false,
    lambFlank: false,
    lambLeg: false,
    lambLion: false,
    lambNeck: false,
    lambShank: false,
    lambShoulder: false,
    [partOfLamb]: true,
  }))
    const data = this.state.cuts.find((item: any) => item.cuts_name === partOfLamb);
    this.soldChart(partOfLamb, data);

  
    function getLambPartId(partOfLamb: string) {
      switch (partOfLamb) {
        case 'lambHead':
          return 0;
        case 'lambNeck':
          return 34219;
        case 'lambShoulder':
          return 34222;
        case 'lambBreast':
          return 0;
        case 'lambChuck':
          return 34215;
        case 'lambShank':
          return 6;
        case 'lambLeg':
          return 34217;
        case 'lambLoin':
          return 34218;
        case 'lambFlank':
          return 0;
        case 'lambLion':
          return 10;
        case 'lambRibs':
          return 34221;
        default:
          return 8;
      }
    }
    let id = getLambPartId(partOfLamb);
    this.props.animalPartCallBack(id);
  }
  

  getDataOfCat(item: any) {
    this.setState({ animalSelectedValue: item?.attributes?.name });
  }
  // Customizable Area End
}
