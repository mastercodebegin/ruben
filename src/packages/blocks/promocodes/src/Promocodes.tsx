import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { circleIcon, crossIcon } from "./assets";
// Customizable Area End

import PromocodesController, {
  Props,
  configJSON,
} from "./PromocodesController";
import moment from "moment";

export default class Promocodes extends PromocodesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  renderPromocodeRow = (promocode: any) => (
    <TouchableOpacity
      activeOpacity={0.7}
      key={promocode.id}
      testID={"renderPromocodeRow"}
      onPress={() => this.handleRedirection(promocode)}
    >
      <View style={styles.promocodeRowContainer}>
        <View style={styles.promocodeRowHeaderContainer}>
          <View style={styles.promocodePercentageContainer}>
            {promocode.attributes?.discount_type === "fixed" ? (
              <Text style={styles.promocodePercentageText}>
                {`₹${
                  String(promocode.attributes?.discount)?.padStart(2, "0") || 0
                }`}
              </Text>
            ) : (
              <Text style={styles.promocodePercentageText}>
                {`${
                  String(promocode.attributes?.discount)?.padStart(2, "0") || 0
                }%`}
              </Text>
            )}
            <Text style={styles.promocodePercentageText}>OFF</Text>
          </View>
          <View style={styles.promocodeDetailsContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.minimumPurchaseText}>
                On minimum purchase of
              </Text>
              <Text style={styles.minimumPurchaseAmount}>
                {`Rs ${promocode.attributes.min_order_amount}`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text style={styles.minimumPurchaseText}>Code :</Text>
              <Text style={styles.minimumPurchaseAmount}>
                {promocode.attributes.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.promocodeExpiryContainer}>
          <Text style={styles.minimumPurchaseText}>Expires on :</Text>
          <Text
            style={[
              styles.minimumPurchaseAmount,
              { marginLeft: 7, opacity: 0.4 },
            ]}
          >
            {moment(promocode.attributes.to).format("MMM DD YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderNoPromocodes() {
    return (
      <View style={styles.noPromocodeContainer}>
        <ImageBackground
          style={styles.noPromocodeCircleContainer}
          source={circleIcon}
        >
          <Image style={styles.noPromocodeCrossIcon} source={crossIcon} />
        </ImageBackground>

        <Text style={styles.noPromocodeSorryText}>Sorry!</Text>
        <Text style={styles.noPromocodeText}>No Promocodes</Text>

      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { loading, promocodes } = this.state;

    if (loading && promocodes.length === 0) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={50} color="#7266d0" />
        </View>
      );
    }

    return (
      //Merge Engine DefaultContainer
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#7266d0"
          translucent={false}
        />
        {promocodes.length > 0 ? (
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.container}
          >
            {promocodes.map((promocode) => this.renderPromocodeRow(promocode))}
          </ScrollView>
        ) : (
          this.renderNoPromocodes()
        )}
      </View>
      //Merge Engine End DefaultContainer
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  promocodeRowContainer: {
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 13,
    paddingVertical: 15,
    minHeight: 80,
    borderColor: "#e4e4e4",
  },
  promocodeRowHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  promocodeExpiryContainer: {
    flexDirection: "row",
    marginTop: 7,
  },
  promocodeDetailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 3,
  },
  promocodePercentageContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 21,
  },
  minimumPurchaseText: {
    fontSize: 12,
    color: "#000000",
  },
  minimumPurchaseAmount: {
    marginLeft: 6,
    fontSize: 12,
    color: "#000000",
    fontWeight: 'bold',
  },
  promocodePercentageText: {
    fontSize: 17,
    color: "#d4312d",
    fontWeight: 'bold',
  },
  noPromocodeContainer: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  noPromocodeCircleContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  noPromocodeCrossIcon: {
    width: 25,
    height: 25,
  },
  noPromocodeSorryText: {
    marginTop: 12,
    fontSize: 16,
    color: "#2f2a2b",
    fontWeight: 'bold',
  },
  noPromocodeText: {
    marginTop: 6,
    fontSize: 12,
    color: "#2f2a2b",
  },
  continueShoppingText: {
    fontSize: 14,
  },
  continueShoppingBtnContainer: {
    width: "90%",
    marginTop: 18,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
// Customizable Area End
