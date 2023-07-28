import React from "react";
import {
  Alert,
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { close, DARK_RED } from "../../landingpage/src/assets";
import { validName } from "../../../components/src/utils";
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
}
interface P {
  visible: boolean;
  setVisible: () => void;
  isLoading: boolean;
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
    };
  }

  async componentDidMount() {
    Keyboard.addListener("keyboardWillShow", (state) => {
      this.setState({ keyboardHeight: state.endCoordinates.height });
    });
    Keyboard.addListener("keyboardWillHide", () => {
      this.setState({ keyboardHeight: 0 });
    });
  }

  showAlert(message:string) {
    Alert.alert("Alert",message);
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent>
        <View style={styles.blur} />
        <KeyboardAvoidingView style={styles.innerContainer}>
          <ScrollView
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
                  style={styles.close}
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
                placeholder="eg : Office"
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
              />
              <TextInput
                textInputStyle={styles.textInput}
                labeStyle={styles.label}
                value={this.state.state}
                onchangeText={(state) => this.setState({ state })}
                label="State"
              />
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
                } = this.state;
                if (!validName(name)) {
                  this.showAlert("The name cannot be empty and should not contain any numbers or special characters");
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
          </ScrollView>
          <View style={{ height: this.state.keyboardHeight }} />
        </KeyboardAvoidingView>
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
    backgroundColor: "#FFE3D4",
    padding: 10,
    borderRadius: 20,
  },
  textInput: {
    color: "#5C2221",
    flex: 1,
    backgroundColor: "#F8F4F4",
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 15,
    color: "#8D7D75",
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
});
