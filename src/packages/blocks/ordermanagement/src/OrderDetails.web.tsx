import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from "react-native";
// Customizable Area End

import Moment from "moment";
// import {WebView} from "react-native-webview"
import OrdermanagementController, {
  Props,
  //   configJSON
} from "./OrdermanagementController";
// //@ts-ignore
// import StarRating from "react-native-star-rating";

export default class OrderDetails extends OrdermanagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <Text>OrderDetails Web</Text>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
});
// Customizable Area End
