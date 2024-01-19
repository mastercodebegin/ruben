import { StyleSheet } from "react-native";
import { DARK_RED } from "../../../components/src/constants";
import { TEXT_COLOR } from "../../landingpage/src/assets";
export const styles = StyleSheet.create({
  number: { flex: 0, width:30 },
  center: { flex: 1, alignItems: "center" },
  bill: {
    color: TEXT_COLOR,
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 20,
  },
  index: { padding: 10, fontSize: 17, color: TEXT_COLOR },
  indexContainer: {  justifyContent: "center", width:30 },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  boldText:{
    padding: 10,
    fontSize: 17,
    color: DARK_RED,
    fontWeight: "bold",
  },
  text:{ padding: 10, fontSize: 17, color: DARK_RED }
});
