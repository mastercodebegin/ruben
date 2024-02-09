import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import MileStone from "../../../components/src/MilestoneComponent";
import MyCartController,{Props} from "./MyCartController";
import ProductDetailComponent from "../../../components/src/ProductDetailComponent";
import Button from "../../../components/src/CustomButton";
import CommonLoader from "../../../components/src/CommonLoader";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { BUTTON_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
export default class MyCart extends MyCartController {
  constructor(props:Props ) {
    super(props);
    this.fetchDiscount = this.fetchDiscount.bind(this);
  }
  async componentDidMount() {
    this.getCart();
  }
  render() {
    const getDiscountPrice = () => {
      if (this.state.discountPrice)
      {
        return this.state.discountPrice.toFixed(2);
      }
      return Math.abs(this.state.discountPercentage).toFixed(2);
    }
    const getDicountPercentage=()=>{
      const percentatge = (Math.abs(this.state.discountPrice ? this.state.discountPrice : this.state.discountPercentage) * 100) / this.state.totalPrice;
       return Math.round(percentatge)
     }
    const getTotal = ()=>{
      return (this.state.totalPrice - getDiscountPrice());
    }
    const getCartCount = ()=>{
      return this.state.productsList.length > 9 ? this.state.productsList.length : `0${this.state.productsList.length}`
    }
    return (
      <SafeAreaView style={styles.main}>
        <HeaderWithBackArrowTemplate
          navigation={this.props.navigation}
          headerText="My Cart"
        >
          <KeyboardAwareFlatList
            data={this.state.productsList}
            bounces={false}
            ListHeaderComponent={() => (
              <View>
                <MileStone
                  list={["My Cart", "Personal Details", "Summary", "Payment"]}
                  selected="My Cart"
                />
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>{`ADDED ITEMS (${getCartCount()})`}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item:any, index:number) => {
              return String(item) + index;
            }}
            ListFooterComponent={
              <View>
              <View style={styles.bottomRadius} />

                <View style={styles.discountContainer}>
                  <View style={styles.shade} />
                  <TextInput
                   placeholder="Enter Discount Code"
                    value={this.state.discountCode}
                     onChangeText={(text:string)=>this.setState({discountCode:text})}
                    style={styles.textInput}
                    placeholderTextColor={TEXT_COLOR}
                    />
                  <TouchableOpacity onPress={() => {
                    this.setState({discountPrice:0})
                    if (this.state.discountCode === "") {
                      alert('Please enter coupon')
                    } else {
                      this.applyDiscountCode.bind(this)(this.state.discountCode);
                    }
                  }}>
                  <Text style={styles.direct}>Fetch Directly</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.paymentContainer}>
                  <Text style={styles.headerText}>PAYMENT DETAILS</Text>
                  <View style={styles.seperator} />
                  <View style={styles.answerContainer}>
                    {this.state.subTotal ? <View style={styles.row}>
                      <Text style={styles.paymentText}>Subtotal</Text>
                      <Text style={styles.answer}>{`$${this.state.subTotal.toFixed(2)}`}</Text>
                    </View> : null }
                   {this.state.discountFetched ? <View style={styles.row}>
                      <Text style={styles.paymentText}>Discount</Text>
                      <Text style={styles.answer}>{`-$${9}`}</Text>
                    </View> : null}
                    {this.state.shippingCharge ? <View style={styles.row}>
                      <Text style={styles.paymentText}>Shipping Charges</Text>
                      <Text style={styles.answer}>{`$${this.state.shippingCharge.toFixed(2)}`}</Text>
                    </View> : null}
                    {
                      this.state.product_discount ? <View style={styles.row}>
                      <Text style={styles.paymentText}>Product Discount</Text>
                      <Text style={styles.answer}>{`-$${this.state.product_discount.toFixed(2)}`}</Text>
                    </View> : null
                    }
                  </View>
                  <View style={styles.seperator} />
                  {this.state.totalPrice ? <View style={[styles.row, { paddingHorizontal: 20 }]}>
                    <Text style={styles.paymentText}>Total</Text>
                    <Text style={styles.answer}>{`$${this.state.totalPrice.toFixed(2)}`}</Text>
                  </View>:null}
                </View>
                <Text style={[styles.termsAndCondition,{color:SECONDARY_TEXT_COLOR}]}>
                  {"* terms & conditions apply "}
                </Text>
                <Button
                  onPress={() => this.props.navigation.navigate('PersonelDetails', {
                    discountPercentage: getDicountPercentage(),
                    discount : this.state.discountFetched ? Number(getDiscountPrice()) : null, 
                    subTotal: this.state.totalPrice, 
                    total: Number(getTotal())
                  })}
                  label="Continue to Personal Details"
                />
                <TouchableOpacity onPress={()=>this.onpressCancel.bind(this)()} style={styles.button}>
                  <Text style={styles.buttonText}>{"Cancel"}</Text>
                </TouchableOpacity>
              </View>
            }
            ListEmptyComponent={()=>(
              <Text style={{fontSize:17,textAlign:'center',backgroundColor:'white'}}>
                {"No items added in the cart"}
                </Text>)}
            renderItem={({item,index}:any) => { 
              const frequency = item.attributes?.frequency;    
              return (
                <ProductDetailComponent
                name={item?.attributes?.catalogue?.data?.attributes?.categoryCode}
                subscriptionProduct={frequency!="" && frequency != null ? true : false}
                price={Number(item.attributes?.catalogue?.data?.attributes?.price).toFixed(2)}
                quantity={item.attributes?.quantity}
                index={index}
                onpressRemove={()=>this.removeFromCart(item.id)}
                image={item.attributes?.catalogue}
                onpressIncrease={(res:boolean)=>this.increaseCartQuatity.bind(this)(item?.attributes?.catalogue?.data?.id,this.state.order_id,res)}
              />
            )}}
          />
        </HeaderWithBackArrowTemplate>
        <CommonLoader visible={this.state.showLoader}/>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  answerContainer: { paddingHorizontal: 20, paddingBottom: 10 },
  termsAndCondition: { color: "grey", fontSize: 17, paddingVertical: 15, fontStyle: "italic" },
  contentContainer: { paddingBottom: 20,paddingHorizontal:20 },
  buttonText: {
    color: BUTTON_TEXT_COLOR_SECONDARY,
    textAlign: "center",
    fontSize: 17,
  },
  button: {
    borderColor: BUTTON_COLOR_PRIMARY,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
  },
  answer: {
    color: TEXT_COLOR,
    fontSize: 17,
    fontWeight: "bold",
  },
  seperator: { height: 1, backgroundColor: PRIMARY_COLOR },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  paymentText: { fontSize: 17, color: TEXT_COLOR },
  paymentContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 20,
  },
  direct: { fontSize: 16, fontWeight: "bold", color: TEXT_COLOR,paddingVertical:25 },
  discount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A0272A",
  },
  shade: {
    backgroundColor: BUTTON_COLOR_PRIMARY,
    opacity: 0.1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  discountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingRight: 25,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderStyle: "dashed",
    overflow: "hidden",
  },
  bottomRadius: {
    height: 20,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontSize: 17,
    color:TEXT_COLOR,
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontWeight: "bold"
  },
  main: { flex: 1 },
  textInput:{flex:1,paddingLeft:25,fontWeight:'bold',fontSize:16,color:'#A0272A'}
});
