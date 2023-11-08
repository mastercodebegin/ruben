import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SocialMediaAccountLoginScreen from '../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import EmailAccountSignuplock from '../blocks/email-account-login/src/EmailAccountSignupBlock';
import { ReduxLandingPage } from '../blocks/landingpage/src/LandingPage';
import AddProductScreen from '../blocks/landingpage/src/AddProducts/AddProduct'
import MeatLocker from '../components/src/MeatLocker';
import ExplorePage from '../blocks/landingpage/src/ExploreStore/ExplorePage';
import Myprofile from '../blocks/landingpage/src/MyProfile/Myprofile';
import MyCart from '../blocks/MyCart/src/MyCart'
import AboutUs from '../blocks/landingpage/src/AboutUs/AboutUs';
import Alert from '../blocks/landingpage/src/Alert/Alert';
import Inventory from '../blocks/Inventory/src/Inventory';
import AppLauncher from '../blocks/splashscreen/src/AppLauncher';
import Settings from '../blocks/Settings5/src/Settings5'; 
import BlogPost from '../blocks/landingpage/src/BlogPosts/BlogPost';
import HomeScreen from '../components/src/HomeScreen';
import ForgotPassword from '../blocks/forgot-password/src/ForgotPassword';
import ResetPassword from '../blocks/forgot-password/src/ResetPasswordScreen';
import { Provider } from 'react-redux';
import MyCreditScreen from '../blocks/landingpage/src/MyCredits/MyCredits';
import { Header } from '../blocks/landingpage/src/BlogPosts/Header';
import VideoLibrary from '../blocks/landingpage/src/BlogPosts/VideoLibrary';
import MyOrdersScreen from '../blocks/Orders/src/screens/MyOrdersScreen';
import TermsAndConditions from '../blocks/TermsAndConditions/src/TermsAndConditions';
import Analytics from '../blocks/analytics/src/Analytics';
import Favourites from '../blocks/landingpage/src/MyFavorites/MyFavorites';
import Recomentations from '../blocks/Recomentations/src/recomentations';
import DetailsPage from '../blocks/landingpage/src/BlogPosts/DetailsPage';
import LoadingScreen from '../blocks/landingpage/src/LoadingScreen';
import ProductDetailScreen from '../blocks/landingpage/src/ProductDetails/ProductDetails';
import PersonelDetails from '../blocks/PersonelDetails/src/PersonelDetails';
import StripeIntegration from '../blocks/StripeIntegration/src/StripeIntegration';
import OrderSummary from '../blocks/OrderSummary/src/OrderSummary';
import { linking, store } from '../components/src/utils';
import { getStorageData } from '../framework/src/Utilities';
import InvoiceBilling from '../blocks/InvoiceBilling/src/InvoiceBilling';
import ContactUs from '../blocks/contactus/src/ContactusScreen';
import Ordermanagement from '../blocks/ordermanagement/src/Ordermanagement';
import PushNotificationHelper from '../blocks/pushnotifications/src/PushNotificationsHelper';
import ViewProduct from '../blocks/landingpage/src/ExploreStore/ViewProduct';

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };
  const homeScreen = new HomeScreen(defaultProps);
  console.log(homeScreen);

}
interface NavigatorType {
  initialScreen: string;
}
const BlogPostStack = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigationRef.current} />
      <Stack.Navigator screenOptions={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
        headerShown: false
      }}>
        <Stack.Screen name="BlogPost" component={BlogPost} />
        <Stack.Screen name="VideoLibrary" component={VideoLibrary} />
      </Stack.Navigator>
    </SafeAreaView>
  );

}
const AuthenticationStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      gestureDirection: 'horizontal',
      headerShown: false
    }}>
      <Stack.Screen name="EmailAccountLoginBlock" component={EmailAccountLoginBlock} />
      <Stack.Screen name="EmailAccountSignupBlock" component={EmailAccountSignuplock} />
    </Stack.Navigator>
  );

}
const Stack = createStackNavigator();

export const navigationRef: any = React.createRef();

const RootNavigator = ({ initialScreen }: NavigatorType) => {

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
    >
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen
          name="SocialMediaAccountLoginScreen"
          component={SocialMediaAccountLoginScreen}
        />
        <Stack.Screen name="Myprofile" component={Myprofile} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="MeatLocker" component={MeatLocker} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ExplorePage" component={ExplorePage} />
        <Stack.Screen name="ViewProduct" component={ViewProduct} />
        <Stack.Screen name="LandingPage" component={ReduxLandingPage} />
        <Stack.Screen name="Alert" component={Alert} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name='TermsAndCondition' component={TermsAndConditions} />
        <Stack.Screen name='MyFavoritesScreen' component={Favourites} />
        <Stack.Screen name='OrdersScreen' component={Ordermanagement} />
        <Stack.Screen name='AddProducts' component={AddProductScreen} />
        <Stack.Screen name='MyCreditScreen' component={MyCreditScreen} />
        <Stack.Screen name='BlogPostStack' component={BlogPostStack} />
        <Stack.Screen name='MyOrdersScreen' component={MyOrdersScreen} />
        <Stack.Screen name='AnalyticsScreen' component={Analytics} />
        <Stack.Screen name='Recomendations' component={Recomentations} />
        <Stack.Screen name='DetailsPage' component={DetailsPage} />
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="PersonelDetails" component={PersonelDetails} />
        <Stack.Screen name="StripeIntegration" component={StripeIntegration} />
        <Stack.Screen name="OrderSummary" component={OrderSummary}/>
        <Stack.Screen name="AuthenticationStack" component={AuthenticationStack}/>
        <Stack.Screen name='InvoiceBilling' component={InvoiceBilling}/>
        <Stack.Screen name="ContactUs" component={ContactUs}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export function App() {
  const [initialScreen, setInitialScreen] = React.useState({
    show: true,
    initialRoute: '',
  });

  const getUserDetails = async () => {
    const notificationHelper = new PushNotificationHelper();
    notificationHelper.addListener()
      const usr_details=  await getStorageData('userDetails',true);
      if(usr_details?.meta?.user_type === 'merchant'){
        store.dispatch({type:'UPDATE_USER',payload:'merchant'})
      }      
      setTimeout(() => {
        if (usr_details?.meta?.token) setInitialScreen({ show: false, initialRoute: 'LandingPage' });
        else {
          setInitialScreen({ show: false, initialRoute: 'Splashscreen' });
        }
      }, 2000);
  };
  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        {initialScreen.show ? (
          <AppLauncher />
        ) : (
          <>
              <RootNavigator initialScreen={initialScreen.initialRoute} />
            </>
        )}
          </View>
    </Provider>
  );
}
