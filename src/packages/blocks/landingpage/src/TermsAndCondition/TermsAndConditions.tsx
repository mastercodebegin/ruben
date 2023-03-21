import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { backArrow, DARK_RED, WHITE, LIGHT_GREY } from "../assets";
//@ts-ignore
import { TERMS_AND_CONDITIONS } from "../../../../components/src/constants";
const TermsAndCondition = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.back} source={backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{TERMS_AND_CONDITIONS}</Text>
        </View>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.text}>
            A Terms and Conditions is not required and it's not mandatory by
            law.
          </Text>
          <Text style={styles.text}>
            Unlike Privacy Policies, which are required by laws such as the
            GDPR, CalOPPA and many others, there's no law or regulation on Terms
            and Conditions.
          </Text>
          <Text style={styles.text}>
            However, having a Terms and Conditions gives you the right to
            terminate the access of abusive users or to terminate the access to
            users who do not folow your rules and guidelines, as well as other
            desirable Business benefits
          </Text>
          <Text style={styles.text}>
            It's extremely important to have this agreement if you operate &
            SaaS app.
          </Text>
          <Text style={styles.text}>
            Here are a few exambles of how this agreement can help you:
          </Text>
          <Text style={styles.text}>
            If users abuse your website or mobile app in any way, you can
            terminate their account. Your "Termination" clause can inform user
            that their accounts would be terminated if they abuse your service.
          </Text>
          <Text style={styles.text}>
            If users can post content on you website or mobile app (create
            content and share it on your platform), you can remove any content
            they created if it infringes copyright. your
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default TermsAndCondition;
const styles = StyleSheet.create({
  text: {
    color: "grey",
    fontSize: 17,
    paddingVertical: 10,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: LIGHT_GREY,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: DARK_RED,
    paddingLeft: 10,
  },
  back: { height: 15, width: 15 },
  flex: { flex: 1 },
});
