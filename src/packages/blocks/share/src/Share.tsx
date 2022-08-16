import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Platform
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import ShareController, { Props, configJSON } from "./ShareController";

export default class Share extends ShareController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            {this.isPlatformWeb() ? (
              <Text
                testID="labelTitle" //Merge Engine::From BDS
                style={styles.title} //UI Engine::From Sketch
              >
                {configJSON.labelTitleText}
              </Text> //UI Engine::From Sketch
            ) : null}

            <Text
              testID="labelBody" //Merge Engine::From BDS
              style={styles.body} //UI Engine::From Sketch
            >
              {" "}
              {/* UI Engine::From Sketch */}
              {configJSON.labelBodyText} {/* UI Engine::From Sketch */}
            </Text>

            <Button
              testID={"btnShare"} //Merge Engine::From BDS
              title={configJSON.btnShareTitle} //UI Engine::From Sketch
              {...this.btnShareProps} //Merge Engine::From BDS - {...this.testIDProps}
            />
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  }
});
// Customizable Area End
