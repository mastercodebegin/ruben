import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import {
  lambBreast,
  lambChuck,
  lambDefault,
  lambFlank,
  lambLeg,
  lambLion,
  lambNeck,
  lambShank,
  lambShoulder,
  lambRibs,
  lamHead
} from "../../blocks/analytics/src/assets";


import AnalyticsController, { AnimalParts, Props } from "../../blocks/analytics/src/AnalyticsController";
import AnimalChart from "../src/AnimalChart";

export default class AnimalLamb extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const renderImageItem = (stateKey: string, imageSource: any) => {
      console.log('stateKey====',stateKey);
      console.log('state====',this.state[stateKey]);
      console.log('imageSource====',imageSource);
      
      if (this.state[stateKey]) {
        return (
          <Image
            style={styles.animalImg}
            resizeMode="contain"
            source={imageSource}
          />
        );
      }
      return null;
    };

    const { x: left, y: top, isShow: isAnimalChartSow, sold, remaining, lineHeight } = this.state.soldChart;

    const chartDisplay = () => {
      return (
        <>
          {this.props.isChartDisplay ? <AnimalChart top={top} left={left} isShow={isAnimalChartSow}
            sold={sold} remaining={remaining} lineHeight={lineHeight} /> : <></>}
        </>
      )
    }

    return (
      <View style={styles.container}>
        {this.props?.animalSelectedValue == 'Lamb' &&
          <View style={this.props.isChartDisplay ? styles.animalImgContainer : styles.animalImgContainerForStore}>
            <View style={styles.animalImgCont}>
              {chartDisplay()}
              <>
              
                {renderImageItem('lambDefault', lambDefault)}
                {renderImageItem('lambBreast', lambBreast)}
                {renderImageItem('lambFlank', lambFlank)}

            
                {renderImageItem('lambLeg', lambLeg)}
                {renderImageItem('lambChuck', lambChuck)}
                {renderImageItem('lambRibs', lambRibs)}
                {renderImageItem('lamHead', lamHead)}

                {renderImageItem('lambLion', lambLion)}
                {renderImageItem('lambNeck', lambNeck)}
                {renderImageItem('lambShank', lambShank)}
                {renderImageItem('lambShoulder', lambShoulder)} 
              </>
 {/* <TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambDefault) }} style={styles.clickOnLambDefault} testID="lambDefault" /> */}
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lamHead) }} style={styles.clickOnLambHead} testID="lamHead" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambBreast) }} style={styles.clickOnLambBreast} testID="lambBreast" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambChuck) }} style={styles.clickOnLambChuck} testID="lambChuck" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambFlank) }} style={styles.clickOnLambFlank} testID="lambFlank" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambLeg) }} style={styles.clickOnLambLeg} testID="lambLeg" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambLion) }} style={styles.clickOnLambLion} testID="lambLion" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambRibs) }} style={styles.clickOnLambRib} testID="lambRibs" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambNeck) }} style={styles.clickOnLambNeck} testID="lambRibs" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambShank) }} style={styles.clickOnLambShank} testID="lambShank" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambShank) }} style={styles.clickOnLambShankRight} testID="lambShank" />
<TouchableOpacity onPress={() => { this.onLambClick(AnimalParts.lambShoulder) }} style={styles.clickOnLambShoulder} testID="lambShoulder" />
            </View>
            {this.props.isChartDisplay ? <View style={styles.bottomContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.redDot, { backgroundColor: '#A9C9F7', }]}>
                </View>
                <Text style={styles.textStyle}>Remaining</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={[styles.redDot, { backgroundColor: '#A9C9F7', }]}>
                </View>
                <Text style={styles.textStyle}>Sold</Text>
              </View>
            </View> : <></>}
          </View>
        }
      </View>
    )
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0
  },
  animalImgContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 40
  },
  animalImgContainerForStore: {
    justifyContent: "center",
    height: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  animalImgCont: {
    width: 250,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20
  },
  animalImg: {
    paddingTop: 1,
    width: '100%',
    height: '100%',
    // backgroundColor:'red',
    
  },
  clickOnLambDefault: {
    width: 55,
    height: 40,
    position: 'absolute',
    top: 150,
    left: 10,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
  },
  clickOnLambBreast: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 100,
    left: 110,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  clickOnLambChuck: {
    width: 20,
    height: 30,
    position: 'absolute',
    top: 68,
    left: 92,
    borderTopLeftRadius: 120,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  clickOnLambFlank: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 100,
    left: 130,
    // backgroundColor:'green',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  clickOnLambLeg: {
    width: 30,
    height: 50,
    position: 'absolute',
    top: 60,
    left: 155,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,  
},
  clickOnLambLion: {
    width: 22,
    height: 40,
    position: 'absolute',
    top: 60,
    left: 132,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 4,  
  },
  clickOnLambRib: {
    width: 22,
    height: 40,
    position: 'absolute',
    top: 60,
    left: 116,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 4, 
  },
  clickOnLambNeck: {
    width: 20,
    height: 30,
    position: 'absolute',
    top: 62,
    left: 78,
    borderTopLeftRadius: 120,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 10,
},
  clickOnLambHead: {
    width: 34,
    height: 26,
    position: 'absolute',
    top: 52,
    left: 56,
    borderTopLeftRadius: 120,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 10,
},
  clickOnLambShank: {
    width: 20,
    height: 30,
    position: 'absolute',
    top: 116,
    left: 84,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  clickOnLambShankRight: {
    width: 20,
    height: 30,
    position: 'absolute',
    top: 116,
    left: 158,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  clickOnLambShoulder: {
    width: 20,
    height: 18,
    position: 'absolute',
    top: 99,
    left: 86,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10
  },
  textStyle: {
    fontSize: 20,
    color: '#8D7D75'
  }
});
