import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Animated,Alert} from 'react-native'
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  visible:boolean;
  setVisibleProfileModal:()=>void
  setState:any;
  state:any;
  firstTime:boolean;
  currentUser:string;
  route:any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  selectedTab:string
  showProfileModal:boolean
  profileImage:string;
  name:string;
  email:string;
  instagram_link:string;
  whatsapp_link:string;
  facebook_link:string;
  phone_number:string;
  about_me:string;
  show_loader:boolean;
  id:any;
  loader:boolean;
  keyboardHeight:number;
  blogTab:number;
  animatedValue:any;
  coldPackagingFee:boolean;
  lifeTimeSubscription:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LandingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
        getName(MessageEnum.RestAPIResponceMessage),
        getName(MessageEnum.ReciveUserCredentials),
        getName(MessageEnum.CountryCodeMessage),
    ];

    this.state = {
      selectedTab:'favorite',
      showProfileModal:false,
      profileImage:'',
      name:'',
      email:'',
      instagram_link:'',
      facebook_link:'',
      whatsapp_link:'',
      about_me:'',
      phone_number:'',
      show_loader:false,
      id:null,
      loader:false,
      keyboardHeight:0,
      blogTab:0,
      animatedValue:new Animated.Value(0),
      coldPackagingFee:true,
      lifeTimeSubscription:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start    
    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
    } 
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getprofileDetailsId != null &&
      this.getprofileDetailsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var profileDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(profileDetails?.data?.attributes){
        const {
          about_me,
          email_address,
          facebook_link,
          full_name,
          instagram_link,
          phone_number,
          photo,
          whatsapp_link,
          id
        }=profileDetails?.data?.attributes;
        this.setState({
          about_me,email:email_address,
          facebook_link,name:full_name,
          instagram_link,phone_number:String(phone_number),
        profileImage: `https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe${photo}?content_type=image%2Fjpeg&disposition=inline%3B+filename%3D%22photo1.jpg%22%3B+filename%2A%3DUTF-8%27%27photo1.jpg`,
        whatsapp_link,
      id:id,
    loader:false})
      }
    } 
    else if(getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.updateProfileDetailsId != null &&
    this.updateProfileDetailsId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){

      const userDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      console.log('userDetails=============>>>>>>>/ ',userDetails);
      

    }
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start
  getprofileDetailsId:string =''
  updateProfileDetailsId:string =''
  
  userdetailsProps={
    getuserDetails:this.getProfileDetails
  }
  // LogNewFoodFunc = async (productid: number, quantity: string, food_type: string, date:string, time: string) => {
  //   this.setState({ isLoading: true });
  //   const data: any = await AsyncStorage.getItem("userInfo");
  //   const userInfo = JSON.parse(data)
    
  //   var formdata = new FormData();
  //   formdata.append("account_id", userInfo.data.id.toString());
  //   formdata.append("product_id", productid.toString());
  //   formdata.append("quantity", quantity.toString());
  //   formdata.append("food_type", food_type.toLowerCase())
  //   formdata.append("default_time", date+" "+time);
  //   console.log('formdata', formdata);

  //   if (data) {
  //     const token = JSON.parse(data)?.meta.token;
  //     const header = {
  //       token: token,
  //     };
  //     let url = `${baseURL}${configJSON.LOG_NEW_FOOD_END_POINT}`
  //     const requestMessage = new Message(
  //       getName(MessageEnum.RestAPIRequestMessage)
  //     );
  //     this.logNewFoodMessageId = requestMessage.messageId;

  //     requestMessage.addData(
  //       getName(MessageEnum.RestAPIResponceEndPointMessage),
  //       url
  //     );
  //     requestMessage.addData(
  //       getName(MessageEnum.RestAPIRequestHeaderMessage),
  //       JSON.stringify(header)
  //     );
  //     requestMessage.addData(
  //       getName(MessageEnum.RestAPIRequestBodyMessage),
  //       formdata
  //     );
  //     requestMessage.addData(
  //       getName(MessageEnum.RestAPIRequestMethodMessage),
  //       configJSON.HTTP_POST_METHOD
  //     );
  //     runEngine.sendMessage(requestMessage.id, requestMessage);
  //   }
  //   return true;
  // }


  showAlert(message:string){
    Alert.alert('Alert',message)
  }
  async updateProfileDetails (firstTime:boolean=false){
    if(this.props.state.profileImage === ''){
      this.showAlert('Please select your profile picture ');
      return;
    } 
    else if(this.props.state.name === ''){
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
    const token:any = await  AsyncStorage.getItem('userDetails');
    const data= JSON.parse(token)
    const headers = {
      'token':data?.meta?.token
    };
    var formdata = new FormData();
      formdata.append('photo', {
        //@ts-ignore
        uri: this.props.state.profileImage,
        type: 'image/jpeg',
        name: 'photo1.jpg',
        
      });
      formdata.append("full_name", this.props.state.name);
      formdata.append("email_address", this.props.state.email);
      formdata.append("about_me", this.props.state.about_me);
      formdata.append("instagram_link", this.props.state.instagram_link.replace(/"/g, ''));
      formdata.append("whatsapp_link", this.props.state.whatsapp_link.replace(/"/g, ''));
      formdata.append("facebook_link", this.props.state.facebook_link.replace(/"/g, ''));
      formdata.append("phone_number", this.props.state.phone_number);

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.updateProfileDetailsId = getValidationsMsg.messageId;
    
alert( `${firstTime?configJSON.userDetailsEndpoint:configJSON.userDetailsEndpoint+'/'+this.props.state.id}`)
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${firstTime?configJSON.userDetailsEndpoint:configJSON.userDetailsEndpoint+'/'+this.props.state.id}`
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      firstTime ?  configJSON.exampleAPiMethod : configJSON.updateProfileMethod
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
    
  }
  async getProfileDetails() {
    this.setState({loader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token':data?.meta?.token
    };


    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.getprofileDetailsId = getValidationsMsg.messageId;
    

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userDetailsEndpoint
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
  goToLandingPage(){
    this.setState({showProfileModal:false})
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage"}],
    });
  }
 
  goToHome() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  // Customizable Area End
}
