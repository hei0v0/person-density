import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { cloneDeep } from "lodash"; // 这里因为lodash版本不一样的问题所以引入方式和官网不一样

export default function LogGraph(props) {
  const [number, setNumber] = useState(0);
  const [curColor, setColor] = useState("");
  const AREA = 35;

  const DEFAULT_OPTION = {
    title: {
      text: "人 群 密 度 检 测 图",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: [
        "当前人数",
        {
          name: "当前密度",
          itemStyle: {
            color: "auto",
          },
        },
      ],
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
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
        boundaryGap: true,
        data: (function () {
          let now = new Date();
          let res = [];
          let len = 45;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
            now = new Date(now - 2000);
          }
          return res;
        })(),
        axisLine: {
          // x轴线的颜色以及宽度
          show: true,
          lineStyle: {
            color: "#fff",
            width: 0,
            type: "solid",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          //x轴文字的配置
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        splitLine: {
          //分割线配置
          show: false,
          lineStyle: {
            color: "#fff",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        scale: true,
        name: "人数",
        max: 400,
        min: 0,
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
      {
        type: "value",
        scale: true,
        name: "人群密度",
        max: 20,
        min: 0,
        boundaryGap: [0.35, 0.35],
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
        name: "当前密度",
        type: "bar", // 直方图
        yAxisIndex: 1,
        itemStyle: {
          borderRadius: 4,
          color: function (idx) {
            const color = checkDensity(idx.value);
            setColor(color);
            return color;
          },
          //鼠标悬停时：
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 10;
        },
        data: (function () {
          let res = [];
          let len = 45;
          while (len--) {
            res.push(parseFloat((number / AREA).toFixed(2)));
          }
          return res;
        })(),
      },
      {
        name: "当前人数",
        type: "line", // 折线图
        data: (function () {
          let res = [];
          let len = 45;
          while (len--) {
            res.push(number);
          }
          return res;
        })(),
      },
    ],
  };

  const [option, setOption] = useState(DEFAULT_OPTION);
  const checkDensity = (curDensity) => {
    if (curDensity >= 0 && curDensity <= 5.26) {
      return "rgba(0, 255, 0, 0.8)";
    }
    if (curDensity > 5.26 && curDensity <= 7.6) {
      return "rgba(255, 255, 0, 0.8)";
    }
    if (curDensity > 7.6) {
      return "rgba(255, 0, 0, 0.8)";
    }
  };
  function fetchNewData() {
    // console.log(number);
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
    const newOption = cloneDeep(option); // 一定要进行深拷贝
    const data0 = newOption.series[0].data;
    const data1 = newOption.series[1].data;

    data0.shift(); // 删除第一个元素
    data0.push(parseFloat((number / AREA).toFixed(2))); // 在数组末尾添加元素
    data1.shift(); // 删除第一个元素
    data1.push(number); // 在数组末尾添加元素

    newOption.xAxis[0].data.shift(); // 删除第一个元素
    newOption.xAxis[0].data.push(axisData); // 在数组末尾添加元素

    if (number > 0) {
      newOption.legend.data[1].itemStyle.color = curColor;
    }
    setOption(newOption);
  }
  useEffect(() => {
    setNumber(props.number);
  }, [props.number]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNewData();
    }, 500);
    return () => clearInterval(timer);
  });
  return (
    <ReactECharts
      option={option}
      style={{ width: 600, height: 480, minWidth: 300,translation:"all 0.5s" }}
    />
  );
}
