import React from 'react';

import {
  createStackNavigator
} from "react-navigation";

import HomeScreen from "../components/src/HomeScreen";
import InfoPage from '../blocks/info-page/src/InfoPageBlock'
import MeatTypeMap from "../blocks/MeatTypeMap/src/MeatTypeMap";
import VisualAnalytics from "../blocks/visualanalytics/src/VisualAnalytics";
import CustomisableUserProfiles from "../blocks/CustomisableUserProfiles/src/CustomisableUserProfiles";
import VideoLibrary from "../blocks/VideoLibrary/src/VideoLibrary";
import Ordermanagement from "../blocks/ordermanagement/src/Ordermanagement";
import OrderDetails from "../blocks/ordermanagement/src/OrderDetails";
import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import Documentation from "../blocks/Documentation/src/Documentation";
import StripeIntegration from "../blocks/StripeIntegration/src/StripeIntegration";
import ShoppingCartOrders from "../blocks/shoppingcart/src/ShoppingCartOrders";
import AddShoppingCartOrderItem from "../blocks/shoppingcart/src/AddShoppingCartOrderItem";
import Favourites from "../blocks/favourites/src/Favourites";
import AddFavourites from "../blocks/favourites/src/AddFavourites";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import RolesPermissions2 from "../blocks/RolesPermissions2/src/RolesPermissions2";
import InvoiceBilling from "../blocks/InvoiceBilling/src/InvoiceBilling";
import Videos from "../blocks/videos/src/Videos";
import NavigationMenu from "../blocks/navigationmenu/src/NavigationMenu";
import Pushnotifications from "../blocks/pushnotifications/src/Pushnotifications";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import DeliveryEstimator13 from "../blocks/DeliveryEstimator13/src/DeliveryEstimator13";
import Promocodes from "../blocks/promocodes/src/Promocodes";
import PromocodeDetails from "../blocks/promocodes/src/PromocodeDetails";
import Wishlist2 from "../blocks/Wishlist2/src/Wishlist2";
import Analytics from "../blocks/analytics/src/Analytics";
import Customisableusersubscriptions from "../blocks/customisableusersubscriptions/src/Customisableusersubscriptions";
import SubscriptionDetails from "../blocks/customisableusersubscriptions/src/SubscriptionDetails";
import PostCreation from "../blocks/postcreation/src/PostCreation";
import Posts from "../blocks/postcreation/src/Posts";
import PostDetails from "../blocks/postcreation/src/PostDetails";
import Trending from "../blocks/Trending/src/Trending";
import AdminConsole3 from "../blocks/AdminConsole3/src/AdminConsole3";
import Settings5 from "../blocks/Settings5/src/Settings5";
import UserProfileBasicBlock from "../blocks/user-profile-basic/src/UserProfileBasicBlock";
import BulkUploading from "../blocks/BulkUploading/src/BulkUploading";
import Categoriessubcategories from "../blocks/categoriessubcategories/src/Categoriessubcategories";
import CountryCodeSelector from "../blocks/country-code-selector/src/CountryCodeSelector";
import CountryCodeSelectorTable from "../blocks/country-code-selector/src/CountryCodeSelectorTable";
import ShippingChargeCalculator from "../blocks/ShippingChargeCalculator/src/ShippingChargeCalculator";
import Share from "../blocks/share/src/Share";
import TermsAndConditions from "../blocks/TermsAndConditions/src/TermsAndConditions";
import SocialMediaAccountRegistrationScreen from "../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Sorting from "../blocks/sorting/src/Sorting";
import Contactus from "../blocks/contactus/src/Contactus";
import AddContactus from "../blocks/contactus/src/AddContactus";
import ProductRecommendationEngine from "../blocks/ProductRecommendationEngine/src/ProductRecommendationEngine";
import Catalogue from "../blocks/catalogue/src/Catalogue";
import EducationalUserProfile from "../blocks/educational-user-profile/src/EducationalUserProfile";
import EmailAccountRegistration from "../blocks/email-account-registration/src/EmailAccountRegistration";
import Splashscreen from "../blocks/splashscreen/src/Splashscreen";
import TargetedFeed from "../blocks/TargetedFeed/src/TargetedFeed";
import Onboardingguide from "../blocks/onboardingguide/src/Onboardingguide";
import EmailAccountLoginBlock from "../blocks/email-account-login/src/EmailAccountLoginBlock";
import LandingPage from "../blocks/landingpage/src/LandingPage";
import Search from "../blocks/search/src/Search";
import MeatLocker from '../components/src/MeatLocker';
import ExplorePage from '../blocks/landingpage/src/ExploreStore/ExplorePage'
const HomeStack = createStackNavigator({
Home: { screen: Splashscreen, navigationOptions: { header: null, title: "Splashscreen" } },
MeatTypeMap:{ screen:MeatTypeMap,navigationOptions:{ title:"MeatTypeMap"}},
ExplorePage:{ screen:ExplorePage,navigationOptions:{ header: null,title:"ExplorePage"}},
VisualAnalytics:{ screen:VisualAnalytics,navigationOptions:{ title:"VisualAnalytics"}},
CustomisableUserProfiles:{ screen:CustomisableUserProfiles,navigationOptions:{ title:"CustomisableUserProfiles"}},
VideoLibrary:{ screen:VideoLibrary,navigationOptions:{ title:"VideoLibrary"}},
Ordermanagement:{ screen:Ordermanagement,navigationOptions:{ title:"Ordermanagement"}},
OrderDetails:{ screen:OrderDetails,navigationOptions:{ title:"OrderDetails"}},
SocialMediaAccountLoginScreen:{ screen:SocialMediaAccountLoginScreen,navigationOptions:{ title:"SocialMediaAccountLoginScreen"}},
Documentation:{ screen:Documentation,navigationOptions:{ title:"Documentation"}},
StripeIntegration:{ screen:StripeIntegration,navigationOptions:{ title:"StripeIntegration"}},
ShoppingCartOrders:{ screen:ShoppingCartOrders,navigationOptions:{ title:"ShoppingCartOrders"}},
AddShoppingCartOrderItem:{ screen:AddShoppingCartOrderItem,navigationOptions:{ title:"AddShoppingCartOrderItem"}},
Favourites:{ screen:Favourites,navigationOptions:{ title:"Favourites"}},
AddFavourites:{ screen:AddFavourites,navigationOptions:{ title:"AddFavourites"}},
OTPInputAuth:{ screen:OTPInputAuth,navigationOptions:{ title:"OTPInputAuth"}},
RolesPermissions2:{ screen:RolesPermissions2,navigationOptions:{ title:"RolesPermissions2"}},
InvoiceBilling:{ screen:InvoiceBilling,navigationOptions:{ title:"InvoiceBilling"}},
Videos:{ screen:Videos,navigationOptions:{ title:"Videos"}},
NavigationMenu:{ screen:NavigationMenu,navigationOptions:{ title:"NavigationMenu"}},
Pushnotifications:{ screen:Pushnotifications,navigationOptions:{ title:"Pushnotifications"}},
ForgotPassword:{ screen:ForgotPassword,navigationOptions:{ title:"ForgotPassword"}},
ForgotPasswordOTP:{ screen:ForgotPasswordOTP,navigationOptions:{ title:"ForgotPasswordOTP"}},
NewPassword:{ screen:NewPassword,navigationOptions:{ title:"NewPassword"}},
DeliveryEstimator13:{ screen:DeliveryEstimator13,navigationOptions:{ title:"DeliveryEstimator13"}},
Promocodes:{ screen:Promocodes,navigationOptions:{ title:"Promocodes"}},
PromocodeDetails:{ screen:PromocodeDetails,navigationOptions:{ title:"PromocodeDetails"}},
Wishlist2:{ screen:Wishlist2,navigationOptions:{ title:"Wishlist2"}},
Analytics:{ screen:Analytics,navigationOptions:{ title:"Analytics"}},
Customisableusersubscriptions:{ screen:Customisableusersubscriptions,navigationOptions:{ title:"Customisableusersubscriptions"}},
SubscriptionDetails:{ screen:SubscriptionDetails,navigationOptions:{ title:"SubscriptionDetails"}},
PostCreation:{ screen:PostCreation,navigationOptions:{ title:"PostCreation"}},
Posts:{ screen:Posts,navigationOptions:{ title:"Posts"}},
PostDetails:{ screen:PostDetails,navigationOptions:{ title:"PostDetails"}},
Trending:{ screen:Trending,navigationOptions:{ title:"Trending"}},
AdminConsole3:{ screen:AdminConsole3,navigationOptions:{ title:"AdminConsole3"}},
Settings5:{ screen:Settings5,navigationOptions:{ title:"Settings5"}},
UserProfileBasicBlock:{ screen:UserProfileBasicBlock,navigationOptions:{ title:"UserProfileBasicBlock"}},
BulkUploading:{ screen:BulkUploading,navigationOptions:{ title:"BulkUploading"}},
Categoriessubcategories:{ screen:Categoriessubcategories,navigationOptions:{ title:"Categoriessubcategories"}},
CountryCodeSelector:{ screen:CountryCodeSelector,navigationOptions:{ title:"CountryCodeSelector"}},
CountryCodeSelectorTable:{ screen:CountryCodeSelectorTable,navigationOptions:{ title:"CountryCodeSelectorTable"}},
ShippingChargeCalculator:{ screen:ShippingChargeCalculator,navigationOptions:{ title:"ShippingChargeCalculator"}},
Share:{ screen:Share,navigationOptions:{ title:"Share"}},
TermsAndConditions:{ screen:TermsAndConditions,navigationOptions:{ title:"TermsAndConditions"}},
SocialMediaAccountRegistrationScreen:{ screen:SocialMediaAccountRegistrationScreen,navigationOptions:{ title:"SocialMediaAccountRegistrationScreen"}},
Sorting:{ screen:Sorting,navigationOptions:{ title:"Sorting"}},
Contactus:{ screen:Contactus,navigationOptions:{ title:"Contactus"}},
AddContactus:{ screen:AddContactus,navigationOptions:{ title:"AddContactus"}},
ProductRecommendationEngine:{ screen:ProductRecommendationEngine,navigationOptions:{ title:"ProductRecommendationEngine"}},
Catalogue:{ screen:Catalogue,navigationOptions:{ title:"Catalogue"}},
EducationalUserProfile:{ screen:EducationalUserProfile,navigationOptions:{ title:"EducationalUserProfile"}},
EmailAccountRegistration:{ screen:EmailAccountRegistration,navigationOptions:{ title:"EmailAccountRegistration"}},
Splashscreen:{ screen:Splashscreen,navigationOptions:{ title:"Splashscreen"}},
TargetedFeed:{ screen:TargetedFeed,navigationOptions:{ title:"TargetedFeed"}},
Onboardingguide:{ screen:Onboardingguide,navigationOptions:{ title:"Onboardingguide"}},
EmailAccountLoginBlock:{ screen:EmailAccountLoginBlock,navigationOptions:{ title:"EmailAccountLoginBlock"}},
LandingPage:{ screen:LandingPage,navigationOptions:{ title:"LandingPage",header:null}},
Search:{ screen:Search,navigationOptions:{ title:"Search"}},

  InfoPage: { screen: InfoPage, navigationOptions: { title: "Info" } }, 
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "HomeScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  return (
    <HomeStack/>
  );
};
