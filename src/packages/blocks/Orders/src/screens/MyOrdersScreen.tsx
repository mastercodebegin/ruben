import React from "react";
import { View,  StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native";
import OrdersController from "../OrdersController";
//@ts-ignore
import * as constants from "../../../../components/src/constants";
import CalendarTemplate, { Calendarcontext } from "../../../../components/src/CalendarTemplate";
//@ts-ignore
import meatimage from '../../../../components/src/meatimage@2.jpg'
const {LIGHT_GREY,DARK_RED} =constants
const dummyData=[
    {
        date:'JAN 4TH, 2023',
        data:[
            {
                name:'Meat 1',
                count:3,
                price:66,
                image:meatimage
            },
            {
                name:'Beef Head',
                count:3,
                price:66,
                image:meatimage
            },
            {
                name:'Vegetables',
                count:3,
                price:66,
                image:meatimage
            }
        ]
    },
    {
        date:'JAN 5TH, 2023',
        data:[
            {
                name:'Meat 1',
                count:3,
                price:66,
                image:meatimage
            },
            {
                name:'Beef Head',
                count:3,
                price:66,
                image:meatimage
            },
            {
                name:'Vegetables',
                count:3,
                price:66,
                image:meatimage
            }
        ]
    }, {
      date:'JAN 4TH, 2023',
      data:[
          {
              name:'Meat 1',
              count:3,
              price:66,
              image:meatimage
          },
          {
              name:'Beef Head',
              count:3,
              price:66,
              image:meatimage
          },
          {
              name:'Vegetables',
              count:3,
              price:66,
              image:meatimage
          }
      ]
  },
]
const RenderItem =()=>{
  const item:any = React.useContext(Calendarcontext)
  
  return (
        <View style={styles.innerContainer}>
            <Text style={styles.text}>{item?.item?.date}</Text>
            <FlatList
            data={[...item.item?.data]}
            keyExtractor={(item,index)=>JSON.stringify(index)+item}
            style={styles.flatlist}
            renderItem={({item})=>(
                <View style={{width:'100%',paddingBottom:15}}>
                    <View style={{flexDirection:'row',width:'100%'}}>
                    <Image style={{height:50,width:50,borderRadius:10}} source={item?.image}/>
                <View style={{flex:1,paddingLeft:10,justifyContent:'space-between'}}>
                    <View style={styles.row}>
                <Text style={styles.productName}>{item?.name}</Text>
                <Text style={styles.price}>{`$ ${item?.price} X ${item?.count}`}</Text>
                    </View>
                    <View style={styles.row}>
                <View style={styles.counterContainer}>
                    <TouchableOpacity style={styles.button}>
                <Text style={styles.count}>{'-'}</Text>
                    </TouchableOpacity>
                <Text style={styles.counter}>{item?.count}</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.count}>{'+'}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color:DARK_RED,fontSize:16,fontWeight:'bold'}}>{`$${66}`}</Text>
                    </View>
                </View>
                </View>
                </View>
            )}/>
        </View> )
}

export default class MyOrdersScreen extends OrdersController {
  render(): React.ReactNode {
    return (
        <CalendarTemplate
        onChangeText={()=>{}}
          animateString1="Ongoing"
          animateString2="Completed"
          header="My Orders"
          data={dummyData}
          showBottomTab={false}
        >
          <View style={styles.main}>
            <RenderItem/>
          </View>
        </CalendarTemplate>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  flatlist:{
    backgroundColor:'white',
    paddingHorizontal:20,
    paddingVertical:20,
    borderRadius:15,
    marginTop:10
},
text:{fontSize:16,color:'grey'},
innerContainer:{marginBottom:20,paddingHorizontal:20},
productName:{fontSize:16},
button:{
    height:25,
    width:25,
    backgroundColor:LIGHT_GREY,
    borderRadius:12.5,
    justifyContent:'center',
    alignItems:'center'
},
count:{
    color:DARK_RED
},
counter:{
    paddingHorizontal:10,
    color:DARK_RED,
    fontSize:17
},
counterContainer:{flexDirection:'row',alignItems:'center'},
row:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
},
price:{
    color:DARK_RED,
    fontSize:17
}
});
