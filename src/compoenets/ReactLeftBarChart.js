import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
export default function ReactLeftBarChart(props) {
  const DEFAULT_OPTION = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      top: 10,
      left: 40,
      right: 30,
      bottom: 30,
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: "category",
        data: ["一季度", "二季度", "三季度", "四季度"],
        boundaryGap: [0.2, 0.2],
        nameTextStyle: {
          //y轴上方单位的颜色
          color: "#fff",
        },
        axisLabel: {
          //y轴文字的配置
          textStyle: {
            color: "#fff",
            margin: 15,
          },
          // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          //y轴线的颜色以及宽度
          show: false,
          lineStyle: {
            color: "#fff",
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "人流量（万人）",
        nameTextStyle: {
          //y轴上方单位的颜色
          color: "#fff",
        },
        axisLabel: {
          //y轴文字的配置
          textStyle: {
            color: "#fff",
            margin: 15,
          },
          // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          //y轴线的颜色以及宽度
          show: false,
          lineStyle: {
            color: "#fff",
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    series: [
      {
        name: "人流量",
        type: "bar",
        barWidth: "35%",
        data: [127, 148, 175, 142],
        itemStyle: {
          barBorderRadius: 5,
        },
      },
    ],
  };

  const [option, setOption] = useState(DEFAULT_OPTION);

  return <ReactECharts option={option} style={{ width: 300, height: 300 }} />;
}
