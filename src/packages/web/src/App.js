// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
import firebase from 'firebase'
import { connect } from 'react-firebase'

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import MeatTypeMap from "../../blocks/MeatTypeMap/src/MeatTypeMap";
import VisualAnalytics from "../../blocks/visualanalytics/src/VisualAnalytics";
import CustomisableUserProfiles from "../../blocks/CustomisableUserProfiles/src/CustomisableUserProfiles";
import VideoLibrary from "../../blocks/VideoLibrary/src/VideoLibrary";
import Ordermanagement from "../../blocks/ordermanagement/src/Ordermanagement";
import OrderDetails from "../../blocks/ordermanagement/src/OrderDetails";
import SocialMediaAccountLoginScreen from "../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import Documentation from "../../blocks/Documentation/src/Documentation";
import StripeIntegration from "../../blocks/StripeIntegration/src/StripeIntegration";
import ShoppingCartOrders from "../../blocks/shoppingcart/src/ShoppingCartOrders";
import AddShoppingCartOrderItem from "../../blocks/shoppingcart/src/AddShoppingCartOrderItem";
import Favourites from "../../blocks/favourites/src/Favourites";
import AddFavourites from "../../blocks/favourites/src/AddFavourites";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import RolesPermissions2 from "../../blocks/RolesPermissions2/src/RolesPermissions2";
import InvoiceBilling from "../../blocks/InvoiceBilling/src/InvoiceBilling";
import Videos from "../../blocks/videos/src/Videos";
import NavigationMenu from "../../blocks/navigationmenu/src/NavigationMenu";
import Pushnotifications from "../../blocks/pushnotifications/src/Pushnotifications";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import DeliveryEstimator13 from "../../blocks/DeliveryEstimator13/src/DeliveryEstimator13";
import Wishlist2 from "../../blocks/Wishlist2/src/Wishlist2";
import Analytics from "../../blocks/analytics/src/Analytics";
import Customisableusersubscriptions from "../../blocks/customisableusersubscriptions/src/Customisableusersubscriptions";
import SubscriptionDetails from "../../blocks/customisableusersubscriptions/src/SubscriptionDetails";
import PostCreation from "../../blocks/postcreation/src/PostCreation";
import Posts from "../../blocks/postcreation/src/Posts";
import PostDetails from "../../blocks/postcreation/src/PostDetails";
import Trending from "../../blocks/Trending/src/Trending";
import AdminConsole3 from "../../blocks/AdminConsole3/src/AdminConsole3";
import Settings5 from "../../blocks/Settings5/src/Settings5";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import BulkUploading from "../../blocks/BulkUploading/src/BulkUploading";
import Categoriessubcategories from "../../blocks/categoriessubcategories/src/Categoriessubcategories";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import ShippingChargeCalculator from "../../blocks/ShippingChargeCalculator/src/ShippingChargeCalculator";
import Share from "../../blocks/share/src/Share";
import TermsAndConditions from "../../blocks/TermsAndConditions/src/TermsAndConditions";
import SocialMediaAccountRegistrationScreen from "../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Sorting from "../../blocks/sorting/src/Sorting";
import Contactus from "../../blocks/contactus/src/Contactus";
import AddContactus from "../../blocks/contactus/src/AddContactus";
import ProductRecommendationEngine from "../../blocks/ProductRecommendationEngine/src/ProductRecommendationEngine";
import Catalogue from "../../blocks/catalogue/src/Catalogue";
import EducationalUserProfile from "../../blocks/educational-user-profile/src/EducationalUserProfile";
import EmailAccountRegistration from "../../blocks/email-account-registration/src/EmailAccountRegistration";
import Splashscreen from "../../blocks/splashscreen/src/Splashscreen";
import TargetedFeed from "../../blocks/TargetedFeed/src/TargetedFeed";
import Onboardingguide from "../../blocks/onboardingguide/src/Onboardingguide";
import EmailAccountLoginBlock from "../../blocks/email-account-login/src/EmailAccountLoginBlock";
import LandingPage from "../../blocks/landingpage/src/LandingPage";
import Search from "../../blocks/search/src/Search";



const routeMap = {
MeatTypeMap:{
 component:MeatTypeMap,
path:"/MeatTypeMap"},
VisualAnalytics:{
 component:VisualAnalytics,
path:"/VisualAnalytics"},
CustomisableUserProfiles:{
 component:CustomisableUserProfiles,
path:"/CustomisableUserProfiles"},
VideoLibrary:{
 component:VideoLibrary,
path:"/VideoLibrary"},
Ordermanagement:{
 component:Ordermanagement,
path:"/Ordermanagement"},
OrderDetails:{
 component:OrderDetails,
path:"/OrderDetails"},
SocialMediaAccountLoginScreen:{
 component:SocialMediaAccountLoginScreen,
path:"/SocialMediaAccountLoginScreen"},
Documentation:{
 component:Documentation,
path:"/Documentation"},
StripeIntegration:{
 component:StripeIntegration,
path:"/StripeIntegration"},
ShoppingCartOrders:{
 component:ShoppingCartOrders,
path:"/ShoppingCartOrders"},
AddShoppingCartOrderItem:{
 component:AddShoppingCartOrderItem,
path:"/AddShoppingCartOrderItem"},
Favourites:{
 component:Favourites,
path:"/Favourites"},
AddFavourites:{
 component:AddFavourites,
path:"/AddFavourites"},
OTPInputAuth:{
 component:OTPInputAuth,
path:"/OTPInputAuth"},
RolesPermissions2:{
 component:RolesPermissions2,
path:"/RolesPermissions2"},
InvoiceBilling:{
 component:InvoiceBilling,
path:"/InvoiceBilling"},
Videos:{
 component:Videos,
path:"/Videos"},
NavigationMenu:{
 component:NavigationMenu,
path:"/NavigationMenu"},
Pushnotifications:{
 component:Pushnotifications,
path:"/Pushnotifications"},
ForgotPassword:{
 component:ForgotPassword,
path:"/ForgotPassword"},
ForgotPasswordOTP:{
 component:ForgotPasswordOTP,
path:"/ForgotPasswordOTP"},
NewPassword:{
 component:NewPassword,
path:"/NewPassword"},
DeliveryEstimator13:{
 component:DeliveryEstimator13,
path:"/DeliveryEstimator13"},
Wishlist2:{
 component:Wishlist2,
path:"/Wishlist2"},
Analytics:{
 component:Analytics,
path:"/Analytics"},
Customisableusersubscriptions:{
 component:Customisableusersubscriptions,
path:"/Customisableusersubscriptions"},
SubscriptionDetails:{
 component:SubscriptionDetails,
path:"/SubscriptionDetails"},
PostCreation:{
 component:PostCreation,
path:"/PostCreation"},
Posts:{
 component:Posts,
path:"/Posts"},
PostDetails:{
 component:PostDetails,
path:"/PostDetails"},
Trending:{
 component:Trending,
path:"/Trending"},
AdminConsole3:{
 component:AdminConsole3,
path:"/AdminConsole3"},
Settings5:{
 component:Settings5,
path:"/Settings5"},
UserProfileBasicBlock:{
 component:UserProfileBasicBlock,
path:"/UserProfileBasicBlock"},
BulkUploading:{
 component:BulkUploading,
path:"/BulkUploading"},
Categoriessubcategories:{
 component:Categoriessubcategories,
path:"/Categoriessubcategories"},
CountryCodeSelector:{
 component:CountryCodeSelector,
path:"/CountryCodeSelector"},
ShippingChargeCalculator:{
 component:ShippingChargeCalculator,
path:"/ShippingChargeCalculator"},
Share:{
 component:Share,
path:"/Share"},
TermsAndConditions:{
 component:TermsAndConditions,
path:"/TermsAndConditions"},
SocialMediaAccountRegistrationScreen:{
 component:SocialMediaAccountRegistrationScreen,
path:"/SocialMediaAccountRegistrationScreen"},
Sorting:{
 component:Sorting,
path:"/Sorting"},
Contactus:{
 component:Contactus,
path:"/Contactus"},
AddContactus:{
 component:AddContactus,
path:"/AddContactus"},
ProductRecommendationEngine:{
 component:ProductRecommendationEngine,
path:"/ProductRecommendationEngine"},
Catalogue:{
 component:Catalogue,
path:"/Catalogue"},
EducationalUserProfile:{
 component:EducationalUserProfile,
path:"/EducationalUserProfile"},
EmailAccountRegistration:{
 component:EmailAccountRegistration,
path:"/EmailAccountRegistration"},
Splashscreen:{
 component:Splashscreen,
path:"/Splashscreen"},
TargetedFeed:{
 component:TargetedFeed,
path:"/TargetedFeed"},
Onboardingguide:{
 component:Onboardingguide,
path:"/Onboardingguide"},
EmailAccountLoginBlock:{
 component:EmailAccountLoginBlock,
path:"/EmailAccountLoginBlock"},
LandingPage:{
 component:LandingPage,
path:"/LandingPage"},
Search:{
 component:Search,
path:"/Search"},

  Home: {
component:Contactus,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: "*/AlertWeb",
    modal: true
  }

};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});

class App extends Component {
   
  render() {

    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');
    
    return (
      <View style={{ height: '100vh', width: '100vw' }}>
        <TopNav />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
