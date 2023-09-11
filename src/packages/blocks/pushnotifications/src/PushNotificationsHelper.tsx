import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
//@ts-ignore
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
interface NotificationDataType {
  title?: string;
  body?: string;
}
export default class PushNotificationsHelper {

  messageInstance = messaging();

  async requestPermission() {
    return await this.messageInstance.requestPermission();
  }

  createNotificationChannel() {
    PushNotification.createChannel(
      {
        channelId: "com.Farm2URDoor",
        channelName: "com.Farm2URDoor",
        importance: 4,
        vibrate: true,
      }
    );
  }

  async handleNotificationsReceive({ body = "", title = "" }: NotificationDataType) { 
    if (Platform.OS === 'ios') {
      await PushNotificationIOS.requestPermissions()
      
      PushNotificationIOS.addNotificationRequest({
        id: 'com.Farm2URDoor',
        body,
        title
      })
      return;
    }
    this.createNotificationChannel();
      PushNotification.localNotification({
        title: title,
        message: body,
        channelId: "com.Farm2URDoor",
        playSound: true,
        vibrate: true,
        soundName: "default",
      });
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
    }

    return fcmToken;
  }
}
