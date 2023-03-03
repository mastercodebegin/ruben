import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  route:any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  selectedTab:string
  showProfileModal:boolean
  profileImage:string;
  name:string,
  email:string,
  instagram_link:string;
  whatsapp_link:string;
  facebook_link:string;
  phone_number:string;
  about_me:string;
  show_loader:boolean;
  id:any;
  loader:boolean;
  keyboardHeight:number
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
      keyboardHeight:0
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
        profileImage: `https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe${photo}`,
        whatsapp_link,
      id:id,
    loader:false})
      }
      
     
    } 
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start
  getprofileDetailsId:string =''

  
  userdetailsProps={
    getuserDetails:this.getProfileDetails
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
    // console.log(' getValidationsMsg.messageId', getValidationsMsg.messageId);
    
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
