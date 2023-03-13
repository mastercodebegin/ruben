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
const validInstagramLink = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)([a-zA-Z0-9_\-\.]+)(?:\/)?$/
const validWhatssappLink = /^https?:\/\/(?:chat|api)\.whatsapp\.com\/(?:send\?phone=|wa\?)[0-9]+$/;
const validFacebookLink = /^https?:\/\/(?:www\.)?facebook\.com\/(?:\w+\/)?(?:profile|pg)\/\d+$/;

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
      return
    } 
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getprofileDetailsId != null &&
      this.getprofileDetailsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let profileDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log(error);
      
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
      console.log('userDetails ',userDetails);
      this.props.setState({show_loader:false})  
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(error){
        this.showAlert('something went wrong')
      }else if(userDetails){
        if(this.props.firstTime){
          Alert.alert('Success','Profile created successfully',[{text:'OK',onPress:this.goToLandingPage.bind(this)}])
        }else{
          Alert.alert('Success','Profile updated successfully');
        }
      }
      
    }
    else if(getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.getCategoriesId != null &&
    this.getCategoriesId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){

      const categories = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log(categories);
      

      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.setState({show_loader:false})
      if(error)
      {
        Alert.alert('Error','Something went wrong, Please try again later')
      }
    }
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start
  getprofileDetailsId:string ='';
  updateProfileDetailsId:string ='';
  getCategoriesId:string='';
  
  userdetailsProps={
    getuserDetails:this.getProfileDetails
  }
  async getCategory(){
    this.setState({show_loader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token':data?.meta?.token
    };


    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.getCategoriesId = getValidationsMsg.messageId;
    

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCategory
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

  showAlert(message:string){
    Alert.alert('Alert',message)
  }
  async updateProfileDetails (firstTime:boolean) {
    // if(this.props.state.profileImage === ''){
    //   this.showAlert('Please select your profile picture ');
    //   return;
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
    }
    else if ( !validInstagramLink.test(this.props.state.instagram_link)){
      this.showAlert('please provide valid Instagram link')
      return
    }
    else if (this.props.state.whatsapp_link === ''){
      this.showAlert('please provide your WhatsApp link')
      return
    }else if ( !validWhatssappLink.test(this.props.state.whatsapp_link)){
      this.showAlert('please provide valid Whats app link')
      return
    }
    else if (this.props.state.facebook_link === ''){
      this.showAlert('please provide your Facebook link')
      return
    }else if ( !validFacebookLink.test(this.props.state.facebook_link)){
      this.showAlert('please provide valid facebook profile link')
      return
    }
    this.props.setState({show_loader:true})  
    const userDetails:any = await AsyncStorage.getItem('userDetails');
    const data:any = JSON.parse(userDetails);
    const formdata = new FormData();
    // formdata.append('photo', {
    //   //@ts-ignore
    //    uri: this.props.state.profileImage,
    //    type: 'image/jpeg',
    //    name: 'photo1.jpg',
    //  });
    formdata.append("full_name", this.props.state.name);
    formdata.append("email_address", this.props.state.email);
    formdata.append("about_me", this.props.state.about_me);
    formdata.append("instagram_link", this.props.state.instagram_link);
    formdata.append("whatsapp_link", this.props.state.whatsapp_link);
    formdata.append("facebook_link", this.props.state.facebook_link);
    formdata.append("phone_number", this.props.state.phone_number);
      const header = {
        'token': data?.meta?.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.updateProfileDetailsId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        firstTime ?  configJSON.userDetailsEndpoint : `${configJSON.userDetailsEndpoint}/${this?.props?.state?.id}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formdata
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        firstTime ? 'POST' : 'PATCH'
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    
    return true;
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
