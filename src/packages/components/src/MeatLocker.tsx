import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { redShadow } from "../../components/src";
const MeatLocker = () => {
  const onPressContinue = () => {};
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F8F4F4" }}
    >
      <View style={styles.main}>
        <Text style={styles.header}>What is the</Text>
        <Text style={styles.header}>Meat Locker?</Text>
        <Text style={styles.text}>
          A Terms and Conditions is not required and it's not mandatory by law.
        </Text>
        <Text style={styles.text}>
          Unlike Privacy Policies, which are required by laws such as the
          GDPR,CalOPPA and many others, There's no law or regulation on Terms
          and Conditions.
        </Text>
        <Text style={styles.text}>
          However, having a Terms and Conditions gives you the right to
          terminate the access to users who do not follow your rules and
          guidelines, as well as other desirable business benefits.
        </Text>
        <Text style={styles.text}>
          It's extremely important to have this agreement if you operate a SaaS
          app.
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 120,
            marginTop: 25,
          }}
        >
          <View style={{ backgroundColor: "red", ...styles.images }} />
          <View style={{ backgroundColor: "blue", ...styles.images }} />
          <View style={{ backgroundColor: "yellow", ...styles.images }} />
        </View>
      </View>

      <TouchableOpacity onPress={onPressContinue} style={styles.continue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      <Image resizeMode="stretch" source={redShadow} style={styles.shadow} />
    </ScrollView>
  );
};
export default MeatLocker;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#F8F4F4",
    marginBottom: 20,
  },
  header: {
    fontWeight: "700",
    fontSize: 27,
    color: "#5C2221",
  },
  text: {
    fontSize: 20,
    paddingVertical: 10,
    color: "#8D7D75",
  },
  continue: {
    borderRadius: 28,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#a0272a",
  },
  shadow: { height: 50 },
  continueText: {
    color: "white",
    fontWeight: "700",
    fontSize: 24,
    paddingVertical: 15,
  },
  images: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
  },
});
