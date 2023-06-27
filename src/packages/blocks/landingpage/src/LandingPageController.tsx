import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Animated,Alert,Clipboard} from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import {deepLinkingURL} from '../../../components/src/constants';
import { store } from "../../../components/src/utils";
import { showToast } from "../../../components/src/ShowToast";
const validInstagramLink = /^(https?:\/\/)?(www\.)?instagram\.com/;
const validWhatssappLink = /^https?:\/\/wa\.me/;
const validFacebookLink = /(?:https?:\/\/)?(?:www\.)?facebook\.com/;
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
  updateCartDetails:(data:any)=>void;
  cartDetails:Array<any>;
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
  productsList:Array<any>;
  refresh:boolean;
  imageBlogList:Array<object>;
  videoLibrary:Array<object>;
  visibleCard:number;
  categoryItem: string;
  subCategoryItem: string;
  categoryList: Array<object>;
  subCategoryList: Array<object>;
  productList: Array<object>;
  aboutus:any;
  orderList: Array<any>;
  cartList:Array<any>;
  show_SortingDropdown: boolean,
  sortAscending: boolean,
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
      show_SortingDropdown: false,
      sortAscending: false,
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
        category_id: '',
        sub_category_id: '',
        name: '',
        price: '',
        images: [],
        desciption: ''
      }],
      refresh:false,
      imageBlogList:[],
      videoLibrary:[],
      visibleCard:0,
      categoryItem: '',
      subCategoryItem: '',
      productList: [],
      orderList: [],
      categoryList: [
        {
          title: 'Lamb',
          id: 0
        },
        {
          title: 'Pork',
          id: 1
        },
        {
          title: 'Wholesale',
          id: 2
        },
        {
          title: 'Chicken',
          id: 3,
        },
      ],
      subCategoryList: [
        {
          title: 'Lamb',
          id: 0
        },
        {
          title: 'Lamb1',
          id: 1
        },
        {
          title: 'Lamb2',
          id: 2
        },
        {
          title: 'Lamb3',
          id: 3,
        },
      ],
      aboutus:null,
      cartList:[]
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start    

    console.log("landingpage receive calld")
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
        }=profileDetails.data.attributes;
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
    }else if(getName(MessageEnum.RestAPIResponceMessage) === message.id &&
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
      this.addToCartId != null &&
      this.addToCartId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      const subCategories = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );  
      store.dispatch({type:'UPDATE_CART_DETAILS',payload:subCategories?.data?.attributes?.order_items?.data})
      this.addToCartCallBack(error)
      
    }
  else{
      this.receiveCallback(message)
    }
    
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start

  receiveCallback(message:any){
     if (
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
      this.getProductId != null &&
      this.getProductId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const productListData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log(" error == == ", error);
      this.setState({ productList: productListData?.data, show_loader: false })
      }else if (
        getName(MessageEnum.RestAPIResponceMessage) === message.id &&
        this.getAddProductId != null &&
        this.getAddProductId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
      ) {
        const addProductListData = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        const error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.addProductCallback(addProductListData, error)
        // this.setState({ addProductList: addProductListData?.data, show_loader: false })
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
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getOrderId != null &&
      this.getOrderId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const orderListData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log(error);
      this.setState({ orderList: orderListData?.data, show_loader: false })
    }
    else if(getName(MessageEnum.RestAPIResponceMessage) === message.id &&
    this.addToFavId != null &&
    this.addToFavId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){
        const AddToFavRes = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );  
        const error = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.addToFavCallBack(AddToFavRes,error);
        
      }else{
        this.cartCallBack(message)
      }
  }

  cartCallBack(message:any){
     if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getCartId != null &&
      this.getCartId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const cartDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );  
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(error){
        Alert.alert('Error',"Something went wrong please try again.")
      }
      else if(cartDetails?.data[0]?.attributes?.order_items?.data)
        {
          store.dispatch({type:'UPDATE_CART_DETAILS',payload:cartDetails?.data[0]?.attributes?.order_items?.data});
         this.props.updateCartDetails(cartDetails?.data[0]?.attributes?.order_items?.data)
        }
    }
  }

  addToCartCallBack(error:any){    
    if(error){      
      showToast('Something went wrong')
    }else{
      showToast('Product Added to the cart')
    }
  }
  addToFavCallBack(AddToFavRes:any,error:any){
    if(error){
      showToast("Something went wrong");
    }else if(AddToFavRes) {
      showToast("Product added to favorites");
    }
  }
  addProductCallback(error: any, response: any) {
    if (error) {
      this.showAlert('something went wrong')
    } else {
      console.log("response = = =", response)
      Alert.alert('Success', 'Hey! your product create successfully', [{
        text: 'OK', onPress: () => {
          this.props.navigation.navigate('ExplorePage')
        }
      }]);
    }
  }

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
  addToFavId:string=''
  getCartId:string='';
  addToCartId:string='';
  userdetailsProps={
    getuserDetails:this.getProfileDetails
  }
  getProductId: string = '';
  productListProps = {
    getProductLists: this.getProductList
  }
  getAddProductId: string = '';
  addProductListProps = {
    getAddProductLists: this.addProduct
  }
  getOrderId: string = '';
  orderListProps = {
    getOrderListData: this.getOrderList
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
      mediaType:'photo',
      includeBase64: true
    }).then((image) => {
      callBack(image)
    }).catch(e=>error(e))
  }

  async openGallery(callBack:(res:any)=>void,error:(e:any)=>void){
     ImagePicker.openPicker({
      cropping: false,
      mediaType:'photo',
      includeBase64: true
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

  goToMyCreditsScreen() {
    this.props.navigation.navigate("MyCreditScreen");
  }

  async addProduct() {
    if (this.state.productsList[0].title === '') {
      this.showAlert('Please provide title')
      return
    }
    if (this.state.productsList[0].category === '') {
      this.showAlert('Please provide category')
      return
    }
    if (this.state.productsList[0].price === '') {
      this.showAlert('Please provide price')
      return
    }
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const raw = JSON.stringify({
      "catalogues": this.state.productsList
    });
    console.log('add products == =',  headers)
    const addProductMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAddProductId = addProductMsg.messageId;
    addProductMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addProductEndpoint
    );
    addProductMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    addProductMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(raw)
    );
    addProductMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(addProductMsg.id, addProductMsg);
  }

  async getProductList(type:boolean) {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
    };
    const formdata = new FormData();
    console.log('formData ', formdata)
    const getProductListMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductId = getProductListMsg.messageId;
    getProductListMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.addProductEndpoint}${type ? "asc" : "desc"}`
      );
    getProductListMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getProductListMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getProductListMsg.id, getProductListMsg);
  }
  async AddToFavorites(catalogue_id:number) {
    console.log('catalogue_idcatalogue_id ',catalogue_id);
    
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails);       
    const header = {
      'token': userDetail?.meta?.token,
      "Content-Type": "application/json"
    };
    const data = {
      "data":{
          "favouriteable_id":userDetail.data?.id,
          favouriteable_type:"AccountBlock::Account",
          catalogue_id
      }
  }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addToFavId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_favourites/favourites'
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async addToCart(id:number) {
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': userDetail?.meta?.token
    };

    const httpBody = {
      order_items:{
          catalogue_id:id,
          quantity:1,
          taxable:true,
          taxable_value:0.1233,
          order_charges:0.124,
          delivered_at:"2023-04-23T12:23:44.754Z"
      }
  }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addToCartId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addToCart
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }
  shareProducts(id:number){
    Clipboard.setString(
      `${deepLinkingURL}?/product=${1}`
    );
    showToast('Link Copied')
  }
  async getCart() {
    this.setState({ show_loader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getCartId = subcategory.messageId;
    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCart
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
  async getOrderList() {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
    };
    const getOrderListMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getOrderId = getOrderListMsg.messageId;
    getOrderListMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOrderDetails
    );
    getOrderListMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getOrderListMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getOrderListMsg.id, getOrderListMsg);
  }
  // Customizable Area End
}
