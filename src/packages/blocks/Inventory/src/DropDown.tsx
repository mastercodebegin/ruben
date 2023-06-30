import React ,{useState}from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DARK_RED } from "../../landingpage/assets/constants";
import { arrowLeft } from "../../landingpage/src/assets";
//@ts-ignore
import ModalDropdownComp from "../../../components/src/ModalDropdownComp";
import DisplayCalendar from "../../../components/src/DisplayCalendar";
interface DropDownTypes {
  label: string;
  onpress?: () => void;
  type?: "dropdown" | "calendar";
  data?:Array<any>;
}

const Dropdown = ({
  label = "",
  onpress = () => {},
  type = "dropdown",
  data=[]
}: DropDownTypes) => {
  const dropdownCategoryref: any = React.createRef();
  const [selected,setSelected]=useState(label)
  const RenderIcon = () => (
    <TouchableOpacity
      onPress={() => {
        dropdownCategoryref.current._onButtonPress();
      }}
      style={styles.container}
    >
      <Text style={styles.text}>{selected}</Text>
      <Image style={styles.image} source={arrowLeft} />
    </TouchableOpacity>
  );
  return (
    <>
      {type === "calendar" ? (
        <DisplayCalendar
          ref={dropdownCategoryref}
          dropdownStyle={{ height: 200 }}
        >
          <RenderIcon />
        </DisplayCalendar>
      ) : (
        <ModalDropdownComp
          onSelect={(_:any,res2:string) => {
            setSelected(res2)
          }}
          options={data}
          isFullWidth
          ref={dropdownCategoryref}
          keySearchObject="name"
          renderRow={(props: any) => {
            return <Text style={[styles.rendertext,{fontWeight:selected=== props ?'bold':'normal'}]}>{props}</Text>;
          }}
          dropdownStyle={styles.dropDown}
          renderSeparator={(obj: any) => null}
        >
          <RenderIcon />
        </ModalDropdownComp>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: DARK_RED,
    paddingVertical: 15,
    paddingRight: 20,
  },
  container: {
    flex:1,
    backgroundColor:'white',
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  image: {
    height: 15,
    width: 15,
    transform: [{ rotate: "270deg" }],
    tintColor: "black",
  },
  rendertext: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 20,
    color: "black",
  },
  dropDown: {
    elevation: 8,
    borderRadius: 8,
  },
});
export default Dropdown;
