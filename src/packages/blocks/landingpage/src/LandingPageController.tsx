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
import { store, validName, whiteSpace } from "../../../components/src/utils";
import { showToast } from "../../../components/src/ShowToast";
import PushNotificationsHelper from "../../pushnotifications/src/PushNotificationsHelper";
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
  remainingCuts: any
  categoryId: any
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showLoader: boolean;
  inventoryList: any;
  category: string;
  selectedTab: string;
  showProfileModal: boolean;
  showRecurringModal: boolean;
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
  selectedSub: string;
  selectedCat: string,
  searchText: string;
  showSearchResults: boolean;
  searchResults: any[];
  productsList: Array<any>;
  categoryProductsList: Array<any>;
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
  productDetails: any;
  recommentproduct: Array<any>;
  remainingproduct: any;
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
  merchantAddress: any
  userAddress: Array<any>
  userAddressID: any
  selectedUserAddress: string
  merchantAddressID: any
  selectedCategory: any
  animalCutsCount: number;
  isSuccessPopUp: boolean
  isLoading: boolean
  order_number: string
  animalPortions: Array<any>;
  isMyProfile: boolean
  isCallingFromStore: boolean
  subCategoryProductList: any
  homePageInfo: any
  variantQuantity: number,
  variantId: number,
  availableQuantity: number,
  isRecommended:boolean,
  isProductFavourite:boolean
  imageObj:object
  isFavouriteFunctionCallingFromProfile: boolean
  variantObject: { price: string, productImage: string, quantity: number, variantArray: Array<any>, variantType: string, catalogue_id: number }
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
      variantId: 0,
      imageObj:{},
      isProductFavourite:false,
      availableQuantity: 0,
      isRecommended:false,
      isFavouriteFunctionCallingFromProfile: false,
      categoryProductsList: [],
      variantObject: { price: '', productImage: '', quantity: 0, variantArray: [], variantType: '', catalogue_id: 0 },
      variantQuantity: 0,
      homePageInfo: {},
      isCallingFromStore: true,
      isMyProfile: false,
      userAddressID: '',
      selectedUserAddress: '',
      merchantAddressID: 0,
      selectedCategory: 'Select Category',
      animalCutsCount: 0,
      isSuccessPopUp: false,
      isLoading: false,
      order_number: '',
      merchantAddress: '',
      userAddress: [],
      showLoader: false,
      inventoryList: [],
      category: "",
      selectedTab: 'MyFavoritesScreen',
      showProfileModal: false,
      showRecurringModal: false,
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
      selectedSub: '',
      selectedCat: '',
      searchText: '',
      searchResults: [],
      showSearchResults: false,
      productsList: [{
        category_id: '',
        sub_category_id: '',
        name: '',
        price: '',
        sellingPrice: '',
        tax: '',
        hsnCode: '',
        subscription: '',
        subscriptionSellingPrice: '',
        images: [],
        variants: [{
          description: '', itemCode: '', weight: '', price: '',
          stock: '', image: {}, subscriptionAmount: '', isSubscribed: ''
        }],
        desciption: ''
      }],
      productDetails: {},
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

      ],
      subCategoryList: [

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
      selectedAnimalSlot: "",
      nearestLocation: "",
      setAddressOption: false,
      fetchFavorites: false,
      selectedCategoryID: '',
      animalPortions: [],
      subCategoryProductList: [],

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
      this.setState({ loader: false })
      this.profileDetailsCallback(profileDetails);
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.userAddressApiCallId != null &&
      this.userAddressApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const userAddress = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      this.setState({ userAddress: userAddress?.data })

    }

    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
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
      this.getProductDetailsByCategoryCallId != null &&
      this.getProductDetailsByCategoryCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const variantResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({ show_loader: false })
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log('getProductDetailsByCategoryCallId==============', JSON.stringify(variantResponse));

      this.getProductDetailsByCategoryCallback(error, variantResponse)
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
      this.subAsyncRecieve(message)
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
      this.getNotification(message);
      this.getSubCategoryProductResponce(message)
    }

    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start

  subAsyncRecieve(message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.remainingProductApiCallId != null &&
      this.remainingProductApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.remainingProductCallback(message)
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
      this.categoryCallback.bind(this)(error, categories.data)
    }

    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.checkStockCallId != null &&
      this.checkStockCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const stockRes = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      this.setState({ availableQuantity: stockRes?.result?.stockQty ? stockRes?.result?.stockQty : 0, show_loader: false })

    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getFarmId != null &&
      this.getFarmId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const farmDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.getFarmCallBack(farmDetails, error)
    }
  }

  updateVariant = (variant: any) => {
    console.log('variant====', variant);

    const { price, ...rest } = this.state.variantObject;
    const updatedVariantObject = { ...rest, price: variant.price, productImage: variant?.image };
    this.checkStock(variant.value)
    this.setState({ variantObject: updatedVariantObject, variantId: variant.value });

  }
  handleDecreamentVariantCount = () => {
    if (this.state.variantQuantity > 0) {


      this.setState({ variantQuantity: this.state.variantQuantity - 1 })

    }
    else {
      alert('You have zero')
    }


  }

  handleIcreameantVariantCount = () => {
    if (this.state.availableQuantity > 0) {

      if (this.state.variantQuantity < this.state.availableQuantity) {

        this.setState({ variantQuantity: this.state.variantQuantity + 1 })

      }
      else {
        alert('You have reached max limit')
      }
    }
    else {
      alert('Product is out of stock')
    }
  }
  handleIncreaseAnimalCuts = (item: any, index: any, remainingCuts: any, availableCuts: any) => {

    if (availableCuts < remainingCuts) {


      const selectedObj: any = this.state.animalPortions[index];


      const obj: any = { id: item.id, name: selectedObj.name, quantity: selectedObj.quantity + 1 };
      const filteredArray = this.state.animalPortions.filter((selectedObj: any) => selectedObj.name !== item.name);
      filteredArray.splice(index, 0, obj);

      this.setState({ animalPortions: filteredArray });
      this.setState({ animalCutsCount: this.state.animalCutsCount + 1 });
    }
    else {
      this.showAlert('You have consumed available cuts')
    }

  };

  handleDecreaseAnimalCuts = (item: any, index: any, remainingCuts: any) => {
    if (item.quantity > 1) {
      const selectedObj = this.state.animalPortions[index]
      const obj = { id: item.id, name: selectedObj.name, quantity: selectedObj.quantity - 1 }
      const filteredArray = this.state.animalPortions.filter((selectedObj: any) => selectedObj.name != item.name)
      filteredArray.splice(index, 0, obj)
      this.setState({ animalPortions: filteredArray });
      this.setState({ animalCutsCount: this.state.animalCutsCount - 1 })
    }
    else {
      const filteredArray = this.state.animalPortions.filter((selectedObj: any) => selectedObj.name != item.name)
      this.setState({ animalPortions: filteredArray, });
      this.setState({ animalCutsCount: this.state.animalCutsCount - 1 })
    }
  };
  handleAnimalCutsOption = (item: any, remainingCuts: any, used_cuts: any) => {

    const filterd = this.state.animalPortions.filter((v) => v.name == item)


    if (used_cuts < remainingCuts) {
      if (filterd.length > 0) {

        this.setState({
          handleAnimalCutsDropDown: false
        })
        this.showAlert('You already added ' + item)

        return false
      }



      const obj = { id: 1, name: item, quantity: 1 }
      this.setState({
        selectedAnimalCuts: item,
        handleAnimalCutsDropDown: false,
        animalPortions: [...this.state.animalPortions, obj]
      });

      this.setState({
        animalCutsCount: this.state.animalCutsCount + 1,
      })
    }
    else {
      this.showAlert('You have consumed available cuts')
    }
  };




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
        console.log('filterByCategoryResponse=======', filterByCategoryResponse)
        if (filterByCategoryResponse.data.length == 0) {
          showToast('No products foound')
        }
        else {


          this.setState({ searchResults: filterByCategoryResponse?.data, show_loader: false, productList: [] })
        }
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
        console.log('filterByCategoryResponse', JSON.stringify(filterByCategoryResponse));

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

        if (remainingProductResponse.message == 'No Order Present for this category') {
          alert(remainingProductResponse.message)
        }
        else {

          arr.push(remainingProductResponse)
        }



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
      this.getViewAllProductId != null &&
      this.getViewAllProductId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const productListData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({ viewAllProductList: productListData.data, show_loader: false })
    } else if (
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

      this.setState({ productList: productListData.data, show_loader: false })
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.filterByCategoryApiId != null &&
      this.filterByCategoryApiId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const filteredList = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.filterCategoryCallBack(filteredList)
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
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.submitPickupRequestCallId != null &&
      this.submitPickupRequestCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const submitRequest = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      this.setState({ isLoading: false, isSuccessPopUp: true, order_number: submitRequest?.data?.attributes?.order_no })


    }

    else {
      this.getSlotsAndMerchantAddressApiResponce(message)
      this.cartCallBack(message)
      this.homePageResCallback(message)
    }
  }

  homePageResCallback(message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.homePageInfoId != null &&
      this.homePageInfoId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const homePafeRes = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log('response=====', homePafeRes?.data[0])

      this.setState({ homePageInfo: homePafeRes?.data[0] })


    }
  }
  getSlotsAndMerchantAddressApiResponce(message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getSlotsAndMerchantAddressCallId != null &&
      this.getSlotsAndMerchantAddressCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const slotsAndMerchantRes = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.slotsAndMerchantRes(error, slotsAndMerchantRes)
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.updateProductViewCountCallId != null &&
      this.updateProductViewCountCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const updateProductViewCount = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', updateProductViewCount)



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

      if (cartDetails?.data[0]?.attributes?.order_items?.data) {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: cartDetails?.data[0]?.attributes?.order_items?.data });
        this.props.updateCartDetails(cartDetails?.data[0]?.attributes?.order_items?.data)
      } else {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: [] });
      }
    }

  }


  getFarmCallBack(farmDetails: any, error: any) {
    if (error) {
      this.setState({ show_loader: true })
      Alert.alert('Error', 'Something went wrong, Please try again later')
    } else {
      this.setState({ productDetails: farmDetails.data[0], show_loader: false })
    }
  }

  profileDetailsCallback(profileDetails: any) {
    if (profileDetails?.data?.attributes) {
      const {
        about_me,
        email_address,
        facebook_link,
        full_name,
        instagram_link,
        phone_number,
        images,
        whatsapp_link,
        id
      } = profileDetails.data.attributes;

      console.log('profileDetails?.data?.attributes',JSON.stringify(profileDetails?.data?.attributes));
      
      this.setState({
        about_me, email: email_address,
        facebook_link, name: full_name,
        instagram_link, phone_number: String(phone_number),
        profileImage: images[0]?.url,
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
  }

  getNotification(message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.setTokenId != null &&
      this.setTokenId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log("response==>", response, error);
    }
  }

  getSubCategoryProductResponce(message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getSubCategoryProductId != null &&
      this.getSubCategoryProductId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
      const response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (response?.data?.length) {
        this.setState({ searchResults: response.data, show_loader: false, productList: [] })

      }
      else {
        showToast('No product found ')
        this.setState({ productList: [], show_loader: false, searchResults: [] })

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
      console.log("cartData=============", cartData);
      if (cartData?.errors) {
        showToast("Something went wrong")
        this.setState({show_loader:false})
        return false;
      }

      if (cartData?.data) {
        store.dispatch({ type: 'UPDATE_CART_DETAILS', payload: cartData?.data?.attributes?.order_items?.data });
        this.setState({ show_loader: false })
        showToast('Product Added to the cart')
        this.props.navigation.goBack()
      } else {
        const errorMessage = cartData.errors[0].errors;
        showToast(errorMessage)
      }
    }
  }
  addToFavCallBack(AddToFavRes: any, error: any) {
    if (error) {
      showToast("Something went wrong");
    }
    else {

this.getProductApiCallAsPerScreen(AddToFavRes)

    }
  
  }
getProductApiCallAsPerScreen(AddToFavRes:{message?:string,data:object})
{
  if (AddToFavRes?.message === 'Product removed from favourites') {
    showToast("Product removed from favourites");
    this.setState({isProductFavourite:false})
    if (!this.state.isFavouriteFunctionCallingFromProfile) { this.getProductList(true) }
    if (this.state.isFavouriteFunctionCallingFromProfile) {this.getFavorites()}
    if (this.state.isRecommended) { this.getRecommendProduct('')}
    return;
  }
  else if (AddToFavRes?.data) {
    showToast("Product added to favorites");
    this.setState({isProductFavourite:true})
    if (!this.state.isFavouriteFunctionCallingFromProfile) { this.getProductList(true) }
    if (this.state.isFavouriteFunctionCallingFromProfile) {this.getFavorites()}
    if (this.state.isRecommended) { this.getRecommendProduct('')}
      
    
    return;
  }
}

  addProductCallback(error: any, response: any) {
    if (error) {
      console.log('error>>>>>>>>>>>>>>>', error);

      this.showAlert('something went wrong')
    } else {
      console.log('response>>>>>>>>>>>>>>>', response);

    }
  }

  aboutusCallback(aboutus: any, error: any) {
    if (error) {
      this.setState({ show_loader: false })
    } else {
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
  getSubcategoryCallback(subCategories: any, error: any) {
    if (subCategories?.data == null) {
      showToast(' No sub category is available for the selected catetgory')
      this.setState({ show_loader: false })
      return
    }
    if (error) {
      this.setState({ show_loader: false })
      showToast(' No sub category is available for the selected catetgory')
    } else {
      if (subCategories?.data?.length) {
        let arr = []
        for (let i = 0; i < subCategories?.data.length; i++) {

          let obj = {
            id: subCategories?.data[i].attributes?.id,
            title: subCategories?.data[i].attributes?.name
          }
          arr.push(obj)
        }
        this.setState({
          subcategories: subCategories?.data,
          show_loader: false, animalCutsOptionsList: arr, subCategoryList: arr
        })
      }
      else {
        let arr = []
        let obj = {
          id: subCategories?.data.attributes?.id,
          title: subCategories?.data.attributes?.name
        }
        arr.push(obj)

        this.setState({
          subcategories: subCategories?.data?.attributes.catalogue?.catalogues,
          show_loader: false, animalCutsOptionsList: arr, subCategoryList: arr
        })
      }

    }
  }
  categoryCallback(error: any, categories: Array<{ attributes: { categoryId: string, name: string } }>) {


    if (error) {
      Alert.alert('Error', 'Something went wrong, Please try again later')
      this.setState({ show_loader: false, refresh: false });
    } else {
      if (categories) {
        let arr = []
        for (const category of categories) {
          if (this.state.isMyProfile) {
            const obj = {
              'id': category?.attributes?.categoryId,
              'attributes': {
                'name': category?.attributes?.name
              }
            };
            arr.push(obj);
          } else {
            const obj = {
              'id': category?.attributes?.categoryId,
              'title': category?.attributes?.name
            };
            arr.push(obj);
          }
        }

        this.categoryPage = null;
        this.setState({ categoryList: arr, categories: arr, subCategoryList: [] })
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
  getProductDetailsByCategoryCallback(error: any, catalogResponse: any) {
    if (error) {
      this.showAlert('something went wrong')
    } else if (catalogResponse) {
      console.log('+++++++++++++++', catalogResponse.data.attributes?.catalogue_variants[0])
      console.log('catalogResponse.data.attributes?.catalogue_variants[0].attributes.itemId', catalogResponse.data.attributes?.catalogue_variants[0].attributes.itemId
      )
      let tempArr: any = []
      catalogResponse.data.attributes?.catalogue_variants.map((item: any) => {
        console.log('item attributes=========', item.attributes,)
        const data: { value: string, label: string, price: '', productImage: '' } = {
          value: item.attributes.itemId,
          label: item.attributes.variantType,
          price: item.attributes.price,
          productImage: item.attributes?.productImage
        };
        tempArr.push(data)
      }
      )
      const { price, stock_qty, productImage, variantType, itemId } =
        catalogResponse.data.attributes?.catalogue_variants[0].attributes;

      const obj = {
        price: price, productImage: productImage,
        quantity: stock_qty ? Number(stock_qty) : 0,
        variantArray: tempArr, variantType: variantType,
        catalogue_id: Number(itemId)
      }

      this.setState({ variantObject: obj, variantId: catalogResponse.data.attributes?.catalogue_variants[0].attributes.id })
      this.checkStock(catalogResponse.data.attributes?.catalogue_variants[0].attributes.itemId)

    }
  }
  getprofileDetailsId: string = '';
  setTokenId: string = '';
  updateProfileDetailsId: string = '';
  getCategoriesId: string = '';
  getProductDetailsByCategoryCallId: string = '';
  checkStockCallId: string = '';
  getFarmId: string = '';
  getAboutUsId: any;
  getSubCategoryId: string = '';
  getSubCategoryProductId: string = ''
  getBlogPostsId: string = '';
  getVideoLibraryId: string = '';
  categoryPage: any = 1;
  addToFavId: string = ''
  getCartId: string = '';
  homePageInfoId: string = '';
  addToCartId: string = '';
  filterProductByCategoryId: string = '';
  filterByCategoryApiId: string = '';
  recommendProductApiCallId: string = '';
  remainingProductApiCallId: string = '';
  getSlotsAndMerchantAddressCallId: string = ''
  userAddressApiCallId: string = ''
  submitPickupRequestCallId: string = '';
  updateProductViewCountCallId: string = '';

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
  favListProps = {
    getFavoritesList: this.getFavorites
  }

  getFavoritesDeleteId: string = '';
  upDateFavList = {
    getUpDateFavList: this.removeFavListProduct
  }
  async getCategory(page: number, loader = true) {
    this.setState({ show_loader: false, subCategoryList: [] })
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

  async checkStock(id: number) {
    // this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };


    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.checkStockCallId = getValidationsMsg.messageId;


    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_categories/categories/check_stock_availability?item_id=${id}`
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

  async getProductDetailsByCategoryId(categoryId: number, isFave:boolean,loader = true) {
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    console.log("isFav++++++++++++++++",isFave);
    
    this.setState({ show_loader: true,isProductFavourite:isFave })
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };

    if (data?.meta?.token == undefined) {
      this.props.navigation.navigate('EmailAccountLoginBlock')
    }
    if (!data?.meta?.token == undefined) {
      this.setState({ show_loader: loader })
    }
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProductDetailsByCategoryCallId = getValidationsMsg.messageId;


    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_catalogue/catalogues/${categoryId}`
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

  async updateProductViewCount(id: number, loader = true) {
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };


    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateProductViewCountCallId = getValidationsMsg.messageId;


    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_catalogue/catalogues/product_views_by_user?id=${id}`
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

  async farmDetails(loader = true) {
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };

    if (data?.meta?.token == undefined) {

      this.props.navigation.navigate('EmailAccountLoginBlock')
    }

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getFarmId = getValidationsMsg.messageId;
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.farmsEndpoint
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
    if (this.props?.state?.name === '') {
      this.showAlert('Name can not be blank')
      return false;
    }

    if (whiteSpace(this.props.state.name)) {
      this.showAlert('The name cannot have leading or trailing white spaces.');
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

    if (this.props.state.phone_number.length < 10) {
      this.showAlert('please enter correct phone number')
      return false;
    }




    return true
  }

  async updateProfileDetails(firstTime: boolean) {

    if (!this.checkValidation()) {
      return
    }

    this.props.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails');
    const data: any = JSON.parse(userDetails);
    const formdata: any = new FormData();
    if (this.props.state?.profileImage?.path) {
      const imagePath = this.props.state.profileImage.path
      const imageName = this.props.state?.profileImage?.filename ?
        this.props.state?.profileImage?.filename : imagePath.slice(imagePath.lastIndexOf('/') + 1)
      const filename = `${data?.meta?.token}${new Date().getTime()}${imageName}`
      console.log('photo',imagePath);
      console.log('photo1',this.props.state?.profileImage?.mime);
      console.log('filename',filename);

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
  async getProductByCategory(id: number) {
    console.log('getProductByCategory id==========', id);

    this.setState({ show_loader: false })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)

    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };
    if (data?.meta?.token == undefined) {
      this.props.navigation.navigate('EmailAccountLoginBlock')
    }
    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.filterProductByCategoryId = getValidationsMsg.messageId;
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_categories/categories/fetch_products_by_category?category_id=${id}`
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


  async getRemainingProduct(id: any) {
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
    this.remainingProductApiCallId = getValidationsMsg.messageId;
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_catalogue/catalogues/my_credits?category_id=${id}&start_date=2023-08-04&end_date=2023-08-11`
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


  async getSubcategories(subCategoryId: number) {

    this.setState({ show_loader: true, selectedSub: '', })
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

  async getProductBySubcategory(subCategoryId: number) {
    this.setState({ show_loader: true, searchResults: [] })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const headers = {
      'token': data?.meta?.token
    };
    const subcategory = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSubCategoryProductId = subcategory.messageId;


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
    const { images, desciption, category_id, sub_category_id, name,
      price, sellingPrice, tax, hsnCode,
      subscription, subscriptionSellingPrice } = this.state.productsList[0]

    if (name.length == 0) { this.showAlert('Please provide title'); return }
    if (category_id.length == 0) { this.showAlert('Please provide category'); return }
    if (sub_category_id.length == 0) { this.showAlert('Please provide sub-category'); return }
    if (price.length == 0) { this.showAlert('Please provide price'); return }
    if (desciption.length == 0) { this.showAlert('Please provide description'); return }
    if (images.length == 0) { this.showAlert('Please add image'); return }
    const filename = `${new Date().getTime()}`
    const formData = new FormData();
   
    const imagePath = this.state.productsList[0].images[0].path
    formData.append('images', {
      uri: imagePath,
      type: this.state.productsList[0].images[0].mime,
      name: filename,
    });
    formData.append("name", 'name'+name)
    formData.append("category_id", "674")
    formData.append("sub_category_id", "34214")
    formData.append("description", ''+desciption)
    formData.append("price", price)
    formData.append("sale_price", sellingPrice)
    formData.append("taxableAmount", tax)
    formData.append("hsnCode", hsnCode)
    formData.append("subscription", subscription)
    formData.append("subscription_selling_price", subscriptionSellingPrice)
    formData.append("free_delivery", "Yes")
    

    for (const [index, obj] of this.state.productsList[0].variants.entries()) {

      formData.append(`catalogue_variants_attributes[${index}][variant_description]`, obj.description)
      formData.append(`catalogue_variants_attributes[${index}][itemNo]`, obj.itemCode)
      formData.append(`catalogue_variants_attributes[${index}][variantType]`, obj.description)
      formData.append(`catalogue_variants_attributes[${index}][price]`, obj.price)
      formData.append(`catalogue_variants_attributes[${index}][images]`, 
      {
        uri: imagePath,
        type: this.state.productsList[0].images[0].mime,
        name: filename,
      }
      )
    }



    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const data: any = JSON.parse(userDetails)
    const header = {
      // "Content-Type": configJSON.validationApiContentType,
      'token': data?.meta?.token
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAddProductId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addProductEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
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
    console.log('cate====', catalogue_id);
    this.setState({ loader: true ,show_loader:true})
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails);
    const header = {
      "Content-Type": 'application/json',
      'token': userDetail?.meta?.token,
    };
    const body = {
      favourites: {
        favouriteable_id: 2,
        favouritebale_type: "AccountBlock::Account",
        catalogue_id: catalogue_id
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
      JSON.stringify(body)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async addToCart(id: number, quantity: number, variantId: number, frequency?: string) {
    this.setState({ show_loader: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails)

    if (userDetail?.meta?.token == undefined) {
      this.props.navigation.navigate("AuthenticationStack", { screen: "AuthenticationStack" });
      return false;
    }
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': userDetail?.meta?.token
    };

    const httpBody = {
      "order_items": {
        "catalogue_id": id,
        'catalogue_variant_id': variantId,
        "quantity": quantity ? quantity : 1,
        "taxable": "true",
        "taxable_value": 0.1233,
        "other_charges": 0.124,
        "delivered_at": "2023-04-21T12:27:59.395Z",
        "frequency": frequency ? frequency : ''
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

  async setNotificationToken() {
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const notificationHelper = new PushNotificationsHelper();
    notificationHelper.addListener(this.props.navigation)
    const fcm_token = await notificationHelper.getFcmToken()
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
      "Content-Type": "application/json",
    };

    const notificationToken = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.setTokenId = notificationToken.messageId;

    notificationToken.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getToken
    );

    notificationToken.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    notificationToken.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({
        "fcm_token": fcm_token
      })
    );

    notificationToken.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(notificationToken.id, notificationToken);
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

  async getHomePageInfo() {
    this.setState({ show_loader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.homePageInfoId = subcategory.messageId;
    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/home_pages'
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
    this.setState({ setProductPage: this.state.setProductPage + 1 }, () => {
      this.getProductList(true)
    });
  }

  async getFavorites() {
     this.setState({ show_loader: true });
    console.log('favo');
    
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
      configJSON.exampleAPiMethod
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
console.log('res favo===================');

      this.setState({ showFavoriteList: getFavoritesList?.data || [], show_loader: false,loader:false })
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
  async submitPickupRequestHandler(deliverOption: any, animalCuts: any,
    selectedSlot: any, userAddressID: any, selectedPortion: any, userAddress: string) {
    const sub_category_id = selectedPortion.map((item: any) => item.id)
    const sub_category_quantity = selectedPortion.map((item: any) => item.quantity)

    if (deliverOption.length == 0) {
      alert('Please select an option')
      return false
    }
    if (animalCuts == 0) {
      alert('Please select animal cuts')
      return false
    }

    if (this.state.setDeliverOption == 'Pickup') {
      if (selectedSlot.length == 0) {
        alert('Please select Pickup slot')
        return false
      }
    }
    if (this.state.setDeliverOption == 'Deliver' || this.state.setDeliverOption == 'Shipping') {
      if (userAddressID.length == 0) {
        alert('Please select address')
        return false
      }

    }
    this.setState({ isLoading: true })
    const userDetails: any = await AsyncStorage.getItem('userDetails')
    const userDetail: any = JSON.parse(userDetails)
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      'token': userDetail?.meta?.token
    };

    const httpBody =
    {
      "order_items": {
        "catalogue_id": sub_category_id,
        "quantity": sub_category_quantity,
        "address": "test Office address",
        "taxable": "true",
        "slot": "4:00PM",
        // "taxable_value":0.1233,
        // "other_charges":0.124
      }
    }

    const userHttpBody = {
      "order_items": {
        "catalogue_id": sub_category_id,
        "quantity": sub_category_quantity,
        "address": userAddress,
        "taxable": "true",
      }
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.submitPickupRequestCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_shopping_cart/order_items/pickup'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(deliverOption == 'Pickup' ? httpBody : userHttpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }

  handleDeliverOptionChange = (item: any) => {
    if (item == 'Pickup') {
      this.getSlotsAndMerchantAddressHandler()
    }
    if (item == 'Shipping' || item == 'Deliver') {
      this.getUserAddress()
    }



    this.setState({ setDeliverOption: item });
  };


  handleAnimalSelectSlots = (item: any) => {
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

  searchProductsCallback = (error: any, response: any) => {
    if (error) {
      this.showAlert('something went wrong ')
    } else if (response) {
      console.log('response====', response);

      this.setState({
        showSearchResults: true, productList: response?.data,
        show_loader: false, searchResults: []
      })
    }
  }

  getSlotsAndMerchantAddressHandler = async () => {

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
      "/bx_block_shippingchargecalculator/pickups"
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

  async getUserAddress() {

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

  // Customizable Area End
}
