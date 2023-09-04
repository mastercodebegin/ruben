import React from "react";

// Customizable Area Start
import { Text, StyleSheet } from "react-native";
import CommonLoader from "../../../components/src/CommonLoader";
import { TERMS_AND_CONDITIONS } from "../../../components/src/constants";
import {
  backArrow,
  DARK_RED,
  WHITE,
  LIGHT_GREY,
} from "../../landingpage/src/assets";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
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
      <HeaderWithBackArrowTemplate
        scrollView
        showsVerticalScrollIndicator={false}
        navigation={navigation}
        headerText={TERMS_AND_CONDITIONS}
        contentContainerStyle={styles.contentContainer}
        refreshControl
        bounces 
        scrollViewStyle={styles.scrollView}
        onRefresh={() => {
          this.setState({ refresh: true });
          this.callGetTermsAndConditions(false);
        }}
      >
        <>
          <Text style={styles.text}>{this.state.termsAndCondition}</Text>
          <CommonLoader visible={this.state.showLoader} />
        </>
      </HeaderWithBackArrowTemplate>
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
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius:20
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
  scrollView: {
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
  },
});
// Customizable Area End
