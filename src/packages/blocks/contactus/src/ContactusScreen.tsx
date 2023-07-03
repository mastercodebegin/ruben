import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import ContactusController, { Props } from "./ContactusController";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import { LIGHT_GREY, PRIMARY } from "../../../components/src/constants";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { instagram } from "../../landingpage/src/assets";
export default class Contactus extends ContactusController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <HeaderWithBackArrowTemplate
        navigation={navigation}
        scrollView
        headerText="Contact Us"
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <TextInput
              textInputStyle={styles.textinput}
              labeStyle={styles.label}
              value={this.state.name}
              testID="name_test_id"
              onchangeText={(name) => {
                this.setState({ name });
              }}
              label="Enter Full Name"
            />
            <TextInput
              textInputStyle={styles.textinput}
              labeStyle={styles.label}
              value={this.state.email}
              testID="email_test_id"
              onchangeText={(email) => this.setState({ email })}
              keyBoardtype="email-address"
              label="Enter Email Address"
            />
            <TextInput
              textInputStyle={[styles.textinput, { height: 120 }]}
              labeStyle={styles.label}
              value={this.state.query}
              testID="query_test_id"
              onchangeText={(query) => this.setState({ query })}
              label="Enter Query"
              multiline
            />
            <Button
              label="Submit"
              testID="submit_query_test_id"
              containerStyle={{ marginTop: 20 }}
              onPress={() => this.onSubmit()}
            />
            <Button
              label="cancel"
              labelStyle={{
                color: PRIMARY,
                fontSize: 17,
                fontWeight: "normal",
              }}
              style={styles.button}
              onPress={() => {}}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "grey",
              }}
            >
              {"or reach out us on"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingHorizontal: 80,
                paddingTop: 20,
              }}
            >
              <TouchableOpacity style={styles.socialBtn}>
                <Image style={styles.image} source={instagram} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Image style={styles.image} source={instagram} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Image style={styles.image} source={instagram} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </HeaderWithBackArrowTemplate>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: LIGHT_GREY, paddingTop: 20 },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  socialBtn: {
    height: 40,
    width: 40,
    backgroundColor: LIGHT_GREY,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: { height: 25, width: 25 },
  textinput: {
    color: "#5C2221",
    flex: 1,
    backgroundColor: "#F8F4F4",
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 15,
    color: "#8D7D75",
    paddingVertical: 10,
  },
});
