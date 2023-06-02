import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { styles as forgotStyle } from "./ForgotPassword";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import CommonLoader from "../../../components/src/CommonLoader";
export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  resetPassword: string;
  confirmResetPassword:string;
  showLoader:boolean;
}

interface SS {
  id: any;
}

export default class ResetPassword extends  BlockComponent<Props, S, SS>  {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.CountryCodeMessage),
    ];

    this.state = {
      resetPassword: '',
      confirmResetPassword:'',
      showLoader:false
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  getDetailsId: string = "";
  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getDetailsId != null &&
      this.getDetailsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let resetResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        this.setState({showLoader:false})
        Alert.alert("Error", "Something went wrong");
      } else {
            if(resetResponse?.errors){
              Alert.alert('Error',JSON.stringify(resetResponse),[{text:'okay',onPress:()=>this.setState({showLoader:false})
            }])
            }else{
              Alert.alert('Success','Your password resetted successfully',[{text:'OK',onPress:()=>{
                this.setState({showLoader:false})
                this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'AuthenticationStack' }],
              })}}])
            }
      }
    }
  }
  async requestResetMail() {
    this.setState({showLoader:true})
    const headers = {
      "Content-Type": "application/json",
      token:  this.props?.route?.params?.token
    };
    const resetPassword = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getDetailsId = resetPassword.messageId;
    const body = JSON.stringify({
      data: {
        new_password: this.state.resetPassword,
        confirm_password: this.state.confirmResetPassword
     }
     });
     resetPassword.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      body
    );

     resetPassword.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_forgot_password/passwords'
    );

    resetPassword.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    resetPassword.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    runEngine.sendMessage(resetPassword.id, resetPassword);
  }

  render() {
    return (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            <SafeAreaView style={forgotStyle.main}>
              <View style={{ paddingHorizontal: 20 ,paddingTop:25}}>
                <Text style={forgotStyle.header}>Reset Password</Text>
                <Text style={forgotStyle.label}>
                  Enter new password to access your screen
                </Text>
                <TextInput
                  secureTextEntry
                  labeStyle={styles.label}
                  value={this.state.resetPassword}
                  onchangeText={(text) =>
                    this.setState({ resetPassword: text })
                  }
                  label="Password"
                />
                <TextInput
                  secureTextEntry
                  labeStyle={styles.label}
                  value={this.state.confirmResetPassword}
                  onchangeText={(text) =>
                    this.setState({ confirmResetPassword: text })
                  }
                  containerStyle={styles.textinputContainer}
                  label="ReEnter Password"
                />
                <Button
                  label={"Reset Password"}
                  onPress={this.requestResetMail.bind(this)}
                />
              </View>
            <CommonLoader visible={this.state.showLoader}/>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textinputContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  label: { color: "grey" },
});
