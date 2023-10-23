import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated, Alert, Clipboard } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import { deepLinkingURL } from '../../../components/src/constants';
import { store, validName } from "../../../components/src/utils";
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
  visible: boolean;
  setVisibleProfileModal: () => void
  setState: any;
  state: any;
  firstTime: boolean;
  currentUser: string;
  route: any;
  updateCartDetails: (data: any) => void;
  cartDetails: Array<any>;
  setCreditDetailModal: () => void;
  submitCreditDetailModal: () => void;
  remainingCuts:any
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  selectedTab: string
  showProfileModal: boolean
  profileImage: any;
  name: string;
  email: string;
  instagram_link: string;
  whatsapp_link: string;
  facebook_link: string;
  phone_number: string;
  about_me: string;
  show_loader: boolean;
  id: any;
  loader: boolean;
  keyboardHeight: number;
  blogTab: number;
  animatedValue: any;
  coldPackagingFee: boolean;
  lifeTimeSubscription: boolean;
  categories: Array<object>;
  subcategories: Array<object>;
  selectedSub: any;
  selectedCat: any,
  searchText: string;
  showSearchResults: boolean;
  searchResults: any[];
  productsList: Array<any>;
  refresh: boolean;
  imageBlogList: Array<object>;
  videoLibrary: Array<object>;
  aboutUsData: any
  visibleCard: number;
  categoryItem: string;
  subCategoryItem: string;
  categoryList: Array<object>;
  subCategoryList: Array<object>;
  productList: Array<any>;
  recommentproduct: Array<any>;
  remainingproduct: Array<any>;
  filterByCategoryApiId: any;
  aboutus: any;
  orderList: Array<any>;
  cartList: Array<any>;
  show_SortingDropdown: boolean,
  sortAscending: boolean,
  setProductPage: number,
  showFavoriteList: Array<object>;
  viewAllProductList: Array<object>;
  priceTotal: number;
  priceDiscount: number;
  percentage: number;
  showMyCreditModal: boolean;
  deliverOption: Array<object>;
  setDeliverOption: string;
  animalCutsNumber: number;
  prevState: number;
  handleAnimalCutsDropDown: boolean;
  animalCutsOptionsList: Array<object>;
  selectedAnimalCuts: string;
  animalAvailableSlots: Array<object>;
  selectedAnimalSlot: string;
  nearestLocation: string;
  setAddressOption: boolean;
  fetchFavorites: boolean;
  selectedCategoryID: any
  animalPortions: Array<any>;
  merchantAddress: string;
  userAddress: Array<any>
  userAddressID:any
  merchantAddressID:any
  selectedCategory:any
  animalCutsCount: number;
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
      selectedTab: 'MyFavoritesScreen',
      showProfileModal: false,
      aboutUsData: {},
      profileImage: '',
      name: '',
      email: '',
      instagram_link: '',
      show_SortingDropdown: false,
      sortAscending: false,
      facebook_link: '',
      whatsapp_link: '',
      about_me: '',
      phone_number: '',
      show_loader: false,
      id: null,
      loader: false,
      keyboardHeight: 0,
      blogTab: 0,
      animatedValue: new Animated.Value(0),
      coldPackagingFee: true,
      lifeTimeSubscription: true,
      categories: [],
      subcategories: [],
      selectedSub: null,
      selectedCat: null,
      searchText: '',
      searchResults: [],
      showSearchResults: false,
      productsList: [{
        category_id: '',
        sub_category_id: '',
        name: '',
        price: '',
        images: [],
        desciption: ''
      }],
      refresh: false,
      imageBlogList: [],
      videoLibrary: [],
      visibleCard: 0,
      categoryItem: '',
      subCategoryItem: '',
      productList: [],
      recommentproduct: [],
      remainingproduct: [],
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
      aboutus: null,
      cartList: [],
      setProductPage: 1,
      showFavoriteList: [],
      viewAllProductList: [],
      priceTotal: 0,
      priceDiscount: 0,
      percentage: 0,
      showMyCreditModal: false,
      deliverOption: [
        {
          title: "Pickup",
          id: 0
        },
        {
          title: "Deliver",
          id: 1
        },
        {
          title: "Shipping",
          id: 3
        }
      ],
      setDeliverOption: "",
      animalCutsNumber: 2,
      prevState: 1,
      handleAnimalCutsDropDown: false,
      animalCutsOptionsList: [
        {
          title: "Pork Legs",
          id: 0
        },
        {
          title: "Cow Legs",
          id: 1
        },
        {
          title: "Beef Legs",
          id: 2
        },
        {
          title: "Vegetables",
          id: 3
        }
      ],
      selectedAnimalCuts: "Head",
      animalAvailableSlots: [],
      selectedAnimalSlot: "10:00 AM",
      nearestLocation: "",
      setAddressOption: false,
      fetchFavorites: false,
      selectedCategoryID: '',
      merchantAddress: '',
      animalPortions: [],
      userAddress: [
      
      ],
      userAddressID:0,
      merchantAddressID:0,
      selectedCategory:'Select Category',
      animalCutsCount:0


    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start    
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getprofileDetailsId != null && this.getprofileDetailsId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let profileDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (profileDetails?.data?.attributes) {
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
        } = profileDetails.data.attributes;
        this.setState({
          about_me, email: email_address,
          facebook_link, name: full_name,
          instagram_link, phone_number: String(phone_number),
          profileImage: photo?.url,
          whatsapp_link,
          id: id,
          loader: false
        })
        const dispatch = store?.dispatch;
        dispatch({
          type: 'PROFILE_DETAILS',
          payload: {
            about_me,
            email_address,
            facebook_link,
            full_name,
            instagram_link,
            phone_number,
            photo,
            whatsapp_link,
            id
          }
        })
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getSearchProductId != null &&
      this.getSearchProductId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const userDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.searchProductsCallback(error, userDetails);
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.updateProfileDetailsId != null &&
      this.updateProfileDetailsId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const userDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.props.setState({ show_loader: false })
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.updateProfileCallback(error, userDetails)
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getSlotsAndMerchantAddressCallId != null &&
      this.getSlotsAndMerchantAddressCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const slotsAndMerchantRes = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      // this.props.setState({ show_loader: false })
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.slotsAndMerchantRes(error, slotsAndMerchantRes)
    }

    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getCategoriesId != null &&
      this.getCategoriesId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const categories = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.categoryCallback.bind(this)(error, categories?.data)
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
      this.getSubcategoryCallback(subCategories, error)

    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.remainingProductApiCallId != null &&
      this.remainingProductApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {

      this.remainingProductCallback(message)


    }
    else {
      this.receiveCallback(message)
      this.resDeleteFavAPI(message)
      this.resFavListAPI(message)
      this.resAddFavList(message)
      this.resOrderList(message)
      this.resAboutUs(message)
      this.filterByCategoryCallback(message);
      this.recommendProductCallback(message);
      this.remainingProductCallback(message);
      this.addToCartCallBack(message)
    }

    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start


  filterByCategoryCallback(message: Message) {

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.filterProductByCategoryId != null &&
      this.filterProductByCategoryId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const filterByCategoryResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!error && filterByCategoryResponse) {
        this.setState({ productList: filterByCategoryResponse?.data })
      }
    }
  }

  recommendProductCallback(message: Message) {

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.recommendProductApiCallId != null &&
      this.recommendProductApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const filterByCategoryResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!error && filterByCategoryResponse) {

        this.setState({ productList: filterByCategoryResponse?.data, loader: false })
      }
    }
  }

  remainingProductCallback(message: Message) {

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.remainingProductApiCallId != null &&
      this.remainingProductApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const remainingProductResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (!error && remainingProductResponse) {

        const arr = []
        arr.push(remainingProductResponse)


        this.setState({ remainingproduct: arr, loader: false })
      }
    }
  }

  receiveCallback(message: any) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getBlogPostsId != null &&
      this.getBlogPostsId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const imageBlogPosts = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.setState({ imageBlogList: imageBlogPosts?.data, show_loader: false })

    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getVideoLibraryId != null &&
      this.getVideoLibraryId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const videoLibrary = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.videoLibraryCallback(videoLibrary, error)

    }

    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.userAddressApiCallId != null &&
      this.userAddressApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) 
    {
      const userAddress = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log('callid: ======================================' + userAddress);

      this.userAddressCallback(userAddress, error)

    }

    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.submitPickupRequestCallId != null &&
      this.submitPickupRequestCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const submitRequest = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log('submitRequest: ======================================' + submitRequest);

      this.submitRequestCallback (submitRequest, error)

    }


    else if(message)
    {
      this.subAsyncRecieve(message)
    }





 
    else if (
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
    }
    else {
      this.cartCallBack(message)
    }
  }
  filterCategoryCallBack(filteredList: any) {
    if (filteredList?.message === 'No Inventory Present') {
      showToast('No order present');
    }

    if (filteredList?.inventory?.data?.length) {
      const list = filteredList.inventory.data.map((item: any) => ({ data: item }))
      this.setState({ showLoader: false, inventoryList: list });
      return
    }
    this.setState({ showLoader: false });
  }

  subAsyncRecieve(message: Message){
     if ( this.getProductId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) 
    {
      const productListData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      this.setState({ productList: productListData.data, show_loader: false })
    }
    else if ( this.filterByCategoryApiId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const filteredList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.filterCategoryCallBack(filteredList)
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getViewAllProductId != null &&
      this.getViewAllProductId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const productListData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      this.setState({ viewAllProductList: productListData.data, show_loader: false })
    } 

  }
  cartCallBack(message: any) {
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
      if (error) {
        Alert.alert('Error', "Something went wrong please try again.")
      }
      else if (cartDetails?.data[0]?.attributes?.order_items?.data) {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: cartDetails?.data[0]?.attributes?.order_items?.data });
        this.props.updateCartDetails(cartDetails?.data[0]?.attributes?.order_items?.data)
      } else {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: [] });
      }
    }
  }

  addToCartCallBack(message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.addToCartId != null &&
      this.addToCartId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const cartData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (cartData?.data) {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: cartData?.data?.attributes?.order_items?.data });
        showToast('Product Added to the cart')
      } else {
        showToast('Something went wrong')
      }
    }
  }
  addToFavCallBack(AddToFavRes: any, error: any) {
    if (error) {
      showToast("Something went wrong");
    } else if (AddToFavRes) {
      if (AddToFavRes?.message === 'product already exists') {
        showToast("Product already exists in favorites");
        return;
      }
      showToast("Product added to favorites");
      if (this.state.fetchFavorites) {
        this.getFavorites();
      }
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

  aboutusCallback(aboutus: any, error: any) {
    if (error) {
      this.setState({ show_loader: false })
    } else {
      console.log('data==================================', aboutus?.data?.length);

      this.setState({ show_loader: false, aboutus: aboutus?.data?.length && aboutus?.data[aboutus?.data?.length - 1] })
      this.setState({ aboutUsData: aboutus })
    }
  }
  videoLibraryCallback(videoLibrary: any, error: any) {
    if (error) {
      this.showAlert('Something went wrong, please try again later')
    } else {
      this.setState({ videoLibrary: videoLibrary?.data, show_loader: false })
    }
  }
  userAddressCallback(userAddress: any, error: any) {
    if (error) {
      this.showAlert('Something went wrong, please try again later')
    } else {
      console.log('User Address=========================', userAddress)
      this.setState({userAddress:userAddress?.data})

    }
  }

  submitRequestCallback(userAddress: any, error: any) {
    if (error) {
      this.showAlert('Something went wrong, please try again later')
    } else {
      console.log('submit response=========================', userAddress)
    }
  }
  getSubcategoryCallback(subCategories: any, error: any) {
    if (error) {
      this.setState({ show_loader: false })
      Alert.alert('Error', 'Something went wrong, Please try again later')
    } else {
      this.setState({ subcategories: subCategories?.data, show_loader: false })
    }
  }
  categoryCallback(error: any, categories: Array<object>) {
    if (error) {
      Alert.alert('Error', 'Something went wrong, Please try again later')
      this.setState({ show_loader: false, refresh: false });
    } else {
      if (categories?.length === 0) {
        this.categoryPage = null;
        this.setState({ show_loader: false })
      } else {
        this.setState({ show_loader: false, categories: this.categoryPage > 1 ? [...this.state.categories, ...categories] : categories, refresh: false })
      }
    }
  }
  updateProfileCallback(error: any, response: any) {
    if (error) {
      this.showAlert('something went wrong')
    } else if (response) {
      if (this.props.firstTime) {
        Alert.alert('Success', 'Profile created successfully', [{ text: 'OK', onPress: this.goToLandingPage.bind(this) }])
      } else {
        Alert.alert('Success', 'Profile updated successfully', [{ text: 'OK', onPress: () => this.props.setState({ showProfileModal: false }) }]);
      }
    }
  }

  slotsAndMerchantRes(error: any, response: any) {
    if (error) {
      this.showAlert('something went wrong')
    }
    else {
      this.setState({ animalAvailableSlots: response?.avilable_sloat[0]?.available_slot, merchantAddress: response?.merchant_address })

    }
  }

  getprofileDetailsId: string = '';
  updateProfileDetailsId: string = '';
  getCategoriesId: string = '';
  getAboutUsId: any;
  getSubCategoryId: string = '';
  getBlogPostsId: string = '';
  getVideoLibraryId: string = '';
  categoryPage: any = 1;
  addToFavId: string = ''
  getCartId: string = '';
  addToCartId: string = '';
  submitPickupRequestCallId: string = '';
  filterProductByCategoryId: string = '';
  filterByCategoryApiId = '';
  recommendProductApiCallId: string = '';
  remainingProductApiCallId: string = '';
  userAddressApiCallId: string = '';
  userdetailsProps = {
    getuserDetails: this.getProfileDetails
  }
  getProductId: string = '';
  getViewAllProductId: string = '';
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
  getFavoritesId: string = '';
  getSearchProductId: string = ''
  getSlotsAndMerchantAddressCallId: string = ''
  favListProps = {
    getFavoritesList: this.getFavorites
  }

  getFavoritesDeleteId: string = '';
  upDateFavList = {
    getUpDateFavList: this.removeFavListProduct
  }
  async getCategory(page: number, loader = true) {
    this.setState({ show_loader: loader })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
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

  async getCategories() {
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };


    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCategoriesId = getValidationsMsg.messageId;


    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_categories/categories`
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

  async getAboutUs() {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
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
  opencamera(callBack: (res: any) => void, error: (e: any) => void) {
    ImagePicker.openCamera({
      cropping: false,
      mediaType: 'photo',
      includeBase64: true
    }).then((image) => {
      callBack(image)
    }).catch(e => error(e))
  }

  async openGallery(callBack: (res: any) => void, error: (e: any) => void) {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: 'photo',
      includeBase64: true
    }).then((image) => {
      callBack(image)
    }).catch(e => {
      error(e)
    });
  }
  selectImage(callBack: (res: any) => void, error: (e: any) => void) {
    Alert.alert("Choose image from", "", [
      {
        text: "camera",
        onPress: () => this.opencamera(callBack, error),
      },
      { text: "gallery", onPress: () => this.openGallery(callBack, error) },
      { text: "cancel", onPress: () => { } },
    ]);
  }
  showAlert(message: string) {
    Alert.alert('Alert', message)
  }
  async getUserAddress() {
    console.log('getUserAddress============================================================')

    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
    };
    const subcategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userAddressApiCallId = subcategory.messageId;


    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_order_management/addresses'
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

  async getblogPosts() {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
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
  async getVideoBlog() {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
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
  checkValidation() {
    if (this.props.state.profileImage === '') {
      this.showAlert('Please select your profile picture ');
      return false;
    }
    if (this.props.state.name === '') {
      this.showAlert('Name can not be blank')
      return false;
    }
    if (!validName(this.props.state.name)) {
      this.showAlert('The name cannot be empty and should not contain any numbers or special characters');
      return false;
    }
    if (this.props.state.email === '') {
      this.showAlert('Email can not be blank')
      return false;
    }
    if (this.props.state.phone_number === '') {
      this.showAlert('please provide your phone number')
      return false;
    }
    if (this.props.state.about_me === '') {
      this.showAlert('please provide information about you')
      return false;
    }
    if (this.props.state.instagram_link === '') {
      this.showAlert('please provide your Instagram link')
      return false;
    }
    if (!validInstagramLink.test(this.props.state.instagram_link)) {
      this.showAlert('please provide valid Instagram link')
      return false;
    }
    return true
  }

  async updateProfileDetails(firstTime: boolean) {
    if (!this.checkValidation()) {
      return
    }
    if (this.props.state.whatsapp_link === '') {
      this.showAlert('please provide your WhatsApp link')
      return
    }
    if (!validWhatssappLink.test(this.props.state.whatsapp_link)) {
      this.showAlert('please provide valid Whats app link')
      return
    }
    if (this.props.state.facebook_link === '') {
      this.showAlert('please provide your Facebook link')
      return
    }
    if (!validFacebookLink.test(this.props.state.facebook_link)) {
      this.showAlert('please provide valid facebook profile link')
      return
    }
    this.props.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails');
    const data: any = JSON.parse(userDetails);
    const formdata = new FormData();
    if (this.props.state?.profileImage?.path) {
      const imagePath = this.props.state.profileImage.path
      const imageName = this.props.state?.profileImage?.filename ?
        this.props.state?.profileImage?.filename : imagePath.slice(imagePath.lastIndexOf('/') + 1)
      const filename = `${data?.meta?.token}${new Date().getTime()}${imageName}`
      formdata.append('photo', {
        //@ts-ignore
        uri: imagePath,
        type: this.props.state?.profileImage?.mime,
        name: filename,
      });
    }
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
      firstTime ? configJSON.userDetailsEndpoint : `${configJSON.userDetailsEndpoint}/${this?.props?.state?.id}`
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
  async getProductByCategory() {
    this.setState({ loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.filterProductByCategoryId = getValidationsMsg.messageId;
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_catalogue/catalogues?query=brisket'
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

  async getRecommendProduct(v: any) {
    this.setState({ loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.recommendProductApiCallId = getValidationsMsg.messageId;
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.recommenProductEndPoint
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

  async filterByCategoryApi(categoryName: string) {

    this.setState({ showLoader: true, category: categoryName })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const filterCategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.filterByCategoryApiId = filterCategory.messageId;
    filterCategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `account_block/accounts/search_on_inventory?query=brisket&page=2&per=10`

    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    filterCategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );
    runEngine.sendMessage(filterCategory.id, filterCategory);
  }


  async getRemainingProduct(id:any) {
    this.setState({ loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    console.log('id==================================',id)
    
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.remainingProductApiCallId = getValidationsMsg.messageId;
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_catalogue/catalogues/my_credits?category_id=${id}&start_date=2023-08-04&end_date=2023-08-11`
      //`bx_block_catalogue/catalogues/my_credits?category_id=94&start_date=2023-08-04&end_date=2023-08-11`
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


  async getSubcategories(subCategoryId: string) {
    this.setState({ show_loader: true, selectedSub: null })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
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
    this.setState({ loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
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
  goToLandingPage() {
    this.setState({ showProfileModal: false })
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage" }],
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

  async getViewAllProduct(id: number) {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
    };
    const getViewAllProductListMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getViewAllProductId = getViewAllProductListMsg.messageId;
    getViewAllProductListMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getViewAllProductListEndpoint}?category_id=${id}`
    );
    getViewAllProductListMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getViewAllProductListMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getViewAllProductListMsg.id, getViewAllProductListMsg);
  }

  async getProductList(type: boolean) {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
    };
    const getProductListMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductId = getProductListMsg.messageId;
    getProductListMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getProductListEndpoint}?page=${this.state.setProductPage}&type=${type ? "asc" : "desc"}`
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
  async AddToFavorites(catalogue_id: number) {

    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails);
    const header = {
      'token': userDetail?.meta?.token,
    };
    const formdata = new FormData();
    formdata.append("favouriteable_id", `${userDetail.data?.id}`);
    formdata.append("favouriteable_type", "AccountBlock::Account");
    formdata.append("catalogue_id", `${catalogue_id}`);
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
      formdata
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async addToCart(id: number) {
   
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': userDetail?.meta?.token
    };

    const httpBody = {
      "order_items": {
        "catalogue_id": id,
        "quantity": 1,
        "taxable": "true",
        "taxable_value": 0.1233,
        "other_charges": 0.124,
        "delivered_at": "2023-04-21T12:27:59.395Z"
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.submitPickupRequestCallId = requestMessage.messageId;
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
  async submitPickupRequestHandler() {
   
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': userDetail?.meta?.token
    };

    const httpBody = {
      "order_items":{
          "catalogue_id":13, 
          "quantity":2,
          "address": "test Office address",
          "taxable":"true",
          "slot": "4:00PM",
          "taxable_value":0.1233,
          "other_charges":0.124
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

  shareProducts(id: number) {
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

  handleLoadMore() {
    console.log("loadMore called");
    this.setState({ setProductPage: this.state.setProductPage + 1 }, () => {
      this.getProductList(true)
    });
  }

  async getFavorites() {
    this.setState({ show_loader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data.meta.token,
    };
    const Favorites = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getFavoritesId = Favorites.messageId;
    Favorites.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.favoritesEndPoint
    );
    Favorites.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    Favorites.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(Favorites.id, Favorites);
  }

  async removeFavListProduct(productId: any) {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data.meta.token,
    };
    const FavoritesDelete = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getFavoritesDeleteId = FavoritesDelete.messageId;
    FavoritesDelete.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteFavoritesEndPoint + `${productId}`
    );
    FavoritesDelete.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    FavoritesDelete.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodTypeDelete
    );
    runEngine.sendMessage(FavoritesDelete.id, FavoritesDelete);
  }

  resDeleteFavAPI(message: any) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getFavoritesDeleteId != null &&
      this.getFavoritesDeleteId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.setState({ show_loader: false });
      if (!error) {
        this.getFavorites()
      } else {
        showToast('something went wrong');
      }
    }
  }
  resFavListAPI(message: any) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getFavoritesId != null &&
      this.getFavoritesId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const getFavoritesList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      this.setState({ showFavoriteList: getFavoritesList?.data || [], show_loader: false })
      console.log("fav list = === == =", this.state.showFavoriteList);
    }
  }
  resAddFavList(message: any) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.addToFavId != null &&
      this.addToFavId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const AddToFavRes = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.addToFavCallBack(AddToFavRes, error);
    }
  }
  resOrderList(message: any) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getOrderId != null &&
      this.getOrderId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const orderListData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      this.setState({ orderList: orderListData?.data, show_loader: false })
    }
  }

  resAboutUs(message: any) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAboutUsId != null &&
      this.getAboutUsId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const aboutus = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.aboutusCallback(aboutus, error)
    }
  }
  handleDeliverOptionChange = (item: any) => {
    console.log("selected deliver option", item);
    if(item=='Pickup'){
      this.getSlotsAndMerchantAddressHandler()
    }
    if(item=='Shipping'||item=='Deliver')
    {
      console.log('in if====');
      
      this.getUserAddress()
    }

    
    
    this.setState({ setDeliverOption: item });
  };

  handleIncreaseAnimalCuts = (item: any, index: any,remainingCuts:any,avilable_cuts:any) => {
    if(avilable_cuts<remainingCuts)
    {
    console.log('in if remainingCuts',remainingCuts);
    console.log('in if avilable_cuts',avilable_cuts);
    
    const selectedObj = this.state.animalPortions[index]
    const obj = { id: item.id, name: selectedObj.name, quantity: selectedObj.quantity + 1 }
    const filteredArray = this.state.animalPortions.filter((selectedObj: any) => selectedObj.name != item.name)
    filteredArray.splice(index, 0, obj)
    this.setState({ animalPortions: filteredArray });
    this.setState({animalCutsCount:this.state.animalCutsCount+1})
  }
  else{
    console.log('in else remainingCuts',remainingCuts);
    console.log('in else avilable_cuts',avilable_cuts);

    alert('you exceeded the maximum')
  }
    
  };


  handleDecreaseAnimalCuts = (item: any, index: any,remainingCuts:any) => {
    if (item.quantity > 1) {
      const selectedObj = this.state.animalPortions[index]
      const obj = { id: item.id, name: selectedObj.name, quantity: selectedObj.quantity - 1 }
      const filteredArray = this.state.animalPortions.filter((selectedObj: any) => selectedObj.name != item.name)
      filteredArray.splice(index, 0, obj)
      this.setState({ animalPortions: filteredArray });
     
      this.setState({animalCutsCount:this.state.animalCutsCount-1})
      console.log('================================',this.state.animalCutsCount);
      
    
    }
    else {
      const filteredArray = this.state.animalPortions.filter((selectedObj: any) => selectedObj.name != item.name)
      this.setState({ animalPortions: filteredArray });
      this.setState({animalCutsCount:this.state.animalCutsCount-1})


    }
  };
  handleAnimalCutsOption = (item: any,remainingCuts:any,used_cuts:any) => {
    if(used_cuts<remainingCuts)
    {

    
    console.log("option", item);
    const obj = { id: 1, name: item, quantity: 1 }
    this.setState({
      selectedAnimalCuts: item,
      handleAnimalCutsDropDown: false,
      animalPortions: [...this.state.animalPortions, obj]
    });
    this.setState({animalCutsCount:this.state.animalCutsCount+1})
  }
  else{
    alert('you have exceed the limit');
  }

  };
  handleAnimalSelectSlots = (item: any) => {
    console.log('selected slots', item);

    this.setState({ selectedAnimalSlot: item });
  };
  showHideCreditDetailModal() {
    this.setState({ showMyCreditModal: false });
  }
  handleSearchProduct = async () => {
    this.setState({ show_loader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data.meta.token,
    };
    const SearchProductRequest = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSearchProductId = SearchProductRequest.messageId;
    SearchProductRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.searchProductsEndpoint}?query=${this.state.searchText}`
    );
    SearchProductRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    SearchProductRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(SearchProductRequest.id, SearchProductRequest);
  }

  getSlotsAndMerchantAddressHandler = async () => {
    console.log('merchantAddressHandler=================')
    
    this.setState({ show_loader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data.meta.token,
    };
    const SearchProductRequest = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSlotsAndMerchantAddressCallId = SearchProductRequest.messageId;
    SearchProductRequest.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_shippingchargecalculator/pickups`
    );
    SearchProductRequest.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    SearchProductRequest.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(SearchProductRequest.id, SearchProductRequest);
  }

  searchProductsCallback = (error: any, response: any) => {
    if (error) {
      this.showAlert('something went wrong ')
    } else if (response) {
      this.setState({ showSearchResults: true, searchResults: response?.product, show_loader: false })
    }
  }

  // Customizable Area End
}
