import React from "react";

// Customizable Area Start
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { DARK_RED, LIGHT_GREY } from "../../../components/src/constants";
import RenderHeader from "./RenderHeader";
import RenderPoducts from "./RenderProducts";
import RenderFooter from "./RenderFooter";
import Button from "../../../components/src/CustomButton";
import CommonLoader from "../../../components/src/CommonLoader";
// Customizable Area End

import InvoiceBillingController, {
  Props,
  configJSON,
} from "./InvoiceBillingController";

export default class InvoiceBilling extends InvoiceBillingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getCart()
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <HeaderWithBackArrowTemplate
        navigation={this.props.navigation}
        headerText="Invoice"
        showsVerticalScrollIndicator={false}
        onPressBackTestId="back_btn_test_id"
        onPressBack={() => {
          Alert.alert("Alert", "Are you sure you want to exit?", [{
            text: 'yes', onPress: () => this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'LandingPage' }],
          })},{text:'cancel'}])
        }}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <View style={styles.innerContainer}>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={this.state.productsList}
              testID="render_product_list_id"
              renderItem={({ index,item }) => <RenderPoducts item={item} index={index} />}
              keyExtractor={(item, index) => item + "" + index}
              contentContainerStyle={{ paddingTop: 30 }}
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 0.5, backgroundColor: "grey", opacity: 0.5 }}
                />
              )}
              ListFooterComponent={<RenderFooter data={ this.props.route?.params} />}
              ListHeaderComponent={<RenderHeader data={ this.props.route?.params} />}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button
              testID="share_invoice_id"
              label="Share Invoice"
              onPress={async () => {
                this.downloadInvoice().then((res: any) => {
                  setTimeout(() => {   
                    this.setState({showLoader:false})
                    this.shareInvoice(res);
                  },700)
                });
              }}
            />
            <Button testID="download_invoice_id" label="Download Invoice" onPress={()=>this.downloadInvoice.bind(this)(true)} />
          </View>
          <CommonLoader visible={ this.state.showLoader } />
        </View>
      </HeaderWithBackArrowTemplate>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
export const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  date: { color: DARK_RED, fontSize: 17, paddingVertical: 5 },
  boldDate: { fontWeight: "bold" },
  text: { color: "grey", fontSize: 17, paddingVertical: 3 },
  greyContainer: {
    backgroundColor: LIGHT_GREY,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
  },
});
// Customizable Area End
