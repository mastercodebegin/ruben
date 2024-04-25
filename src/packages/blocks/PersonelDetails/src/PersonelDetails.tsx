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
import MileStone from "../../../components/src/MilestoneComponent";
import PersonalDetailsController,{DeliverySlot} from "./PersonelDetailsController";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./MyDetails";
import SavedAddresses from "./SavedAddresses";
import AvailableSlots from "./AvailableSlots";
import DoubleButton from "../../../components/src/DoubleButton";
import DeliveryFeesModal from "./DeliveryFeesModal";
import CommonLoader from "../../../components/src/CommonLoader";
import { BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
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
    style={[styles.boxContainer, selected ? { backgroundColor: BUTTON_COLOR_PRIMARY }:{ backgroundColor: BUTTON_COLOR_SECONDARY,borderWidth:1,borderColor:PRIMARY_COLOR }]}
  >
    {console.log('selected=========',selected)
    }
    <Image
      resizeMode="stretch"
      style={[{ height: 20, width: 20 ,tintColor:selected ?BUTTON_TEXT_COLOR_PRIMARY: BUTTON_TEXT_COLOR_SECONDARY}]}
      source={image}
    />
    <Text
      style={[
        { paddingTop: 10, textAlign: "center" },
         { color: selected?"white":'black' },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
export default class PersonelDetails extends PersonalDetailsController {
  async componentDidMount(){
    await this.getAddressList();
    await this.getEstimatedDeliveryDate();
    await this.getAvailableSlots();
    await this.getStateList();
    await this.getMerchantAddressList()
    await this.getDeliverySlot()
  }

  renderSlotitem = ({SlotItem,SlotText,selectedSlotid,currentSlotid,onPress}:
  {SlotItem:any,SlotText:string,selectedSlotid:string,currentSlotid:string,onPress:Function}) => {
    const isSelected = currentSlotid === selectedSlotid
    return(
    <TouchableOpacity
      onPress={()=>onPress(SlotItem)}
      style={{
        backgroundColor: isSelected ?  BUTTON_COLOR_PRIMARY:BUTTON_COLOR_SECONDARY,
        ...styles.slot,marginHorizontal:"1%"
      }}
    >
      <Text style={{ color: isSelected ? BUTTON_TEXT_COLOR_PRIMARY : BUTTON_TEXT_COLOR_SECONDARY }}>
        {SlotText.trim()}
      </Text>
    </TouchableOpacity>
    )
};
  render() {
    const { address, phone_number, zip_code, name, email,delivery_slot } = this.getUserDetails();
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
                onpress={() => {
                    if (!this.state.addressList.length) {
                      Alert.alert("Alert", "Please add address");
                    }  else {
                     this.setState({selectedTab:'shipping'})
                    }
                }}
                text="Shipping/Mailing"
                image={shippingIcon}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "pickup"}
                onpress={() => {
                  if (!this.state.addressList.length) {
                    Alert.alert("Alert", "Please add address");
                  }  else {
                    this.setState({selectedTab:'pickup',selectedAddress:null})
                  }
                  
                }}
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
                    setShowModal={(val:boolean)=>{this.setState({showAddAddress:val})
                  console.log('val--',val)}
                  
                  }
                    addressList={this.state.addressList}
                    setSelectedAddress={(index:any,value:any) => {
                      if(index !== this.state.selectedAddress){
                        this.addAddressToTheOrder(index)
                        
                         this.setState({shippingFee:value?.attributes?.shipping_charge})
                      }
                    }
                    }
                    isLoading={this.state.showLoader}
                    addAddress={this.addAddress.bind(this)}
                    selectedAddress={this.state.selectedAddress}
                    stateList ={this.state.stateList}
                    selectedTab={this.state.selectedTab}
                  />

              <View style={styles.seperatorLine}>
                <Text style={[styles.headerText,{color:TEXT_COLOR}]}>{'CHOOSE DELIVERY SLOT'}</Text>
            </View>
              <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent:"center"
              }}
              >
            {this.state.deliverySlots.map((item:DeliverySlot)=>
            this.renderSlotitem({
              currentSlotid:item.id,
              selectedSlotid:this.state.selectedDeliverySlot.id,
              SlotItem:item,onPress:this.selectDeliveryDate,SlotText:item.attributes.date
            }))
            }
            </View>    

             {this.state.selectedDeliverySlot.id.length > 0 ?<Text style={[styles.headerText,{color:TEXT_COLOR}]}>{'CHOOSE TIME SLOT'}</Text>:null} 
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent:"center"
              }}
              >
            {this.state.selectedDeliverySlot.attributes.slots.map((item:string)=>
            this.renderSlotitem({
              currentSlotid:item.trim(),
              selectedSlotid:this.state.selectedDeliveryTime,
              SlotItem:item.trim(),onPress:this.selectTimeSlot,SlotText:item
            })
            )}
            </View>
            </View>
              </>
            ) : (
              <>
              <AvailableSlots 
              address={this.state.addressList[this.state.selectedAddress]?.attributes?.address} 
              list={this.state.availableSlotsList}
              merchantAddress={this.state.merchantAddress}
              />
              <SavedAddresses
                    showModal={this.state.showAddAddress}
                    setShowModal={(val:boolean)=>{this.setState({showAddAddress:val})
                  console.log('val--',val)}
                  
                  }
                    setSelectedAddress={(index:any,value:any) => {
                      if(index !== this.state.selectedAddress){
                        this.addAddressToTheOrder(index)
                         this.setState({shippingFee:value?.attributes?.shipping_charge})

                      }
                    }
                    }
                    isLoading={this.state.showLoader}
                    addressList={[{attributes:{address_type:'OFFICE'} }]}
                    addAddress={this.addAddress.bind(this)}
                    selectedAddress={this.state.selectedAddress}
                    stateList ={this.state.stateList}
                    selectedTab={this.state.selectedTab}

                  />
                  </>
            )}
            {this.state.estimatedDeliveryDate ? <View style={{ paddingTop: 20 }}>
              <Text style={styles.estimation}>{"* Estimated Delivery:"}</Text>
              <Text style={styles.estimation}>
                {this.getExpectedDeliveryDate()}
              </Text> 
            </View>: <></>}
            <DoubleButton
              button1Label={"Continue to Summary"}
              button1_Onpress={this.state.selectedTab=='pickup'?
             ()=> this.props.navigation.navigate("OrderSummary", 
              {...this.props.route.params,address,phone_number, 
                zip_code,name,email,selected:this.state.selectedTab})
              :  this.onPressContinue.bind(this)}
              button2Label="Cancel"
              button2_Onpress={handleCancelPress}
              containerStyle={{ paddingTop: 20 }}
            />
            <DeliveryFeesModal
            shippingFee={this.state.shippingFee}
              visible={this.state.show_modal}
              selectedTab={this.state.selectedTab}
              onpressClose={() => this.setState({ show_modal: false })}
              onpressContinue={() => {
                this.setState({show_modal: false})
                this.props.navigation.navigate("OrderSummary", {...this.props.route.params,address,phone_number, zip_code,name,email,delivery_slot,selected:this.state.selectedTab})
              }}
            />
            <CommonLoader visible={this.state.showLoader} />
          </View>
        </HeaderWithBackArrowTemplate>
      </SafeAreaView>
    );
  }
}


