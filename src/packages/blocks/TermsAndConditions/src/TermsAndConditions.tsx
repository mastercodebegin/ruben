import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CommonLoader from "../../../components/src/CommonLoader";
//@ts-ignore
import { TERMS_AND_CONDITIONS } from "../../../components/src/constants";
//@ts-ignore
import {
  backArrow,
  DARK_RED,
  WHITE,
  LIGHT_GREY,
} from "../../landingpage/src/assets";

// Customizable Area End

import TermsAndConditionsController, {
  Props,
  configJSON,
} from "./TermsAndConditionsController";

export default class TermsAndConditions extends TermsAndConditionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.callGetTermsAndConditions();
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.flex}>
        <View style={styles.main}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Image style={styles.back} source={backArrow} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{TERMS_AND_CONDITIONS}</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.contentContainer}
          >
            <Text style={styles.text}>{this.state.termsAndCondition}</Text>
          </ScrollView>
          <CommonLoader visible={this.state.showLoader} />
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  text: {
    color: "grey",
    fontSize: 17,
    paddingVertical: 10,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: LIGHT_GREY,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: DARK_RED,
    paddingLeft: 10,
  },
  back: { height: 15, width: 15 },
  flex: { flex: 1 },
});
// Customizable Area End
