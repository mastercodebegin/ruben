import { StyleSheet } from "react-native";
import { LIGHT_GREY, WHITE } from "../../../components/src/constants";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { DARK_RED } from "../../landingpage/src/colors";
export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingTop: 20,
  },
  safearea: { flex: 1, backgroundColor: LIGHT_GREY },
  seperator: { width: responsiveWidth(3) },
  boxContainer: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    paddingVertical: responsiveHeight(2.5),
    borderRadius: 20,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  imageContainer: { flexDirection: "row", paddingTop: 20 },
  answer: { textAlign: "right", color: DARK_RED, fontSize: 15 },
  question: { color: "grey", fontSize: 15 },
  headerText: {
    letterSpacing: 3,
    color: "grey",
    fontWeight: "bold",
    paddingVertical: 15,
  },
  myDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  myDetail: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  seperatorLine: { borderBottomColor: "lightgrey", borderBottomWidth: 1 },
});
