import React from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import OrdersController from  './OrdersScreenController';
import * as constants from "../../../../components/src/constants";
import RenderItem from "./RenderItem";
import { MyOrderHeader } from "./Header";
import CommonLoader from "../../../../components/src/CommonLoader";
import { generateDateObject } from "../../../../components/src/utils";
const { LIGHT_GREY, DARK_RED } = constants;

export default class MyOrdersScreen extends OrdersController {
  constructor(props:any) {
    super(props);
  }
  async componentDidMount(){
    this.getIncomingOrders();
  }
  
  render(): React.ReactNode {    
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.main}>
          <FlatList
            data={ this.state.selected === 'incoming'? this.state.incomingOrders:this.state.previousOrders }
            keyExtractor={(item, index) => JSON.stringify(index) + item}
            contentContainerStyle={{ flexGrow: 1,backgroundColor:LIGHT_GREY }}
            ListHeaderComponent={
                <MyOrderHeader
                  selected={this.state.selected}
                  selectedDay={this.state.selectedDate.startDate}
                  orderNo={this.state.searchText}
                  setOrderNo={(no)=>this.setState({searchText:no})}
                  searchOrder={(no) => {
                  
                  }}
                  minDate={this.state.selectedDate.startDate}
                  markedDates={generateDateObject(this.state.selectedDate.startDate,this.state.selectedDate.endDate?this.state.selectedDate.endDate:this.state.selectedDate.startDate)}
                onDaySelect={(date) => {                  
                  if (!this.state.selectedDate.startDate) {
                    this.setState({selectedDate:{startDate:date,endDate:''}})
                  } else {
                    this.setState({selectedDate:{...this.state.selectedDate,endDate:date}})
                  }
                 }}
                onOpen={() => {
                    this.setState({selectedDate:{startDate:'',endDate:''}})
                  }}
                  setSelected={this.setSelected}
                  navigation={this.props.navigation}
                onclose={() => { 
                  if (this.state.selectedDate.startDate && this.state.selectedDate.endDate) {
                    this.filterWithDate('',this.state.selectedDate.startDate,this.state.selectedDate.endDate)
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
            renderItem={({ item }) => <RenderItem acceptDeclineOrders={this.acceptDeclineOrders.bind(this)}  item={item} />}
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
