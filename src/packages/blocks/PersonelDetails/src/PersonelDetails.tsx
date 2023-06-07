import React from "react";
import {
  Alert,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { styles } from "./styles";
import { PRIMARY, removeImage } from "../../../components/src/constants";
import MileStone from "../../../components/src/MilestoneComponent";
import PersonelDetailsController from "./PersonelDetailsController";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./MyDetails";
import SavedAddresses from "./SavedAddresses";
import AvailableSlots from "./AvailableSlots";
import DoubleButton from "../../../components/src/DoubleButton";

interface ImageBoxType {
  text: string;
  image: ImageSourcePropType;
  selected: boolean;
  onpress: () => void;
}
const addressList = [
  {
    name: "Office Address",
    address: "12 AB building near test road , Dallas",
  },
  {
    name: "Home Address",
    address: "12 AB building near test road , Dallas",
  },
  {
    name: "Other Address",
    address: "12 AB building near test road , Dallas",
  },
];
const ImageBox = ({ text, image, selected, onpress }: ImageBoxType) => (
  <TouchableOpacity
    onPress={onpress}
    style={[styles.boxContainer, selected && { backgroundColor: PRIMARY }]}
  >
    <Image
      resizeMode="contain"
      style={[{ height: 20, width: 20 }, selected && { tintColor: "white" }]}
      source={image}
    />
    <Text
      style={[
        { paddingTop: 10, textAlign: "center" },
        selected && { color: "white" },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
export default class PersonelDetails extends PersonelDetailsController {
  render() {
    const handleCancelPress = () => {
      const handleOkPress = () => this.props.navigation.goBack();
      Alert.alert("Alert", "Are you sure to cancel", [
        { text: "OK", onPress: handleOkPress },
        { text: "CANCEL" },
      ]);
    };
    return (
      <SafeAreaView style={styles.safearea}>
        <HeaderWithBackArrowTemplate
          headerText="Personal Details"
          navigation={this.props.navigation}
          scrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <MileStone
              list={["My Cart", "Personel Details", "Summary", "Payment"]}
              selected="Personel Details"
            />
            <View style={styles.imageContainer}>
              <ImageBox
                selected={this.state.selectedTab === "delivery"}
                text="Delivery"
                onpress={() => this.setState({ selectedTab: "delivery" })}
                image={removeImage}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "shipping"}
                onpress={() => this.setState({ selectedTab: "shipping" })}
                text="Shipping/Mailing"
                image={removeImage}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "pickup"}
                onpress={() => this.setState({ selectedTab: "pickup" })}
                text="Pickup"
                image={removeImage}
              />
            </View>
            {this.state.selectedTab !== "pickup" ? (
              <>
                <View style={{ paddingTop: 20 }}>
                  <MyDetails
                    header="MY DETAILS"
                    list={[
                      { question: "name", ans: "Maria Tofimova" },
                      { question: "email", ans: "test@gmail.com" },
                      { question: "phone", ans: "+ 121212122121" },
                      {
                        question: "Shipping Add.",
                        ans: addressList[this.state.selectedAddress].address,
                      },
                      { question: "Zipcode", ans: "123456" },
                    ]}
                  />
                </View>
                <View style={{ paddingTop: 20 }}>
                  <SavedAddresses
                    addressList={addressList}
                    setSelectedAddress={(index) =>
                      this.setState({ selectedAddress: index })
                    }
                    selectedAddress={this.state.selectedAddress}
                  />
                </View>
              </>
            ) : (
              <AvailableSlots />
            )}
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.estimation}>{"* Estimated delivery:"}</Text>
              <Text style={styles.estimation}>
                {"Within 3 days, 21st Oct,Friday- 9:00 AM to 6:00 PM"}
              </Text>
            </View>
            <DoubleButton
              button1Label="Continue to Summary"
              button1_Onpress={() => this.props.navigation.navigate('StripeIntegration')}
              button2Label="Cancel"
              button2_Onpress={handleCancelPress}
              containerStyle={{ paddingTop: 20 }}
            />
          </View>
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
  }
}
