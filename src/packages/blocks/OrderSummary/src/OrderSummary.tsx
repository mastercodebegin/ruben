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
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MyDetails from "./MyDetails";
import DoubleButton from "../../../components/src/DoubleButton";
import ProductDetailComponent from "../../../components/src/ProductDetailComponent";
import OrderSummaryController from "./OrderSummaryController";
import PaymentDetails from "./PaymentDetails";
import {BLACK, DARK_RED, WHITE} from "../../landingpage/src/colors";
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
export default class OrderSummary extends OrderSummaryController {
  async componentDidMount(){
      this.getAddressList()
      this.getCart()
  }
  render() {
    const {address,phone_number, zip_code,name} = {
      address: this.state.addressList[this.state.selectedAddress]?.attributes?.address || '',
      phone_number:this.state.addressList[this.state.selectedAddress]?.attributes?.phone_number || '',
      zip_code: this.state.addressList[this.state.selectedAddress]?.attributes?.zip_code || '',
      name:this.state.addressList[this.state.selectedAddress]?.attributes?.name
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
          headerText="Summary"
          navigation={this.props.navigation}
          scrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <MileStone
              list={["My Cart", "Personel Details", "Summary", "Payment"]}
              selected="Summary"
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
            <View style={styles.lifetimeSub}>
              <View style={styles.cartImageContainer}>
                <Image resizeMode="contain" style={styles.cartImage} source={require('../assets/cart.png')}/>
              </View>
              <View style={styles.lifetimeSubContent}>
                <Text style={styles.lifetimeSubHeading}>Lifetime Subscription</Text>
                <Text style={styles.lifetimeSubText}>one-time purchase and lasts a lifetime</Text>
                <TouchableOpacity style={styles.lifetimeSubButton}>
                  <Text style={styles.lifetimeSubPrice}>{"$5.00"}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemsContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.addedItemsHeader}>{`ADDED ITEMS (${this.state.productsList.length})`}</Text>
              </View>
              <View style={styles.addedItems}>
                {this.state.productsList.map((item,index) => { 
                  return (
                    <View key={index}>
                      <ProductDetailComponent
                      name={item.attributes?.catalogue?.data?.attributes?.name}
                      price={item.attributes?.catalogue?.data?.attributes?.price}
                      quantity={item.attributes?.quantity}
                      index={index}
                      image={item.attributes?.catalogue?.data?.attributes?.images[0]}
                      onpressRemove={(index:number)=>{
                        const array = [...this.state.productsList]                  
                          array.splice(index, 1);
                          this.setState({productsList:array})
                      }}
                      //onpressIncrease={(res:boolean)=>this.increaseCartQuatity.bind(this)(item?.attributes?.catalogue?.data?.id,this.state.order_id,res)}
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
                  { question: "Email", ans: "test@gmail.com" },
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
              <TouchableOpacity style={styles.deliverPrice}>
                <Text style={styles.deliverPriceText}>{"+ $25.99"}</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}>
              <PaymentDetails
                header="PAYMENT DETAILS"
                list={[
                  { question: "Subtotal", ans: `$${this.state.subtotal.toFixed(2)}`  },
                  { question: "Discount", ans: `- $${this.state.discount.toFixed(2)} (${(this.state.discount / this.state.subtotal * 100).toFixed(2)}%)` },
                  { question: "Shipping Charges", ans: `$${this.state.shipping.toFixed(2)}`  },
                ]}
                footer={{question: "Total", ans: `$${(this.state.subtotal - this.state.discount + this.state.shipping).toFixed(2)}`}}
              />
            </View>
            {this.state.selectedTab === "pickup" ? (
                <>
                  <Text style={[styles.meatStorageHeading, {marginTop: 30}]}>Meat Storage</Text>
                  <View style={styles.meatStorageOption}>
                    <View style={styles.meatStorageHeader}>
                      <Text style={styles.meatStorageHeading}>Basic</Text>
                      <Text style={[styles.meatStoragePrice, {color: 'grey'}]}>CURRENT</Text>
                    </View>
                    <Text style={styles.meatStorageDesc}>Free Access to Explore</Text>
                    <Text style={styles.meatStorageDesc}>1 Meat Store at a time</Text>
                  </View>
                  <View style={[styles.meatStorageOption, {backgroundColor: this.state.currentStorageClass === 'Gold' ? PRIMARY : WHITE}]}>
                    <View style={styles.meatStorageHeader}>
                      <Text style={[styles.meatStorageHeading, {color: this.state.currentStorageClass === 'Gold' ? WHITE : DARK_RED}]}>Gold</Text>
                      <Text style={[styles.meatStoragePrice, {color: this.state.currentStorageClass === 'Gold' ? WHITE : DARK_RED}]}>{"$3.99"}<Text style={styles.monthText}>{'/Month'}</Text></Text>
                    </View>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Gold' ? '#dddddd' : 'grey'}]}>Instant Pickup/Delivery</Text>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Gold' ? '#dddddd' : 'grey'}]}>10 Meat Storage at a time</Text>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Gold' ? '#dddddd' : 'grey'}]}>All Payment Options</Text>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Gold' ? '#dddddd' : 'grey'}]}>All Time Service Available</Text>
                    <TouchableOpacity style={styles.addMeatStorageButton} onPress={() => this.setState({currentStorageClass: this.state.currentStorageClass === 'Gold' ? '' : 'Gold'})}>
                      <Text style={[styles.addMeatStorageButtonText, {color: this.state.currentStorageClass === 'Gold' ? BLACK : PRIMARY}]}>
                        {this.state.currentStorageClass === 'Gold' ? 'Remove' : 'Add Storage'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.meatStorageOption, {backgroundColor: this.state.currentStorageClass === 'Platinum' ? PRIMARY : WHITE}]}>
                    <View style={styles.meatStorageHeader}>
                      <Text style={[styles.meatStorageHeading, {color: this.state.currentStorageClass === 'Platinum' ? WHITE : DARK_RED}]}>Platinum</Text>
                      <Text style={[styles.meatStoragePrice, {color: this.state.currentStorageClass === 'Platinum' ? WHITE : DARK_RED}]}>{"$9.99"}<Text style={styles.monthText}>{'/Month'}</Text></Text>
                    </View>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Platinum' ? '#dddddd' : 'grey'}]}>Instant Pickup/Delivery</Text>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Platinum' ? '#dddddd' : 'grey'}]}>10 Meat Storage at a time</Text>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Platinum' ? '#dddddd' : 'grey'}]}>All Payment Options</Text>
                    <Text style={[styles.meatStorageDesc, {color: this.state.currentStorageClass === 'Platinum' ? '#dddddd' : 'grey'}]}>All Time Service Available</Text>
                    <TouchableOpacity style={styles.addMeatStorageButton} onPress={() => this.setState({currentStorageClass: this.state.currentStorageClass === 'Platinum' ? '' : 'Platinum'})}>
                      <Text style={[styles.addMeatStorageButtonText, {color: this.state.currentStorageClass === 'Platinum' ? BLACK : PRIMARY}]}>
                        {this.state.currentStorageClass === 'Platinum' ? 'Remove' : 'Add Storage'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null
            }
            <DoubleButton
              button1Label="Continue to Payment"
              button1_Onpress={() => this.setState({ show_modal: true })}
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

