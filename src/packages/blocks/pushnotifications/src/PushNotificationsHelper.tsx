import messaging from "@react-native-firebase/messaging";
//@ts-ignore
import { PermissionsAndroid, Platform } from "react-native";
import { setStorageData } from "../../../framework/src/Utilities";
interface NotificationDataType {
  title?: string;
  body?: string;
}
export default class PushNotificationsHelper {

  messageInstance = messaging();

  async requestPermissionAndroid() {
    //@ts-ignore
    const androidPermissionStatus = await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS');
    if (androidPermissionStatus === 'granted') {
      return 1;
    }
     return 0;
  }

  async requestPermission() {
    const permissionStatus = await this.messageInstance.hasPermission();
    
    if (permissionStatus === 1) {
      return permissionStatus;
    }
    if (Platform.OS === 'android') {
      const androidPermissionStatus = await this.requestPermissionAndroid();
      return androidPermissionStatus;
    }
    const pushNotificationPermission = await this.messageInstance.requestPermission();
    return pushNotificationPermission;
  }


  async handleNotificationsReceive({ body = "", title = "" }: NotificationDataType) {
    alert(title)
    alert("Notification received")
  }



  addListener() {
    //when app is in background if we came from notification onNotificationOpenedApp will called
    this.messageInstance.onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "message from remote notification ",
        remoteMessage.notification
      );
    });
    //while app is in alive state onMessage function will be called
    this.messageInstance.onMessage(async (remoteMessage) => {
      console.log(
        "message from remote notification alive 60 ",
        remoteMessage.notification
      );
      this.handleNotificationsReceive({title: remoteMessage.notification?.title, body:remoteMessage.notification?.body});
    });
    // if we open app from notification when app is not alive
    this.messageInstance.getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
  }
  async getFcmToken() {
    let fcmToken;
    const notificationPermission = await this.requestPermission();
    const enabled =
      notificationPermission === messaging.AuthorizationStatus.AUTHORIZED ||
      notificationPermission === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      fcmToken = await this.messageInstance.getToken();
      // alert(fcmToken)
      console.log("fcmToken===>",fcmToken);
      
      setStorageData('fcm_token', fcmToken);
    }

    return fcmToken;
  }
}
