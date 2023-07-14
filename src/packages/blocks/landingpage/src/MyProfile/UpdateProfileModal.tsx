import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Keyboard,
  Platform,
} from "react-native";
import LandingPageController from "../LandingPageController";
import TextInput from "../../../../components/src/CustomTextInput";
import Button from "../../../../components/src/CustomButton";
import { close, DARK_RED, edit } from "../assets";
export default class UpdateProfileModal extends LandingPageController {
  constructor(props: any) {
    super(props);
    this.receive = this.receive.bind(this);
  }

  async componentDidMount() {
    Keyboard.addListener("keyboardWillShow", (state) => {
      this.props.setState({ keyboardHeight: state.endCoordinates.height });
    });
    Keyboard.addListener("keyboardWillHide", () => {
      this.props.setState({ keyboardHeight: 0 });
    });
  }

  render() {
    const imageCallback = (res: any) => {
      this.props.setState({
        profileImage: {
          ...res,
          path: Platform.OS === "ios" ? `file://${res.path}` : res.path,
        },
      });
    };
    const handleImageError = (err: any) => {
      console.log(err);
      alert(err);
    };

    return (
      <Modal visible={this.props.visible} transparent>
        <View style={styles.blur} />
        <View style={styles.innerContainer}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            {!this.props.firstTime && (
              <TouchableOpacity
                onPress={this.props.setVisibleProfileModal}
                style={styles.closeBtn}
              >
                <Image
                  resizeMode="contain"
                  style={styles.close}
                  source={close}
                />
              </TouchableOpacity>
            )}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                testID="select_image_from_storage_id"
                onPress={() =>
                  this.selectImage(imageCallback, handleImageError)
                }
                style={{ alignSelf: "center" }}
              >
                <View style={styles.profileImage}>
                  <Image
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                    }}
                    source={{
                      uri: this.props.state.profileImage?.path
                        ? this.props.state.profileImage?.path
                        : this.props.state.profileImage,
                    }}
                  />
                  <View style={styles.blurr} />
                  <Image
                    resizeMode="contain"
                    style={styles.editIcon}
                    source={edit}
                  />
                </View>
              </TouchableOpacity>

              <TextInput
                textInputStyle={styles.textinput}
                labeStyle={styles.label}
                value={this.props.state.name}
                testID="name_test_id"
                onchangeText={(name) => this.props.setState({ name: name })}
                label="Enter Full Name"
              />
              <TextInput
                textInputStyle={styles.textinput}
                labeStyle={styles.label}
                value={this.props.state.email}
                testID="email_test_id"
                onchangeText={(email) => this.props.setState({ email: email })}
                label="Email Address"
                keyBoardtype="email-address"
              />
              <TextInput
                textInputStyle={styles.textinput}
                labeStyle={styles.label}
                value={this.props.state.phone_number}
                testID="phone_number_test_id"
                onchangeText={(num) =>
                  this.props.setState({ phone_number: num })
                }
                keyBoardtype="phone-pad"
                label="Phone Number"
              />
              <TextInput
                textInputStyle={[styles.textinput, { height: 120 }]}
                labeStyle={styles.label}
                multiline={true}
                testID="about_me_test_id"
                numberOfLines={5}
                value={this.props.state.about_me}
                onchangeText={(abt) => this.props.setState({ about_me: abt })}
                label="About Me"
              />
              <TextInput
                textInputStyle={styles.textinput}
                labeStyle={styles.label}
                keyBoardtype="url"
                value={this.props.state.instagram_link.replace(/"/g, "")}
                testID="instagram_test_id"
                onchangeText={(instLink) =>
                  this.props.setState({ instagram_link: instLink })
                }
                label="Instagram Link"
              />
              <TextInput
                textInputStyle={styles.textinput}
                labeStyle={styles.label}
                keyBoardtype="url"
                testID="whatsapp_test_id"
                value={this.props.state.whatsapp_link.replace(/"/g, "")}
                onchangeText={(wsLink) =>
                  this.props.setState({ whatsapp_link: wsLink })
                }
                label="WhatsApp Link"
              />
              <TextInput
                textInputStyle={styles.textinput}
                labeStyle={styles.label}
                keyBoardtype="url"
                testID="facebook_test_id"
                value={this.props.state.facebook_link.replace(/"/g, "")}
                onchangeText={(fbLink) =>
                  this.props.setState({ facebook_link: fbLink })
                }
                label="Facebook Link"
              />
            </View>

            <Button
              style={{ marginTop: 20 }}
              testID="save_details_id"
              onPress={() => this.updateProfileDetails(this.props.firstTime)}
              label={"Save Details"}
            />
            <View style={{ height: this.props.state.keyboardHeight }} />
          </ScrollView>
        </View>
        {this.props.state.show_loader && (
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
  textinput: {
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
