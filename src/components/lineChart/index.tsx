import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, Alert } from 'react-native';
import { LineChart as Line } from 'react-native-chart-kit';
import { style } from './style';

const LineGraph = (
  {
    data = [], 
    height = 300, 
    color = "rgba(255, 0, 0, 1)", 
    width=Dimensions.get('window').width 
  } 
  : 
  {
    data?: any[], 
    height?: number, 
    color?: string, 
    width?: number
  }
) => {
  return (
      <View style={style.chart}>
        <Line
          data={{
            labels: [],
            datasets: [
              {
                data: [...data],
                strokeWidth: 5 
              },
            ],
          }}
          width={width}
          height={height}
          yAxisLabel="R"
          yAxisInterval={1}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          withInnerLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withShadow={false}
          chartConfig={{
            backgroundColor: "none",
            backgroundGradientFrom: "none",
            backgroundGradientTo: "none",
            color: (opacity = 1) => color,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
            style: {
              backgroundColor: "none"
            },
            propsForDots: {
              r: '0',
              strokeWidth: "30",
              stroke: "#ffa726"
            },
          }}
          bezier
          style={{
            
          }}
        />
      </View>
  );
};

export { LineGraph };