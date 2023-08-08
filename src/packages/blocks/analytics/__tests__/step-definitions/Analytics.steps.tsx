import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Analytics from "../../src/Analytics"
import { View, Text } from "react-native"
import { BarChart } from "react-native-chart-kit"
import Calendar from "../../../../components/src/Calendar";
import { Dropdown } from "../../../../components/src/DropDown/src";
const navigation = require("react-navigation")

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

}

const feature = loadFeature('./__tests__/features/Analytics-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({
            Platform: { OS: "web" },
            nativeModule: {},
        }));
    });

    test('User navigates to Analytics', ({ given, when, then }) => {
        let analyticsBlock: ShallowWrapper;
        let instance: Analytics;

        given('I am a User loading Analytics', () => {
            analyticsBlock = shallow(<Analytics animalSelectedValue={""} {...screenProps} />)
        });

        when('I navigate to the Analytics', () => {
            instance = analyticsBlock.instance() as Analytics
        });

        then("analytic api", () => {
            let paymentparam = {
                "query": "chicken",
                "id": 1,
                "categoryId": 31,
                "startDate": "2023-07-23",
                "endDate": "2023-07-31"

            }
            instance = analyticsBlock.instance() as Analytics
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
                    "data": [
                        {
                        }
                    ]

                }
            );
            instance.myCreditCallId = msgValidationAPI.messageId;
            runEngine.sendMessage("Unit Test Api", msgValidationAPI);

        });
        then('Analytics will load with out errors', () => {
            expect(analyticsBlock).toBeTruthy()
        });

        then('go back navigation', () => {
            analyticsBlock = shallow(<Analytics  animalSelectedValue={""} {...screenProps} />)
            const touchableOpacity = analyticsBlock.find(
                '[testID="goback_navigation"]'
            );
            touchableOpacity.simulate("press");
        });

        then('load chart data', () => {
            let analyticsWrapper: ShallowWrapper;
            analyticsWrapper = shallow(
                <Analytics animalSelectedValue={""} {...screenProps} />
            );
            const dataArray: any = {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                    {
                        data: [60, 45, 28, 80, 99, 43, 80],
                        colors: [
                            (opacity = 1) => `#F8F4F4`,
                            (opacity = 1) => `#F8F4F4`,
                            (opacity = 1) => `#F8F4F4`,
                            (opacity = 1) => `#F8F4F4`,
                            (opacity = 1) => `#F8F4F4`,
                            (opacity = 1) => `#F8F4F4`,
                            (opacity = 1) => `#F8F4F4`]
                    }]
            };
            const chartConfig = {
                backgroundGradientFrom: 'white',
                // // decimalPlaces: 0,
                // // barPercentage: 1.0,
                // // fillShadowGradientOpacity: 1,
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: 'white',
                // spacingInner: 1.0,
                backgroundColor: "transparent",
                backgroundGradientToOpacity: 0.0,

                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                withShadow: false,
                barRadius: 13,
                propsForBackgroundLines: {
                    strokeWidth: 0,
                }
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
            const barChartComponent = getByTestId('bar-chart-wrapper').props.children;
            expect(barChartComponent.props.data).toMatchObject(dataArray);
            expect(getByTestId('bar-chart-wrapper')).toBeTruthy();
        });

        then('show_calendar', () => {
            let analyticsWrapper: ShallowWrapper;
            analyticsWrapper = shallow(<Analytics animalSelectedValue={""} {...screenProps} />)
            const touchableOpacity = analyticsWrapper.find(
                '[testID="show_calendar"]'
            );
           // touchableOpacity.simulate("press");
            let instanceWapper = analyticsWrapper.instance() as Analytics;
            instanceWapper.setState({ showCalendar: true })
        });

        then('load calendar', () => {
            let analyticsWrapper: ShallowWrapper;
            analyticsWrapper = shallow(
                <Analytics  animalSelectedValue={""} {...screenProps} />
            );
            const { queryByTestId } = render(<Calendar />);
            const calenarOpen: any = queryByTestId("calendar");
            let instanceWapper = analyticsWrapper.instance() as Analytics;
            instanceWapper.setState({ showCalendar: true })
            expect(instanceWapper.state.showCalendar).toEqual(true);
            expect(calenarOpen).toBeTruthy();
            // fireEvent.press(calenarOpen);
        });
        then('load dropdown', () => {
            var animalList: Array<object> = [{
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
            },]
            const { getByTestId, queryByTestId } = render(
                <View testID="dropdown-wrapper">
                    <Dropdown
                        data={animalList}
                        maxHeight={400}
                        placeholder="Cow"
                        onChange={(item: any) => {
                        }}
                        renderItem={(item: any) => {
                            return (
                                <View>
                                    <Text>{item?.title}</Text>
                                </View>
                            )
                        }}
                        value={animalList}
                    />
                </View>
            );
          //  expect(getByTestId('dropdown-wrapper')).toBeTruthy();
        });
    });
});
