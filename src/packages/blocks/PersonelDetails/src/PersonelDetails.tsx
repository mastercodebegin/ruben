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
import { PRIMARY } from "../../../components/src/constants";
import MileStone from "../../../components/src/MilestoneComponent";
import PersonelDetailsController from "./PersonelDetailsController";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./MyDetails";
import SavedAddresses from "./SavedAddresses";
import AvailableSlots from "./AvailableSlots";
import DoubleButton from "../../../components/src/DoubleButton";
import DeliveryFeesModal from "./DeliveryFeesModal";
const deliveryIcon = require('../../../components/src/deliveryIcon.png');
const pickupIcon = require('../../../components/src/shippingIcon.png');
const shippingIcon = require('../../../components/src/package.png');
interface ImageBoxType {
  text: string;
  image: ImageSourcePropType;
  selected: boolean;
  onpress: () => void;
}
const ImageBox = ({ text, image, selected, onpress }: ImageBoxType) => (
  <TouchableOpacity
    onPress={onpress}
    style={[styles.boxContainer, selected && { backgroundColor: PRIMARY }]}
  >
    <Image
      resizeMode="stretch"
      style={[{ height: 20, width: 20 ,tintColor:selected ? "white":PRIMARY}]}
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
  async componentDidMount(){
    await this.getAddressList();
    await this.getAvailableSlots();
    this.getEstimatedDeliveryDate();
  }
  render() {
    const {address,phone_number, zip_code,name,email} = {
      address: this.state.addressList[this.state.selectedAddress]?.attributes?.address || '',
      phone_number:this.state.addressList[this.state.selectedAddress]?.attributes?.phone_number || '',
      zip_code: this.state.addressList[this.state.selectedAddress]?.attributes?.zip_code || '',
      name: this.state.addressList[this.state.selectedAddress]?.attributes?.name||'',
      email: this.state.addressList[this.state.selectedAddress]?.attributes?.email||''
    }    
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
              list={["My Cart", "Personal Details", "Summary", "Payment"]}
              selected="Personal Details"
            />
            <View style={styles.imageContainer}>
              <ImageBox
                selected={this.state.selectedTab === "delivery"}
                text="Delivery"
                onpress={() => this.setState({ selectedTab: "delivery" })}
                image={deliveryIcon}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "shipping"}
                onpress={() => this.setState({ selectedTab: "shipping" })}
                text="Shipping/Mailing"
                image={shippingIcon}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "pickup"}
                onpress={() => this.setState({ selectedTab: "pickup" })}
                text="Pick Up"
                image={pickupIcon}
              />
            </View>
            {this.state.selectedTab !== "pickup" ? (
              <>
                <View style={{ paddingTop: 20 }}>
                  <MyDetails
                    header="MY DETAILS"
                    list={[
                      { question: "Name", ans: name  },
                      { question: "Email", ans:email},
                      { question: "Phone",ans:phone_number  },
                      {
                        question: "Shipping Add.",
                        ans: address,
                      },
                      { question: "Zipcode", ans:zip_code },
                    ]}
                  />
                </View>
                <View style={{ paddingTop: 20 }}>
                  <SavedAddresses
                    showModal={this.state.showAddAddress}
                    setShowModal={(val:boolean)=>this.setState({showAddAddress:val})}
                    addressList={this.state.addressList}
                    setSelectedAddress={(index) =>
                      this.setState({ selectedAddress: index })
                    }
                    isLoading={this.state.showLoader}
                    addAddress={this.addAddress.bind(this)}
                    selectedAddress={this.state.selectedAddress}
                  />
                </View>
              </>
            ) : (
              <AvailableSlots address={this.state.addressList[this.state.selectedAddress]?.attributes?.address} list={this.state.availableSlotsList}/>
            )}
            {this.state.estimatedDeliveryDate ? <View style={{ paddingTop: 20 }}>
              <Text style={styles.estimation}>{"* Estimated Delivery:"}</Text>
              <Text style={styles.estimation}>
                {this.getExpectedDeliveryDate()}
              </Text> 
            </View>: <></>}
            <DoubleButton
              button1Label="Continue to Summary"
              button1_Onpress={() => {
                if (this.state.addressList.length) {
                  this.setState({ show_modal: true });
                } else {
                  Alert.alert("Alert", "Please add address");
                }
              }}
              button2Label="Cancel"
              button2_Onpress={handleCancelPress}
              containerStyle={{ paddingTop: 20 }}
            />
            <DeliveryFeesModal
              visible={this.state.show_modal}
              onpressClose={() => this.setState({ show_modal: false })}
              onpressContinue={() => {
                this.setState({show_modal: false})
                this.props.navigation.navigate("OrderSummary", this.props.route.params)
              }}
            />
          </View>
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
  }
}
