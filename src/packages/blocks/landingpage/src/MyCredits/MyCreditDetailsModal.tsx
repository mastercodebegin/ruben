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
  WHITE
} from "../assets";
import { BLACK } from "../colors";
import LandingPageController, { Props } from "../LandingPageController";
import TextInput from "../../../../components/src/CustomTextInput";
import { scaledSize } from "../../../../framework/src/Utilities";
export default class MyCreditDetailsModal extends LandingPageController {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
  }

  handleAddressOptionChange = (isUser:any,id:any) => {
   if(isUser)
   {
    this.setState({userAddressID:id})
   }
  };
  async componentDidMount() {
      console.log('props===================',this.props.remainingCuts);
      
  }

  render() {
    return (
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
                          <Text style={styles.chooseTitle}>{item.title}</Text>
                        </View>
                      );
                    }}
                    keyExtractor={(item: any) => item.id.toString()}
                  />
                </View>
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Enter cuts to pick up</Text>
                <View style={styles.optionContainerIn}>
                  <Text style={styles.chooseTitle}>
                    Eg: {this.state.selectedAnimalCuts}
                  </Text>
                  <View style={styles.cutsDropDown}>

                    <TouchableOpacity
                      style={styles.animalCutsDropDown}
                      onPress={() => {
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
                  <View style={styles.optionDropContainer}>
                    <FlatList
                      data={this.state.animalCutsOptionsList}
                      style={{
                        height: 200,
                        backgroundColor: WHITE,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderRadius: 10,
                        marginBottom: 15
                      }}
                      renderItem={({ item,index }: any) => {
                        return (
                          <TouchableOpacity
                            style={styles.selectAnimalCuts}
                            onPress={() => {
                              this.handleAnimalCutsOption(item.title,this.props.remainingCuts,this.state.animalCutsCount);
                            }}
                          >
                            <Text style={styles.chooseTitle}>{item.title}</Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item: any,index:any) => index+''+1}
                    />
                  </View>
                )}
                {/* **********************************************} */}
                   <FlatList
                data={this.state.animalPortions}
                renderItem={({item,index})=><View style={{ flex: 1, flexDirection: 'row', backgroundColor: LIGHT_GREY, marginTop: scaledSize(6), padding: scaledSize(6), borderRadius: scaledSize(8) }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[styles.chooseTitle,]}>
                    {item?.name}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.pmButton}
                    onPress={() => {
                      this.handleIncreaseAnimalCuts(item,index,this.props.remainingCuts,this.state.animalCutsCount);
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
                    onPress={()=>this.handleDecreaseAnimalCuts(item,index,this.props.remainingCuts)}
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
                <View style={styles.optionContainer}>
                  <Text style={styles.optionLabel}>
                    Enter Nearest Location to Pick Up
                  </Text>
                  <View style={styles.inputContainerStyle}>
                    <TextInput
                      textInputStyle={styles.locationInputStyle}
                      value={this.state.nearestLocation}
                      testID="name_test_id"
                      onchangeText={location => this.setState({ nearestLocation: location })}
                      placeholder="Eg: " label={""} />
                  </View>
                </View>
                <View style={styles.addressContinerStyle}>
                   {this.state.setDeliverOption == 'Deliver' ?<FlatList
                  data={this.state.userAddress}
                  renderItem={({item})=><View style={styles.addressContiner}>
                  <View
                    style={[styles.clickOptionContainer, { paddingRight: 6 }]}
                  >
                    <TouchableOpacity
                      style={styles.checkBoxStyle}
                      onPress={() => {
                        this.handleAddressOptionChange(true,item.id);
                      }}
                    >
                      {this.state.userAddressID==item.id ? (
                        <View style={styles.checked}></View>
                      ) : (
                        <View style={styles.unChecked}></View>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.chooseTitle}>{item.attributes.address}</Text>
                  </View>
                </View>}
                  />:null}
                  
                
                  {this.state.setDeliverOption == 'Pickup' ? <View style={styles.slotsContainer}>


                  <FlatList
                  data={this.state.userAddress}
                  renderItem={({item})=><View style={styles.addressContiner}>
                  <View
                    style={[styles.clickOptionContainer, { paddingRight: 6 }]}
                  >
                    <TouchableOpacity
                      style={styles.checkBoxStyle}
                      onPress={() => {
                        this.handleAddressOptionChange(false,item.id);
                      }}
                    >
                      {this.state.merchantAddressID==item.id ? (
                        <View style={styles.checked}></View>
                      ) : (
                        <View style={styles.unChecked}></View>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.chooseTitle}>{item.attributes.address}</Text>
                  </View>
                </View>}
                  />



                    <Text style={styles.slotsTitle}>Available Slots</Text>
                    <FlatList
                      data={this.state.animalAvailableSlots}
                      numColumns={3}
                      renderItem={({ item }: any) => {
                        return (
                          <View
                            style={
                              this.state.selectedAnimalSlot === item
                                ? [
                                  styles.selectSlots,
                                  { backgroundColor: PRIMARY }
                                ]
                                : [
                                  styles.selectSlots,
                                  { backgroundColor: WHITE }
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
                                    ? [styles.slotsTime, { color: WHITE }]
                                    : [styles.slotsTime, { color: MID_PEACH }]
                                }
                              >
                                {item}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                      keyExtractor={(item: any) => item}
                    />
                  </View> : null}
                </View>
                <View style={styles.buttomButtonRow}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => { }}
                  >
                    <Text style={styles.submitButtonText}>
                      Submit Pickup Request
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => this.props?.setCreditDetailModal()}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
    color: MID_PEACH,
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
    marginLeft:scaledSize(4)
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
    backgroundColor: PRIMARY,
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
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: WHITE,
    borderRadius: 6,
    marginVertical: 6,
    marginHorizontal: 4
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
    borderWidth: 1,
    borderColor: DARK_RED
  },
  cancelButtonText: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
  addressContinerStyle: {
    backgroundColor: "#F9F9F9",
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
