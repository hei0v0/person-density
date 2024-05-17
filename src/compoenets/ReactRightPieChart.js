import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function ReactRightPieChart(props) {
  const { density } = props;
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState(0);
  const [low, setLow] = useState(0);

  const DEFAULT_OPTION = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    grid: {
      top: "30%",
      left: 30,
      right: 30,
      bottom: 10,
    },
    legend: {
      data: [
        {
          name: "高密度",
          itemStyle: {
            color: "#ff4d00",
          },
        },
        {
          name: "中密度",
          itemStyle: {
            color: "#ffcc00",
          },
        },
        {
          name: "低密度",
          itemStyle: {
            color: "#36bf36",
          },
        },
      ],
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "密度情况",
        type: "pie",
        radius: ["25%", "55%"],
        data: [
          {
            value: high,
            name: "高密度",
            itemStyle: { color: "#ff4d00" },
            // label: {
            //   normal: {
            //     formatter: "{b}  {d}%  ", // 百分比标注
            //   },
            // },
          },
          {
            value: mid,
            name: "中密度",
            itemStyle: { color: "#ffcc00" },
            // label: {
            //   normal: {
            //     formatter: "{b}  {d}%  ", // 百分比标注
            //   },
            // },
          },
          {
            value: low,
            name: "低密度",
            itemStyle: { color: "#36bf36" },
            // label: {
            //   normal: {
            //     formatter: "{b}  {d}%  ", // 百分比标注
            //   },
            // },
          },
        ],
        textStyle: {
          color: "#fff",
        },
      },
    ],
  };

  const [option, setOption] = useState(DEFAULT_OPTION);

  useEffect(() => {
    const timer = setInterval(() => {
      switch (density) {
        case 0:
          setLow(low + 1);
          break;
        case 1:
          setMid(mid + 1);
          break;
        case 2:
          setHigh(high + 1);
          break;
      }
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
