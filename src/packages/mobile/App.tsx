import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SocialMediaAccountLoginScreen from '../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen';
import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import LandingPage from '../blocks/landingpage/src/LandingPage';
import MeatLocker from '../components/src/MeatLocker';
import ExplorePage from '../blocks/landingpage/src/ExploreStore/ExplorePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Myprofile from '../blocks/landingpage/src/MyProfile/Myprofile';
import AppLauncher from '../blocks/splashscreen/src/AppLauncher';
import Settings from '../blocks/landingpage/src/SettingsTab/Settings';
import BlogPost from '../blocks/landingpage/src/BlogPosts/BlogPost';
import HomeScreen from '../components/src/HomeScreen';

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

const RootNavigator = ({initialScreen}: NavigatorType) => (
  <Stack.Navigator
    initialRouteName={initialScreen}
    screenOptions={{headerShown: false, animationEnabled: false}}>
    <Stack.Screen name="Splashscreen" component={Splashscreen} />
    <Stack.Screen name="LandingPage" component={LandingPage} />
    <Stack.Screen
      name="SocialMediaAccountLoginScreen"
      component={SocialMediaAccountLoginScreen}
    />
    <Stack.Screen name="BlogPost" component={BlogPost} />
    <Stack.Screen name="ExplorePage" component={ExplorePage} />
    <Stack.Screen
      name="EmailAccountLoginBlock"
      component={EmailAccountLoginBlock}
    />
    <Stack.Screen name="Myprofile" component={Myprofile} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="MeatLocker" component={MeatLocker} />
    <Stack.Screen name="Home" component={ExplorePage} />
  </Stack.Navigator>
);

export function App() {
  const [initialScreen, setInitialScreen] = React.useState({
    show: true,
    initialRoute: '',
  });
  const getUserDetails =  () => {
     AsyncStorage.getItem('userDetails').then(res => {
      setTimeout(() => {
        if (res) setInitialScreen({show: false, initialRoute: 'LandingPage'});
        else {
          setInitialScreen({show: false, initialRoute: 'Splashscreen'});
        }
      }, 2000);
    });
  };
  React.useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {initialScreen.show ? (
          <AppLauncher />
        ) : (
          <RootNavigator initialScreen={initialScreen.initialRoute} />
        )}
      </NavigationContainer>
    </View>
  );
}
