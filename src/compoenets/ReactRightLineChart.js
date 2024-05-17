import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { cloneDeep } from 'lodash';// 这里因为lodash版本不一样的问题所以引入方式和官网不一样

export default function ReactRightLineChart(props) {
    const { curDensity, curScale, isEnd } = props

    const fetchNewData = () => {
        const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        const newOption = cloneDeep(option); // 一定要进行深拷贝
        const data0 = newOption.series[0].data;
        const data1 = newOption.series[1].data;

        data0.shift();// 删除第一个元素
        data0.push(curDensity);// 在数组末尾添加元素
        data1.shift(); // 删除第一个元素
        data1.push(curScale);// 在数组末尾添加元素

        newOption.xAxis[0].data.shift();// 删除第一个元素
        newOption.xAxis[0].data.push(axisData);// 在数组末尾添加元素

        setOption(newOption);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isEnd) {
                fetchNewData();
            }
        }, 500);
        return () => clearInterval(timer);
    })

    const DEFAULT_OPTION = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#dddc6b",
          },
        },
      },
      legend: {
        top: "0%",
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12",
        },
      },
      grid: {
        left: 10,
        top: 30,
        right: 10,
        bottom: 10,
        containLabel: true,
      },

      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.2)",
            },
          },

          data: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
        },
        {
          axisPointer: { show: false },
          axisLine: { show: false },
          position: "bottom",
          offset: 20,
        },
      ],

      yAxis: [
        {
          type: "value",
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
            },
          },

          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
          max: 15,
          min: 0,
        },
        {
          type: "value",
          max: 1,
          min: 0,
        },
      ],
      series: [
        {
          name: "当前密度",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "#0184d5",
              width: 2,
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1, 132, 213, 0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(1, 132, 213, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
          },
          itemStyle: {
            normal: {
              color: "#0184d5",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
          },
        },
        {
          name: "密集占比",
          type: "line",
          smooth: true,
          symbol: "circle",
          yAxisIndex: 1,
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "#00d887",
              width: 2,
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0, 216, 135, 0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(0, 216, 135, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
          },
          itemStyle: {
            normal: {
              color: "#00d887",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
          }
        },
      ],
    };

    const [option, setOption] = useState(DEFAULT_OPTION);

    return <ReactECharts
        option={option}
        style={{ width: 300, height: 300, minWidth: 300 }}
    />;
};