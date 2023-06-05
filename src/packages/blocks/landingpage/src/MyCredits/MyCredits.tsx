import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import {
  WHITE,
  DARK_RED,
  cow,
  LIGHT_GREY,
  PRIMARY,
  MID_PEACH,
} from "../assets";
import MyCreditDetailsModal from "./MyCreditDetailsModal";
const MyCreditScreen = ({ navigation }: any) => {
  const [isShowMyCreditModal, setShowMyCreditModal] = useState(false);

  return (
    <HeaderWithBackArrowTemplate headerText="My Credit" navigation={navigation}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={[1, 2]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={() => {
            return (
              <View style={styles.main}>
                <Image resizeMode="stretch" style={styles.image} source={cow} />
                <View style={styles.flexContainer}>
                  <Text style={styles.text}>Purchased Animal</Text>
                  <Text style={styles.desText}>Cow</Text>
                </View>
                <View style={styles.flexContainer}>
                  <Text style={styles.text}>Total Cuts</Text>
                  <Text style={styles.desText}>10</Text>
                </View>
                <View style={styles.flexContainer}>
                  <Text style={styles.text}>Used Cuts</Text>
                  <Text style={styles.desText}>7</Text>
                </View>
                <View style={styles.flexContainer}>
                  <Text style={styles.text}>Remaining Cuts</Text>
                  <Text style={styles.desText}>3</Text>
                </View>
                <TouchableOpacity
                  style={styles.pickButton}
                  onPress={() => {
                    setShowMyCreditModal(true);
                  }}
                >
                  <Text style={styles.pickText}>Pickup / Deliver </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(_, index) => {
            return String(index);
          }}
        />
        {isShowMyCreditModal && <MyCreditDetailsModal />}
      </View>
    </HeaderWithBackArrowTemplate>
  );
};

export default MyCreditScreen;
const styles = StyleSheet.create({
  main: {
    backgroundColor: WHITE,
    paddingTop: 10,
    paddingBottom: 20,
    overflow: "hidden",
    marginBottom: 15,
    borderRadius: 15,
  },
  image: {
    height: 180,
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  text: {
    color: MID_PEACH,
    fontWeight: "normal",
    fontSize: 16,
  },
  desText: {
    fontSize: 17,
    color: DARK_RED,
    fontWeight: "bold",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: LIGHT_GREY,
  },
  pickButton: {
    backgroundColor: LIGHT_GREY,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: PRIMARY,
    marginHorizontal: 20,
    marginTop: 10,
  },
  pickText: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: "700",
  },
});
