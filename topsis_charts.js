// topsis_charts.js

// 等待DOM加载完成后初始化图表
document.addEventListener('DOMContentLoaded', () => {
    initWeightsChart();
    initTrendChart();
    initTopsisHeatmap();
    initCorrelationHeatmap();
    initKeyIndicatorsRadar();
    initTop5IndicatorsRadar();
    initEduFundingChart();
    initSchoolIncomeChart();
    initHigherEduGradsChart();
    initAdultBasicGradsChart();
    initHigherEduTeachersChart();
    initBasicEduTeachersChart();
});

// 初始化各评价指标权重分布图表
function initWeightsChart() {
    const chartDom = document.getElementById('weights-chart');
    if (!chartDom) {
        console.error('找不到ID为 "weights-chart" 的图表容器');
        return;
    }
    const myChart = echarts.init(chartDom);

    const data = [
        { name: '各学校经费收入社会捐赠经费(万元)', value: 0.082 },
        { name: '成人本科毕业生数(万人)', value: 0.076 },
        { name: '硕士毕业生数(万人)', value: 0.068 },
        { name: '初中阶段专任教师数(万人)', value: 0.066 },
        { name: '普通高等学校专任教师数(万人)', value: 0.063 },
        { name: '普通高等学校数(所)', value: 0.054 },
        { name: '博士毕业生数(万人)', value: 0.054 },
        { name: '民办学校办学经费(万元)', value: 0.053 },
        { name: '专科院校专任教师数(万人)', value: 0.053 },
        { name: '各类学校教育经费事业收入(万元)', value: 0.048 },
        { name: '初中毕业生数(万人)', value: 0.046 },
        { name: '普通本科毕业生数(万人)', value: 0.045 },
        { name: '成人专科毕业生数(万人)', value: 0.044 },
        { name: '教育经费(万元)', value: 0.044 },
        { name: '国家财政性教育经费(万元)', value: 0.042 },
        { name: '高中阶段专任教师数(万人)', value: 0.042 },
        { name: '高中毕业生数(万人)', value: 0.029 }
    ].sort((a, b) => a.value - b.value); // 按值升序排序以匹配图表

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c}'
        },
        grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitNumber: 4,
            axisLabel: {
                color: '#8BABEF'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(36, 62, 106, 0.3)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLabel: {
                color: '#8BABEF',
                fontSize: 12,
                // 自动换行
                formatter: function (value) {
                    return value.replace('(', '\n(');
                }
            }
        },
        series: [
            {
                name: '权重',
                type: 'bar',
                data: data.map(item => item.value),
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: '#0396FF' },
                        { offset: 1, color: '#00BFFF' }
                    ])
                },
                barWidth: '60%'
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 初始化各年份教育发展水平接近度趋势图表
function initTrendChart() {
    const chartDom = document.getElementById('trend-chart');
    if (!chartDom) {
        console.error('找不到ID为 "trend-chart" 的图表容器');
        return;
    }
    const myChart = echarts.init(chartDom);

    const option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '15%',
            right: '5%',
            bottom: '15%',
            top: '15%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            axisLabel: {
                color: '#8BABEF'
            }
        },
        yAxis: {
            type: 'value',
            name: '接近度 (C)',
            nameTextStyle: {
                color: '#8BABEF'
            },
            axisLabel: {
                color: '#8BABEF'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(36, 62, 106, 0.3)'
                }
            }
        },
        series: [
            {
                name: '接近度',
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#0396FF'
                },
                data: [0.15, 0.15, 0.21, 0.31, 0.42, 0.57, 0.78, 0.81]
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 初始化教育指标TOPSIS评价结果热力图
function initTopsisHeatmap() {
    const chartDom = document.getElementById('topsis-heatmap');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);

    const yAxisLabels = [
        '博士毕业生数(万人)', '专科院校专任教师数(万人)', '硕士毕业生数(万人)', '本科学院专任教师数(万人)',
        '成人本科毕业生数(万人)', '成人专科毕业生数(万人)', '普通高等学校专任教师数(万人)', '高中阶段专任教师数(万人)',
        '初中阶段专任教师数(万人)', '普通专科毕业生数(万人)', '普通本科毕业生数(万人)', '高中阶段毕业生数(万人)',
        '初中阶段毕业生数(万人)', '各类学校教育经费社会捐赠经费(万元)', '民办学校办学经费(万元)', '各类学校教育经费事业收入(万元)',
        '国家财政性教育经费(万元)', '教育经费(万元)'
    ].reverse();

    const xAxisLabels = ['接近度C', '正理想解距离D+', '负理想解距离D-', '排名'];

    const data = [
        [0, 0, 0.0000], [1, 0, 0.3536], [2, 0, 0.0000], [3, 0, 13.0000],
        [0, 1, 0.0000], [1, 1, 0.3536], [2, 1, 0.0000], [3, 1, 7.0000],
        [0, 2, 0.0000], [1, 2, 0.3536], [2, 2, 0.0000], [3, 2, 12.0000],
        [0, 3, 0.0000], [1, 3, 0.3536], [2, 3, 0.0000], [3, 3, 15.0000],
        [0, 4, 0.0000], [1, 4, 0.3536], [2, 4, 0.0000], [3, 4, 18.0000],
        [0, 5, 0.0000], [1, 5, 0.3536], [2, 5, 0.0000], [3, 5, 17.0000],
        [0, 6, 0.0000], [1, 6, 0.3536], [2, 6, 0.0000], [3, 6, 10.0000],
        [0, 7, 0.0000], [1, 7, 0.3536], [2, 7, 0.0000], [3, 7, 16.0000],
        [0, 8, 0.0000], [1, 8, 0.3536], [2, 8, 0.0000], [3, 8, 6.0000],
        [0, 9, 0.0000], [1, 9, 0.3536], [2, 9, 0.0000], [3, 9, 9.0000],
        [0, 10, 0.0000], [1, 10, 0.3536], [2, 10, 0.0000], [3, 10, 8.0000],
        [0, 11, 0.0000], [1, 11, 0.3536], [2, 11, 0.0000], [3, 11, 14.0000],
        [0, 12, 0.0000], [1, 12, 0.3536], [2, 12, 0.0000], [3, 12, 11.0000],
        [0, 13, 0.0022], [1, 13, 0.3528], [2, 13, 0.0008], [3, 13, 5.0000],
        [0, 14, 0.0047], [1, 14, 0.3519], [2, 14, 0.0017], [3, 14, 2.0000],
        [0, 15, 0.1687], [1, 15, 0.2940], [2, 15, 0.0596], [3, 15, 4.0000],
        [0, 16, 0.8013], [1, 16, 0.0702], [2, 16, 0.2834], [3, 16, 3.0000],
        [0, 17, 1.0000], [1, 17, 0.0000], [2, 17, 0.3536], [3, 17, 1.0000]
    ];

    const option = {
        tooltip: {
            position: 'top'
        },
        grid: {
            left: '25%',
            right: '10%',
            top: '5%',
            bottom: '10%'
        },
        xAxis: {
            type: 'category',
            data: xAxisLabels,
            splitArea: { show: true }
        },
        yAxis: {
            type: 'category',
            data: yAxisLabels,
            splitArea: { show: true }
        },
        visualMap: {
            min: 0,
            max: 1,
            calculable: true,
            orient: 'vertical',
            right: '0%',
            bottom: '15%',
            inRange: {
                color: ['#F7DC6F', '#2471A3', '#1A5276']
            },
            textStyle: { color: '#eaeaea' }
        },
        series: [{
            name: '评价结果',
            type: 'heatmap',
            data: data,
            label: { show: true, formatter: (p) => p.value[2].toFixed(4) },
            emphasis: {
                itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
            }
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

// 初始化教育各指标相关性热力图
function initCorrelationHeatmap() {
    const chartDom = document.getElementById('correlation-heatmap');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);

    const axisLabels = [
        '教育经费(万元)', '各类学校教育经费事业收入(万元)', '民办学校办学经费(万元)', '国家财政性教育经费(万元)',
        '各类学校教育经费社会捐赠经费(万元)', '博士毕业生数(万人)', '硕士毕业生数(万人)', '普通本科毕业生数(万人)',
        '普通专科毕业生数(万人)', '成人本科毕业生数(万人)', '成人专科毕业生数(万人)', '高中阶段毕业生数(万人)',
        '初中阶段毕业生数(万人)', '普通高等学校专任教师数(万人)', '本科学院专任教师数(万人)', '专科院校专任教师数(万人)',
        '高中阶段专任教师数(万人)', '初中阶段专任教师数(万人)'
    ];

    // [y, x, value]
    const rawData = [
        [1, 0, 0.99], [2, 0, 0.24], [3, 0, 1.00], [4, 0, 0.94], [5, 0, 0.98], [6, 0, 0.97], [7, 0, 0.98], [8, 0, 0.91], [9, 0, 0.93], [10, 0, 0.57], [11, 0, -0.54], [12, 0, 0.91], [13, 0, 0.99], [14, 0, 0.97], [15, 0, 0.97], [16, 0, 0.94], [17, 0, 0.99],
        [2, 1, 0.23], [3, 1, 0.99], [4, 1, 0.95], [5, 1, 0.98], [6, 1, 0.96], [7, 1, 0.97], [8, 1, 0.92], [9, 1, 0.92], [10, 1, 0.59], [11, 1, -0.48], [12, 1, 0.91], [13, 1, 0.99], [14, 1, 0.95], [15, 1, 0.95], [16, 1, 0.90], [17, 1, 0.99],
        [3, 2, 0.25], [4, 2, 0.03], [5, 2, 0.13], [6, 2, -0.02], [7, 2, 0.12], [8, 2, -0.02], [9, 2, -0.05], [10, 2, -0.45], [11, 2, -0.52], [12, 2, 0.11], [13, 2, 0.12], [14, 2, 0.14], [15, 2, 0.09], [16, 2, 0.11], [17, 2, 0.08],
        [4, 3, 0.94], [5, 3, 0.97], [6, 3, 0.96], [7, 3, 0.97], [8, 3, 0.90], [9, 3, 0.92], [10, 3, 0.56], [11, 3, -0.56], [12, 3, 0.92], [13, 3, 0.99], [14, 3, 0.98], [15, 3, 0.98], [16, 3, 0.95], [17, 3, 0.99],
        [5, 4, 0.98], [6, 4, 0.97], [7, 4, 0.99], [8, 4, 0.96], [9, 4, 0.98], [10, 4, 0.78], [11, 4, -0.32], [12, 4, 0.89], [13, 4, 0.97], [14, 4, 0.92], [15, 4, 0.96], [16, 4, 0.86], [17, 4, 0.97],
        [6, 5, 0.98], [7, 5, 0.99], [8, 5, 0.97], [9, 5, 0.97], [10, 5, 0.71], [11, 5, -0.46], [12, 5, 0.90], [13, 5, 0.98], [14, 5, 0.94], [15, 5, 0.98], [16, 5, 0.90], [17, 5, 0.97],
        [7, 6, 0.98], [8, 6, 0.97], [9, 6, 0.97], [10, 6, 0.73], [11, 6, -0.40], [12, 6, 0.89], [13, 6, 0.98], [14, 6, 0.96], [15, 6, 0.94], [16, 6, 0.83], [17, 6, 0.97],
        [8, 7, 0.96], [9, 7, 0.97], [10, 7, 0.70], [11, 7, -0.46], [12, 7, 0.89], [13, 7, 0.98], [14, 7, 0.94], [15, 7, 0.96], [16, 7, 0.86], [17, 7, 0.97],
        [9, 8, 0.97], [10, 8, 0.78], [11, 8, -0.31], [12, 8, 0.80], [13, 8, 0.93], [14, 8, 0.86], [15, 8, 0.94], [16, 8, 0.91], [17, 8, 0.91],
        [10, 9, 0.84], [11, 9, -0.37], [12, 9, 0.68], [13, 9, 0.96], [14, 9, 0.92], [15, 9, 0.87], [16, 9, 0.85], [17, 9, 0.95],
        [11, 10, 0.02], [12, 10, 0.38], [13, 10, 0.67], [14, 10, 0.60], [15, 10, 0.53], [16, 10, 0.51], [17, 10, 0.64],
        [12, 11, -0.35], [13, 11, -0.52], [14, 11, -0.58], [15, 11, -0.53], [16, 11, -0.65], [17, 11, -0.50],
        [13, 12, 0.93], [14, 12, 0.94], [15, 12, 0.89], [16, 12, 0.96], [17, 12, 0.98],
        [14, 13, 1.00], [15, 13, 0.99], [16, 13, 0.98], [17, 13, 0.98],
        [15, 14, 0.99], [16, 14, 0.98], [17, 14, 0.98],
        [16, 15, 0.97], [17, 15, 0.98],
        [17, 16, 0.96]
    ];
    
    // 补全对角线和另一半三角, 并格式化为 [x, y, value]
    const fullData = [];
    for (let i = 0; i < axisLabels.length; i++) {
        fullData.push([i, i, 1]); // 对角线为1
    }
    rawData.forEach(item => {
        fullData.push([item[1], item[0], item[2]]); // 添加原始点
        fullData.push([item[0], item[1], item[2]]); // 添加对称点
    });
    
    // 只保留左下三角的数据
    const processedData = fullData.filter(item => item[1] >= item[0]);

    const option = {
        tooltip: {
            position: 'top'
        },
        grid: {
            left: '25%',
            right: '10%',
            top: '5%',
            bottom: '30%'
        },
        xAxis: {
            type: 'category',
            data: axisLabels,
            axisLabel: {
                rotate: 45,
                interval: 0,
                fontSize: 10,
                color: '#8BABEF'
            }
        },
        yAxis: {
            type: 'category',
            data: axisLabels.slice().reverse(),
            axisLabel: {
                interval: 0,
                fontSize: 10,
                color: '#8BABEF'
            }
        },
        visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            orient: 'vertical',
            right: '0%',
            bottom: '25%',
            inRange: {
                color: ['#FF0000', '#FFFFFF', '#00008B'].reverse()
            },
            textStyle: { color: '#eaeaea' }
        },
        series: [{
            name: '相关性',
            type: 'heatmap',
            data: processedData,
            label: {
                show: true,
                fontSize: 8,
                formatter: (p) => p.value[2].toFixed(2)
            },
            emphasis: {
                itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
            }
        }]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

// 初始化不同年份教育关键指标对比雷达图
function initKeyIndicatorsRadar() {
    const chartDom = document.getElementById('key-indicators-radar');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);

    const option = {
        color: ['#0000FF', '#FF0000', '#008000', '#800080'], // Blue, Red, Green, Purple
        tooltip: { trigger: 'item' },
        legend: {
            data: ['2022', '2020', '2018', '2016'],
            bottom: '5%',
            textStyle: { color: '#8BABEF' }
        },
        radar: {
            indicator: [
                { name: '各类学校教育经费社会捐赠经费', max: 1 },
                { name: '教育经费', max: 1 },
                { name: '普通高等学校专任教师数', max: 1 },
                { name: '博士毕业生数', max: 1 }
            ],
            radius: '65%',
            center: ['50%', '50%'],
            splitArea: { areaStyle: { color: ['rgba(0, 56, 117, 0.1)', 'rgba(0, 56, 117, 0.2)'] } },
            axisLine: { lineStyle: { color: 'rgba(211, 253, 250, 0.8)' } },
            splitLine: { lineStyle: { color: 'rgba(211, 253, 250, 0.8)' } },
            name: { textStyle: { color: '#8BABEF', fontSize: 12 } }
        },
        series: [{
            name: '关键指标对比',
            type: 'radar',
            data: [
                { value: [1.0, 1.0, 0.2, 1.0], name: '2022' },
                { value: [0.8, 0.6, 0.1, 0.8], name: '2020' },
                { value: [0.3, 0.3, 0.4, 0.4], name: '2018' },
                { value: [0.2, 0.2, 0.2, 0.2], name: '2016' }
            ]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

// 初始化排名前5指标在不同年份的表现对比雷达图
function initTop5IndicatorsRadar() {
    const chartDom = document.getElementById('top5-indicators-radar');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);

    const option = {
        color: ['#0000FF', '#FF0000', '#008000', '#800080'],
        tooltip: { trigger: 'item' },
        legend: {
            data: ['2022', '2020', '2018', '2016'],
            bottom: '5%',
            textStyle: { color: '#8BABEF' }
        },
        radar: {
            indicator: [
                { name: '国家财政性教育经费', max: 1 },
                { name: '教育经费', max: 1 },
                { name: '各类学校教育经费社会捐赠经费', max: 1 },
                { name: '民办学校办学经费', max: 1 },
                { name: '各类学校教育经费事业收入', max: 1 }
            ],
            radius: '65%',
            center: ['50%', '50%'],
            splitArea: { areaStyle: { color: ['rgba(0, 56, 117, 0.1)', 'rgba(0, 56, 117, 0.2)'] } },
            axisLine: { lineStyle: { color: 'rgba(211, 253, 250, 0.8)' } },
            splitLine: { lineStyle: { color: 'rgba(211, 253, 250, 0.8)' } },
            name: {
                textStyle: { color: '#8BABEF', fontSize: 12 },
                formatter: function (value) {
                    if (value.length > 10) {
                        return value.substring(0, 10) + '\n' + value.substring(10);
                    }
                    return value;
                }
            }
        },
        series: [{
            name: '排名前5指标对比',
            type: 'radar',
            data: [
                { value: [1.0, 1.0, 1.0, 0.2, 1.0], name: '2022' },
                { value: [0.8, 0.6, 0.2, 0.6, 0.8], name: '2020' },
                { value: [0.4, 0.3, 0.4, 0.8, 0.4], name: '2018' },
                { value: [0.3, 0.2, 0.2, 0.2, 0.3], name: '2016' }
            ]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

// 6 new charts
const commonLineChartOptions = {
    tooltip: { trigger: 'axis' },
    legend: { textStyle: { color: '#8BABEF' } },
    grid: { left: '12%', right: '12%', bottom: '20%', containLabel: false },
    xAxis: {
        type: 'category',
        data: ['2022年', '2021年', '2020年', '2019年', '2018年', '2017年', '2016年', '2015年'],
        axisLabel: { color: '#8BABEF' }
    },
    yAxis: [
        { type: 'value', axisLabel: { color: '#8BABEF' }, splitLine: { lineStyle: { color: 'rgba(36, 62, 106, 0.3)' } } },
        { type: 'value', axisLabel: { color: '#8BABEF' }, splitLine: { show: false } }
    ]
};

function initEduFundingChart() {
    const myChart = echarts.init(document.getElementById('edu-funding-chart'));
    const option = echarts.util.merge({
        legend: { data: ['教育经费(亿元)', '国家财政性教育经费(亿元)'] },
        series: [
            { name: '教育经费(亿元)', type: 'line', data: [61000, 58000, 53000, 50000, 46500, 42500, 39000, 36000] },
            { name: '国家财政性教育经费(亿元)', type: 'line', data: [48500, 46000, 43000, 40000, 37000, 34000, 31500, 29000] }
        ]
    }, commonLineChartOptions);
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

function initSchoolIncomeChart() {
    const myChart = echarts.init(document.getElementById('school-income-chart'));
    const option = echarts.util.merge({
        legend: { data: ['学校事业收入(亿元)', '民办学校办学经费(亿元)', '社会捐赠经费(亿元)'] },
        series: [
            { name: '学校事业收入(亿元)', type: 'line', yAxisIndex: 0, data: [10800, 10500, 8600, 8600, 8500, 7800, 7000, 6000] },
            { name: '民办学校办学经费(亿元)', type: 'line', yAxisIndex: 1, data: [300, 280, 260, 250, 240, 230, 220, 210] },
            { name: '社会捐赠经费(亿元)', type: 'line', yAxisIndex: 1, data: [200, 190, 180, 170, 160, 150, 140, 130] }
        ]
    }, commonLineChartOptions);
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

function initHigherEduGradsChart() {
    const myChart = echarts.init(document.getElementById('higher-edu-grads-chart'));
    const option = echarts.util.merge({
        legend: { data: ['普通本科毕业生数', '普通专科毕业生数', '博士毕业生数', '硕士毕业生数'] },
        series: [
            { name: '普通本科毕业生数', type: 'line', yAxisIndex: 0, data: [490, 490, 440, 420, 400, 380, 370, 370] },
            { name: '普通专科毕业生数', type: 'line', yAxisIndex: 0, data: [540, 500, 400, 390, 360, 360, 350, 320] },
            { name: '博士毕业生数', type: 'line', yAxisIndex: 1, data: [12, 11, 10, 9, 8, 7.5, 7, 6] },
            { name: '硕士毕业生数', type: 'line', yAxisIndex: 1, data: [100, 95, 85, 75, 70, 65, 60, 55] }
        ]
    }, commonLineChartOptions);
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

function initAdultBasicGradsChart() {
    const myChart = echarts.init(document.getElementById('adult-basic-grads-chart'));
    const option = echarts.util.merge({
        legend: { data: ['高中阶段毕业生数', '初中阶段毕业生数', '成人本科毕业生数', '成人专科毕业生数'] },
        series: [
            { name: '高中阶段毕业生数', type: 'line', yAxisIndex: 0, data: [1270, 1250, 1200, 1250, 1280, 1270, 1240, 1250] },
            { name: '初中阶段毕业生数', type: 'line', yAxisIndex: 0, data: [1620, 1600, 1600, 1520, 1480, 1450, 1400, 1400] },
            { name: '成人本科毕业生数', type: 'line', yAxisIndex: 1, data: [190, 180, 180, 150, 150, 145, 140, 150] },
            { name: '成人专科毕业生数', type: 'line', yAxisIndex: 1, data: [190, 180, 180, 160, 160, 150, 160, 180] }
        ]
    }, commonLineChartOptions);
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

function initHigherEduTeachersChart() {
    const myChart = echarts.init(document.getElementById('higher-edu-teachers-chart'));
    const option = echarts.util.merge({
        legend: { data: ['高等学校专任教师数', '本科院校专任教师数', '专科院校专任教师数'] },
        series: [
            { name: '高等学校专任教师数', type: 'line', data: [205, 195, 185, 180, 175, 170, 165, 160] },
            { name: '本科院校专任教师数', type: 'line', data: [135, 132, 130, 130, 125, 120, 118, 115] },
            { name: '专科院校专任教师数', type: 'line', data: [70, 65, 60, 58, 55, 50, 48, 45] }
        ]
    }, commonLineChartOptions);
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

function initBasicEduTeachersChart() {
    const myChart = echarts.init(document.getElementById('basic-edu-teachers-chart'));
    const option = echarts.util.merge({
        legend: { data: ['高中阶段专任教师数', '初中阶段专任教师数'] },
        series: [
            { name: '高中阶段专任教师数', type: 'line', data: [295, 290, 280, 270, 275, 265, 262, 260] },
            { name: '初中阶段专任教师数', type: 'line', data: [410, 405, 395, 385, 375, 362, 355, 350] }
        ]
    }, commonLineChartOptions);
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
} 