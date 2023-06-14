import React from "react";

// Customizable Area Start
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import { View, StyleSheet, FlatList } from "react-native";
import { DARK_RED, LIGHT_GREY } from "../../../components/src/constants";
import RenderHeader from "./RenderHeader";
import RenderPoducts from "./RenderProducts";
import RenderFooter from "./RenderFooter";
import Button from "../../../components/src/CustomButton";
import Share from 'react-native-share';
import { downloadFiles } from "../../../components/src/utils";
import { Alert } from "react-native";
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
  async downloadInvoice() {
    let url;
    try{
      url = await downloadFiles(
        "https://www.africau.edu/images/default/sample.pdf",
        `${new Date().getTime()}invoice.pdf`,
        "invoice",
        "application/pdf",
        "invoice",
        true,
        true
      )
    }catch(e:any){
      Alert.alert('Error',e.message)
    }
    return url;
   
  }
  async shareInvoice(filePath:string){
      try {
        const fileName = 'example.pdf';
        const shareOptions = {
          url: `file://${filePath}`,
          fileName
        };
        await Share.open(shareOptions);
      } catch (error:any) {
        Alert.alert('Error',error.message)
      }
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <HeaderWithBackArrowTemplate
        navigation={this.props.navigation}
        headerText="Invoice"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <View style={styles.innerContainer}>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
              renderItem={({ index }) => <RenderPoducts index={index} />}
              keyExtractor={(item, index) => item + "" + index}
              contentContainerStyle={{ paddingTop: 30 }}
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 0.5, backgroundColor: "grey", opacity: 0.5 }}
                />
              )}
              ListFooterComponent={<RenderFooter />}
              ListHeaderComponent={<RenderHeader />}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button
              testID="share_invoice_id"
              label="Share Invoice"
              onPress={async () => {
                this.downloadInvoice().then((res: any) => {
                  this.shareInvoice(res);
                });
              }}
            />
            <Button testID="download_invoice_id" label="Download Invoice" onPress={() => {}} />
          </View>
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
