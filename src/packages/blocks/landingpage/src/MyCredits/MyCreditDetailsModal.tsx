import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  DARK_RED,
  LIGHT_GREY,
  MID_PEACH,
  cow,
  downArrow,
  minus,
  plus,
  upArrow,
  PRIMARY,
  WHITE,
  TEXT_COLOR,
  PRIMARY_COLOR,
  BUTTON_COLOR_PRIMARY,
  BUTTON_COLOR_SECONDARY,
  BUTTON_TEXT_COLOR_PRIMARY,
  BUTTON_TEXT_COLOR_SECONDARY
} from "../assets";
import { BLACK } from "../colors";
import LandingPageController, { Props } from "../LandingPageController";
import TextInput from "../../../../components/src/CustomTextInput";
import { scaledSize } from "../../../../framework/src/Utilities";
import PaymentCustomeAlert from "../../../StripeIntegration/src/PaymentCustomeAlert";
import { StackActions } from "@react-navigation/native";
import CommonLoader from "../../../../components/src/CommonLoader";
export default class MyCreditDetailsModal extends LandingPageController {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
  }

  handleAddressOptionChange = (isUser: any, item: any) => {
    console.log('address====',item.id);
    console.log('address====',item.attributes.address);
    
    if (isUser) {
      this.setState({ userAddressID: item.id,selectedUserAddress:item.attributes.address})
    }
  };
  async componentDidMount() {
    console.log('componentDidMount=========================',this.props.categoryId);
    
    this.getSubcategories('61')

  }
  slotsRender(item: any) {
    return (
      <View
        style={
          this.state.selectedAnimalSlot === item
            ? [
              styles.selectSlots,
              { backgroundColor: BUTTON_COLOR_PRIMARY }
            ]
            : [
              styles.selectSlots,
              { backgroundColor: BUTTON_COLOR_SECONDARY }
            ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            this.handleAnimalSelectSlots(item);
          }}
        >
          <Text
            style={
              this.state.selectedAnimalSlot === item
                ? [styles.slotsTime, { color: BUTTON_TEXT_COLOR_PRIMARY,alignSelf:'center' }]
                : [styles.slotsTime, { color: BUTTON_TEXT_COLOR_SECONDARY,alignSelf:'center' }]
            }
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <>
        <Modal transparent visible={this.props.visible}>
          <View style={styles.blur} />
          <View style={styles.innerContainer}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.mainContainer}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <View style={styles.invImageContainer}>
                    <Image
                      resizeMode="contain"
                      style={styles.invImgStyle}
                      source={cow}
                    />
                  </View>
                  <View style={styles.invDesContainer}>
                    <Text style={styles.invDesText}>Available cuts</Text>
                    <Text style={styles.invTotalText}>{this.props.remainingCuts}</Text>
                  </View>
                </View>
                <Text style={styles.pickHeading}>
                  Pickup / Deliver Remaining Cuts
                </Text>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionLabel}>Choose an option</Text>
                  <View style={styles.optionContainerIn}>
                    <FlatList
                    testID="deliverOption"
                      data={this.state.deliverOption}
                      horizontal
                      renderItem={({ item }: any) => {
                        return (
                          <View
                            style={[
                              styles.clickOptionContainer,
                              { paddingRight: 6 }
                            ]}
                          >
                            <TouchableOpacity
                              style={styles.checkBoxStyle}
                              onPress={() => {
                                this.handleDeliverOptionChange(item.title);
                              }}
                            >
                              {this.state.setDeliverOption === item?.title ? (
                                <View style={styles.checked}></View>
                              ) : (
                                <View style={styles.unChecked}></View>
                              )}
                            </TouchableOpacity>
                            <Text style={[styles.chooseTitle,{color:TEXT_COLOR}]}>{item.title}</Text>
                          </View>
                        );
                      }}
                      keyExtractor={(item: any) => item.id.toString()}
                    />
                  </View>
                </View>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionLabel}>Enter cuts to pick up</Text>
                  <View style={[styles.optionContainerIn]}>
                    <Text style={[styles.chooseTitle,{color:TEXT_COLOR}]}>
                      {this.state.selectedAnimalCuts}
                    </Text>
                    <View style={[styles.cutsDropDown]}>

                      <TouchableOpacity
                      testID="animalCutsDropDown"
                        style={styles.animalCutsDropDown}
                        onPress={() => {
                          console.log('press===============');
                          
                          this.setState({
                            handleAnimalCutsDropDown: !this.state
                              .handleAnimalCutsDropDown
                          });
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={styles.buttonImg}
                          source={
                            !this.state.handleAnimalCutsDropDown
                              ? downArrow
                              : upArrow
                          }
                        />
                      </TouchableOpacity>
                    </View>

                  </View>


                  {this.state.handleAnimalCutsDropDown && (
                    
                    <View style={[styles.optionDropContainer]}>
                      {console.log('List===================')
                      }
                      <FlatList
                      testID="animalCutsOptionsListId"
                        nestedScrollEnabled
                        data={this.state.animalCutsOptionsList}
                        style={{
                          height: 210,
                          backgroundColor: WHITE,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderRadius: 10,
                          marginBottom: 15,

                        }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        renderItem={({ item, index }: any) => {
                          return (

                            <TouchableOpacity
                            testID="handleAnimatCuts"
                              style={styles.selectAnimalCuts}
                              onPress={() => {
                                this.handleAnimalCutsOption(item.title, this.props.remainingCuts, this.state.animalCutsCount);
                              }}
                            >
                              <Text style={[styles.chooseTitle,{color:TEXT_COLOR}]}>{item.title}</Text>
                            </TouchableOpacity>

                          );
                        }}
                        keyExtractor={(item: any, index: any) => index + '' + 1}
                      />
                    </View>
                  )}
                  {/* **********************************************} */}
                  <FlatList
                    data={this.state.animalPortions}
                    renderItem={({ item, index }) => <View style={{ flex: 1, flexDirection: 'row', backgroundColor: LIGHT_GREY, marginTop: scaledSize(6), padding: scaledSize(6), borderRadius: scaledSize(8) }}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.chooseTitle,{color:TEXT_COLOR}]}>
                          {item?.name}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                          style={styles.pmButton}
                          onPress={() => {
                            this.handleIncreaseAnimalCuts(item, index, this.props.remainingCuts, this.state.animalCutsCount);
                          }}
                        >
                          <Image
                            resizeMode="contain"
                            style={styles.buttonImg}
                            source={plus}
                          />
                        </TouchableOpacity>
                        <Text style={styles.cutsNumberTitle}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          style={styles.pmButton}
                          onPress={() => this.handleDecreaseAnimalCuts(item, index, this.props.remainingCuts)}
                        >
                          <Image
                            resizeMode="contain"
                            style={styles.buttonImg}
                            source={minus}
                          />
                        </TouchableOpacity>
                      </View>

                    </View>}
                  />
                  <View style={[styles.optionContainer, { padding: 0 }]}>
                    <Text style={styles.optionLabel}>
                      Enter Nearest Location to Pick Up
                    </Text>
                    <View style={[styles.inputContainerStyle]}>
                      <TextInput
                        textInputStyle={[styles.locationInputStyle, { paddingVertical: 0, bottom: 10 }]}
                        value={this.state.nearestLocation}
                        testID="name_test_id"
                        onchangeText={location => this.setState({ nearestLocation: location })}
                        placeholder="Eg: " label={""} />
                    </View>
                  </View>
                  <View style={styles.addressContinerStyle}>
                    {this.state.setDeliverOption == 'Shipping' || this.state.setDeliverOption == 'Deliver' ? <>
                      <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold',
                       color: TEXT_COLOR }}>CHOOSE FROM SAVED ADDRESS </Text>
                      <FlatList
                      testID="addressFlatList"
                        data={this.state.userAddress}
                        renderItem={({ item }) => <View style={[styles.addressContiner]}>
                          <View
                            style={[styles.clickOptionContainer, { paddingRight: 6 }]}
                          >
                            <TouchableOpacity
                            testID="address_change"
                              style={styles.checkBoxStyle}
                              onPress={() => {
                                this.handleAddressOptionChange(true, item);
                              }}
                            >
                              {this.state.userAddressID == item.id ? (
                                <View style={styles.checked}></View>
                              ) : (
                                <View style={styles.unChecked}></View>
                              )}
                            </TouchableOpacity>
                            <View>
                              <Text style={[styles.chooseTitle,{color:TEXT_COLOR}]}>{item.attributes?.address_type}</Text>
                              <Text style={[styles.chooseTitle,{color:TEXT_COLOR}]}>{item.attributes.address}</Text>
                            </View>
                          </View>
                        </View>}
                      />
                    </> : null}

                    {this.state.setDeliverOption == 'Pickup' ? <View style={styles.slotsContainer}>

                      <Text style={[styles.slotsTitle,{color:TEXT_COLOR}]}>Available Slots </Text>
                      <FlatList
                      testID="avaialbleSlots"
                        data={this.state.animalAvailableSlots}
                        numColumns={3}
                        renderItem={({ item }: any) => this.slotsRender(item)}
                        keyExtractor={(item: any) => item}
                      />
                    </View> : null}
                  </View>
                  <View style={styles.buttomButtonRow}>
                    <TouchableOpacity
                      style={[styles.submitButton,{backgroundColor:BUTTON_COLOR_PRIMARY}]}
                      onPress={() => this.submitPickupRequestHandler(
                        this.state.setDeliverOption,
                        this.state.animalPortions.length,
                        this.state.selectedAnimalSlot,
                        this.state.userAddressID,
                        this.state.animalPortions,
                        this.state.selectedUserAddress
                      )}

                    >
                      <Text style={[styles.submitButtonText,{color:BUTTON_TEXT_COLOR_PRIMARY}]}>
                        Submit Pickup Request
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.cancelButton,{backgroundColor:BUTTON_COLOR_PRIMARY}]}
                      onPress={() => this.props?.setCreditDetailModal()}
                    >
                      <Text style={[styles.cancelButtonText,{color:BUTTON_TEXT_COLOR_PRIMARY}]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <PaymentCustomeAlert
          visible={this.state.isSuccessPopUp}
          onpressContinue={() => {
            this.setState(
              { isSuccessPopUp: false, showMyCreditModal: false })
            this.props.navigation.dispatch(StackActions.replace('MyOrdersScreen'))
          }
          }

          onpressClose={() => {
            this.setState(
              { isSuccessPopUp: false, showMyCreditModal: false })
            this.props.navigation.dispatch(StackActions.replace('MyOrdersScreen'))
          }}
          customeText="Thank you for your order!"
          customeDescription={`Your order number is ${this.state.order_number}`}
          paymentAlerttype="PaymentSuccess"
          isLoading={false}
          testID="p"
        />
        {this.state.isLoading && <CommonLoader visible={this.state.isLoading} />}
      </>
    );
  }
}
const styles = StyleSheet.create({
  blur: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    opacity: 0.8
  },
  contentContainer: { flexGrow: 1 },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    paddingHorizontal: 15,
    marginVertical: 40,
    marginHorizontal: 20,
    marginTop: 110
  },
  mainContainer: {
    padding: 0
  },
  invImageContainer: {
    width: "40%",
    height: 120
  },
  invImgStyle: {
    width: "100%",
    height: "100%"
  },
  invDesContainer: {
    width: "60%",
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center"
  },
  invDesText: {
    color: MID_PEACH,
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "500"
  },
  invTotalText: {
    color: DARK_RED,
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 8
  },
  pickHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: BLACK,
    paddingTop: 25,
    paddingBottom: 20
  },
  optionContainer: {
    paddingVertical: 10
  },
  optionContainerIn: {
    padding: 15,
    backgroundColor: LIGHT_GREY,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  optionLabel: {
    fontSize: 18,
    color: TEXT_COLOR,
    paddingBottom: 10,
    fontWeight: "500"
  },
  clickOptionContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  chooseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY,
    marginLeft: 4
  },
  inputContainerStyle: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 15
  },
  locationInputStyle: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY,
    borderBottomWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 0
  },
  checkBoxStyle: {
    width: 25,
    height: 25,
    backgroundColor: WHITE,
    borderRadius: 20,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  checked: {
    backgroundColor: PRIMARY_COLOR,
    width: 14,
    height: 14,
    borderRadius: 15
  },
  unChecked: {
    backgroundColor: WHITE
  },
  cutsDropDown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  pmButton: {
    width: 30,
    height: 30,
    backgroundColor: WHITE,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonImg: {
    width: 20,
    height: 20,
    tintColor: DARK_RED
  },
  cutsNumberTitle: {
    fontSize: 16,
    color: DARK_RED,
    fontWeight: "700",
    paddingHorizontal: 12
  },
  animalCutsDropDown: {
    marginLeft: 10,
    padding: 4
  },
  optionDropContainer: {
    backgroundColor: LIGHT_GREY,
    paddingVertical: 10,
    marginTop: -10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  selectAnimalCuts: {
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
    padding: 15
  },
  slotsContainer: {
    padding: 15
  },
  slotsTitle: {
    fontSize: 18,
    color: DARK_RED,
    paddingBottom: 8
  },
  selectSlots: {
    paddingVertical: 10,
    paddingHorizontal: 4,
     borderRadius: 6,
     marginLeft:4,
    width:76,
    margin:8

  },
  slotsTime: {
    fontSize: 16,
    fontWeight: "400"
  },
  buttomButtonRow: {
    padding: 10
  },
  submitButton: {
    backgroundColor: PRIMARY,
    borderRadius: 30,
    width: "100%",
    height: 55,
    marginVertical: 8,
    textAlign: "center",
    justifyContent: "center"
  },
  submitButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
  cancelButton: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 30,
    width: "100%",
    height: 55,
    marginVertical: 8,
    textAlign: "center",
    justifyContent: "center",
 
  },
  cancelButtonText: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
  addressContinerStyle: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 10
  },
  addressContiner: {
    backgroundColor: LIGHT_GREY,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderRadius: 10
  }
});
