import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import LandingPageController from "../LandingPageController";
import TextInput from "../../../../components/src/CustomTextInput";
import Button from "../../../../components/src/CustomButton";
import { close, DARK_RED, profile_pic, edit } from "../assets";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class UpdateProfileModal extends LandingPageController {
  onpressContinue() {
     AsyncStorage.getItem('userDetails').then((usrDetails)=>{
      const data:any = JSON.parse(usrDetails)
      var myHeaders = new Headers();
    myHeaders.append(
      "token",
      data?.meta?.token
    );
    var formdata = new FormData();
    formdata.append("photo", this.state.profileImage, "user-square.png");
    formdata.append("full_name", this.state.name);
    formdata.append("email_address", this.state.email);
    formdata.append("about_me", this.state.about_me);
    formdata.append("instagram_link", this.state.instagram_link);
    formdata.append("whatsapp_link", this.state.whatsapp_link);
    formdata.append("facebook_link", this.state.facebook_link);
    formdata.append("phone_number", this.state.phone_number);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_profile/profiles",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {console.log(result)
      alert('success')})
      .catch((error) => {console.log("error", error)
    alert('error')
    });
    })
    
  }
  render() {
    const opencamera = () => {
      console.log("called");

      ImagePicker.openCamera({
        cropping: false,
      }).then((image) => {
        this.setState({ profileImage: image.path });
      });
    };

    const openGallery = async () => {
      await ImagePicker.openPicker({
        cropping: false,
      }).then((image) => {
        console.log(image);
        this.setState({ profileImage: image.path });
      });
    };
    const onPressEdit = () => {
      Alert.alert("Choose image from", "", [
        {
          text: "camera",
          onPress: opencamera,
        },
        { text: "gallery", onPress: openGallery },
        { text: "cancell", onPress: () => {} },
      ]);
    };
    return (
      <Modal visible={this.props.visible} transparent>
        <View style={styles.main}>
          <View style={styles.blur} />
          <View style={styles.container}>
            <View style={styles.innerContainer}>
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={onPressEdit}
                    style={{ alignSelf: "center" }}
                  >
                    <ImageBackground
                      style={styles.profileImage}
                      source={
                        this.state.profileImage
                          ? { uri: this.state.profileImage }
                          : profile_pic
                      }
                    >
                      <View style={styles.blurr} />
                      <Image
                        resizeMode="contain"
                        style={styles.editIcon}
                        source={edit}
                      />
                    </ImageBackground>
                  </TouchableOpacity>

                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.state.name}
                    onchangeText={(name) => this.setState({ name: name })}
                    label="Enter Full Name"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.state.email}
                    onchangeText={(email) => this.setState({ email: email })}
                    label="Email Address"
                    keyBoardtype="email-address"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.state.phone_number}
                    onchangeText={(num) => this.setState({ phone_number: num })}
                    keyBoardtype="number-pad"
                    label="Phone Number"
                  />
                  <TextInput
                    textInputStyle={[styles.textinput, { height: 120 }]}
                    labeStyle={styles.label}
                    multiline={true}
                    numberOfLines={5}
                    value={this.state.about_me}
                    onchangeText={(abt) => this.setState({ about_me: abt })}
                    label="About Me"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.state.instagram_link}
                    onchangeText={(instLink) =>
                      this.setState({ instagram_link: instLink })
                    }
                    label="Instagram Link"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.state.whatsapp_link}
                    onchangeText={(wsLink) =>
                      this.setState({ whatsapp_link: wsLink })
                    }
                    label="WhatsApp Link"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.state.facebook_link}
                    onchangeText={(fbLink) =>
                      this.setState({ facebook_link: fbLink })
                    }
                    label="Facebook Link"
                  />
                </View>

                <Button
                  style={{ marginTop: 20 }}
                  onPress={this.onpressContinue}
                  label={"Save Details"}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
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
  container: { flex: 1, paddingVertical: 40, paddingHorizontal: 20 },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
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
