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
import ImagePicker from "react-native-image-crop-picker";
//@ts-ignore
import {store} from '../../../mobile/App';
const validInstagramLink = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)([a-zA-Z0-9_\-\.]+)(?:\/)?$/
const validWhatssappLink = /^https?:\/\/wa\.me\/\d+(\?text=.*)?$/
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
  profileImage:any;
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
  categories:Array<object>;
  subcategories:Array<object>;
  selectedSub:any;
  searchText:string;
  productsList:Array<object>;
  refresh:boolean;
  imageBlogList:Array<object>;
  videoLibrary:Array<object>;
  visibleCard:number,
  aboutus:any;
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
      selectedTab:'MyFavoritesScreen',
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
      lifeTimeSubscription:true,
      categories:[],
      subcategories:[],
      selectedSub:null,
      searchText:'',
      productsList:[{
        title:'',
        category:null,
        price:'',
        images:[],
        desciption:''
      }],
      refresh:false,
      imageBlogList:[],
      videoLibrary:[],
      visibleCard:0,
      aboutus:null
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start    
    if (
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
        profileImage: photo?.url,
        whatsapp_link,
      id:id,
    loader:false})
    const dispatch = store?.dispatch;
     dispatch({
      type:'PROFILE_DETAILS',
      payload:{
      about_me,
      email_address,
      facebook_link,
      full_name,
      instagram_link,
      phone_number,
      photo,
      whatsapp_link,
      id
    }})
      }else{
        this.setState({loader:false})
      }
    } 
    else if(getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.updateProfileDetailsId != null &&
    this.updateProfileDetailsId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){
      const userDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.props.setState({show_loader:false})  
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.updateProfileCallback(error,userDetails)
    }
    else if(getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.getCategoriesId != null &&
    this.getCategoriesId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){
      const categories = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );  
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.categoryCallback.bind(this)(error,categories?.data)
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getSubCategoryId != null &&
      this.getSubCategoryId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const subCategories = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );  
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.getSubcategoryCallback(subCategories,error)
      
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getBlogPostsId != null &&
      this.getBlogPostsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ){
      const imageBlogPosts = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );  
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        console.log(error);
        this.setState({imageBlogList:imageBlogPosts?.data,show_loader:false})

    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getVideoLibraryId != null &&
      this.getVideoLibraryId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ){
      const videoLibrary = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );  
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.videoLibraryCallback(videoLibrary,error)
       
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAboutUsId != null &&
      this.getAboutUsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ){
      const aboutus = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );  
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.aboutusCallback(aboutus,error)
       
    }
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start

  aboutusCallback(aboutus:any,error:any){    
    if(error){
      this.setState({show_loader:false})
    }else{
      this.setState({show_loader:false,aboutus:aboutus?.data?.length &&aboutus?.data[aboutus?.data?.length-1]})
    }
  }
  videoLibraryCallback(videoLibrary:any,error:any){
    if(error){
      this.showAlert('Something went wrong, please try again later')
    }else{
      this.setState({videoLibrary:videoLibrary?.data,show_loader:false})
    }
  }
  getSubcategoryCallback(subCategories:any,error:any){
    if(error){
      this.setState({show_loader:false})
      Alert.alert('Error','Something went wrong, Please try again later')
    }else{
      this.setState({subcategories:subCategories?.data,show_loader:false})
    }
  }
  categoryCallback(error:any,categories:Array<object>){
      if(error)
      {
        Alert.alert('Error','Something went wrong, Please try again later')
        this.setState({show_loader:false,refresh:false});
      }else{
        if(categories?.length === 0){
          this.categoryPage = null;
          this.setState({show_loader:false})
        }else{
        this.setState({show_loader:false,categories: this.categoryPage > 1 ? [...this.state.categories,...categories]: categories,refresh:false})}
      }
  }
  updateProfileCallback(error:any,response:any){
    if(error){
      this.showAlert('something went wrong')
    }else if(response){
      if(this.props.firstTime){
        Alert.alert('Success','Profile created successfully',[{text:'OK',onPress:this.goToLandingPage.bind(this)}])
      }else{
        Alert.alert('Success','Profile updated successfully',[{text:'OK',onPress:()=> this.props.setState({showProfileModal:false})}]);
      }
    }
  }
  getprofileDetailsId:string ='';
  updateProfileDetailsId:string ='';
  getCategoriesId:string='';
  getAboutUsId:any;
  getSubCategoryId:string='';
  getBlogPostsId:string='';
  getVideoLibraryId:string='';
  categoryPage:any=1;
  userdetailsProps={
    getuserDetails:this.getProfileDetails
  }
  async getCategory(page:number,loader=true){
    this.setState({show_loader:loader})
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
      `bx_block_categories/categories?page=${page}`
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



  async getAboutUs(){
    this.setState({show_loader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)
    const headers = {
      'token':data?.meta?.token
    };


    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.getAboutUsId = getValidationsMsg.messageId;
    

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
     configJSON.getAboutUs
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
   opencamera(callBack:(res:any)=>void,error:(e:any)=>void){
    ImagePicker.openCamera({
      cropping: false,
      mediaType:'photo'
    }).then((image) => {
      callBack(image)
    }).catch(e=>error(e))
  }

  async openGallery(callBack:(res:any)=>void,error:(e:any)=>void){
     ImagePicker.openPicker({
      cropping: false,
      mediaType:'photo'
    }).then((image) => {
      callBack(image)
    }).catch(e=>{
      error(e)
    });
  }
  selectImage(callBack:(res:any)=>void,error:(e:any)=>void){
    Alert.alert("Choose image from", "", [
      {
        text: "camera",
        onPress:()=>this.opencamera(callBack,error),
      },
      { text: "gallery", onPress:()=> this.openGallery(callBack,error) },
      { text: "cancel", onPress: () => {} },
    ]);
  }
  showAlert(message:string){
    Alert.alert('Alert',message)
  }
  async getblogPosts(){
    this.setState({show_loader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)
    const headers = {
      'token':data?.meta?.token
    };
    const subcategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.getBlogPostsId = subcategory.messageId;
    

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getImageBlog
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
  async getVideoBlog(){
    this.setState({show_loader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)
    const headers = {
      'token':data?.meta?.token
    };
    const videoLibrary = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.getVideoLibraryId = videoLibrary.messageId;
    videoLibrary.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getVideoBlog
    );

    videoLibrary.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    videoLibrary.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(videoLibrary.id, videoLibrary);
  }
  checkValidation(){
    if(this.props.state.profileImage === ''){
      this.showAlert('Please select your profile picture ');
      return false;
    } 
    if(this.props.state.name === ''){
      this.showAlert('Name can not be blank')
      return false;
    }
    if (this.props.state.email === ''){
      this.showAlert('Email can not be blank')
      return false;
    }
    if (this.props.state.phone_number === ''){
      this.showAlert('please provide your phone number')
      return false;
    }
    if (this.props.state.about_me === ''){
      this.showAlert('please provide information about you')
      return false;
    }
    if (this.props.state.instagram_link === ''){
      this.showAlert('please provide your Instagram link')
      return false;
    }
    if ( !validInstagramLink.test(this.props.state.instagram_link)){
      this.showAlert('please provide valid Instagram link')
      return false;
    }
    return true
  }
  
  async updateProfileDetails (firstTime:boolean) {
    if(!this.checkValidation()){
      return
    }
    if (this.props.state.whatsapp_link === ''){
      this.showAlert('please provide your WhatsApp link')
      return
    }
    if ( !validWhatssappLink.test(this.props.state.whatsapp_link)){
      this.showAlert('please provide valid Whats app link')
      return
    }
    if (this.props.state.facebook_link === ''){
      this.showAlert('please provide your Facebook link')
      return
    }
    if ( !validFacebookLink.test(this.props.state.facebook_link)){
      this.showAlert('please provide valid facebook profile link')
      return
    }
    this.props.setState({show_loader:true})
    const userDetails:any = await AsyncStorage.getItem('userDetails');
    const data:any = JSON.parse(userDetails);
    const formdata = new FormData();
    if(this.props.state?.profileImage?.path){
      const imagePath = this.props.state.profileImage.path
      const imageName = this.props.state?.profileImage?.filename ? 
      this.props.state?.profileImage?.filename :imagePath.slice(imagePath.lastIndexOf('/') + 1)
      const filename = `${
        data?.meta?.token}${
        new Date().getTime()}${imageName}`
    formdata.append('photo', {
      //@ts-ignore
       uri: imagePath,
       type: this.props.state?.profileImage?.mime,
       name: filename,
     });}
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
  async getSubcategories(subCategoryId:string){
    this.setState({show_loader:true,selectedSub:null})
    const userDetails:any = await AsyncStorage.getItem('userDetails')
    const data:any = JSON.parse(userDetails)
    const headers = {
      'token':data?.meta?.token
    };
    const subcategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.getSubCategoryId = subcategory.messageId;
    

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.subCategory}${subCategoryId}`
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(subcategory.id, subcategory);
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
