import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
export default function ReactRightBarChart(props) {
    let valdata = [102, 150, 210, 193]; // 总人数
    let titleNames = ["三月", "六月", "九月", "十二月"];
    let data = [70, 34, 60, 78]; // 占比
    let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    const DEFAULT_OPTION = {
        color: ["#2f89cf"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: "22%",
            top: "10%",
            bottom: "10%"
        },
        xAxis: [
            {
                show: false
            }
        ],
        yAxis: [
            {
                show: true,
                inverse: true,
                data: titleNames,
                // y轴本身的线
                axisLine: {
                    show: false
                },
                // 不显示刻度
                axisTick: {
                    show: false
                },
                // y轴分割线
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: "#fff",
                    rish: {
                        lg: {
                            backgroundColor: "#339911",
                            color: "#fff",
                            borderRadius: 15,
                            // padding: 5,
                            align: "center",
                            width: 15,
                            height: 15
                        }
                    }
                }
            },
            {
                show: true,
                inverse: true,
                data: valdata,
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#fff"
                    }
                }
            }
        ],
        series: [
            {
                name: "条",
                type: "bar",
                yAxisIndex: 0,
                data: data,
                // 柱子之间的距离
                barCategoryGap: 50,
                // 柱子的宽度
                barWidth: 10,
                // 柱子的样式
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        // 柱子的颜色
                        color: function (params) {
                            let num = myColor.length;
                            return myColor[params.dataIndex % num];
                        }
                    }
                },
                // 图形上的文字
                label: {
                    normal: {
                        show: true,
                        // 在内部显示
                        position: "inside",
                        // {c} 会自动解析为 data里面的数据
                        formatter: "{c}%"
                    }
                }
            },
            {
                name: "框",
                type: "bar",
                yAxisIndex: 1,
                barCategoryGap: 50,
                data: [100, 100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: "none",
                        borderColor: "#00c1de",
                        borderWidth: 3,
                        barBorderRadius: 15
                    }
                }
            }
        ]
    }

    const [option, setOption] = useState(DEFAULT_OPTION);

    return <ReactECharts
        option={option}
        style={{ width: 300, height: 300, minWidth: 300 }}
    />;
};