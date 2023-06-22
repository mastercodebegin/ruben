import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DARK_RED } from "../../landingpage/assets/constants";
import { arrowLeft } from "../../landingpage/src/assets";
//@ts-ignore
import ModalDropdownComp from "../../../components/src/ModalDropdownComp";
interface DropDownTypes {
  label: string;
  onpress?: () => void;
}
const Dropdown = ({ label = "", onpress = () => {} }: DropDownTypes) => {
   
  const dropdownCategoryref:any = React.createRef();
  return (
    <ModalDropdownComp
      onSelect={() => {}}
      options={["1", "2", "3"]}
      isFullWidth
      ref={dropdownCategoryref}
      keySearchObject="name"
      renderRow={(props: any) => {
        console.log("propsprops ", props);

        return (
          <Text
            style={{
              paddingVertical: 8,
              paddingHorizontal: 15,
              fontSize: 20,
              color: "black",
            }}
          >
            {props}
          </Text>
        );
      }}
      dropdownStyle={{
        elevation: 8,
        borderRadius: 8,
      }}
      renderSeparator={(obj: any) => null}
    >
      <TouchableOpacity onPress={()=>{dropdownCategoryref.current._onButtonPress()}} style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <Image style={styles.image} source={arrowLeft} />
      </TouchableOpacity>
    </ModalDropdownComp>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: DARK_RED,
    paddingVertical: 15,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  image: {
    height: 15,
    width: 15,
    transform: [{ rotate: "270deg" }],
    tintColor: "black",
  },
});
export default Dropdown;
