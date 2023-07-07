import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
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
import { backArrow } from "./assets";
export const configJSON = require("./config");
const emailReg = new RegExp(configJSON?.emailregex);

export interface Props {
    navigation:any;
}

interface S {
  email:string;
  showLoader:boolean;

}

interface SS {
  id: any;
}

export default class ResetComponent extends  BlockComponent<Props, S, SS>  {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.CountryCodeMessage),
    ];

    this.state = {
      email: '',
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
        Alert.alert("Error", "Something went wrong",[{text:'OK',onPress:()=>this.setState({showLoader:false})}]);
      } else {
            if(resetResponse.success){
              Alert.alert('Success','Check Your Email For Reset Password Link!',[{text:'OK',onPress:()=>this.setState({showLoader:false})}])
            }
      }
    }
  }
  async requestResetMail() {    
    this.setState({showLoader:true})
    const headers = {
      "Content-Type": "application/json",
    };
    const resetPassword = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getDetailsId = resetPassword.messageId;
    const body = JSON.stringify({
        data: {
            attributes: {
                email: this.state.email
            }
        }
    });
     resetPassword.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      body
    );

     resetPassword.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_forgot_password/otps'
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
        <SafeAreaView style={styles.main}>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backContainer}
          >
            <Image style={styles.back} source={backArrow} />
          </TouchableOpacity>
          <Text style={styles.header}>
            Confirm E-Mail to Get the Link
          </Text>
          <Text style={styles.label}>
            Enter your E-Mail ID to get the link
          </Text>
          <TextInput
            containerStyle={{ paddingBottom: 40 }}
            onchangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            labeStyle={{ color: "grey" }}
            placeholder="Email ID"
            label="Enter Your Email ID"
          />
          <Button
            label={"Send Link to Reset"}
            onPress={
                ()=>{
                    if( !(emailReg.test(this.state.email))){
                        Alert.alert("Alert", "Please enter valid email");
                        return
                      }
                      this.requestResetMail.bind(this)()
                }
            }
          />
        </View>
        <CommonLoader visible={this.state.showLoader}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    backContainer: {
        padding: 5,
        alignSelf: "flex-start",
        marginTop: 20,
        marginBottom: 20,
      },
      back: {
        height: 20,
        width: 20,
      },
      label: {
        fontSize: 17,
        paddingTop: 10,
        color: "grey",
        paddingBottom: 30,
      },
      header: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#5C2221",
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
        backgroundColor: "#F8F4F4",
      },
      containerWeb: {
        padding: 16,
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 650,
      },
      countryCodeSelector: {
        flex: 3,
        marginTop: 20,
        textAlign: "left",
        textAlignVertical: "center",
      },
      button: {
        marginTop: 16,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        zIndex: -1,
      },
});
