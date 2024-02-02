import React from "react";

// Customizable Area Start
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import { View, StyleSheet, FlatList, Alert, Platform,BackHandler } from "react-native";
import RenderHeader from "./RenderHeader";
import RenderPoducts from "./RenderProducts";
import RenderFooter from "./RenderFooter";
import Button from "../../../components/src/CustomButton";
import CommonLoader from "../../../components/src/CommonLoader";
// Customizable Area End

import InvoiceBillingController, {
  Props,
} from "./InvoiceBillingController";
import QuerySubmittedModal from "../../contactus/src/QuerySubmittedModal";
import {  SECONDARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";

export default class InvoiceBilling extends InvoiceBillingController {
  backHandler: any;
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getInvoiceDetails();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  async componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'LandingPage' }],
    })
    return true;
  };
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
              ListFooterComponent={<RenderFooter subTotal={this.props.route?.params?.subtotal} total={this.props?.route?.params?.total} params={this.state.billingDetails} />}
              ListHeaderComponent={<RenderHeader billingAddress={this.state.billingAddress} shippingAddress={this.state.shippingAddress} deliveryDate={this.state.deliveryDate}/>}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button
              testID="share_invoice_id"
              label="Share Invoice"
              onPress={async () => {
                if (this.state.pdfUrl !== '') {
                  this.shareInvoice(this.state.pdfUrl);
                  return;
                }
                this.downloadInvoice().then((res: any) => {
                  if (res) {   
                    setTimeout(() => {   
                      this.setState({showLoader:false})
                      this.shareInvoice(res);
                    },700)
                  }
                });
              }}
            />
            <Button testID="download_invoice_id" label="Download Invoice" onPress={()=>this.downloadInvoice.bind(this)(true)} />
          </View>
          <CommonLoader visible={this.state.showLoader} />
          <QuerySubmittedModal
            visible={this.state.showModal}
            buttonLabel="Okay"
            header="Success"
            message="Your invoice downloaded Successfully"
            onPress={() => this.setState({ showModal: false })}
            setVisible={() => this.setState({ showModal: false })}
            text={Platform.OS === "android" ? "You can find your invoice on Downloads/Farm2URDoor":"You can find your invoice on Farm2URDoor folder"}
          />
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
  date: { color: TEXT_COLOR, fontSize: 17, paddingVertical: 5 },
  boldDate: { fontWeight: "bold" ,color:TEXT_COLOR},
  text: { color: SECONDARY_TEXT_COLOR, fontSize: 17, paddingVertical: 3 },
  greyContainer: {
    backgroundColor: SECONDARY_COLOR,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
  },
});
// Customizable Area End
