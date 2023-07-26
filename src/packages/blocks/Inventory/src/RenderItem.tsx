import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { DARK_RED } from "../../../components/src/constants";
import { MEAT_IMAGE1, arrowLeft } from "../../landingpage/src/assets";
import moment from "moment";
const sampleData = [
  {
    name : "test name",
PN :3423,

Pick: 3,

Vendor: "Juan Esteban ",

OnHand:3
  },
  {
    name : "test name",
PN :3423,

Pick: 3,

Vendor: "Juan Esteban ",

OnHand:3
  },
  {
    name : "test name",
PN :3423,

Pick: 3,

Vendor: "Juan Esteban ",

OnHand:3
  }
]
const RenderItem = ({item}: any) => {  
  const selectedStatus = item?.data?.attributes?.status === 'scheduled' ?
    'pending' : item?.data?.attributes?.status === 'completed' ?
      'success' : item?.data?.attributes?.status;
  const [show, setShow] = useState(false);
  return (
    <View style={{ paddingVertical: 10,
      borderBottomColor: "grey",
      borderBottomWidth: 0.5,
      paddingHorizontal: 20,
      backgroundColor: "white"}}>
      <View style={styles.main}>
      <View style={styles.flex}>
        <Text style={styles.text}>{`ID:${item?.data?.attributes?.ID}`}</Text>
        <Text style={styles.name}>{`${item?.data?.attributes?.name}`}</Text>
        <Text style={styles.text}>{`Date : ${ moment(new Date(item?.data?.attributes?.Date)).format('DD/MM/YYYY')}`}</Text>
        <Text style={styles.text}>{`Item :x${item?.data?.attributes?.items}`}</Text>
      </View>
      <View style={[styles.container]}>
        <Text style={styles.destination}>{"Domestic"}</Text>
      </View>
      <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setShow(!show)
            }}
            style={styles.statusContainer}
          >
            <Text
              style={{
                fontSize: 16,
                paddingRight: 10,
                color:
                  selectedStatus === "cancelled"
                    ? "pink"
                    : selectedStatus === "success"
                      ? "green"
                      : "orange",
              }}
            >
              {selectedStatus}
            </Text>
            <Image style={styles.dropDownImage} source={arrowLeft} />
          </TouchableOpacity>
      </View>
    </View>
     {show&& <View>
        {
          sampleData.map((item,i) => {
            return (
              <View style={{paddingVertical:3}} key={i}>
              <View style={{ flexDirection: 'row' }}>
                  <Image style={{ height: 70, width: 70, borderRadius: 8 }} source={MEAT_IMAGE1} />
                  <View style={{paddingHorizontal:20,flex:1,justifyContent:"space-between",paddingVertical:12}}>
                    <Text style={{color:DARK_RED,fontSize:18,fontWeight:"bold"}}>{item.name}</Text>
                    <Text style={{color:DARK_RED,fontSize:16}}>{"PN -"+ item.PN}</Text>

                    </View>
                </View>
                <Text style={styles.question}>{"Pick : "} <Text style={styles.answer}>{3}</Text></Text>
                <Text style={styles.question}>{"Vendor : "} <Text style={styles.answer}>{"test name"}</Text></Text>
                <Text style={styles.question}>{"On hand : "} <Text style={styles.answer}>{3}</Text></Text>

                </View>
            )

          })
          }
      </View>}
      </View>
    
  );
};
export default RenderItem;

const styles = StyleSheet.create({
  answer:{ color: DARK_RED, fontSize: 17 },
  question:{ color: 'grey', fontSize: 17,paddingVertical:3 },
  main: {
    flexDirection: "row",
  },
  text: {
    color: DARK_RED,
    fontSize: 16,
  },
  name: {
    color: DARK_RED,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
  },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  dropdownStyle: {
    elevation: 8,
    borderRadius: 8,
  },
  dropDownImage: {
    height: 12,
    width: 12,
    transform: [{ rotate: "270deg" }],
    tintColor: "black",
  },
  destination: { color: DARK_RED, fontWeight: "bold", fontSize: 16 },
  flex: { flex: 1 }
});
