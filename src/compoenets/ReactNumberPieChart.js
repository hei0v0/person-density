import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function ReactNumberPieChart(props) {
  const { density } = props;
  const [curDensity, setCurDensity] = useState(0);

  const DEFAULT_OPTION = {
    series: [
      {
        type: "gauge",
        max: 10,
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.526, "#36bf36"],
              [0.7, "#ffcc00"],
              [1, "#ff4d00"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          distance: -20,
          length: 6,
          lineStyle: {
            color: "#fff",
            width: 1,
          },
        },
        splitLine: {
          distance: -20,
          length: 20,
          lineStyle: {
            color: "#fff",
            width: 1,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 25,
          fontSize: "1em",
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
          color: "inherit",
          fontSize: "1.2em",
        },
        data: [
          {
            value: curDensity,
          },
        ],
      },
    ],
  };

  const [option, setOption] = useState(DEFAULT_OPTION);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurDensity(density);
      setOption(DEFAULT_OPTION);
    }, 500);
    return () => clearInterval(timer);
  });

  return (
    <ReactECharts
      option={option}
      style={{ width: 300, height: 300, minWidth: 300 }}
    />
  );
}
