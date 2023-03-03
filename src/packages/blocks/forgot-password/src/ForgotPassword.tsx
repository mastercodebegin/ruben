import React from "react";

//Customizable Area Start
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { backArrow } from "./assets";
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            this.isPlatformWeb() ? styles.containerWeb : styles.containerMobile
          }
        >
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            {/* Customizable Area Start */}
            <SafeAreaView style={styles.main}>
              <View style={{paddingHorizontal:20}}>
              <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backContainer}>
              <Image style={styles.back} source={backArrow}/> 
        </TouchableOpacity>
              <Text style={styles.header}>Confirm E-Mail to get the link</Text>
              <Text style={styles.label}>Enter your E-Mail ID to get the link</Text>
              <TextInput 
              containerStyle={{paddingBottom:40}} 
              onchangeText={text=>this.setState({email:text})}
              value={this.state.email}
              labeStyle={{color:'grey'}}
              label="Enter your Email ID"/>
              <Button label={'Send Link to Reset'} onPress={()=>navigation.navigate('ResetPassword')}/>
              </View>
            </SafeAreaView>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// Customizable Area Start
export const styles = StyleSheet.create({
  backContainer:{
    padding:5,
    alignSelf:'flex-start',
    marginTop:20,
    marginBottom:20
  },
  back:{
    height:20,
    width:20
  },
  label:{
    fontSize:17,
    paddingTop:10,
    color:'grey',
    paddingBottom:30
  },
  header:{
    fontWeight:'bold',
    fontSize:22,
    color:'#5C2221'
  },
  main:{
    flex:1,
    backgroundColor:'#F8F4F4',
  paddingTop:20,},
  containerMobile: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650
  },
  countryCodeSelector: {
    flex: 3,
    marginTop: 20,
    textAlign: "left",
    textAlignVertical: "center"
  },
  button: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    zIndex: -1
  },
});
