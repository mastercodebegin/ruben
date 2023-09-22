import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Analytics from "../../src/Analytics";
import { View, Text, Alert } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Calendar from "../../../../components/src/Calendar";
import { Dropdown } from "../../../../components/src/DropDown/src";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../../../components/src/utils";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    replace: jest.fn(),
  },
  id: "Analytics",
  route: {},
};

interface CatalogImage {
  id: number;
  filename: string;
  url: string;
}

interface CatalogAttributes {
  category_id: number;
  brand_id: number | null;
  name: string;
  description: string | null;
  length: number | null;
  breadth: number | null;
  height: number | null;
  stock_qty: number | null;
  availability: string | null;
  weight: number | null;
  price: number;
  on_sale: boolean | null;
  sale_price: number | null;
  discount: number | null;
  farm_description: string | null;
  farm_title: string | null;
  subUoms: string[] | null;
  hsnCode: string | null;
  updatedBy: string | null;
  status_desc: string | null;
  assetTypeName: string | null;
  entityId: string | null;
  itemNo: string | null;
  categoryCode: string | null;
  updatedDate: string | null;
  itemId: string | null;
  uom: string | null;
  assetOrConsumable: string | null;
  createdDate: string | null;
  productImage: string | null;
  createdBy: string | null;
  entityName: string | null;
  barcode: string | null;
  status: string | null;
  images: CatalogImage[];
  profile_images: string[] | null;
  profile_photos: string[] | null;
  average_rating: number;
  catalogue_variants: any[]; // You can define the proper type for this
}

interface CatalogData {
  id: string;
  type: string;
  attributes: CategoryAttributes;
}

interface CategoryAttributes {
  id: number;
  name: string;
  icon: string;
  enable: boolean;
  rank: number | null;
  created_at: string | null;
  updated_at: string | null;
  statusDescription: string | null;
  categoryImage: string | null;
  description: string | null;
  categoryCode: string | null;
  categoryId: string | null;
  parentId: string | null;
  status: string | null;
  catalogue: {
    catalogues_count: number;
    catalogues: {
      data: CatalogData[];
    };
  };
}

interface CategoryData {
  data: CatalogData[];
}

const mockData: CategoryData = {
  data: [
    {
      id: "6",
      type: "category",
      attributes: {
        id: 6,
        name: "fruits",
        icon:"",
        enable: true,
        rank: null,
        created_at: "2023-02-28T10:00:10.056Z",
        updated_at: "2023-03-15T07:22:01.962Z",
        statusDescription: null,
        categoryImage: null,
        description: null,
        categoryCode: null,
        categoryId: null,
        parentId: null,
        status: null,
        catalogue: {
          catalogues_count: 3,
          catalogues: {
            data: [],
        },
      },
    },
  },
      ],
    };

    interface ChartData {
      date: string;
      sell: number;
    }
    
    interface MockDataCredit {
      chart_data: ChartData[];
      animal: string;
      total_cuts: number;
      used_cuts: number;
      remaining_cuts: number;
      tota_amount: number;
      no_of_spend_count: number;
      no_of_spend: number;
    }
    
    const mockDataCredit: MockDataCredit = {
      chart_data: [
        {
          date: "2023-09-21",
          sell: 1503.97,
        },
      ],
      animal: "Denver Steak",
      total_cuts: 3,
      used_cuts: 11,
      remaining_cuts: -8,
      tota_amount: 59544.56,
      no_of_spend_count: 61,
      no_of_spend: 9627.01,
    };
    
const feature = loadFeature("./__tests__/features/Analytics-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to Analytics", ({ given, when, then }) => {
    let analyticsBlock: ShallowWrapper;
    let instance: Analytics;

    given("I am a User loading Analytics", () => {
      analyticsBlock = shallow(
        <Analytics animalSelectedValue={""} {...screenProps} />
      );
    });

    when("I navigate to the Analytics", () => {
      instance = analyticsBlock.instance() as Analytics;
    });

    then("analytic api", () => {
      console.log("check working or not---->>>>>>>>>>>>>>");
      let paymentparam = {
        query: "chicken",
        id: 1,
        categoryId: 31,
        startDate: "2023-07-23",
        endDate: "2023-07-31",
      };
      instance = analyticsBlock.instance() as Analytics;
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${paymentparam}`
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.myCreditCallId = msgValidationAPI.messageId;
      instance.categoaryCallId = msgValidationAPI.messageId;
      
      runEngine.sendMessage("Unit Test Api", msgValidationAPI);
      const list:any  = mockData
      instance.setState({categoryList:list})
      // let amount = mockDataCredit.tota_amount.toFixed(2);  
      // instance.setState({chartObject: instance.convertToChartFormat(mockData_Credit.chart_data,  '2023-08-09')})     
    });
    then("Analytics will load with out errors", async () => {

      // Mock AsyncStorage.getItem and JSON.parse
      const mockedAsyncStorageGetItem = jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('{"meta": {"token": "mockedToken"}}');
      const mockedJSONParse = jest.spyOn(JSON, 'parse').mockReturnValue({ meta: { token: 'mockedToken' } });

      // Mock the moment library
      jest.mock('moment', () => () => ({
        format: () => 'mockedFormattedDate'
      }));

      // Mock store.getState
      const mockedStoreGetState = jest.spyOn(store, 'getState').mockReturnValue({
        currentUser: "user",
        profileDetails: null,
        cartDetails: []
      });

      // Mock setState
      const mockedSetState = jest.spyOn(instance, 'setState');

      // Mock runEngine.sendMessage
      const mockedSendMessage = jest.spyOn(runEngine, 'sendMessage');

      // Call the function
      await instance.getAnalyticData(123);

      // Assertions
      expect(mockedAsyncStorageGetItem).toHaveBeenCalledWith("userDetails");
      expect(mockedJSONParse).toHaveBeenCalledWith('{"meta": {"token": "mockedToken"}}');
      expect(mockedStoreGetState).toHaveBeenCalled();
      // expect(mockedSetState).toHaveBeenCalledWith({ showLoader: true, startDate: 'mockedFormattedDate' });
      // expect(mockedSendMessage).toHaveBeenCalledWith(expect.any(Number), expect.any(Object));
      expect(analyticsBlock).toBeTruthy();
      expect(instance.numberWithCommas("45687")).toBe("45687".toLocaleString());
    });

    then("go back navigation", () => {
      analyticsBlock = shallow(
        <Analytics animalSelectedValue={""} {...screenProps} />
      );
      const touchableOpacity = analyticsBlock.find(
        '[testID="goback_navigation"]'
      );
      touchableOpacity.simulate("press");
    });

    then("load chart data", () => {
      let analyticsWrapper: ShallowWrapper;
      analyticsWrapper = shallow(
        <Analytics animalSelectedValue={""} {...screenProps} />
      );
      const dataArray = {
        labels: ["08/09", "08/10", "08/11", "08/12", "08/13", "08/14", "08/15"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0],
            colors: [
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#5C2221`,
              (opacity = 1) => `#F8F4F4`,
              (opacity = 1) => `#F8F4F4`,
            ],
          },
        ],
      };

      for (let i = 0; i < instance.data.datasets[0].colors.length; i++) {
        const getColor = instance.data.datasets[0].colors[i];
        expect(getColor()).toBe(dataArray.datasets[0].colors[i]());
      }
      expect(instance.data.datasets[0].colors);

      expect(instance.chartConfig.color()).toBe("black");
      expect(instance.chartConfig.labelColor()).toBe("black");

      instance.handleDateSelected("01-01-2000");
      expect(instance.state.showCalendar).toBe(false);

      instance.handleDropdownChange({ item: { id: 1 } });
      expect(instance.state.category_id).toBe(instance.state.category_id);

      const chartConfig = {
        backgroundGradientFrom: "white",
        // // decimalPlaces: 0,
        // // barPercentage: 1.0,
        // // fillShadowGradientOpacity: 1,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        // spacingInner: 1.0,
        backgroundColor: "transparent",
        backgroundGradientToOpacity: 0.0,

        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        withShadow: false,
        barRadius: 13,
        propsForBackgroundLines: {
          strokeWidth: 0,
        },
      };

      const { getByTestId } = render(
        <View testID="bar-chart-wrapper">
          <BarChart
            data={dataArray}
            width={300}
            height={250}
            withCustomBarColorFromData={true}
            flatColor={true}
            fromZero={true}
            chartConfig={chartConfig}
            showBarTops={false}
            withHorizontalLabels={false}
            verticalLabelRotation={0}
            style={{ marginLeft: -60, backgroundColor: "transparent" }}
            yAxisLabel={""}
            yAxisSuffix=""
          />
        </View>
      );
      const barChartComponent = getByTestId("bar-chart-wrapper").props.children;
      expect(barChartComponent.props.data).toMatchObject(dataArray);
      expect(getByTestId("bar-chart-wrapper")).toBeTruthy();


      for (let i = 0; i < instance.state.chartObject.datasets[0].colors.length; i++) {
        const getColor = instance.state.chartObject.datasets[0].colors[i];
        expect(getColor()).toBe(instance.state.chartObject.datasets[0].colors[i]());
      }

      jest.spyOn(Alert, 'alert');
      instance.showAlert()
      expect(Alert.alert).toHaveBeenCalled()

      instance.btnExampleProps.onPress()
      expect(instance).toBeTruthy();

    });

    then("show_calendar", () => {
      let analyticsWrapper: ShallowWrapper;
      analyticsWrapper = shallow(
        <Analytics animalSelectedValue={""} {...screenProps} />
      );
      const touchableOpacity = analyticsWrapper.find(
        '[testID="show_calendar"]'
      );
      // touchableOpacity.simulate("press");
      let instanceWapper = analyticsWrapper.instance() as Analytics;
      instanceWapper.setState({ showCalendar: true });
    });

    then("load calendar", () => {
      let analyticsWrapper: ShallowWrapper;
      analyticsWrapper = shallow(
        <Analytics animalSelectedValue={""} {...screenProps} />
      );
      const { queryByTestId } = render(<Calendar />);
      const calenarOpen: any = queryByTestId("calendar");
      let instanceWapper = analyticsWrapper.instance() as Analytics;
      instanceWapper.setState({ showCalendar: true });
      expect(instanceWapper.state.showCalendar).toEqual(true);
      expect(calenarOpen).toBeTruthy();
      // fireEvent.press(calenarOpen);
    });
    then("load dropdown", () => {
      var animalList: Array<object> = [
        {
          title: "Cow",
          id: 0,
        },
        {
          title: "Fish",
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
      ];
      const { getByTestId, queryByTestId } = render(
        <View testID="dropdown-wrapper">
          <Dropdown
            data={animalList}
            maxHeight={400}
            placeholder="Cow"
            onChange={(item: any) => { }}
            renderItem={(item: any) => {
              return (
                <View>
                  <Text>{item?.title}</Text>
                </View>
              );
            }}
            value={animalList}
          />
        </View>
      );
      expect(getByTestId("dropdown-wrapper")).toBeTruthy();
    });

    then("chart Data load", () => {

      const chartData = [
        { date: '2023-08-09', sell: 95.95 },
        { date: '2023-08-10', sell: 288.91 },
        { date: '2023-08-11', sell: 392.95 }
      ]

      let testResult = {
        "labels": [
          "08/09",
          "08/10",
          "08/11",
          "08/12",
          "08/13",
          "08/14",
          "08/15"
        ],
        "datasets": [
          {
            "data": [
              95.95,
              288.91,
              392.95,
              0,
              0,
              0,
              0
            ],
            "colors": [(opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`,
            (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`, (opacity = 1) => `#F8F4F4`]
          }
        ]
      }
      expect(JSON.stringify(instance.convertToChartFormat(chartData, '2023-08-09').datasets[0].colors)).toBe(JSON.stringify(testResult.datasets[0].colors))
      expect(JSON.stringify(instance.convertToChartFormat(chartData, '2023-08-09'))).toBe(JSON.stringify(testResult))
    });
    then("Check misc functions", () => {

      expect(instance.state.chuck).toBe(false);
    });


  });
});

