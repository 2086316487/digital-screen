document.addEventListener("DOMContentLoaded", function () {
    // DEMATEL Bar Chart
    var dematelBarChart = echarts.init(document.getElementById('dematel-bar-chart'));
    var dematelBarOption = {
        title: {
            text: '各指标中心度 (D+R)',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['直接影响层', '中间影响层', '根本影响层'],
            bottom: 10,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                color: '#fff'
            }
        },
        yAxis: {
            type: 'category',
            data: [
                '高中阶段毕业生数(万人)', '以小学办学条件为主(项)', '集体食堂等学生数(万人)', '普通经费(亿元)', '国家财政性教育经费(亿元)', '各类学校教育经费总投入(万元)',
                '农村义务教育学校专任教师(万人)', '农村义务教育学校学生数(万人)', '成人高校在校生数(万人)', '成人本专科在校生数(万人)', '特殊教育学校专任教师(万人)', '专任教师学历情况(万人)',
                '博士毕业生数(万人)', '硕士毕业生数(万人)', '专科院校专任教师数(万人)', '各类学校教育经费总和(万元)', '普通本专科毕业生数(万人)', '普通本科毕业生数(万人)'
            ].reverse(),
            axisLabel: {
                color: '#fff',
                fontSize: 10
            }
        },
        series: [
            {
                name: '直接影响层',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    position: 'right'
                },
                itemStyle: { color: '#5893f2' },
                data: [null, null, null, null, null, null, null, null, null, null, null, null, 1.1, 1.2, 1.6, 1.7, 1.8, 2.0].reverse()
            },
            {
                name: '中间影响层',
                type: 'bar',
                stack: 'total',
                itemStyle: { color: '#73f258' },
                data: [null, null, null, null, null, null, 1.1, 1.1, 1.1, 1.1, 1.1, 1.7, null, null, null, null, null, null].reverse()
            },
            {
                name: '根本影响层',
                type: 'bar',
                stack: 'total',
                itemStyle: { color: '#f2e558' },
                data: [1.0, 1.8, 1.9, 2.6, 2.6, 2.6, null, null, null, null, null, null, null, null, null, null, null, null].reverse()
            }
        ]
    };
    dematelBarChart.setOption(dematelBarOption);


    // DEMATEL Graph Chart
    var dematelGraphChart = echarts.init(document.getElementById('dematel-graph-chart'));
    
    var categories = [
        { name: '直接影响层', itemStyle: { color: '#5893f2' } },
        { name: '中间影响层', itemStyle: { color: '#73f258' } },
        { name: '根本影响层', itemStyle: { color: '#f25858' } }
    ];

    var nodes = [
        // 根本影响层
        { id: 'f1', name: '高中阶段\n毕业生数', category: 2, x: 100, y: 300, symbolSize: 50 },
        { id: 'f2', name: '小学办学\n条件为主', category: 2, x: 200, y: 300, symbolSize: 50 },
        { id: 'f3', name: '集体食堂\n学生数', category: 2, x: 300, y: 300, symbolSize: 50 },
        { id: 'f4', name: '普通经费', category: 2, x: 400, y: 300, symbolSize: 50 },
        { id: 'f5', name: '国家财政性\n教育经费', category: 2, x: 500, y: 300, symbolSize: 50 },
        { id: 'f6', name: '教育经费\n总投入', category: 2, x: 600, y: 300, symbolSize: 50 },
        // 中间影响层
        { id: 'm1', name: '农村义务\n专任教师', category: 1, x: 150, y: 200, symbolSize: 50 },
        { id: 'm2', name: '农村义务\n学生数', category: 1, x: 250, y: 200, symbolSize: 50 },
        { id: 'm3', name: '成人高校\n在校生数', category: 1, x: 350, y: 200, symbolSize: 50 },
        { id: 'm4', name: '成人本专科\n在校生数', category: 1, x: 450, y: 200, symbolSize: 50 },
        { id: 'm5', name: '特殊教育\n专任教师', category: 1, x: 550, y: 200, symbolSize: 50 },
        // 直接影响层
        { id: 'd1', name: '博士\n毕业生数', category: 0, x: 200, y: 100, symbolSize: 50 },
        { id: 'd2', name: '硕士\n毕业生数', category: 0, x: 300, y: 100, symbolSize: 50 },
        { id: 'd3', name: '专科院校\n专任教师数', category: 0, x: 400, y: 100, symbolSize: 50 },
        { id: 'd4', name: '普通本专科\n毕业生数', category: 0, x: 500, y: 100, symbolSize: 50 },
        { id: 'd5', name: '普通本科\n毕业生数', category: 0, x: 600, y: 100, symbolSize: 50 }
    ];

    var links = [
        { source: 'f1', target: 'm1' }, { source: 'f1', target: 'm2' }, { source: 'f1', target: 'm3' }, { source: 'f1', target: 'm4' }, { source: 'f1', target: 'm5' },
        { source: 'f2', target: 'm1' }, { source: 'f2', target: 'm2' }, { source: 'f2', target: 'm3' }, { source: 'f2', target: 'm4' }, { source: 'f2', target: 'm5' },
        { source: 'f3', target: 'm1' }, { source: 'f3', target: 'm2' }, { source: 'f3', target: 'm3' }, { source: 'f3', target: 'm4' }, { source: 'f3', target: 'm5' },
        { source: 'f4', target: 'm1' }, { source: 'f4', target: 'm2' }, { source: 'f4', target: 'm3' }, { source: 'f4', target: 'm4' }, { source: 'f4', 'target': 'm5' },
        { source: 'f5', target: 'm1' }, { source: 'f5', target: 'm2' }, { source: 'f5', target: 'm3' }, { source: 'f5', target: 'm4' }, { source: 'f5', 'target': 'm5' },
        { source: 'f6', target: 'm1' }, { source: 'f6', target: 'm2' }, { source: 'f6', target: 'm3' }, { source: 'f6', target: 'm4' }, { source: 'f6', 'target': 'm5' },

        { source: 'm1', target: 'd1' }, { source: 'm1', target: 'd2' }, { source: 'm1', target: 'd3' }, { source: 'm1', target: 'd4' }, { source: 'm1', target: 'd5' },
        { source: 'm2', target: 'd1' }, { source: 'm2', target: 'd2' }, { source: 'm2', target: 'd3' }, { source: 'm2', target: 'd4' }, { source: 'm2', target: 'd5' },
        { source: 'm3', target: 'd1' }, { source: 'm3', target: 'd2' }, { source: 'm3', target: 'd3' }, { source: 'm3', target: 'd4' }, { source: 'm3', target: 'd5' },
        { source: 'm4', target: 'd1' }, { source: 'm4', target: 'd2' }, { source: 'm4', target: 'd3' }, { source: 'm4', target: 'd4' }, { source: 'm4', target: 'd5' },
        { source: 'm5', target: 'd1' }, { source: 'm5', target: 'd2' }, { source: 'm5', target: 'd3' }, { source: 'm5', target: 'd4' }, { source: 'm5', target: 'd5' },
        // Self loops
        { source: 'f1', target: 'f1' },
        { source: 'f2', target: 'f2' }
    ];

    var dematelGraphOption = {
        title: {
            text: 'DEMATEL-AISM 影响关系网络',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {},
        legend: [{
            data: categories.map(function (a) {
                return a.name;
            }),
            textStyle: {
                color: '#fff'
            },
            bottom: 10
        }],
        series: [
            {
                name: '影响关系',
                type: 'graph',
                layout: 'none', // Use specified x, y coordinates
                data: nodes,
                links: links,
                categories: categories,
                roam: true,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    color: '#000',
                    fontSize: 10
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.1
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };
    dematelGraphChart.setOption(dematelGraphOption);

    // Correlation Heatmap
    var correlationHeatmap = echarts.init(document.getElementById('correlation-heatmap'));
    const correlationIndicators = [
        '教育经费(万元)', '各类学校教育经费总收入(万元)', '民办学校办学经费(万元)', '国家财政性教育经费(万元)', '各类学校教育经费社会捐赠(万元)',
        '硕士毕业生生数(万人)', '博士毕业生生数(万人)', '普通本科毕业生生数(万人)', '普通专科毕业生生数(万人)', '成人本科毕业生生数(万人)',
        '成人专科毕业生生数(万人)', '高中阶段教育毕业生生数(万人)', '初中阶段教育毕业生生数(万人)', '普通高等学校专任教师数(万人)', '本科院校专任教师数(万人)',
        '专科院校专任教师数(万人)', '高中阶段教育专任教师数(万人)', '初中阶段教育专任教师数(万人)'
    ];
    // Data manually extracted from the image.
    const correlationMatrix = [
        [1.0, 0.98, 0.85, 0.99, 0.65, 0.93, 0.88, 0.96, 0.90, 0.35, 0.28, 0.15, -0.65, 0.97, 0.96, 0.91, 0.98, 0.99],
        [0.98, 1.0, 0.86, 0.98, 0.68, 0.94, 0.89, 0.97, 0.91, 0.38, 0.31, 0.18, -0.62, 0.98, 0.97, 0.92, 0.99, 0.98],
        [0.85, 0.86, 1.0, 0.83, 0.55, 0.81, 0.76, 0.84, 0.90, 0.21, 0.15, 0.05, -0.78, 0.87, 0.85, 0.92, 0.86, 0.85],
        [0.99, 0.98, 0.83, 1.0, 0.63, 0.92, 0.87, 0.95, 0.89, 0.33, 0.26, 0.13, -0.67, 0.96, 0.95, 0.90, 0.97, 0.98],
        [0.65, 0.68, 0.55, 0.63, 1.0, 0.66, 0.63, 0.67, 0.65, 0.81, 0.85, 0.61, -0.41, 0.67, 0.66, 0.62, 0.68, 0.66],
        [0.93, 0.94, 0.81, 0.92, 0.66, 1.0, 0.96, 0.98, 0.85, 0.42, 0.35, 0.25, -0.58, 0.95, 0.96, 0.88, 0.93, 0.92],
        [0.88, 0.89, 0.76, 0.87, 0.63, 0.96, 1.0, 0.93, 0.80, 0.45, 0.38, 0.29, -0.55, 0.90, 0.91, 0.83, 0.88, 0.87],
        [0.96, 0.97, 0.84, 0.95, 0.67, 0.98, 0.93, 1.0, 0.91, 0.40, 0.33, 0.22, -0.60, 0.98, 0.98, 0.92, 0.96, 0.96],
        [0.90, 0.91, 0.90, 0.89, 0.65, 0.85, 0.80, 0.91, 1.0, 0.36, 0.30, 0.17, -0.72, 0.92, 0.90, 0.97, 0.91, 0.90],
        [0.35, 0.38, 0.21, 0.33, 0.81, 0.42, 0.45, 0.40, 0.36, 1.0, 0.96, 0.78, -0.20, 0.38, 0.39, 0.33, 0.39, 0.36],
        [0.28, 0.31, 0.15, 0.26, 0.85, 0.35, 0.38, 0.33, 0.30, 0.96, 1.0, 0.75, -0.18, 0.31, 0.32, 0.26, 0.32, 0.29],
        [0.15, 0.18, 0.05, 0.13, 0.61, 0.25, 0.29, 0.22, 0.17, 0.78, 0.75, 1.0, -0.05, 0.18, 0.19, 0.14, 0.19, 0.16],
        [-0.65, -0.62, -0.78, -0.67, -0.41, -0.58, -0.55, -0.60, -0.72, -0.20, -0.18, -0.05, 1.0, -0.63, -0.61, -0.70, -0.64, -0.65],
        [0.97, 0.98, 0.87, 0.96, 0.67, 0.95, 0.90, 0.98, 0.92, 0.38, 0.31, 0.18, -0.63, 1.0, 0.99, 0.94, 0.98, 0.97],
        [0.96, 0.97, 0.85, 0.95, 0.66, 0.96, 0.91, 0.98, 0.90, 0.39, 0.32, 0.19, -0.61, 0.99, 1.0, 0.92, 0.97, 0.96],
        [0.91, 0.92, 0.92, 0.90, 0.62, 0.88, 0.83, 0.92, 0.97, 0.33, 0.26, 0.14, -0.70, 0.94, 0.92, 1.0, 0.93, 0.91],
        [0.98, 0.99, 0.86, 0.97, 0.68, 0.93, 0.88, 0.96, 0.91, 0.39, 0.32, 0.19, -0.64, 0.98, 0.97, 0.93, 1.0, 0.99],
        [0.99, 0.98, 0.85, 0.98, 0.66, 0.92, 0.87, 0.96, 0.90, 0.36, 0.29, 0.16, -0.65, 0.97, 0.96, 0.91, 0.99, 1.0]
    ];
    
    const correlationData = [];
    for (let i = 0; i < correlationMatrix.length; i++) {
        for (let j = 0; j < correlationMatrix[i].length; j++) {
            correlationData.push([j, i, correlationMatrix[i][j]]);
        }
    }

    var correlationOption = {
        tooltip: {
            position: 'top'
        },
        grid: {
            height: '70%',
            top: '12%',
            left: '15%',
            right: '10%'
        },
        xAxis: {
            type: 'category',
            data: correlationIndicators,
            splitArea: {
                show: true
            },
            axisLabel: {
                rotate: 90,
                color: '#fff',
                fontSize: 10
            }
        },
        yAxis: {
            type: 'category',
            data: correlationIndicators,
            splitArea: {
                show: true
            },
            axisLabel: {
                color: '#fff',
                fontSize: 10
            }
        },
        visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            inRange: {
                color: ['#0000FF', '#FFFFFF', '#FF0000'] // Blue, White, Red
            },
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            name: '相关性',
            type: 'heatmap',
            data: correlationData,
            label: {
                show: false
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    correlationHeatmap.setOption(correlationOption);


    // DEMATEL Matrix Heatmap
    var dematelMatrixHeatmap = echarts.init(document.getElementById('dematel-matrix-heatmap'));
    const dematelIndicators = [
        '教育经费(万元)', '各类学校教育经费总收入(万元)', '民办学校办学经费(万元)', '国家财政性教育经费(万元)', '各类学校教育经费社会捐赠(万元)',
        '硕士毕业生生数(万人)', '博士毕业生生数(万人)', '普通本科毕业生生数(万人)', '普通专科毕业生生数(万人)', '成人本科毕业生生数(万人)',
        '成人专科毕业生生数(万人)', '高中阶段教育毕业生生数(万人)', '初中阶段教育毕业生生数(万人)', '普通高等学校专任教师数(万人)', '本科院校专任教师数(万人)',
        '专科院校专任教师数(万人)', '高中阶段教育专任教师数(万人)', '初中阶段教育专任教师数(万人)'
    ];
    // Data manually extracted from the image.
    const dematelMatrix = [
        [0,3,2,4,3,2,2,2,2,1,1,2,1,3,3,3,1,1],
        [2,0,1,2,3,2,3,3,2,1,1,2,1,3,3,3,1,1],
        [1,2,0,1,1,1,1,2,2,1,1,2,1,2,2,2,2,1],
        [4,2,0,0,2,3,3,3,3,2,2,3,2,3,3,3,2,3],
        [1,1,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,0,1,1,0,2,1,0,0,0,1,2,0,0,2,0,0],
        [1,2,0,1,1,1,0,2,1,0,0,1,2,0,0,1,0,0],
        [2,3,1,1,2,0,1,0,2,1,0,1,2,0,1,3,1,0],
        [2,3,1,1,1,1,0,1,0,1,0,1,1,1,1,3,0,0],
        [1,2,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,0],
        [1,2,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0],
        [2,1,1,1,1,1,1,0,0,0,0,0,3,2,0,0,3,0],
        [2,1,1,1,1,1,1,0,0,0,0,3,0,0,0,0,1,3],
        [2,3,1,1,1,3,3,3,3,1,1,0,2,0,2,0,0,0],
        [2,2,2,1,1,1,1,3,3,1,1,2,0,3,0,4,1,0],
        [2,2,1,1,1,1,1,0,1,1,1,2,0,1,4,0,2,0],
        [2,1,1,2,1,1,1,0,0,0,0,0,1,2,0,1,0,4],
        [2,1,1,2,1,1,1,0,0,0,0,0,1,0,0,1,4,0]
    ];

    const dematelMatrixData = [];
    for (let i = 0; i < dematelMatrix.length; i++) {
        for (let j = 0; j < dematelMatrix[i].length; j++) {
            dematelMatrixData.push([j, i, dematelMatrix[i][j]]);
        }
    }
    
    var dematelMatrixOption = {
        tooltip: {
            position: 'top'
        },
        grid: {
            height: '70%',
            top: '12%',
            left: '15%',
            right: '10%'
        },
        xAxis: {
            type: 'category',
            data: dematelIndicators,
            splitArea: {
                show: true
            },
            axisLabel: {
                rotate: 90,
                color: '#fff',
                fontSize: 10
            }
        },
        yAxis: {
            type: 'category',
            data: dematelIndicators,
            splitArea: {
                show: true
            },
             axisLabel: {
                color: '#fff',
                fontSize: 10
            }
        },
        visualMap: {
            min: 0,
            max: 4,
            calculable: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            inRange: {
                color: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#081d58'].reverse()
            },
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            name: '直接影响关系',
            type: 'heatmap',
            data: dematelMatrixData,
            label: {
                show: true,
                color: '#000'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    dematelMatrixHeatmap.setOption(dematelMatrixOption);

    // Resize charts on window resize
    window.addEventListener('resize', function () {
        dematelBarChart.resize();
        dematelGraphChart.resize();
        correlationHeatmap.resize();
        dematelMatrixHeatmap.resize();
    });
}); 