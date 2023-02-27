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
  signupEmail: string;
  signupPassword: string;
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
  emailReg: RegExp;
  labelTitle: string = "";
  passwordReg: RegExp;
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
      signupEmail: "",
      signupPassword: "",
    };

    this.emailReg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    this.passwordReg = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,15}$/
    );
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
  resetStack = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage" }],
    });
  };
  btnSignupPress = {
    onpress: () => this.doEmailSignup(),
    resetStack: this.resetStack,
  };

  doEmailSignup(): boolean {
    if (!this.passwordReg.test(this.state.signupPassword)) {
      Alert.alert(
        "Invalid password",
        "Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 15 characters in length."
      );
      return false;
    }
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.signupEmail,
      password: this.state.signupPassword,
      activated: true,
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

  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start

    // if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
    //   const userName = message.getData(getName(MessageEnum.LoginUserName));

    //   const password = message.getData(getName(MessageEnum.LoginPassword));

    //   const countryCode = message.getData(
    //     getName(MessageEnum.LoginCountryCode)
    //   );

    //   if (!countryCode && userName && password) {
    //     this.setState({
    //       email: userName,
    //       password: password,
    //       checkedRememberMe: true,
    //     });

    //     //@ts-ignore
    //     this.txtInputEmailProps.value = userName;

    //     //@ts-ignore
    //     this.txtInputPasswordProps.value = password;

    //     this.CustomCheckBoxProps.isChecked = true;
    //   }
    // } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
    //   const apiRequestCallId = message.getData(
    //     getName(MessageEnum.RestAPIResponceDataMessage)
    //   );

    //   var responseJson = message.getData(
    //     getName(MessageEnum.RestAPIResponceSuccessMessage)
    //   );

    //   var errorReponse = message.getData(
    //     getName(MessageEnum.RestAPIResponceErrorMessage)
    //   );

    //   if (apiRequestCallId != null) {
    //     if (
    //       apiRequestCallId === this.validationApiCallId &&
    //       responseJson !== undefined
    //     ) {
    //       var arrayholder = responseJson.data;

    //       if (arrayholder && arrayholder.length !== 0) {
    //         let regexData = arrayholder[0];

    //         if (regexData && regexData.email_validation_regexp) {
    //           this.emailReg = new RegExp(regexData.email_validation_regexp);
    //         }
    //       }
    //     }

    //     if (apiRequestCallId === this.apiEmailLoginCallId) {
    //       if (responseJson && responseJson.meta && responseJson.meta.token) {
    //         runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    //         this.saveLoggedInUserData(responseJson);
    //         this.sendLoginSuccessMessage();
    //         this.openInfoPage();
    //       } else {
    //         //Check Error Response
    //         this.parseApiErrorResponse(responseJson);
    //         this.sendLoginFailMessage();
    //       }

    //       this.parseApiCatchErrorResponse(errorReponse);
    //     }
    //   }
    // }

    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiEmailLoginCallId != null &&
      this.apiEmailLoginCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var signupResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (signupResponse?.meta?.token) {
        AsyncStorage.setItem(
          "userDetails",
          JSON.stringify(signupResponse)
        ).then(() => {
          this.resetStack();
        });
      } else {
        Alert.alert("Error", signupResponse.errors[0].failed_login);
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiEmailSignupCallId != null &&
      this.apiEmailSignupCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var newLogged = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (newLogged?.meta?.token) {
        this.setState({ showModal: true });
      } else {
        Alert.alert("Error", newLogged.errors[0].account);
      }
    } else {
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
