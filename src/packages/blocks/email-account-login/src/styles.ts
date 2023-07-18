import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#F8F4F4" },
  dot: {
    backgroundColor: "#A0272A",
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
  createAcc: {
    flexDirection: "row",
    justifyContent: "center",
  },
  selected: {
    color: "#5C2221",
    fontWeight: "bold",
  },
  remeber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 10,
  },
  checkBox: {
    height: 18,
    width: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 9,
  },
  header: {
    fontSize: 22,
    paddingRight: 18,
    paddingTop: 10,
    color: "#8D7D75",
  },
  label: {
    fontSize: 15,
  },
  textinput: {
    borderBottomColor: "#8D7D75",
    borderBottomWidth: 1,
    color: "black",
  },
  remeberMe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
    marginTop: 40,
    alignSelf: "center",
  },
  rememberText: { paddingLeft: 15, color: "#A0272A", fontSize: 16 },
});
