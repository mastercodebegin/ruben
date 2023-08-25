import React from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView ,RefreshControl} from "react-native";
import OrdersController from "../OrdersController";
import * as constants from "../../../../components/src/constants";
import RenderItem from "./RenderItem";
import { MyOrderHeader } from "./MyOrderHeader";
import CommonLoader from "../../../../components/src/CommonLoader";
const { LIGHT_GREY, DARK_RED } = constants;

export default class MyOrdersScreen extends OrdersController {
  async componentDidMount(): Promise<void> {
    this.getOnGoingOrder();
  }
  render(): React.ReactNode {    
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.main}>
          <FlatList
            data={ this.state.ongoingOrdersList.reverse()}
            keyExtractor={(item, index) => JSON.stringify(index) + item}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                testID="refereshcontrol"
                onRefresh={() => {
                  this.setState({ orderNo:'',refresh: true });
                  if (this.state.selectedTab === "completed") {
                    this.getCompletedOrder()
                  } else {
                    this.getOnGoingOrder()
                  }
                }}
              />
            }
            contentContainerStyle={{ flexGrow: 1,backgroundColor:LIGHT_GREY }}
            ListHeaderComponent={
              <MyOrderHeader
                selected={this.state.selectedTab}
                selectedDay={this.state.selectedDate}
                orderNo={this.state.orderNo}
                setOrderNo={(no)=>this.setState({orderNo:no})}
                searchOrder={(no) => {
                  if (no === '') {
                    if (this.state.selectedTab === "completed") {
                      this.getCompletedOrder()
                    } else {
                      this.getOnGoingOrder()
                    }
                  }
                  else if (no) {
                    this.searchOrder(no)
                  }
                }}
                markedDates={this.generateDateObject(this.state.startDate,this.state.endDate === ""?this.state.startDate:this.state.endDate)}
                onDaySelect={(date) => {
                  if (this.state.startDate !== '') {
                    this.setState({endDate:date})
                  } else {
                    this.setState({startDate:date})
                    this.setState({endDate: date})
                  }                  
                }}
                onOpen={()=>this.setState({startDate:'',endDate:''})}
                setSelected={(tab) => {                  
                  if (tab === "completed") {
                    this.getCompletedOrder()
                  } else {
                    this.getOnGoingOrder()
                  }
                  this.setState({ selectedTab: tab ,ongoingOrdersList:[]})
                }}
                navigation={this.props.navigation}
                onclose={() => {                  
                  if (this.state.startDate !== '' && this.state.endDate !== '') {
                    this.filterByDate.bind(this)()
                  }
                }}
              />
            }
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    No Data Found
                  </Text>
                </View>
              );
            }}
            renderItem={({ item }) => <RenderItem selectedStatus={ this.state.selectedTab } item={item} cancelOrder={this.cancelOrder.bind(this)} />}
          />
          <CommonLoader visible={this.state.showLoader} />
        </View>
      </SafeAreaView>
    );
  }
}
export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  flatlist: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  text: { fontSize: 16, color: "grey" },
  innerContainer: { marginBottom: 20, paddingHorizontal: 20 },
  productName: { fontSize: 16 },
  button: {
    height: 25,
    width: 25,
    backgroundColor: LIGHT_GREY,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: DARK_RED,
  },
  counter: {
    paddingHorizontal: 10,
    color: DARK_RED,
    fontSize: 17,
  },
  counterContainer: { flexDirection: "row", alignItems: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  price: {
    color: DARK_RED,
    fontSize: 17,
  },
});
