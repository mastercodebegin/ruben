import React from "react";
import {ViewStyle} from 'react-native'
import {Svg, G, Path, Text} from 'react-native-svg'
// import * as d3 from 'd3-shape'
const d3 = require ('d3-shape');

export type Props = {
    widthAndHeight: number
    series: number[]
    sliceColor: string[]
    coverFill?: string | null
    coverRadius?: number
    style?: ViewStyle[] | ViewStyle | undefined,
    showPercentage?: boolean;
    percentageFontSize?: number;
    percentageColor?: string;
}

const DoughnutChart = ({
                           widthAndHeight,
                           series,
                           sliceColor,
                           coverFill = null,
                           coverRadius,
                           style = {},
                           showPercentage = true,
                           percentageFontSize = 12,
                           percentageColor = "#fff",
                       }: Props): JSX.Element => {
    // Validating props
    series.forEach((s) => {
        if (s < 0) {
            throw Error(`Invalid series: all numbers should be positive. Found ${s}`)
        }
    })

    const sum = series.reduce((previous, current) => previous + current, 0)
    if (sum <= 0) {
        throw Error('Invalid series: sum of series is zero')
    }

    if (sliceColor.length != series.length) {
        throw Error(
            `Invalid "sliceColor": its length should be equal to the length of "series". sliceColor.length=${sliceColor.length} series.length=${series.length}`
        )
    }

    if (coverRadius && (coverRadius < 0 || coverRadius > 1)) {
        throw Error(`Invalid "coverRadius": It should be between zero and one. But it's ${coverRadius}`)
    }

    const radius = widthAndHeight / 2

    const pieGenerator = d3.pie().sort(null)

    const arcs = pieGenerator(series)

    const getD = (d3: any, outerRadius:number)=>{
        // @ts-ignore
        return d3!
            .arc()
            .outerRadius(outerRadius)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(360)()!
    }

    const textCoordinates: {x: number, y: number, value: any}[] = [];
    return (
        <Svg style={style} width={widthAndHeight} height={widthAndHeight}>
            <G transform={`translate(${widthAndHeight / 2}, ${widthAndHeight / 2})`}>
                { // @ts-ignore
                    arcs.map((arc, i) => {



                    let arcGenerator = d3.arc().outerRadius(radius).startAngle(arc.startAngle).endAngle(arc.endAngle)
                    if (!coverRadius) {
                        arcGenerator = arcGenerator.innerRadius(0)
                    } else {
                        arcGenerator = arcGenerator.innerRadius(coverRadius * radius)
                    }
                    // @ts-ignore
                    const [x, y] = arcGenerator.centroid()!;
                    textCoordinates.push({x, y, value: 100 / sum * series[i]})
                    // @ts-ignore
                    return <Path key={arc.index} fill={sliceColor[i]} d={arcGenerator()!}/>
                })}


                {
                     coverRadius && coverRadius > 0 && coverFill && (
                    <Path
                        key='cover'
                        fill={coverFill}
                        d={getD(d3, coverRadius * radius)}
                    />
                )}
                {showPercentage && textCoordinates.map(({x, y, value}) => {
                    return <Text
                        fontSize={percentageFontSize}
                        x={x - (percentageFontSize / 2)}
                        y={y + (percentageFontSize / 2)}
                        fill={percentageColor}
                    >
                        {value.toFixed(0)}%
                    </Text>
                })}
                {/**/}
            </G>

        </Svg>
    )
}

export default DoughnutChart