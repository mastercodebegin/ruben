import Toast from "react-native-simple-toast";
import { ToastAndroid, Platform } from "react-native";

export const showToast = (message: string) => {
  if (Platform.OS === "ios") {
    Toast.show(message,Toast.LONG);
    return;
  }
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
