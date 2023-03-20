import React,{createContext,useEffect} from 'react';
import { View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SocialMediaAccountLoginScreen from '../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import LandingPage from '../blocks/landingpage/src/LandingPage';
import AddProductScreen from '../blocks/landingpage/src/AddProducts/AddProduct'
import MeatLocker from '../components/src/MeatLocker';
import ExplorePage from '../blocks/landingpage/src/ExploreStore/ExplorePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Myprofile from '../blocks/landingpage/src/MyProfile/Myprofile';
import AppLauncher from '../blocks/splashscreen/src/AppLauncher';
import Settings from '../blocks/landingpage/src/SettingsTab/Settings';
import BlogPost from '../blocks/landingpage/src/BlogPosts/BlogPost';
import HomeScreen from '../components/src/HomeScreen';
import ForgotPassword from '../blocks/forgot-password/src/ForgotPassword';
import ResetPassword from '../blocks/forgot-password/src/ResetPasswordScreen';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };
  const homeScreen = new HomeScreen(defaultProps);
}
interface NavigatorType {
  initialScreen: string;
}
const Stack = createStackNavigator();
export const AppStateContext = createContext({
  currentUser:'user'
})
const initialState = {currentUser:'merchant'};

export const reducer = (state = initialState, action:any) => {  
  switch (action?.type) {
    case 'UPDATE_USER':
      return {...state,currentUser:action.payload}
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
    getStateFromPath: path => {
      switch ('Settings') {
        case 'Settings':
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

export const store = createStore(reducer);
const RootNavigator = ({initialScreen}: NavigatorType) => {  
  const ref = React.createRef();

  return (
    <NavigationContainer 
    ref={ref}
    linking={linking}
    >
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{headerShown: false, animationEnabled: false}}>
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen
          name="SocialMediaAccountLoginScreen"
          component={SocialMediaAccountLoginScreen}
        />
        <Stack.Screen name="BlogPost" component={BlogPost} />
        <Stack.Screen
          name="EmailAccountLoginBlock"
          component={EmailAccountLoginBlock}
        />
        <Stack.Screen name="Myprofile" component={Myprofile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="MeatLocker" component={MeatLocker} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ExplorePage" component={ExplorePage} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="AddProducts" component={AddProductScreen}/>
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
    AsyncStorage.getItem('userDetails').then(res => {
      setTimeout(() => {
        if (res) setInitialScreen({show: false, initialRoute: 'LandingPage'});
        else {
          setInitialScreen({show: false, initialRoute: 'Splashscreen'});
        }
      }, 2000);
    });
  };
 useEffect(()=>{
  getUserDetails()
 },[])
  return (
  <Provider store={store}>
    <View style={{flex: 1}}>
      {initialScreen.show ? (
        <AppLauncher />
      ) : (
          <RootNavigator initialScreen={initialScreen.initialRoute} />
      )}
    </View>
    </Provider>
  );
}
