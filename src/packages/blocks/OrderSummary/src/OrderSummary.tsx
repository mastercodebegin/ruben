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
  ScrollView,
} from "react-native";
import { CALENDAR_ICON } from './assets'
import { styles } from "./styles";
import MileStone from "../../../components/src/MilestoneComponent";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./MyDetails";
import DoubleButton from "../../../components/src/DoubleButton";
import ProductDetailComponent from "../../../components/src/ProductDetailComponent";
import OrderSummaryController from "./OrderSummaryController";
import PaymentDetails from "./PaymentDetails";
import CommonLoader from "../../../components/src/CommonLoader";
import Button from "../../../components/src/CustomButton";
import RenderHtml from 'react-native-render-html';
import { BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR, close } from "../../landingpage/src/assets";
import { CheckBox } from "react-native-elements";
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
    disabled
    style={[styles.boxContainer,
    { backgroundColor: selected ? BUTTON_COLOR_PRIMARY : BUTTON_COLOR_SECONDARY },
    { borderWidth: 1, borderColor: PRIMARY_COLOR }]}
  >

    <Image
      resizeMode="contain"
      style={[{ height: 20, width: 20, tintColor: selected ? BUTTON_COLOR_SECONDARY : PRIMARY_COLOR }]}
      source={image}
    />
    <Text
      style={[
        { paddingTop: 10, textAlign: "center" },
        { color: selected ? BUTTON_TEXT_COLOR_PRIMARY : BUTTON_TEXT_COLOR_SECONDARY },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
export default class OrderSummary extends OrderSummaryController {
  async componentDidMount() {
    this.getCart(this.props.route.params?.selected);
    this.checkLifeTimeSubscription()
   this.getLifeTimeSubscriptionCondition()
    this.setState({ selectedTab: this.props.route.params?.selected })

  }
  render() {
    const { address, phone_number, zip_code, name, email } = this.getAddressDetails()
    const handleCancelPress = () => {
      const handleOkPress = () => this.props.navigation.goBack();
      Alert.alert("Alert", "Are you sure to cancel ", [
        { text: "OK", onPress: handleOkPress },
        { text: "CANCEL" },
      ]);
    };

    return (
      <SafeAreaView style={styles.safearea}>

{this.state.isUserSubscriptionRequested?      
  <Modal visible={this.state.showSubscriptionModal} transparent>
          <View style={styles.blur} />
          <View style={styles.mainWrap}>
            <View style={[styles.innerContainer,]}>
              <TouchableOpacity
                onPress={() => this.setState({ showSubscriptionModal: false })}
                style={[styles.closeBtn, { backgroundColor: 'white', borderWidth: 1, borderColor: PRIMARY_COLOR }]}
              >
                <Image
                  resizeMode="contain"
                  style={[styles.close, { tintColor: PRIMARY_COLOR }]}
                  source={close}
                />
              </TouchableOpacity>
              <Image resizeMode="contain" style={[styles.calenderImage, { tintColor: PRIMARY_COLOR }]}
                source={CALENDAR_ICON} />

              <Text style={[styles.lifetimeSubHeading,
              { textAlign: "center", marginTop: 30, lineHeight: 30, color: TEXT_COLOR }]}>Lifetime Subscription {'\n'} $5</Text>
              <Text style={[styles.lifetimeSubText, { textAlign: 'center' }]}>
                {
                  "One-time purchase and lasts a lifetime.false"
                }
              </Text>

              <Button
                style={{ marginTop: 20 }}
                testID="add_to_cart"
                onPress={ this.removeLifeTimeSubscription.bind(this) }
                label={ "Remove" }
              />
            </View>
          </View>
        </Modal>:
        <Modal visible={this.state.showSubscriptionModal} transparent>
          <View style={styles.blur} />
          <View style={styles.mainWrap}>
            <ScrollView style={[styles.innerContainer, { backgroundColor: 'white' }]}>
              <TouchableOpacity
                onPress={() => this.setState({ showSubscriptionModal: false })}
                style={[styles.closeBtn, {
                  backgroundColor: 'white', borderWidth: 1,
                  borderColor: PRIMARY_COLOR
                }]}
              >
                <Image
                  resizeMode="contain"
                  style={[styles.close, { tintColor: PRIMARY_COLOR }]}
                  source={close}
                />
              </TouchableOpacity>
              <Image resizeMode="contain" style={[styles.calenderImage, { tintColor: PRIMARY_COLOR }]}
                source={CALENDAR_ICON} />

              <Text style={[styles.lifetimeSubHeading,
              { textAlign: "center", marginTop: 30, lineHeight: 30, color: TEXT_COLOR }]}>Lifetime Subscription {'\n'} $5</Text>
              <Text style={[styles.lifetimeSubText, { textAlign: 'center' }]}>
                {
                  "One-time purchase and lasts a lifetime."
                }
              </Text>
               <Text style={[styles.lifetimeSubText,
              { fontSize: 14, letterSpacing: 1, fontWeight: '500', color: 'black' }]}>
                {this.state.subscriptionCondition?.description}
              </Text>

              <View style={{ height: 150, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <CheckBox
                    checked={this.state.isAcceptedCondition}
                    checkedColor={PRIMARY_COLOR} size={20}
                    onPress={() => this.setState({ isAcceptedCondition: !this.state.isAcceptedCondition })} />
                  <Text style={{ fontWeight: 'bold' }}>Accept the Terms and conditions</Text>
                </View>
                <Button
                  disable={!this.state.isAcceptedCondition}
                  style={{ marginTop: 20, }}
                  testID="add_to_cart"
                  onPress={this.applyLifeTimeSubscription.bind(this)}
                  label={"Add to cart"}
                />

              </View> 
            </ScrollView>

          </View>
        </Modal>
        }

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
                selected={this.state.selectedTab === "delivery" ? true : false}
                text="Delivery"
                onPress={() => alert()}
                image={deliveryIcon}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "shipping" ? true : false}
                onPress={() => alert()}
                text="Shipping/Mailing"
                image={shippingIcon}
              />
              <View style={styles.seperator} />
              <ImageBox
                selected={this.state.selectedTab === "pickup" ? true : false}
                onPress={() => alert()}
                text="Pickup"
                image={pickupIcon}
              />
            </View>
            <View style={[styles.lifetimeSub, { borderWidth: 1, borderColor: PRIMARY_COLOR }]}>
              <View style={[styles.cartImageContainer, { borderColor: PRIMARY_COLOR }]}>
                <Image resizeMode="contain" style={[styles.cartImage, { tintColor: PRIMARY_COLOR }]} source={require('../assets/cart.png')} />
              </View>
              <View style={[styles.lifetimeSubContent]}>
                <Text style={[styles.lifetimeSubHeading, { color: TEXT_COLOR }]}>Lifetime Subscription</Text>
                <Text style={[styles.lifetimeSubText, { color: SECONDARY_TEXT_COLOR }]}>one-time purchase and lasts a lifetime </Text>
                <TouchableOpacity disabled={this.state.isUserHasSubsCription} style={styles.lifetimeSubButton}
                  onPress={() => this.checkUserAddedSubscription()}>
                  <Text style={[styles.lifetimeSubPrice, { color: BUTTON_TEXT_COLOR_PRIMARY }]}>{this.state.isUserHasSubsCription ? "Added" : this.state.isUserSubscriptionRequested ? "Remove" : "$5.00"}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemsContainer}>
              <View style={styles.headerContainer}>
                <Text style={[styles.addedItemsHeader,
                { color: TEXT_COLOR }]}>{`ADDED ITEMS (${this.state.productsList.length})`}</Text>
              </View>
              <View style={styles.addedItems}>
                {this.state.productsList.map((item, index) => {
                  const frequency = item.attributes?.frequency;
                  return (
                    <View key={index}>
                      <ProductDetailComponent
                        name={item.attributes?.catalogue?.data?.attributes?.categoryCode}
                        subscriptionProduct={frequency != "" && frequency != null ? true : false}
                        price={item.attributes?.catalogue?.data?.attributes?.price}
                        quantity={item.attributes?.quantity}
                        index={index}
                        image={item.attributes?.productImage}
                        onpressRemove={() => this.removeFromCart(item?.id)}
                        onpressIncrease={(res:boolean)=>this.increaseCartQuatity.bind(this)
                          (item?.attributes?.catalogue?.data?.id,this.state.orderId,res,item?.attributes?.catalogue_variant?.data?.id)}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
            <View style={{ paddingTop: 20, }}>
              <MyDetails
                header="MY DETAILS"
                list={[
                  { question: "Name", ans: name },
                  { question: "Email", ans: email },
                  { question: "Phone", ans: phone_number },
                  {
                    question: "Shipping Add.",
                    ans: address,
                  },
                  { question: "Zipcode", ans: zip_code },
                ]}
              />
            </View>
            {this.state.selectedTab == 'delivery' ? <View style={styles.deliverContainer}>

              <Text style={[styles.deliverText, { color: TEXT_COLOR }]}>Deliver in 24hrs </Text>
              <TouchableOpacity style={[styles.deliverPrice,
              { backgroundColor: BUTTON_COLOR_PRIMARY }]}
                onPress={this.state.fastDeliveryApplied ? this.removeFastDelivery.bind(this) : this.addFastDelivery.bind(this)}>
                <Text style={[styles.deliverPriceText,
                { color: BUTTON_TEXT_COLOR_PRIMARY }]}>
                  {this.state.fastDeliveryPice ? "Remove" : "+ $25.00"}</Text>
              </TouchableOpacity>
            </View> : null}
            <View style={{ marginTop: 20 }}>
              <PaymentDetails
                header="PAYMENT DETAILS"
                list={this.state.billingDetails}
                footer={{ question: "Total", ans: this.state.totalPrice }}
                isUserAlreadySubscribed={this.state.isUserHasSubsCription}
                isSubscribed={this.state.isUserSubscriptionRequested ? true : false}
                is24HourDelivery={this.state.fastDeliveryApplied}
              />
            </View>

            {this.state.availablePlans.length ? <>
              <Text style={[styles.meatStorageHeading, { marginTop: 30 }]}>Meat Storage</Text>
              {this.state.availablePlans.map((item) => {
                const isSelected = this.state.currentPlan?.id === item?.id && !(item?.plan_name && item?.plan_name?.toUpperCase() === 'BASIC');
                const isBasic = item?.plan_name && item?.plan_name?.toUpperCase() === 'BASIC';
                return (<View key={item?.id} style={[styles.meatStorageOption,
                { backgroundColor: isSelected ? BUTTON_COLOR_PRIMARY : BUTTON_COLOR_SECONDARY, borderWidth: 1, borderColor: PRIMARY_COLOR }]}>
                  <View style={styles.meatStorageHeader}>
                    <Text style={[styles.meatStorageHeading, { color: isSelected ? BUTTON_TEXT_COLOR_PRIMARY : BUTTON_TEXT_COLOR_SECONDARY }]}>{this.capitalizeFirstLetter(item?.plan_name)}</Text>

                    {isBasic ?
                      <Text style={[styles.meatStoragePrice, { color: TEXT_COLOR }]}>{this.state.currentPlan?.id === item?.id ? 'CURRENT' : ''}</Text>
                      : <Text style={[styles.meatStoragePrice, { color: isSelected ? BUTTON_TEXT_COLOR_PRIMARY : BUTTON_TEXT_COLOR_SECONDARY }]}>{`$${item?.price}`}<Text style={styles.monthText}>{'/Month'}</Text></Text>}
                  </View>
                  
                 
                   <RenderHtml
                      source={{ html: item?.description }}
                      contentWidth={this.state.width}
                    />


                  {!isBasic && <TouchableOpacity style={[styles.addMeatStorageButton,
                  {
                    backgroundColor: isSelected ? BUTTON_COLOR_PRIMARY : BUTTON_COLOR_SECONDARY,
                    borderColor: isSelected ? BUTTON_COLOR_SECONDARY : BUTTON_COLOR_PRIMARY
                  }]}
                    onPress={() => {
                      if (item?.plan_name && !isSelected) {
                        this.applyStoragePlan(item.plan_name);
                      } else {
                        this.applyStoragePlan('Basic');
                      }
                    }}>
                    <Text style={[styles.addMeatStorageButtonText, { color: isSelected ? BUTTON_TEXT_COLOR_PRIMARY : BUTTON_TEXT_COLOR_SECONDARY }]}>
                      {isSelected ? 'Remove' : 'Add Storage'}
                    </Text>
                  </TouchableOpacity>}
                </View>)
              })}

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
                  total: this.state.fastDeliveryApplied ? Number(this.state.totalPrice) + 25 : Number(this.state.totalPrice),
                  shipping: this.state.shipping,
                  discount: this.props.route.params.discount,
                  discountPercentage: this.props.route.params.discountPercentage,
                  storageClass: this.state.currentStorageClass,
                  orderId: this.state.orderId,
                  orderNumber: this.state.orderNumber,
                  deliveryCharge: this.state.deliveryCharge,
                  lifetimeSubscriptionCharge: this.state.isUserHasSubsCription ? true : this.state.isUserSubscriptionRequested ? true : false,
                  email: email,
                  isUserAlreadySubscribed: this.state.isUserHasSubsCription,
                  billingDetails: this.state.billingDetails,
                  is24HourDelivery: this.state.fastDeliveryApplied
                })
              }
              }
              button2Label="Cancel"
              button2_Onpress={handleCancelPress}
              containerStyle={{ paddingTop: 20 }}
            />
          </View>
        </HeaderWithBackArrowTemplate>
        <CommonLoader visible={this.state.showLoader} />
      </SafeAreaView>
    );
  }
}