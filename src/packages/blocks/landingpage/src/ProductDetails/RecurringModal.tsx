import React from "react";
import {
  Alert,
  View,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import Button from "../../../../components/src/CustomButton";
import { close, DARK_RED } from "../../../landingpage/src/assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BLACK, LIGHT_GREY,PRIMARY, WHITE } from "../../assets/constants";
import { Dropdown } from "../../../../components/src/DropDown/src";

interface S {
  quantity: number;
  frequency: string;
}
interface P {
  visible: boolean;
  setVisible: () => void;
  //   addAddress: (atrs: any) => void;
}
export class RecurringModal extends React.Component<P, S> {
  constructor(props: any) {
    super(props);
    this.state = {
      quantity: 0,
      frequency: "Select",
    };
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
              onPress={() => this.props.setVisible()}
              style={styles.closeBtn}
            >
              <Image
                resizeMode="contain"
                style={styles.close}
                source={close}
              />
            </TouchableOpacity>

          <View style={{flexDirection:'row',marginVertical:20,justifyContent:'center'}}>
            <Text style={styles.label}>Quantity</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                disabled={this.state.quantity == 0 ? true : false}
                onPress={() => this.setState({ quantity: this.state.quantity - 1 })}
                style={styles.button}
              >
                <Text style={styles.count}>{"-"}</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{this.state.quantity}</Text>
              <TouchableOpacity
                onPress={() => this.setState({ quantity: this.state.quantity + 1 })}
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
              onPress={() => alert("call")}
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
  close: { height: 15, width: 15 },
  closeBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#FFE3D4",
    padding: 10,
    borderRadius: 20,
  },
  label:{
    flex:0.5,
    fontSize:16,
    color:PRIMARY,
    fontWeight:'bold',
    alignSelf:'center'
  },
  counterContainer: { flexDirection: "row", alignItems: "center" },
  contentContainer: { flexGrow: 1 },
  innerContainer: {
    // flex: 1,
    backgroundColor: "white",
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
    color: DARK_RED
  },
  selectedTextStyle: {
    fontSize: 16,
    color: DARK_RED,
    fontWeight: "700",
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor: DARK_RED,
  },
  containerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: -30,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: DARK_RED,
    paddingVertical: 5,
    marginLeft: 10,

  },
  dropdown: {
    width:'45%',
    height: 50,
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 12,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
    backgroundColor: LIGHT_GREY,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: DARK_RED,
  },
  counter: {
    paddingHorizontal: 10,
    color: DARK_RED,
    fontSize: 17,
  },
});

const FrequencyList = ["Weekly","Bi-Weekly","Monthly"]