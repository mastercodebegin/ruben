import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { PRIMARY_COLOR } from '../../landingpage/src/assets';

interface S{
    data:any
    onChange:()=>{}
    width:number
    height:number
    placeholder:string
}

  const CustomDropdown = (props:S) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: PRIMARY_COLOR },{width:props.width,height:props.height}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{bottom:10,borderRadius:10}}
          data={props.data}
         // search
         showsVerticalScrollIndicator={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select ' : ''}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            props.onChange(item)
            setValue(item.value);
            setIsFocus(false);
          }}
        //   renderLeftIcon={() => (
            
        //   )}
        />
      </View>
    );
  };

  export default CustomDropdown;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      flex:1
    },
    dropdown: {
      //height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 26,
      //width:280,
      flex:1,
      color:'red',

      backgroundColor:'white',
      paddingHorizontal: 8,

      //bottom:8
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color:'gray',
      left:4

    },
    selectedTextStyle: {
      fontSize: 16,
      color:'gray',
      left:4

    },
    iconStyle: {
      width: 20,
      height: 20,
      tintColor:'gray'
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });