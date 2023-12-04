import React from "react";
import {
  Alert,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ImageSourcePropType,
} from "react-native";
import { styles } from "./styles";
import { PRIMARY } from "../../../components/src/constants";
import MileStone from "../../../components/src/MilestoneComponent";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./MyDetails";
import DoubleButton from "../../../components/src/DoubleButton";
import ProductDetailComponent from "../../../components/src/ProductDetailComponent";
import OrderSummaryController from "./OrderSummaryController";
import PaymentDetails from "./PaymentDetails";
import {BLACK, DARK_RED, WHITE} from "../../landingpage/src/colors";
import CommonLoader from "../../../components/src/CommonLoader";
import Button from "../../../components/src/CustomButton";
import { close } from "../../landingpage/src/assets";
const deliveryIcon = require("../../../components/src/deliveryIcon.png");
const pickupIcon = require('../../../components/src/shippingIcon.png');
const shippingIcon = require('../../../components/src/package.png');
interface ImageBoxType {
  text: string;
  image: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
}
const ImageBox = ({ text, image, selected, onPress }: ImageBoxType) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.boxContainer, selected && { backgroundColor: PRIMARY }]}
  >
    <Image
      resizeMode="contain"
      style={[{ height: 20, width: 20 , tintColor: selected ? "white" :PRIMARY }]}
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
export default class OrderSummary extends OrderSummaryController {
  async componentDidMount(){
    this.getCart();
  }
  render() {
    const {address,phone_number, zip_code,name,email} = this.getAddressDetails()
    const handleCancelPress = () => {
      const handleOkPress = () => this.props.navigation.goBack();
      Alert.alert("Alert", "Are you sure to cancel", [
        { text: "OK", onPress: handleOkPress },
        { text: "CANCEL" },
      ]);
    };
    const lifetimeSubscriptionCharge = this.state.subscriptionCharge;

    return (
      <SafeAreaView style={styles.safearea}>

      <Modal visible={this.state.showSubscriptionModal} transparent>
        <View style={styles.blur} />
        <View style={styles.mainWrap}>
        <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={() => this.setState({showSubscriptionModal:false})}
              style={styles.closeBtn}
            >
              <Image
                resizeMode="contain"
                style={styles.close}
                source={close}
              />
            </TouchableOpacity>
            <Image resizeMode="contain" style={styles.calenderImage} source={require('../assets/calendar.png')}/>

            <Text style={[styles.lifetimeSubHeading,{textAlign:"center",marginTop:30,lineHeight:30}]}>Lifetime Subscription {'\n'} $5</Text>
          <Text style={[styles.lifetimeSubText,{textAlign:'center'}]}>
            {
              "One-time purchase and lasts a lifetime."
            }
          </Text>

            <Button
              style={{ marginTop: 20 }}
              testID="add_to_cart"
              onPress={this.addLifeTimeSubscription.bind(this)}
              label={"Add to cart"}
            />
        </View>
        </View>
      </Modal>

        <HeaderWithBackArrowTemplate
          headerText="Summary"
          navigation={this.props.navigation}
          scrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <MileStone
              list={["My Cart", "Personal Details", "Summary", "Payment"]}
              selected="Summary"
            />
            <View style={styles.imageContainer}>
              <ImageBox
                selected={this.state.selectedTab === "delivery"}
                text="Delivery"
                onPress={() => this.setState({ selectedTab: "delivery" })}
                image={deliveryIcon}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "shipping"}
                onPress={() => this.setState({ selectedTab: "shipping" })}
                text="Shipping/Mailing"
                image={shippingIcon}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "pickup"}
                onPress={() => this.setState({ selectedTab: "pickup" })}
                text="Pickup"
                image={pickupIcon}
              />
            </View>
            <View style={styles.lifetimeSub}>
              <View style={styles.cartImageContainer}>
                <Image resizeMode="contain" style={styles.cartImage} source={require('../assets/cart.png')}/>
              </View>
              <View style={styles.lifetimeSubContent}>
                <Text style={styles.lifetimeSubHeading}>Lifetime Subscription</Text>
                <Text style={styles.lifetimeSubText}>one-time purchase and lasts a lifetime</Text>
                <TouchableOpacity disabled={this.state.lifetimeSubscription} style={styles.lifetimeSubButton} onPress={()=>this.setState({showSubscriptionModal:true})}>
                  <Text style={styles.lifetimeSubPrice}>{this.state.lifetimeSubscription ? "Added": "$5.00"}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemsContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.addedItemsHeader}>{`ADDED ITEMS (${this.state.productsList.length})`}</Text>
              </View>
              <View style={styles.addedItems}>
                {this.state.productsList.map((item,index) => { 
                  const frequency = item.attributes?.frequency; 
                  return (
                    <View key={index}>
                      <ProductDetailComponent
                      name={item.attributes?.catalogue?.data?.attributes?.categoryCode}
                      subscriptionProduct={frequency!="" && frequency != null ? true : false}
                      price={item.attributes?.catalogue?.data?.attributes?.price}
                      quantity={item.attributes?.quantity}
                      index={index}
                      image={item.attributes?.catalogue?.data?.attributes?.images[0]}
                      onpressRemove={()=>this.removeFromCart(item?.id)}
                      onpressIncrease={(res:boolean)=>this.increaseCartQuatity.bind(this)(item?.attributes?.catalogue?.data?.id,this.state.orderId,res)}
                    />
                  </View>
                )})}
              </View>
            </View>
            <View style={{ paddingTop: 20 }}>
              <MyDetails
                header="MY DETAILS"
                list={[
                  { question: "Name", ans: name  },
                  { question: "Email", ans:email },
                  { question: "Phone",ans:phone_number  },
                  {
                    question: "Shipping Add.",
                    ans: address,
                  },
                  { question: "Zipcode", ans:zip_code },
                ]}
              />
            </View>
              <View style={styles.deliverContainer}>
                <Text style={styles.deliverText}>Deliver in 24hrs</Text>
                <TouchableOpacity style={[styles.deliverPrice,{backgroundColor:this.state.fastDeliveryPice ? PRIMARY : WHITE}]} onPress={this.state.fastDeliveryPice? this.removeFastDelivery.bind(this) : this.addFastDelivery.bind(this)}>
                  <Text style={[styles.deliverPriceText,{color:this.state.fastDeliveryPice ? WHITE : PRIMARY }]}>{this.state.fastDeliveryPice ? "Remove" : "+ $25.00"}</Text>
                </TouchableOpacity>
              </View>
            <View style={{marginTop: 20}}>
              <PaymentDetails
                header="PAYMENT DETAILS"
                list={this.state.billingDetails}
                footer={{question: "Total", ans: `$${this.state.totalPrice}`}}
              />
            </View>
             
               {this.state.availablePlans.length ?  <>
                  <Text style={[styles.meatStorageHeading, {marginTop: 30}]}>Meat Storage</Text>
              {this.state.availablePlans.map((item) => {
                const isSelected = this.state.currentPlan?.id === item?.id && !(item?.plan_name && item?.plan_name?.toUpperCase() === 'BASIC');
                const isBasic =  item?.plan_name && item?.plan_name?.toUpperCase() === 'BASIC';
                return (<View key={item?.id} style={[styles.meatStorageOption, { backgroundColor: isSelected ? PRIMARY : WHITE }]}>
                    <View style={styles.meatStorageHeader}>
                      <Text style={[styles.meatStorageHeading, { color: isSelected? WHITE : DARK_RED }]}>{this.capitalizeFirstLetter(item?.plan_name)}</Text>
                    {isBasic ?
                      <Text style={[styles.meatStoragePrice, {color: 'grey'}]}>{this.state.currentPlan?.id === item?.id ? 'CURRENT' :''}</Text>
                      : <Text style={[styles.meatStoragePrice, { color: isSelected ? WHITE : DARK_RED }]}>{`$${item?.price}`}<Text style={styles.monthText}>{'/Month'}</Text></Text>}
                    </View>
                    <Text style={[styles.meatStorageDesc, { color: isSelected ? '#dddddd' : 'grey' }]}>{ item?.description }</Text>
                  {!isBasic && <TouchableOpacity style={styles.addMeatStorageButton} onPress={() => {
                    if (item?.plan_name && !isSelected) {
                      this.applyStoragePlan(item.plan_name);
                    } else {
                      this.applyStoragePlan('Basic');
                    }
                  }}>
                      <Text style={[styles.addMeatStorageButtonText, {color:isSelected ? BLACK : PRIMARY}]}>
                        {isSelected ? 'Remove' : 'Add Storage'}
                      </Text>
                    </TouchableOpacity>}
                  </View>)})}
                  
                </> : null}
              
            <DoubleButton
              button1Label={String(this.state.currentPlan?.plan_name).toUpperCase() !== "BASIC" ? `Continue with ${this.state.currentPlan?.plan_name}` : "Continue to Payment"}
              button1_Onpress={() => {
                this.props.navigation.navigate('StripeIntegration', {
                  name,
                  address,
                  phone_number,
                  zip_code,
                  subtotal: this.state.subtotal,
                  total: this.state.totalPrice,
                  shipping: this.state.shipping,
                  discount: this.props.route.params.discount,
                  discountPercentage : this.props.route.params.discountPercentage,
                  storageClass: this.state.currentStorageClass,
                  orderId: this.state.orderId,
                  orderNumber: this.state.orderNumber,
                  deliveryCharge: this.state.deliveryCharge,
                  lifetimeSubscriptionCharge: lifetimeSubscriptionCharge,
                  email: email,
                  billingDetails:this.state.billingDetails
                })}
              }
              button2Label="Cancel"
              button2_Onpress={handleCancelPress}
              containerStyle={{ paddingTop: 20 }}
            />
          </View>
        </HeaderWithBackArrowTemplate>
        <CommonLoader visible={this.state.showLoader}/>
      </SafeAreaView>
    );
  }
}