import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Button from "../../../../components/src/CustomButton";
import { BUTTON_COLOR_PRIMARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, close, DARK_RED, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../../landingpage/src/assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BLACK, LIGHT_GREY,PRIMARY, WHITE } from "../../assets/constants";
import { Dropdown } from "../../../../components/src/DropDown/src";
import { COLORS } from "../../../../framework/src/Globals";

interface S {
  quantity: number;
  frequency: string;
}
interface P {
  visible: boolean;
  setVisible: () => void;
  quantity:number
  maxQuantity:number
  onPressIncreamentQuantity:()=>void
  onPressDecreaseQuantity:()=>void
  recurringOrder: (quantity:number, frequency:string) => void;
}
export class RecurringModal extends React.Component<P, S> {
  constructor(props: any) {
    super(props);
    this.state = {
      quantity: 0,
      frequency: "Select",
    };
  }

  componentDidMount(): void {
    console.log('quantity==========',this.props.quantity);
    
  }
  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void {
    console.log('update quantity==========',this.props.quantity);

  }
  AddSubscription=()=>{
    if(this.props.quantity == 0 || this.state.frequency == "Select"){
      Alert.alert("Error","Please Select Quantity and Frequency",[{text:"OK"}])
      return;
    }
    this.props.recurringOrder(this.state.quantity,this.state.frequency)
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent>
        <View style={styles.blur} />
        <View style={styles.innerContainer}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >

            <TouchableOpacity
              testID="closebtn"
              onPress={() => this.props.setVisible()}
              style={styles.closeBtn}
            >
              <Image
                resizeMode="contain"
                style={styles.close}
                source={close}
              />
            </TouchableOpacity>

            <Text style={[styles.label,{fontSize:21, marginTop:5}]}>Recurring Order</Text>
            <Text style={styles.desc}>You may set up a recurring order by selecting the</Text>

          <View style={{flexDirection:'row',marginVertical:20,justifyContent:'center'}}>
            <Text style={styles.label}>Quantity</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                testID="minusbtn"
                disabled={this.props.quantity == 0 ? true : false}
                onPress={this.props.onPressDecreaseQuantity}
                style={styles.button}
              >
                <Text style={styles.count}>{"-"}</Text>
              </TouchableOpacity>
              <Text style={[styles.counter,{color:TEXT_COLOR}]}>{this.props.quantity}</Text>
              <TouchableOpacity
                testID="plusbtn"
                onPress={this.props.onPressIncreamentQuantity}
                style={styles.button}
              >
                <Text style={styles.count}>{"+"}</Text>
              </TouchableOpacity>
            </View>
            </View>

            <View style={{flexDirection:'row',marginVertical:20,justifyContent:'center'}}>
            <Text style={styles.label}>Frequency</Text>

            <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  containerStyle={styles.containerStyle}
                  data={FrequencyList}
                  maxHeight={400}
                  placeholder={this.state.frequency}
                  onChange={(e)=>this.setState({frequency:e})
                  }
                    renderItem={(item: any) => {
                      return (
                        <View>
                          <Text style={styles.textItem}>{item}</Text>
                        </View>
                      )
                    }}
                    value={this.state.frequency}
                  />
            </View>

            <Button
              style={{ marginTop: 20 }}
              testID="add_subscription"
              onPress={()=>this.AddSubscription()}
              label={"Add Subscription"}
            />
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  loader: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  close: { height: 15, width: 15,tintColor:PRIMARY_COLOR },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 20,
    borderWidth:1,
    borderColor:PRIMARY_COLOR
  },
  label:{
    flex:0.5,
    fontSize:15,
    color:TEXT_COLOR,
    fontWeight:'bold',
    alignSelf:'center'
  },
  desc:{
    width:'80%',
    fontSize:14,
    marginVertical:8,
    color:SECONDARY_TEXT_COLOR,
    alignSelf:'center',
    textAlign:'center'
  },
  counterContainer: { flexDirection: "row", alignItems: "center" },
  contentContainer: { flexGrow: 1 },
  innerContainer: {
    backgroundColor: WHITE,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginVertical: 40,
    marginHorizontal: 20
  },
  dropdownContainer: {
    backgroundColor: WHITE,
    borderRadius: 10,
    marginBottom: 0
  },
  placeholderStyle: {
    fontSize: 16,
    color: TEXT_COLOR
  },
  selectedTextStyle: {
    fontSize: 16, 
    color: TEXT_COLOR,
    fontWeight: "700",
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor: BUTTON_TEXT_COLOR_SECONDARY,
  },
  containerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: -30,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: TEXT_COLOR,
    paddingVertical: 5,
    marginLeft: 10,

  },
  dropdown: {
    width:'45%',
    height: 50,
    borderWidth:1,
    borderColor: BUTTON_COLOR_PRIMARY,
    borderRadius: 10,
    padding: 12,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemListStyle: {
    padding: 8,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: WHITE,
  },
  blur: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    opacity: 0.8,
  },
  button: {
    height: 25,
    width: 25,
    backgroundColor: BUTTON_COLOR_PRIMARY,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: BUTTON_TEXT_COLOR_PRIMARY,
    fontWeight:'bold'
  },
  counter: {
    paddingHorizontal: 10,
    color: DARK_RED,
    fontSize: 17,
  },
});

const FrequencyList = ["Weekly","Bi-Weekly","Monthly"]