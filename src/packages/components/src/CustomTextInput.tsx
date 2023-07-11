import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput as RNInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  Image,
  KeyboardTypeOptions,
  Platform,
} from "react-native";
import { ShowPassword } from "../../blocks/email-account-login/src/assets";
import { hidePassword } from "../../blocks/email-account-login/src/assets";

interface TextInputType {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onchangeText?: (text: string) => void;
  containerStyle?: StyleProp<TextStyle>;
  keyBoardtype?: KeyboardTypeOptions;
  multiline?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  labeStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
  testID?:string;
  maxLenth?: number;
}
const TextInput = ({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onchangeText,
  containerStyle,
  keyBoardtype,
  multiline=false,
  textInputStyle,
  numberOfLines,
  labeStyle,
  testID,
  maxLenth = 400,
}: TextInputType) => {
  const [secureEntry, setSecureEntry] = React.useState(secureTextEntry);
  return (
    <View style={containerStyle}>
      <Text style={[styles.label, labeStyle]}>{label}</Text>
      <View>
        <RNInput
          secureTextEntry={secureEntry}
          style={[styles.textinput, textInputStyle]}
          value={value}
          keyboardType={keyBoardtype}
          multiline={multiline}
          testID={testID}
          numberOfLines={numberOfLines}
          onChangeText={onchangeText}
          autoCapitalize="none"
          maxLength={maxLenth}
          placeholder={placeholder}
        />
        {secureTextEntry && (
          <View style={styles.showContainer}>
            <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
              <Image
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
                source={secureEntry ? hidePassword : ShowPassword}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default TextInput;
const styles = StyleSheet.create({
  textinput: {
    borderBottomColor: "#8D7D75",
    borderBottomWidth: 1,
    color: "black",
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 20 : undefined,
    fontFamily:'Gilroy-Bold',
    fontSize:17
  },

  label: {
    fontSize: 15,
  },
  showContainer: {
    top: 0,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    right: 10,
  },
});
