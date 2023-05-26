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
import MyCartController from "./MyCartController";
import ProductDetailComponent from "../../../components/src/ProductDetailComponent";
import Button from "../../../components/src/CustomButton";
import CommonLoader from "../../../components/src/CommonLoader";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { store } from "../../../components/src/utils";
export default class MyCart extends MyCartController {
  render() {
    const getTotalPrice=()=>{
      const array = [...store.getState().cartDetails]
      const totalPrice= array.reduce((accumulator, item:any) => {        
        return accumulator +item.attributes?.catalogue?.data?.attributes?.price;
      }, 0);
      return totalPrice;
    }
    const getDiscountPrice=()=>{
     const percentatge =( Math.abs(this.state.discountPercentage) / 100) *getTotalPrice()
      return Math.abs(this.state.discountPercentage);
    }
    const getDicountPercentage=()=>{
      const percentatge =( Math.abs(this.state.discountPercentage) * 100) / getTotalPrice()
       return Math.round(percentatge)
     }
    const getTotal = ()=>{
      return (getTotalPrice() - getDiscountPrice())
    }
    return (
      <SafeAreaView style={styles.main}>
        <HeaderWithBackArrowTemplate
          navigation={this.props.navigation}
          headerText="My Cart"
        >
          <KeyboardAwareFlatList
            data={store.getState().cartDetails}
            bounces={false}
            ListHeaderComponent={() => (
              <View>
                <MileStone
                  list={["My Cart", "Personel Details", "Summary", "Payment"]}
                  selected="My Cart"
                />
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>{`ADDED ITEMS (${this.state.productsList.length})`}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => {
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
                     onChangeText={(text)=>this.setState({discountCode:text})}
                    style={styles.textInput}
                    placeholderTextColor='#A0272A'
                    />
                  <TouchableOpacity onPress={()=>this.getDiscountCode.bind(this)()}>
                  <Text style={styles.direct}>Fetch Directly</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.paymentContainer}>
                  <Text style={styles.headerText}>PAYMENT DETAILS</Text>
                  <View style={styles.seperator} />
                  <View style={styles.answerContainer}>
                    <View style={styles.row}>
                      <Text style={styles.paymentText}>Subtotal</Text>
                      <Text style={styles.answer}>{`$ ${getTotalPrice()}`}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.paymentText}>Discount</Text>
                      <Text style={styles.answer}>{`-$${getDiscountPrice()} (${getDicountPercentage()}%)`}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.paymentText}>Shipping Charges</Text>
                      <Text style={styles.answer}>{"$0.00"}</Text>
                    </View>
                  </View>
                  <View style={styles.seperator} />
                  <View style={[styles.row, { paddingHorizontal: 20 }]}>
                    <Text style={styles.paymentText}>Total</Text>
                    <Text style={styles.answer}>{`$${getTotal()}`}</Text>
                  </View>
                </View>
                <Text style={styles.termsAndCondition}>
                  {"*terms & conditions apply"}
                </Text>
                <Button
                  onPress={() => this.props.navigation.navigate('PersonelDetails')}
                  label="Continue to Personel Details"
                />
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{"Cancel"}</Text>
                </TouchableOpacity>
              </View>
            }
            ListEmptyComponent={()=>(
              <Text style={{fontSize:17,textAlign:'center',backgroundColor:'white'}}>
                {"No items added in the cart"}
                </Text>)}
            renderItem={({item,index}) => { 
              return (
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
                onpressIncrease={()=>this.increaseCartQuatity.bind(this)(item?.attributes?.catalogue?.data?.id,true)}
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
  termsAndCondition: { color: "grey", fontSize: 17, paddingVertical: 15 },
  contentContainer: { paddingBottom: 20,paddingHorizontal:20 },
  buttonText: {
    color: "#A0272A",
    textAlign: "center",
    fontSize: 17,
  },
  button: {
    borderColor: "#A0272A",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
  },
  answer: {
    color: "#A0272A",
    fontSize: 17,
    fontWeight: "bold",
  },
  seperator: { height: 1, backgroundColor: "lightgrey" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  paymentText: { fontSize: 17, color: "grey" },
  paymentContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 20,
  },
  direct: { fontSize: 16, fontWeight: "bold", color: "grey",paddingVertical:25 },
  discount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A0272A",
  },
  shade: {
    backgroundColor: "#A0272A",
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
    borderColor: "#A0272A",
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
    color: "grey",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  main: { flex: 1 },
  textInput:{flex:1,paddingLeft:25,fontWeight:'bold',fontSize:16,color:'#A0272A'}
});
