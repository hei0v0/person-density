import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { cloneDeep } from "lodash"; // 这里因为lodash版本不一样的问题所以引入方式和官网不一样
export default function ReactLeftLineChart(props) {
  const data = {
    year: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  };
  const { number, crowded, isEnd } = props;

  const fetchNewData = () => {
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
    const newOption = cloneDeep(option); // 一定要进行深拷贝
    const data0 = newOption.series[0].data;
    const data1 = newOption.series[1].data;
    data0.shift(); // 删除第一个元素
    data0.push(number); // 在数组末尾添加元素
    data1.shift(); // 删除第一个元素
    data1.push(crowded); // 在数组末尾添加元素
    newOption.xAxis[0].data.shift(); // 删除第一个元素
    newOption.xAxis[0].data.push(axisData); // 在数组末尾添加元素

    setOption(newOption);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isEnd) {
        fetchNewData();
      }
    }, 500);
    return () => clearInterval(timer);
  });

  const DEFAULT_OPTION = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      // 修饰图例文字的颜色
      textStyle: {
        color: "#fff",
      },
      // 如果series 里面设置了name，此时图例组件的data可以省略
      data: ["当前人数", "密集人数"],
    },
    grid: {
      top: 40,
      left: 40,
      right: 30,
      bottom: 30,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: (function () {
          let now = new Date();
          let res = [];
          let len = 15;
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
    ],
    series: [
      {
        name: "当前人数",
        type: "line",
        // 是否让线条圆滑显示
        smooth: true,
        yAxisIndex: 0,
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 10;
        },
        data: data.year[0],
      },
      {
        name: "密集人数",
        type: "line",
        smooth: true,
        data: data.year[1],
      },
    ],
  };

  const [option, setOption] = useState(DEFAULT_OPTION);

  return (
    <ReactECharts
      option={option}
      style={{ width: 300, height: 300, minWidth: 300 }}
    />
  );
}
