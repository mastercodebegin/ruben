import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import {
  WHITE,
  cow,
  LIGHT_GREY,
  TEXT_COLOR,
  BUTTON_COLOR_PRIMARY,
  BUTTON_TEXT_COLOR_PRIMARY
} from "../assets";
import Modal from "./MyCreditDetailsModal";
import LandingPageController, { Props } from "../LandingPageController";
export default class MyCreditScreen extends LandingPageController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount(): Promise<void> {
    this.getRemainingProduct.bind(this)(this.props?.route?.params?.selectedCategoryId);
  }
  render() {
    return (
      //@ts-ignore
      <HeaderWithBackArrowTemplate
        headerText="My Credit"
        navigation={this.props.navigation}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            testID="remaningProduct"
            data={this.state.remainingproduct}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({item}:any) => {
              return (
                <View style={styles.main}>
                  <Image
                    resizeMode="stretch"
                    style={styles.image}
                    source={cow}
                  />
                  
                  <View style={styles.flexContainer}>
                    <Text style={styles.text}>Purchased Animal</Text>
                    <Text style={styles.desText}>{item?.purchased_animal}</Text>
                  </View>
                  <View style={styles.flexContainer}>
                    <Text style={styles.text}>Total Cuts</Text>
                    <Text style={styles.desText}>{item?.total_cuts}</Text>
                  </View>
                  <View style={styles.flexContainer}>
                    <Text style={styles.text}>Used Cuts</Text>
                    <Text style={styles.desText}>{item?.used_cuts}</Text>
                  </View>
                  <View style={styles.flexContainer}>
                    <Text style={styles.text}>Remaining Cuts</Text>
                    <Text style={styles.desText}>{item?.remaining_cuts}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.pickButton,{backgroundColor:BUTTON_COLOR_PRIMARY}]}
                    testID="detailsModal"
                    onPress={() => {
                      this.setState({ showMyCreditModal: true });
                    }}
                  >
                    <Text style={styles.pickText}>Pickup / Deliver </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(_, index) => {
              return String(index);
            }}
          />
          <Modal
            setCreditDetailModal={() => this.setState({ showMyCreditModal: false })}
            visible={this.state.showMyCreditModal}
            navigation={this.props.navigation} id={""} setVisibleProfileModal={function (): void {
              throw new Error("Function not implemented.");
            } } setState={undefined} state={undefined} firstTime={false} currentUser={""} route={undefined} updateCartDetails={function (data: any): void {
              throw new Error("Function not implemented.");
            } } cartDetails={[]}   
            submitCreditDetailModal={()=>console.log()
            }
            remainingCuts={this.props?.route?.params?.remainingCuts}
            categoryId={this.props?.route?.params?.selectedCategoryId}
            />
        </View>
      </HeaderWithBackArrowTemplate>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: WHITE,
    paddingTop: 10,
    paddingBottom: 20,
    overflow: "hidden",
    marginBottom: 15,
    borderRadius: 15
  },
  image: {
    height: 180,
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center"
  },
  text: {
    color: TEXT_COLOR,
    fontWeight: "normal",
    fontSize: 16
  },
  desText: {
    fontSize: 17,
    color: TEXT_COLOR,
    fontWeight: "bold"
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: LIGHT_GREY
  },
  pickButton: {
    backgroundColor: LIGHT_GREY,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BUTTON_COLOR_PRIMARY,
    marginHorizontal: 20,
    marginTop: 10
  },
  pickText: {
    fontSize: 16,
    color: BUTTON_TEXT_COLOR_PRIMARY,
    fontWeight: "700"
  }
});
