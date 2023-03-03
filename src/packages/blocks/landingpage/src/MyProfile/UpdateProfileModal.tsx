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
  ActivityIndicator,
  Text,
  KeyboardAvoidingView
} from "react-native";
import LandingPageController from "../LandingPageController";
import TextInput from "../../../../components/src/CustomTextInput";
import Button from "../../../../components/src/CustomButton";
import { close, DARK_RED, profile_pic, edit ,profileSample} from "../assets";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class UpdateProfileModal extends LandingPageController {
  constructor(props:any) {
    super(props);
  }
  showAlert(message:string){
    Alert.alert('Alert',message)
  }

  render() {        
    const onpressContinue = ()=> {   
      // if(this.props.state.profileImage === ''){
      //   this.showAlert('Please select your profile picture ')
      //   return
      // } 
      // else 
      if(this.props.state.name === ''){
        this.showAlert('Name can not be blank')
        return
      }else if (this.props.state.email === ''){
        this.showAlert('Email can not be blank')
        return
      }
      else if (this.props.state.phone_number === ''){
        this.showAlert('please provide your phone number')
        return
      }else if (this.props.state.about_me === ''){
        this.showAlert('please provide information about you')
        return
      }else if (this.props.state.instagram_link === ''){
        this.showAlert('please provide your Instagram link')
        return
      }else if (this.props.state.whatsapp_link === ''){
        this.showAlert('please provide your WhatsApp link')
        return
      }else if (this.props.state.facebook_link === ''){
        this.showAlert('please provide your Facebook link')
        return
      }
      this.props.setState({show_loader:true})  
       AsyncStorage.getItem('userDetails').then((usrDetails:any)=>{
        const data:any = JSON.parse(usrDetails)
        
        var myHeaders = new Headers();
      myHeaders.append(
        "token",
        data?.meta?.token
      );
      var formdata = new FormData();
      // formdata.append('photo', {
      //   uri: this.props.state.profileImage,
      //   type: 'image/jpeg',
      //   name: 'photo1.jpg',
        
      // });
      formdata.append("full_name", this.props.state.name);
      formdata.append("email_address", this.props.state.email);
      formdata.append("about_me", this.props.state.about_me);
      formdata.append("instagram_link", this.props.state.instagram_link.replace(/"/g, ''));
      formdata.append("whatsapp_link", this.props.state.whatsapp_link.replace(/"/g, ''));
      formdata.append("facebook_link", this.props.state.facebook_link.replace(/"/g, ''));
      formdata.append("phone_number", this.props.state.phone_number);
  
      var requestOptions = {
        method:this.props.firstTime ? "POST" :'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      const url = `https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_profile/profiles${this.props.firstTime ? '' :'/'+this?.props?.state?.id}`      
      fetch(
        url,
        requestOptions
      )
        .then((response) => {
          if(response.status == 201){
            Alert.alert('Success','Profile created successfully',[{text:'OK',onPress:()=>{this.goToLandingPage.bind(this)()}}])
          }else if(response.status == 200){
            Alert.alert('Success','Profile updated successfully')
            this.getProfileDetails.bind(this)()
          }
        }
        ).catch(e=>{
          Alert.alert('Error','Something went wrong , please try again later')
        })
        .finally(()=>{
        this.props.setState({show_loader:false})
      });
      })
      
    }
    const opencamera = () => {
      ImagePicker.openCamera({
        cropping: false,
      }).then((image) => {
        this.props.setState({ profileImage: image.path});
      });
    };

    const openGallery = async () => {
      await ImagePicker.openPicker({
        cropping: false,
      }).then((image) => {
        this.props.setState({ profileImage:image.path});
      });
    };
    const onPressEdit = () => {
      Alert.alert("Choose image from", "", [
        {
          text: "camera",
          onPress: opencamera,
        },
        { text: "gallery", onPress: openGallery },
        { text: "cancels", onPress: () => {} },
      ]);
    };
    
    return (
      <Modal visible={this.props.visible} transparent>
        <KeyboardAvoidingView behavior="height" style={styles.main}>
          <View style={styles.blur} />
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              {!this.props.firstTime  && <TouchableOpacity
                onPress={this.props.setVisibleProfileModal}
                style={styles.closeBtn}
              >
                <Image
                  resizeMode="contain"
                  style={styles.close}
                  source={close}
                />
              </TouchableOpacity>}
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
                      source={ profileSample
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
                    value={this.props.state.name}
                    onchangeText={(name) => this.props.setState({ name: name })}
                    label="Enter Full Name"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.props.state.email}
                    onchangeText={(email) => this.props.setState({ email: email })}
                    label="Email Address"
                    keyBoardtype="email-address"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.props.state.phone_number}
                    onchangeText={(num) => this.props.setState({ phone_number: num })}
                    keyBoardtype="number-pad"
                    label="Phone Number"
                  />
                  <TextInput
                    textInputStyle={[styles.textinput, { height: 120 }]}
                    labeStyle={styles.label}
                    multiline={true}
                    numberOfLines={5}
                    value={this.props.state.about_me}
                    onchangeText={(abt) => this.props.setState({ about_me: abt })}
                    label="About Me"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.props.state.instagram_link.replace(/"/g, '')}
                    onchangeText={(instLink) =>
                      this.props.setState({ instagram_link: instLink })
                    }
                    label="Instagram Link"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.props.state.whatsapp_link.replace(/"/g, '')}
                    onchangeText={(wsLink) =>
                      this.props.setState({ whatsapp_link: wsLink })
                    }
                    label="WhatsApp Link"
                  />
                  <TextInput
                    textInputStyle={styles.textinput}
                    labeStyle={styles.label}
                    value={this.props.state.facebook_link.replace(/"/g, '')}
                    onchangeText={(fbLink) =>
                      this.props.setState({ facebook_link: fbLink })
                    }
                    label="Facebook Link"
                  />
                </View>

                <Button
                  style={{ marginTop: 20 }}
                  onPress={onpressContinue}
                    // onpressContinue}
                  label={"Save Details"}
                />
              </ScrollView>
            </View>
          </View>
          {this.props.state.show_loader && <View style={styles.loader}>
            <View>
            <ActivityIndicator size={'large'}/>
            <Text>Loading...</Text>
            </View>
          </View>}
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({

  //@ts-ignore
  loader:{...StyleSheet.absoluteFill,justifyContent:'center',alignItems:'center',zIndex:100},
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
