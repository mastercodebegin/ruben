import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Text } from "react-native";
interface MileStoneTypes {
  list: Array<string>;
  selected: string;
}
const MileStone = ({ list, selected }: MileStoneTypes) => {
  const numberOfItems = list.length;
  const selectedIndex = list.indexOf(selected);
  //-40 is for padding
  const totalWidth = Dimensions.get("window").width - 40;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lengthOfSingleSelctedLine = totalWidth / (numberOfItems - 1);
  const dotSize = 25;
  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 700 * selectedIndex,
      toValue: lengthOfSingleSelctedLine * selectedIndex,
    }).start();
  }, []);
  return (
      <View style={styles.container}>
        {list.map((item, i) => {
          return (
            <View key={item} style={styles.main}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.lineContainer}>
                  {i != 0 && (
                    <View
                      style={{
                        ...styles.line,
                        backgroundColor:
                          i <= selectedIndex ? "#A0272A" : "lightgrey",
                      }}
                    />
                  )}
                </View>
                <View
                  style={[
                    styles.dotContainer,
                    {
                      height: dotSize,
                      width: dotSize,
                      borderRadius: dotSize / 2,
                    },
                  ]}
                >
                  {i <= selectedIndex && <View style={styles.dot} />}
                </View>
                <View style={styles.lineContainer}>
                  {i != numberOfItems - 1 && (
                    <View
                      style={{
                        ...styles.line,
                        backgroundColor:
                          i <= selectedIndex - 1 ? "#A0272A" : "lightgrey",
                      }}
                    />
                  )}
                </View>
              </View>
              <Text style={styles.text}>{item}</Text>
            </View>
          );
        })}
      </View>
  );
};
const styles = StyleSheet.create({
  lineContainer: { flex: 1, justifyContent: "center" },
  dotContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  line: { height: 2, width: "100%" },
  container: { flexDirection: "row" },
  main: { flex: 1, alignItems: "center" },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: "#A0272A",
    borderRadius: 7.5,
  },
  selectedLine: {
    height: "100%",
    backgroundColor: "#A0272A",
  },
  text: { color: "#A0272A", textAlign: "center", fontSize: 15, paddingTop: 7 },
});
export default MileStone;
