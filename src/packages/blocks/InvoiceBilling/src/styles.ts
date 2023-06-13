import { StyleSheet } from "react-native";
import { DARK_RED } from "../../../components/src/constants";
export const styles = StyleSheet.create({
  number: { flex: 0.2 },
  center: { flex: 1, alignItems: "center" },
  bill: {
    color: DARK_RED,
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 20,
  },
  index: { fontSize: 17, color: DARK_RED },
  indexContainer: { flex: 0.2, justifyContent: "center" },
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
