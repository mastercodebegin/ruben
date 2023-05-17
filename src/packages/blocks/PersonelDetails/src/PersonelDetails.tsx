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
          headerText="Payment Details"
          navigation={this.props.navigation}
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
          </View>
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
  }
}
