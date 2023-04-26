import React, { useEffect } from 'react';
import { View , SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import SocialMediaAccountLoginScreen from '../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import LandingPage from '../blocks/landingpage/src/LandingPage';
import AddProductScreen from '../blocks/landingpage/src/AddProducts/AddProduct'
import MeatLocker from '../components/src/MeatLocker';
import ExplorePage from '../blocks/landingpage/src/ExploreStore/ExplorePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Myprofile from '../blocks/landingpage/src/MyProfile/Myprofile';
import MyCart from '../blocks/landingpage/src/MyCart/MyCart';
import AboutUs from '../blocks/landingpage/src/AboutUs/AboutUs';
import Alert from '../blocks/landingpage/src/Alert/Alert';
import Inventory from '../blocks/landingpage/src/Inventory/Inventory';
import AppLauncher from '../blocks/splashscreen/src/AppLauncher';
import Settings from '../blocks/landingpage/src/SettingsTab/Settings';
import BlogPost from '../blocks/landingpage/src/BlogPosts/BlogPost';
import HomeScreen from '../components/src/HomeScreen';
import ForgotPassword from '../blocks/forgot-password/src/ForgotPassword';
import ResetPassword from '../blocks/forgot-password/src/ResetPasswordScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import OrdersScreen from '../blocks/landingpage/src/OrdersScreen/OrdersScreen'
import MyCreditScreen from '../blocks/landingpage/src/MyCredits/MyCredits';
import { Header } from '../blocks/landingpage/src/BlogPosts/Header';
import VideoLibrary from '../blocks/landingpage/src/BlogPosts/VideoLibrary';
import MyOrdersScreen from '../blocks/Orders/src/screens/MyOrdersScreen';
import TermsAndConditions from '../blocks/TermsAndConditions/src/TermsAndConditions';
import Analytics from '../blocks/analytics/src/Analytics';
import Favourites from '../blocks/favourites/src/Favourites';
import Recomentations from '../blocks/Recomentations/src/recomentations';
import DetailsPage from '../blocks/landingpage/src/BlogPosts/DetailsPage';
import LoadingScreen from '../blocks/landingpage/src/LoadingScreen';
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
const BlogPostStack= ()=>{
  const Stack = createStackNavigator();

    return (
      <SafeAreaView style={{flex:1}}>
      <Header navigation={navigationRef.current}/>
      <Stack.Navigator screenOptions={()=>({
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection:'horizontal',
        headerShown:false
      })}>
       <Stack.Screen name="BlogPost" component={BlogPost} />
       <Stack.Screen name="VideoLibrary" component={VideoLibrary} />
      </Stack.Navigator>
      </SafeAreaView>
    );
  
}
const Stack = createStackNavigator();
const initialState = { currentUser: 'user', profileDetails: null };

const reducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload }
    case 'PROFILE_DETAILS':
      return { ...state, profileDetails: action.payload }
    default:
      return state;
  }
};
const config = {
  screens: {
    // BlogPost: '*',

  },
};

const linking = {
  prefixes: ['https://'],
  config: config,
  getStateFromPath: (path: any) => {
    const specifiedPath =  path.split("=")[0];
    const screen =specifiedPath.split("/").pop()
    switch (screen) {
      case 'video':
        return {
          routes: [
            {
              name: 'LoadingScreen',
              params: { video: path?.split("video=")[1] },
            },
          ],
        };
      case 'token':
        return {
          routes: [
            {
              name: 'ResetPassword',
              params: { token: path?.split("token=")[1] },
              state: {
                index: 1,
                routes: [
                  {
                    name: 'Settings',
                    params: { id: '42' },
                  },
                ],
              },
            },
          ],
        };
      default:
        return null;
    }
  },
};
export const navigationRef = React.createRef();

export const store = createStore(reducer);
const RootNavigator = ({ initialScreen }: NavigatorType) => {

  return (
    <NavigationContainer
      //@ts-ignore
      ref={navigationRef}
      //@ts-ignore
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
        <Stack.Screen
          name="EmailAccountLoginBlock"
          component={EmailAccountLoginBlock}
        />
        <Stack.Screen name="Myprofile" component={Myprofile} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="MeatLocker" component={MeatLocker} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ExplorePage" component={ExplorePage} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Alert" component={Alert} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name='TermsAndCondition' component={TermsAndConditions}/>
        <Stack.Screen name='MyFavoritesScreen' component={Favourites}/>
        <Stack.Screen name='OrdersScreen' component={OrdersScreen}/>
        <Stack.Screen name='AddProducts' component={AddProductScreen}/>
        <Stack.Screen name='MyCreditScreen' component={MyCreditScreen} />
        <Stack.Screen name='BlogPostStack' component={BlogPostStack}/>
        <Stack.Screen name='MyOrdersScreen' component={MyOrdersScreen}/>
        <Stack.Screen name='AnalyticsScreen' component={Analytics}/>
        <Stack.Screen name='Recomentations' component={Recomentations}/>
        <Stack.Screen name='DetailsPage' component={DetailsPage}/>
        <Stack.Screen name='LoadingScreen' component={LoadingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export function App() {
  const [initialScreen, setInitialScreen] = React.useState({
    show: true,
    initialRoute: '',
  });
  const getUserDetails = () => {
    AsyncStorage.getItem('userDetails').then((res:any) => {
      const usr_details= JSON.parse(res);
      if(usr_details?.meta?.user_type === 'merchant'){
        store.dispatch({type:'UPDATE_USER',payload:'merchant'})
      }
      setTimeout(() => {
        if (res) setInitialScreen({ show: false, initialRoute: 'LandingPage' });
        else {
          setInitialScreen({ show: false, initialRoute: 'Splashscreen' });
        }
      }, 2000);
    });
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
          <RootNavigator initialScreen={initialScreen.initialRoute} />
        )}
      </View>
    </Provider>
  );
}
