import React from "react";
import {View} from 'react-native'
import DoughnutChart from "./DoughnutChart";
import {DARK_RED, PRIMARY} from "./constants";

export type Props = {
    isShow?: boolean;
    top: number;
    left: number;
    sold: number;
    remaining: number;
    lineHeight: number;
    width?: number;
}

const AnimalChart = ({isShow, top, left, sold, remaining, lineHeight = 30, width = 130}: Props): JSX.Element => {
    if(!isShow){
        return <></>
    }
    return (<>
            <View style={{
                position: "absolute",
                top,
                left,
                width,
                zIndex: 1
            }}>
                <DoughnutChart
                    widthAndHeight={width!}
                    series={[remaining, sold]}
                    sliceColor={[PRIMARY, DARK_RED]}
                    coverRadius={0.4}
                    coverFill={'transparent'}
                />
            </View>
            <View style={{
                position: "absolute",
                top: (top || 0 ) + width,
                left: (left || 0 ) + width / 2,
                backgroundColor: PRIMARY,
                width: 1,
                height: lineHeight,
                zIndex:1
            }}/>
        </>
    )
}

export default AnimalChart

