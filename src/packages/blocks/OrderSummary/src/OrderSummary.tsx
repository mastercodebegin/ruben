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
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./MyDetails";
import DoubleButton from "../../../components/src/DoubleButton";
import ProductDetailComponent from "../../../components/src/ProductDetailComponent";
import OrderSummaryController from "./OrderSummaryController";
import PaymentDetails from "./PaymentDetails";
import {BLACK, DARK_RED, WHITE} from "../../landingpage/src/colors";
import CommonLoader from "../../../components/src/CommonLoader";
const deliveryIcon = require("../../../components/src/deliveryIcon.png");
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
      this.getCart()
  }
  render() {
    const {address,phone_number, zip_code,name,email} = {
      address: this.props.route.params?.address || '',
      phone_number:this.props.route.params?.phone_number || '',
      zip_code: this.props.route.params?.zip_code || '',
      name: this.props.route.params?.name || '',
      email:this.props.route.params?.email || '',
    }    
    const handleCancelPress = () => {
      const handleOkPress = () => this.props.navigation.goBack();
      Alert.alert("Alert", "Are you sure to cancel", [
        { text: "OK", onPress: handleOkPress },
        { text: "CANCEL" },
      ]);
    };
    const subScriptionCharges = {Basic:0, Gold : 3.99, Platinum : 9.99};
    const lifetimeSubscriptionCharge = this.state.subscriptionCharge;
    const total =  this.state.subtotal - this.props.route.params.discount + this.state.shipping + lifetimeSubscriptionCharge + this.state.deliveryCharge; 
    const paymentDetailsList = [
      { question: "Subtotal", ans: `$${this.state.subtotal.toFixed(2)}` },
      { question: "Delivery Charges", ans: `$${new Number(this.state.deliveryCharge).toFixed(2)}`}
    ]
    if(this.props.route.params.discount) paymentDetailsList.splice(1,0,{ question: "Discount", ans: `- $${this.props.route.params.discount.toFixed(2)} (${this.props.route.params.discountPercentage.toFixed(2)}%)` });
    if(this.state.currentStorageClass !== "Basic") paymentDetailsList.push({ question: "Meat Storage Plan", ans: `$${lifetimeSubscriptionCharge}`  });
    paymentDetailsList.push({ question: "Shipping Charges", ans: `$${this.state.shipping.toFixed(2)}` });
    if (this.state.lifetimeSubscription) {
      paymentDetailsList.push({ question: "Lifetime Subscription", ans: `$${this.state.lifetimeSubscriptionPrice.toFixed(2)}` });
    }    

    return (
      <SafeAreaView style={styles.safearea}>
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
                text="Pickup"
                image={pickupIcon}
              />
            </View>
              {!this.state.lifetimeSubscription &&
            <View style={styles.lifetimeSub}>
              <View style={styles.cartImageContainer}>
                <Image resizeMode="contain" style={styles.cartImage} source={require('../assets/cart.png')}/>
              </View>
              <View style={styles.lifetimeSubContent}>
                <Text style={styles.lifetimeSubHeading}>Lifetime Subscription</Text>
                <Text style={styles.lifetimeSubText}>one-time purchase and lasts a lifetime</Text>
                <TouchableOpacity style={styles.lifetimeSubButton} onPress={this.lifetimeSubClicked}>
                  <Text style={styles.lifetimeSubPrice}>{"$5.00"}</Text>
                </TouchableOpacity>
              </View>
            </View>}
            <View style={styles.itemsContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.addedItemsHeader}>{`ADDED ITEMS (${this.state.productsList.length})`}</Text>
              </View>
              <View style={styles.addedItems}>
                {this.state.productsList.map((item,index) => { 
                  return (
                    <View key={index}>
                      <ProductDetailComponent
                      name={item.attributes?.catalogue?.data?.attributes?.categoryCode}
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
            {!this.state.deliverWithinADay &&
              <View style={styles.deliverContainer}>
                <Text style={styles.deliverText}>Deliver in 24hrs</Text>
                <TouchableOpacity style={styles.deliverPrice} onPress={this.deliverWithinADayClicked}>
                  <Text style={styles.deliverPriceText}>{"+ $25.99"}</Text>
                </TouchableOpacity>
              </View>
            }
            <View style={{marginTop: 20}}>
              <PaymentDetails
                header="PAYMENT DETAILS"
                list={paymentDetailsList}
                footer={{question: "Total", ans: `$${total.toFixed(2)}`}}
              />
            </View>
             
                <>
                  <Text style={[styles.meatStorageHeading, {marginTop: 30}]}>Meat Storage</Text>
                  {this.state.currentPlan ?<View style={styles.meatStorageOption}>
                    <View style={styles.meatStorageHeader}>
                  <Text style={styles.meatStorageHeading}>{this.capitalizeFirstLetter(this.state.currentPlan?.plan_name)}</Text>
                      <Text style={[styles.meatStoragePrice, {color: 'grey'}]}>CURRENT</Text>
                    </View>
                <Text style={styles.meatStorageDesc}>{this.state.currentPlan?.description}</Text>
              </View> : null}
              
                  {this.state.availablePlans.map((item)=>(<View key={item?.id} style={[styles.meatStorageOption, {backgroundColor:this.state.selectedPlan ===item?.id ? PRIMARY : WHITE}]}>
                    <View style={styles.meatStorageHeader}>
                      <Text style={[styles.meatStorageHeading, { color: this.state.selectedPlan ===item?.id ? WHITE : DARK_RED }]}>{this.capitalizeFirstLetter(item?.plan_name)}</Text>
                      <Text style={[styles.meatStoragePrice, {color: this.state.selectedPlan ===item?.id? WHITE : DARK_RED}]}>{`$${item?.price}`}<Text style={styles.monthText}>{'/Month'}</Text></Text>
                    </View>
                    <Text style={[styles.meatStorageDesc, { color: this.state.selectedPlan ===item?.id ? '#dddddd' : 'grey' }]}>{ item?.description }</Text>
                    <TouchableOpacity style={styles.addMeatStorageButton} onPress={() => this.setState({selectedPlan:item?.id,subscriptionCharge:item?.price})}>
                      <Text style={[styles.addMeatStorageButtonText, {color:this.state.selectedPlan ===item?.id ? BLACK : PRIMARY}]}>
                        {this.state.selectedPlan ===item?.id ? 'Remove' : 'Add Storage'}
                      </Text>
                    </TouchableOpacity>
                  </View>))}
                  
                </>
              
            <DoubleButton
              button1Label={this.state.currentStorageClass !== "Basic" ? `Continue with ${this.state.currentStorageClass}` : "Continue to Payment"}
              button1_Onpress={() => {
                this.props.navigation.navigate('StripeIntegration', {
                  name,
                  address,
                  phone_number,
                  zip_code,
                  subtotal: this.state.subtotal,
                  total: Number(total),
                  shipping: this.state.shipping,
                  discount: this.props.route.params.discount,
                  discountPercentage : this.props.route.params.discountPercentage,
                  storageClass: this.state.currentStorageClass,
                  orderId: this.state.orderId,
                  orderNumber: this.state.orderNumber,
                  deliveryCharge: this.state.deliveryCharge,
                  lifetimeSubscriptionCharge: lifetimeSubscriptionCharge,
                  email:email
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

