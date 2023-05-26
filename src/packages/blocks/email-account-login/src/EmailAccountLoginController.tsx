import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { Alert, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../../components/src/utils";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  animatedValue: any;
  selectedTab: boolean;
  showModal: boolean;
  showMerModal: boolean;
  signupEmail: string;
  signupPassword: string;
  showLoader: boolean;
  coupon_code: string;
  mEmail: string;
  mPassword: string;
  farmName: string;
  product: string;
  location: string;
  contact: string;
  description: string;
  website: string;
  social: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  apiEmailSignupCallId: string = "";
  apiMerchantEmailSignupCallId: string = "";
  emailReg: any;
  labelTitle: string = "";
  passwordReg: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      animatedValue: new Animated.Value(0),
      selectedTab: true,
      showModal: false,
      showMerModal: false,
      signupEmail: "",
      signupPassword: "",
      showLoader: false,
      coupon_code: "",
      mEmail: '',
      mPassword: '',
      farmName: '',
      product: '',
      location: '',
      contact: '',
      description: '',
      website: '',
      social: '',
    };

    this.emailReg = new RegExp(configJSON.emailReg);
    this.passwordReg = null;
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  btnSocialLoginProps = {
    onPress: () => this.goToSocialLogin(),
  };

  btnEmailLogInProps = {
    onPress: () => this.doEmailLogIn(),
  };
  resetStack = (screen: string,params={}) => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: screen , params}],
    });
  };
  btnSignupPress = {
    onpress: () => this.doEmailSignup(),
    resetStack: this.resetStack,
    merchantSignup: this.doMerchantSignup,
  };

  showAppAlert(title:string,message: string) {
    Alert.alert(title, message)
  }

  doEmailSignup(): boolean {
    if(!this.emailReg?.test(this.state.signupEmail)){
      Alert.alert(
        "Invalid Email",
        "Please enter valid Email"
      );
      return false;
    }
    if (!this.passwordReg?.test(this.state.signupPassword)) {
      Alert.alert(
        "Invalid password",
        "Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 15 characters in length."
      );
      return false;
    }
    this.setState({ showLoader: true })
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.signupEmail,
      password: this.state.signupPassword,
      activated: true,
      user_type:"customer"
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailSignupCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.signupAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  doMerchantSignup() {
    if (this.state.mEmail === '') {
      this.showAppAlert('Error','Email can not be blank')
      return
    }
    if (this.state.mPassword === '') {
      this.showAppAlert('Error','password can not be blank')
      return
    }
    if (this.state.farmName === '') {
      this.showAppAlert('Error','please provide your Farm Name')
      return
    } 
    if (this.state.product === '') {
      this.showAppAlert('Error','please provide your product Name')
      return
    } 
    if (this.state.location === '') {
      this.showAppAlert('Error','please provide your location')
      return
    } 
    if (this.state.contact === '') {
      this.showAppAlert('Error','please provide your contact')
      return
    } 
    if (this.state.description === '') {
      this.showAppAlert('Error','please fill your Description')
      return
    } 
    if (this.state.website === '') {
      this.showAppAlert('Error','please provide your website link')
      return
    } 
    if (this.state.social === '') {
      this.showAppAlert('Error','please provide your social Media')
      return
    } 
      this.setState({ showLoader: true })
      const header = {
        "Content-Type": configJSON.loginApiContentType,
      };

      const attrs = {
        email: this.state.mEmail,
        password: this.state.mPassword,
        farm_name: this.state.farmName,
        farm_description: this.state.description,
        farm_location: this.state.location,
        farm_website: this.state.website,
        contact_information: this.state.contact,
        farm_socialmedia: this.state.social,
        farm_products: this.state.product,
        activated: "true",
        user_type: "merchant"
      };
      const data = {
        type: "email_account",
        user_type: "merchant",
        attributes: attrs,
      };

      const httpBody = {
        data: data,
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.apiMerchantEmailSignupCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.signupAPiEndPoint
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.loginAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);

      return true;
    
  }

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  // Web Event Handling
  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };

  setEmail = (text: string) => {
    this.setState({
      email: text,
    });
  };

  setPassword = (text: string) => {
    this.setState({
      password: text,
    });
  };

  setRememberMe = (value: boolean) => {
    this.setState({ checkedRememberMe: value });
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword(),
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible,
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

    loginCallBack(signupResponse:any,error:any=false){
      if(error){
        Alert.alert('Alert','Some thing went wrong please try again.',[{text:'OK',onPress:()=>this.setState({showLoader:false})}])
        return
      }
      if (signupResponse?.meta?.token) {        
        if(signupResponse?.meta?.user_type === 'merchant'){
          store.dispatch({type:'UPDATE_USER',payload:'merchant'})
        }else if(signupResponse?.meta?.user_type === 'customer'){
          store.dispatch({type:'UPDATE_USER',payload:'user'})
        }
        AsyncStorage.setItem(
          "userDetails",
          JSON.stringify(signupResponse)
        ).then(() => {
          this.setState({ showLoader: false })
          this.resetStack("LandingPage");
        });
      } else {
        Alert.alert("Error", signupResponse?.errors[0]?.failed_login,
          [{ text: 'OK', onPress: () => this.setState({ showLoader: false }) }]);
      }
    }
    validationApiCallback(apiRequestCallId:any,responseJson:any){
      if (apiRequestCallId != null) {
        if (
          apiRequestCallId === this.validationApiCallId &&
          responseJson !== undefined
        ) {
          let arrayholder = responseJson.data;

          if (arrayholder && arrayholder.length !== 0) {
            let regexData = arrayholder[0];

            if (regexData && regexData.email_validation_regexp && regexData.password_validation_regexp) {
              this.emailReg = new RegExp(regexData.email_validation_regexp);
              this.passwordReg = new RegExp(regexData.password_validation_regexp);
            }
          }
        }}
    }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      return;
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiEmailLoginCallId != null &&
      this.apiEmailLoginCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let signupResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let loginError:any = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      
      this.loginCallBack(signupResponse,loginError)
    
     
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiEmailSignupCallId != null &&
      this.apiEmailSignupCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let newLogged = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (newLogged?.meta?.token) {
        AsyncStorage.setItem("userDetails", JSON.stringify(newLogged)).then(
          () => {
            this.setState({
              showModal: true,
              coupon_code: newLogged?.data?.attributes?.code,
              showLoader: false
            });
          }
        );
      } else {
        Alert.alert("Error", newLogged.errors[0].account,
          [{ text: 'OK', onPress: () => this.setState({ showLoader: false }) }]);
      }
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiMerchantEmailSignupCallId != null &&
      this.apiMerchantEmailSignupCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let newLogged = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (newLogged?.meta?.token) {
        AsyncStorage.setItem("userDetails", 
        JSON.stringify({...newLogged,
          meta:{...newLogged?.meta,user_type:'merchant'}}))
          .then(
            () => {
              store.dispatch({type:'UPDATE_USER',payload:'merchant'})
              this.setState({
                showMerModal: true,
                showLoader: false
              });
            }
          );
      } else {
        Alert.alert("Error", newLogged.errors[0].account,
          [{ text: 'OK', onPress: () => this.setState({ showLoader: false }) }]);
      }
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );      

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log(errorReponse);
      this.validationApiCallback(apiRequestCallId,responseJson)

     }

    else {
      runEngine.debugLog("GOIT");
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(): boolean {
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  callGetValidationApi() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
