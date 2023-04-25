import React from "react";
import { View,  StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native";
import OrdersController from "../OrdersController";
//@ts-ignore
import * as constants from "../../../../components/src/constants";
import CalendarTemplate, { Calendarcontext } from "../../../../components/src/CalendarTemplate";
//@ts-ignore
import meatimage from '../../../../components/src/meatimage@2.jpg'
const {LIGHT_GREY,DARK_RED} =constants

const FooterComponent = ()=>{
    return (<View style={{}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{color:DARK_RED}}>{'Estimated Delivery'}</Text>
            <Text style={{color:'grey'}}>{'30th March 2023'}</Text>
        </View>
        <View style={{backgroundColor:LIGHT_GREY,marginTop:10}}>
            <View style={{height:5,backgroundColor:DARK_RED,width:'60%'}}/>
        </View>
    </View>)
}
const RenderItem =()=>{
  const item:any = React.useContext(Calendarcontext)
  
  return (
        <View style={styles.innerContainer}>
            <Text style={styles.text}>{item?.item?.date}</Text>
            <FlatList
            data={[...item.item?.data]}
            keyExtractor={(item,index)=>JSON.stringify(index)+item}
            style={styles.flatlist}
            ListFooterComponent={<FooterComponent/>}
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
    async componentDidMount(): Promise<void> {
        this.getOrdersList()
    }
  render(): React.ReactNode {
    const monthShortNames= [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
    return (
        <CalendarTemplate
        onChangeText={()=>{}}
          animateString1="Ongoing"
          animateString2="Completed"
          header="My Orders"
          navigation={this.props.navigation}
          data={[{}]}
          showBottomTab={false}
          backArrow
        >
          <View style={styles.main}>
            {/* <RenderItem/> */}
            <FlatList
            data={this.state.ordersList}
            keyExtractor={(item,index)=>JSON.stringify(index)+item}
            style={{marginHorizontal:20,}}
            ListEmptyComponent={()=>{
                return <View>
                    <Text style={{fontWeight:'bold',textAlign:'center'}}>No Data Found</Text>
                    </View>
            }}
            renderItem={({item}:any)=>{ 
                const date = new Date(item?.attributes?.delivered_at)
                return(
                <View style={{width:'100%',paddingBottom:15,backgroundColor:'white',padding:20,borderRadius:20,marginBottom:20}}>
                    <Text style={{fontWeight:'bold',color:'grey',fontSize:15,paddingBottom:10}}>{`${monthShortNames[date.getMonth()]} ${date.getDay()}TH, ${date.getFullYear()}`}</Text>
                    <View style={{flexDirection:'row',width:'100%'}}>
                    <Image style={{height:50,width:50,borderRadius:10}} source={meatimage}/>
                <View style={{flex:1,paddingLeft:10,justifyContent:'space-between'}}>
                    <View style={styles.row}>
                <Text style={styles.productName}>{item?.attributes?.catalogue?.data?.attributes?.name}</Text>
                <Text style={styles.price}>{`$ ${item?.attributes?.price
                } X ${item?.attributes?.quantity}`}</Text>
                    </View>
                    <View style={styles.row}>
                <View style={styles.counterContainer}>
                    <TouchableOpacity style={styles.button}>
                <Text style={styles.count}>{'-'}</Text>
                    </TouchableOpacity>
                <Text style={styles.counter}>{item?.attributes?.quantity}</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.count}>{'+'}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color:DARK_RED,fontSize:16,fontWeight:'bold'}}>{`$${Number(item?.attributes?.price)*Number(item?.attributes?.quantity)}`}</Text>
                    </View>
                </View>
                </View>
                <View style={{flexDirection:"row",paddingTop:25,justifyContent:'space-between',paddingBottom:10}}>
                    <Text style={{color:DARK_RED,fontSize:16}}>Estimated Delivery</Text>
                    <Text style={{fontWeight:'bold',color:'grey',fontSize:15,paddingBottom:10}}>{`${monthShortNames[date.getMonth()]} ${date.getDay()}TH, ${date.getFullYear()}`}</Text>
                </View>
                    <View style={{height:5,backgroundColor:LIGHT_GREY,width:'100%'}}>
                        <View style={{backgroundColor:DARK_RED,width:'50%',height:'100%'}}/>
                    </View>
                </View>
            )}}
            />
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
