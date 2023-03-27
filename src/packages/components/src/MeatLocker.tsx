import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import Button from "./CustomButton";
//@ts-ignore

const meatImage1 = require("./meatimage@1.jpg");
const meatImage2 = require("./meatimage@2.jpg");
const meatImage3 = require("./meatimage@3.jpg");
interface MeatLockerTypes {
  navigation: any;
  route:any;
}
const MeatLocker = ({ navigation,route }: MeatLockerTypes) => {
  const onPressContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: route?.params?.screen ? route?.params?.screen:  "Myprofile" ,
      params: {firstTime:true }}],
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <View style={{ flex: 1 }}>
            <Text style={styles.header}>What is the</Text>
            <Text style={styles.header}>Meat Locker?</Text>
            <Text style={styles.text}>
              A Terms and Conditions is not required and it's not mandatory by
              law.
            </Text>
            <Text style={styles.text}>
              Unlike Privacy Policies, which are required by laws such as the
              GDPR,CalOPPA and many others, There's no law or regulation on
              Terms and Conditions.
            </Text>
            <Text style={styles.text}>
              However, having a Terms and Conditions gives you the right to
              terminate the access to users who do not follow your rules and
              guidelines, as well as other desirable business benefits.
            </Text>
            <Text style={styles.text}>
              It's extremely important to have this agreement if you operate a
              SaaS app.
            </Text>
            <View style={styles.imageContainer}>
              <View style={styles.images}>
                <Image style={styles.meatImage} source={meatImage1} />
              </View>
              <View style={styles.images}>
                <Image style={styles.meatImage} source={meatImage2} />
              </View>
              <View style={styles.images}>
                <Image style={styles.meatImage} source={meatImage3} />
              </View>
            </View>
          </View>
          <Button
            style={{ marginTop: 30}}
            containerStyle={{ marginBottom:Platform.OS === 'ios' ? 30:undefined}}
            label={"Continue"}
            onPress={onPressContinue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MeatLocker;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 40,
    backgroundColor:
     "#F8F4F4",
    paddingHorizontal:20
  },
  header: {
    fontWeight: "700",
    fontSize: 27,
    color: "#5C2221",
  },
  text: {
    fontSize: 17,
    paddingVertical: 10,
    color: "#8D7D75",
  },
  shadow: { height: 50 },
  images: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageContainer: {
    flexDirection: "row",
    height: 120,
    marginTop: 25,
  },
  meatImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  container: { flexGrow: 1, },
});
