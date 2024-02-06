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
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { APP_BACKGROUND, close, DARK_RED, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
import { validName,whiteSpace } from "../../../components/src/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from 'react-native-element-dropdown';

interface S {
  name: string;
  addressType: string;
  flatNo: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  state: string;
  country: string;
  keyboardHeight: number;
  showAddressModal: boolean;
  stateName:string
  value: null,
  isFocus: boolean,

}
interface P {
  visible: boolean;
  setVisible: () => void;
  isLoading: boolean;
  stateList:any
  addAddress: (atrs: any) => void;
}
export default class UpdateProfileModal extends React.Component<P, S> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      address: "",
      addressType: "",
      country: "",
      flatNo: "",
      phoneNumber: "",
      state: "",
      zipCode: "",
      keyboardHeight: 0,
      showAddressModal: false,
      stateName:'',
      value: null,
      isFocus: false,
    };
  }

  showAlert(message:string) {
    Alert.alert("Alert",message);
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
            {
              <TouchableOpacity
                onPress={() => this.props.setVisible()}
                style={styles.closeBtn}
              >
                <Image
                  resizeMode="contain"
                  style={[styles.close,{tintColor:PRIMARY_COLOR}]}
                  source={close}
                />
              </TouchableOpacity>
            }
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                testID="select_image_from_storage_id"
                onPress={() => {}}
                style={{ alignSelf: "center" }}
              />

              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.name}
                onchangeText={(name) => this.setState({ name })}
                label="Name"
              />
              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.addressType}
                onchangeText={(addressType) =>
                  this.setState({ addressType })
                }
                placeholder="eg : Office1"
                label="Address Type"
              />
             

              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.flatNo}
                onchangeText={(flatNo) => this.setState({ flatNo })}
                label="Flat No"
              />
              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.address}
                onchangeText={(address) => this.setState({ address })}
                multiline
                label="Address"
              />
              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.zipCode}
                onchangeText={(zipCode) => this.setState({ zipCode })}
                label="Zip Code"
                keyBoardtype="number-pad"
              />
              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.phoneNumber}
                onchangeText={(phoneNumber) =>
                  this.setState({ phoneNumber })
                }
                keyBoardtype="number-pad"
                label="Phone Number"
                maxLenth={10}
              />
               <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginTop:20}}>

                <Dropdown
          style={[
            styles.dropdown,
            this.state.isFocus && { borderColor: PRIMARY_COLOR },
            { width: 300, height: 50 },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{ bottom: 34 }}
          data={this.props.stateList}
          showsVerticalScrollIndicator={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!this.state.isFocus ? 'Select ' : ''}
          searchPlaceholder="Search..."
          value={this.state.value}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({ isFocus: false })}
          onChange={(item:any) => {
            console.log('item----',item)
            
            this.setState({ value: item.value, isFocus: false,state:item.label });
          }}
        />
 
                 </View>
              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.country}
                onchangeText={(country) => this.setState({ country })}
                label="Country"
              />
            </View>

            <Button
              style={{ marginTop: 20 }}
              testID="save_details_id"
              onPress={() => {
                const {
                  name,
                  address,
                  addressType,
                  state,
                  country,
                  zipCode,
                  flatNo,
                  phoneNumber,
                  stateName
                } = this.state;

                if (whiteSpace(name)) {
                  this.showAlert('The name cannot have leading or trailing white spaces.');
                  return false;
                }
                else if (!validName(name)) {
                  this.showAlert("The name cannot be empty and should not contain any numbers or special characters");
                }
                if (!validName(state)) {
                  this.showAlert('The state name cannot be empty');
                  return false;
                }
                else if  (phoneNumber.length < 10) {
                  this.showAlert('please enter correct phone number')
                  return false;
                }
                
                else if (
                  name &&
                  address &&
                  addressType &&
                  state &&
                  country &&
                  zipCode &&
                  flatNo &&
                  phoneNumber
                ) {
                  this.props.addAddress({
                    name: name,
                    address_type: addressType,
                    flat_no: flatNo,
                    address: address,
                    zip_code: zipCode,
                    phone_number: phoneNumber,
                    state: state,
                    country: country,
                  });
                } else {
                   this.showAlert("Please enter all details");
                }
              }}
              label={"Save Details"}
            />
          </KeyboardAwareScrollView>
          <View style={{ height: this.state.keyboardHeight }} />
        </View>
        {this.props.isLoading && (
          <View style={styles.loader}>
            <View>
              <ActivityIndicator size={"large"} />
              <Text>Loading...</Text>
            </View>
          </View>
        )}
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
  editIcon: { height: 30, width: 35, tintColor: "white" },
  blurr: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
  close: { height: 15, width: 15 },
  profileImage: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: DARK_RED,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    alignSelf: "flex-end",
    backgroundColor: APP_BACKGROUND,
    padding: 10,
    borderWidth:1,
    borderColor:PRIMARY_COLOR,
    borderRadius: 20,
  },
  textInput: {
    color: TEXT_COLOR,
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 15,
    color: TEXT_COLOR,
    paddingVertical: 10,
  },
  contentContainer: { flexGrow: 1 },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginVertical: 40,
    marginHorizontal: 20,
  },
  main: {
    flex: 1,
  },
  blur: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    opacity: 0.8,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  dropdownlabel: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
