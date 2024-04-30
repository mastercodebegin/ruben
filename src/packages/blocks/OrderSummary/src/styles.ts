import { StyleSheet } from "react-native";
import { LIGHT_GREY, PRIMARY, WHITE } from "../../../components/src/constants";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { DARK_RED } from "../../landingpage/src/colors";
import { BUTTON_COLOR_PRIMARY, BUTTON_TEXT_COLOR_PRIMARY, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingVertical: 20,
  },
  safearea: { flex: 1, backgroundColor: LIGHT_GREY },
  seperator: { width: responsiveWidth(3), },
  lifetimeSub: {
    flexDirection: "row",
    padding: 20,
    marginTop: 20,
    backgroundColor: WHITE,
    borderRadius: 20,
  },
  cartImageContainer: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    aspectRatio: 1,
  },
  calenderImage:{height:35,width:35,alignSelf:'center'},
  cartImage: { height: 20, width: 20 },
  lifetimeSubContent: {
    flex: 1,
  },
  lifetimeSubHeading: {
    color: TEXT_COLOR,
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  lifetimeSubText: {
    paddingLeft: 10,
    color: "grey",
  },
  lifetimeSubButton: {
    backgroundColor: BUTTON_COLOR_PRIMARY,
    width: "50%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  lifetimeSubPrice: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "bold",
  },
  headerContainer: {
    backgroundColor: "white",
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR,
  },
  addedItemsHeader: {
    fontSize: 17,
    letterSpacing: 2,
    color: "grey",
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemsContainer: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: WHITE,
  },
  addedItems: {
    paddingVertical: 20,
  },
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
  close: { height: 15, width: 15 },
  closeBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#FFE3D4",
    padding: 10,
    borderRadius: 20,
  },
  innerContainer: {
    backgroundColor: "white",
    marginHorizontal: responsiveWidth(10),
    paddingHorizontal: 20,
    paddingTop: 20,
    
    borderRadius: 20,
    paddingBottom: 10,
  },
  mainWrap: {
    flex: 1,
    justifyContent: "center",
  },
  blur: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.6,
  },
  answer: { textAlign: "right", color: SECONDARY_TEXT_COLOR, fontSize: 15 },
  question: { color: TEXT_COLOR, fontSize: 15 },
  headerText: {
    letterSpacing: 2,
    color: TEXT_COLOR,
    fontWeight: "bold",
    paddingVertical: 15,
    fontSize: 17,
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
    paddingBottom: 20,
  },
  seperatorLine: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  deliverContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderWidth:1,
    borderColor:PRIMARY_COLOR,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliverText: {
    color: BUTTON_TEXT_COLOR_PRIMARY,
    fontSize: 18,
  },
  deliverPrice: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  deliverPriceText: {
    color: PRIMARY_COLOR,
  },
  meatStorageHeading: {
    fontSize: 18,
    color: TEXT_COLOR,
    fontWeight: "bold",
    marginBottom: 10,
  },
  meatStorageOption: {
    backgroundColor: WHITE,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  meatStorageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  meatStoragePrice: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: "bold",
  },
  monthText: {
    fontSize: 14,
    fontWeight: "normal",
  },
  meatStorageDesc: {
    color: "grey",
    fontSize: 16,
  },
  addMeatStorageButton: {
    borderWidth: 1,
    borderColor: PRIMARY,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: LIGHT_GREY,
  },
  addMeatStorageButtonText: {
    fontWeight: "bold",
    fontSize: 17,
    color: PRIMARY,
  },
});
