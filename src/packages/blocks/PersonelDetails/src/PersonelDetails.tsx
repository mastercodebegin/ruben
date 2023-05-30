import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { styles } from "./styles";
import { removeImage } from "../../../components/src/constants";
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
}
const ImageBox = ({ text, image }: ImageBoxType) => (
  <TouchableOpacity style={styles.boxContainer}>
    <Image
      resizeMode="contain"
      style={{ height: 20, width: 20 }}
      source={image}
    />
    <Text style={{ paddingTop: 10, textAlign: "center" }}>{text}</Text>
  </TouchableOpacity>
);
export default class PersonelDetails extends PersonelDetailsController {
  render() {
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
              <ImageBox text="Delivery" image={removeImage} />
              <View style={styles.seperator} />
              <ImageBox text="Shipping/Mailing" image={removeImage} />
              <View style={styles.seperator} />
              <ImageBox text="Pickup" image={removeImage} />
            </View>
            <View style={{ paddingTop: 20 }}>
              <MyDetails
                header="MY DETAILS"
                list={[
                  { question: "name", ans: "Maria Tofimova" },
                  { question: "email", ans: "test@gmail.com" },
                  { question: "phone", ans: "+ 121212122121" },
                  {
                    question: "Shipping Add.",
                    ans: "12 AB building near , Test Road",
                  },
                  { question: "Zipcode", ans: "123456" },
                ]}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <SavedAddresses />
            </View>
            <AvailableSlots />
            <View style={{paddingTop:20}}>
            <Text style={styles.estimation}>{'* Estimated delivery:'}</Text>
            <Text style={styles.estimation}>{'Within 3 days, 21st Oct,Friday- 9:00 AM to 6:00 PM'}</Text>
            </View>
            <DoubleButton
              button1Label="Continue to Summary"
              button1_Onpress={() => {}}
              button2Label="Cancel"
              button2_Onpress={() => {}}
              containerStyle={{ paddingTop: 20 }}
            />
          </View>
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
  }
}
