// 确保页面加载后执行初始化
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，开始初始化各个图表...');
    initializeAllCharts();
});

// 初始化所有图表 - 修改为异步函数
async function initializeAllCharts() {
    console.log('开始初始化所有图表');
    
    // 输出调试信息
    console.log('ECharts是否加载:', typeof echarts !== 'undefined');
    
    // 先初始化其他图表，保证它们能正常显示
    initializeFinancialCharts();
    
    // 初始化农业图表
    initializeAgricultureCharts();
    
    // 初始化水土流失治理图表
    initWaterResourcesChart();
    
    // 异步加载并注册地图
    try {
        console.log('开始加载本地 GeoJSON 地图数据...');
        const response = await fetch('中国_省.geojson');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const chinaGeoJson = await response.json();
        console.log('GeoJSON 地图数据加载成功');
        
        // **名称处理**：统一GeoJSON中的省份名称和数据中的名称
        // GeoJSON 使用 "XX省" 或 "XX市"，而我们的数据使用 "XX"
        chinaGeoJson.features.forEach(feature => {
            let name = feature.properties.name;
            // 移除 "省", "市", "自治区", "壮族", "回族", "维吾尔" 等后缀
            name = name.replace(/省|市|自治区|壮族|回族|维吾尔/g, '');
            // 特殊处理内蒙古和西藏
            if (name === '内蒙古') {
                name = '内蒙古';
            }
            if (name === '西藏') {
                name = '西藏';
            }
            feature.properties.name = name;
        });
        console.log('GeoJSON 省份名称处理完成');

        // 使用处理后的 GeoJSON 数据注册地图
        echarts.registerMap('china', chinaGeoJson);
        console.log('自定义中国地图注册成功');
        
        // 地图数据注册成功后，再初始化地图
        tryInitMap();
        
    } catch (error) {
        console.error('加载或注册自定义地图时出错:', error);
    }
}

// 初始化农业相关图表
function initializeAgricultureCharts() {
    try {
        console.log('开始初始化农业相关图表');
        
        // 初始化农用投入图表
        if (typeof initAgriculturalInputsChart === 'function' && 
            document.querySelector('#agricultural-inputs .chart-container')) {
            console.log('初始化农用投入图表');
            initAgriculturalInputsChart();
        }
        
        // 初始化农业资源图表
        if (typeof initAgriculturalResourcesChart === 'function' && 
            document.querySelector('#agricultural-resources .chart-container')) {
            console.log('初始化农业资源图表');
            initAgriculturalResourcesChart();
        }
        
    } catch (error) {
        console.error('初始化农业图表时出错:', error);
    }
}

// 初始化财务相关图表
function initializeFinancialCharts() {
    try {
        // 国家财政总支出趋势
        if (document.querySelector('#total-expenditure .chart-container')) {
            console.log('开始初始化国家财政总支出趋势图');
            initTotalExpenditureChart();
        }
        
        // 主要支出领域对比
        if (document.querySelector('#expenditure-comparison .chart-container')) {
            console.log('开始初始化主要支出领域对比图');
            initExpenditureComparisonChart();
        }
        
        // 教育与科技支出分析
        if (document.querySelector('#education-science .chart-container')) {
            console.log('开始初始化教育与科技支出分析图');
            initEducationScienceChart();
        }
        
        // 国防与安全支出
        if (document.querySelector('#defense-security .chart-container')) {
            console.log('开始初始化国防与安全支出图');
            initDefenseSecurityChart();
        }
        
        // 社会保障与医疗卫生
        if (document.querySelector('#social-medical .chart-container')) {
            console.log('开始初始化社会保障与医疗卫生图');
            initSocialMedicalChart();
        }
        
        // 支出结构分析
        if (document.querySelector('#structure-analysis .chart-container')) {
            console.log('开始初始化支出结构分析图');
            initStructureAnalysisChart();
        }
    } catch (error) {
        console.error('初始化财务图表时出错:', error);
    }
}

// 尝试初始化地图
function tryInitMap() {
    try {
        if (document.querySelector('#china-map .chart-container')) {
            console.log('开始初始化中国地图');
            
            // 检查必要的依赖
            if (typeof echarts === 'undefined') {
                console.error('ECharts库未加载，无法初始化地图');
                return;
            }
            
            // 确保中国地图已正确注册
            if (!echarts.getMap('china')) {
                console.error('中国地图数据未注册，无法初始化地图。');
                return;
            }
            
            const mapContainer = document.querySelector('#china-map .chart-container');
            const mapChart = echarts.init(mapContainer);
            window.chinaMapChart = mapChart;
            
            // 默认显示2018年的数据
            const defaultYear = 2018;
            const yearDisplay = document.querySelector('.year-display');
            if (yearDisplay) {
                yearDisplay.textContent = `${defaultYear}年`;
            }
            
            // 使用测试数据
            const mapData = generateTestData();
            
            // 配置地图选项 - 修改为匹配图片的样式
            const option = {
                backgroundColor: 'transparent',  // 透明背景，让CSS背景生效
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        const data = params.data || {};
                        if (data.value === null || data.value === undefined) {
                            return `${params.name}<br/>数据暂缺`;
                        }
                        return `${params.name}<br/>规模以上工业企业R&D人员全时当量(人年)：${data.value}`;
                    },
                    className: 'map-tooltip'
                },
                visualMap: {
                    min: 50,
                    max: 85,
                    left: '5%',
                    bottom: '25%',
                    text: ['85', '50'],
                    realtime: false,
                    calculable: false,  // 不显示手柄
                    inRange: {
                        color: ['#00CED1', '#4682B4', '#87CEEB', '#FFFF00', '#FFA500', '#FF4500', '#FF0000']
                    },
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                        className: 'map-legend-text'
                    },
                    itemWidth: 15,  // 图例宽度
                    itemHeight: 100,  // 图例高度
                    orient: 'vertical'  // 垂直方向
                },
                series: [
                    {
                        name: '农业绿色发展综合得分',
                        type: 'map',
                        map: 'china',
                        roam: false,  // 禁止拖动和缩放
                        zoom: 1.23,
                        emphasis: {
                            label: {
                                show: false,
                                color: '#fff'
                            },
                            itemStyle: {
                                areaColor: '#0396FF'
                            }
                        },
                        itemStyle: {
                            areaColor: '#0c1c45',  // 使用深蓝色作为未选中区域颜色
                            borderColor: '#0F84D5',
                            borderWidth: 1
                        },
                        label: {
                            show: false
                        },
                        data: mapData
                    }
                ]
            };
            
            mapChart.setOption(option);
            
            // 响应窗口大小变化
            window.addEventListener('resize', function() {
                mapChart.resize();
            });
            
            // 初始化时间轴
            createSimpleTimeline(mapChart, mapData);
            
            console.log('中国地图初始化完成');
        } else {
            console.error('找不到中国地图容器');
        }
    } catch (error) {
        console.error('初始化中国地图时出错:', error);
    }
}

// 创建简单的时间轴
function createSimpleTimeline(mapChart, initialData) {
    console.log('创建简单时间轴');
    
    // 年份数据 - 修改为与图片匹配的年份范围
    const years = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', 
                   '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
    
    // 当前年份索引，默认为2018年
    let currentYearIndex = years.indexOf('2018');
    if (currentYearIndex === -1) currentYearIndex = 13; // 默认值
    
    // 填充年份标记
    const yearMarkersContainer = document.querySelector('.year-markers');
    if (yearMarkersContainer) {
        yearMarkersContainer.innerHTML = '';
        years.forEach(year => {
            const marker = document.createElement('span');
            marker.textContent = year;
            marker.className = year === '2018' ? 'active' : '';
            marker.setAttribute('data-year', year);
            yearMarkersContainer.appendChild(marker);
        });
    }
    
    // 设置时间轴位置 - 根据当前年份设置
    function updateTimelinePosition() {
        const progress = currentYearIndex / (years.length - 1) * 100;
        
        const timelineProgress = document.querySelector('.timeline-progress');
        const timelineThumb = document.querySelector('.timeline-thumb');
        
        if (timelineProgress) {
            timelineProgress.style.width = `${progress}%`;
        }
        if (timelineThumb) {
            timelineThumb.style.left = `${progress}%`;
        }
        
        // 激活当前年份标记
        const yearMarkers = yearMarkersContainer.querySelectorAll('span');
        yearMarkers.forEach(marker => {
            if (marker.getAttribute('data-year') === years[currentYearIndex]) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
    
    // 更新年份并更新地图数据
    function updateYear(yearIndex) {
        if (yearIndex < 0) yearIndex = 0;
        if (yearIndex >= years.length) yearIndex = years.length - 1;
        
        currentYearIndex = yearIndex;
        const year = years[currentYearIndex];
        
        // 设置年份显示文本
        const yearDisplay = document.querySelector('.year-display');
        if (yearDisplay) {
            yearDisplay.textContent = `${year}年`;
        }
        
        // 更新时间轴位置
        updateTimelinePosition();
        
        // 更新地图数据 - 为每年生成不同的测试数据
        const mapData = generateYearlyTestData(year);
        updateMapData(mapChart, mapData);
    }
    
    // 初始化年份显示
    updateYear(currentYearIndex);
    
    // 时间轴点击事件
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timeline.addEventListener('click', function(event) {
            const rect = timeline.getBoundingClientRect();
            const position = (event.clientX - rect.left) / rect.width;
            const newYearIndex = Math.round(position * (years.length - 1));
            updateYear(newYearIndex);
        });
    }
    
    // 时间轴拖动
    const timelineThumb = document.querySelector('.timeline-thumb');
    let isDragging = false;
    
    if (timelineThumb) {
        timelineThumb.addEventListener('mousedown', function(event) {
            isDragging = true;
            event.preventDefault(); // 防止文本选择
        });
        
        document.addEventListener('mousemove', function(event) {
            if (!isDragging) return;
            
            const timeline = document.querySelector('.timeline');
            const rect = timeline.getBoundingClientRect();
            const position = (event.clientX - rect.left) / rect.width;
            const newYearIndex = Math.round(position * (years.length - 1));
            
            updateYear(newYearIndex);
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }
    
    // 年份标记点击事件
    if (yearMarkersContainer) {
        yearMarkersContainer.addEventListener('click', function(event) {
            if (event.target.tagName === 'SPAN') {
                const year = event.target.getAttribute('data-year');
                const yearIndex = years.indexOf(year);
                if (yearIndex !== -1) {
                    updateYear(yearIndex);
                }
            }
        });
    }
    
    // 添加播放/暂停按钮功能
    const playPauseButton = document.querySelector('#play-pause');
    const pauseIcon = document.querySelector('.pause-icon');
    const playIcon = document.querySelector('.play-icon');
    
    if (playPauseButton) {
        // 设置初始状态为暂停
        pauseIcon.style.display = '';
        playIcon.style.display = 'none';
        
        let isPlaying = false;
        let playInterval;
        
        playPauseButton.addEventListener('click', function() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                // 切换到播放状态
                pauseIcon.style.display = 'none';
                playIcon.style.display = '';
                
                // 开始自动播放
                playInterval = setInterval(function() {
                    currentYearIndex++;
                    
                    // 如果到达最后一年，停止播放并重置
                    if (currentYearIndex >= years.length) {
                        currentYearIndex = 0;
                        // 或者选择停止播放
                        // clearInterval(playInterval);
                        // isPlaying = false;
                        // pauseIcon.style.display = '';
                        // playIcon.style.display = 'none';
                    }
                    
                    updateYear(currentYearIndex);
                }, 1500); // 每1.5秒切换一次
            } else {
                // 切换到暂停状态
                pauseIcon.style.display = '';
                playIcon.style.display = 'none';
                clearInterval(playInterval);
            }
        });
    }
}

// 更新地图数据
function updateMapData(mapChart, newData) {
    if (mapChart) {
        mapChart.setOption({
            series: [{
                data: newData
            }]
        });
    }
}

// 根据年份生成不同的测试数据
function generateYearlyTestData(year) {
    const provinces = [
        '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
        '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
        '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
        '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
        '香港', '澳门'
    ];
    
    // 基础数据 - 2018年的数据
    const baseData = {
        // 东部红色省份 - 分数高
        '江苏': 82, '浙江': 80, '上海': 83, '广东': 81, '福建': 78,
        
        // 黄色省份 - 分数中等偏高
        '山东': 75, '安徽': 72, '河南': 73, '湖北': 71, '江西': 69, '北京': 74, '天津': 72,
        
        // 青色省份 - 分数中等偏低
        '河北': 68, '山西': 65, '陕西': 64, '重庆': 67, '湖南': 66, '广西': 63, '海南': 62,
        '四川': 61, '贵州': 60, '云南': 59,
        
        // 蓝色省份 - 分数低
        '辽宁': 57, '吉林': 56, '黑龙江': 54, '内蒙古': 53, '宁夏': 55, 
        '甘肃': 52, '青海': 51, '新疆': 52, '西藏': 50
    };
    
    // 根据年份修改一些值，使得不同年份的地图有变化
    const yearIndex = parseInt(year) - 2005; // 基准年
    const randomFactor = yearIndex / 16; // 0-1之间的因子
    
    return provinces.map(name => {
        // 基础值
        let baseValue = baseData[name] || 65;
        
        // 根据年份增加一些随机变化
        // 早期年份分数普遍较低，逐年提高
        const yearOffset = (yearIndex - 13) * 0.5; // 2018年为基准点
        
        // 添加一些随机干扰使每年的地图看起来有差异
        const randomNoise = Math.sin(yearIndex * 0.5 + provinces.indexOf(name)) * 2;
        
        let value = Math.round(baseValue + yearOffset + randomNoise);
        
        // 确保值在合理范围内
        value = Math.max(50, Math.min(85, value));
        
        return {
            name: name,
            value: value
        };
    });
}

// 总支出趋势图
function initTotalExpenditureChart() {
    try {
        console.log('正在初始化总支出趋势图...');
        
        const chartDom = document.querySelector('#total-expenditure .chart-container');
        if (!chartDom) {
            console.error('无法找到总支出趋势图的DOM元素');
            return;
        }
        
        console.log('总支出趋势图DOM元素已找到');
        console.log('years变量类型:', typeof years, '值:', years);
        console.log('totalExpenditure变量类型:', typeof totalExpenditure, '值:', totalExpenditure);
        
        const myChart = echarts.init(chartDom);
        console.log('已创建总支出趋势图实例');
        
        const option = {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{a}: {c} 亿元'
            },
            xAxis: {
                type: 'category',
                data: years,
                axisLabel: {
                    rotate: 45,
                    color: '#8BABEF'
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '亿元',
                nameTextStyle: {
                    color: '#8BABEF'
                },
                axisLabel: {
                    color: '#8BABEF'
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(36, 62, 106, 0.3)'
                    }
                }
            },
            series: [{
                name: '国家财政总支出',
                data: totalExpenditure,
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#47A0FF'
                },
                lineStyle: {
                    width: 3,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#1890FF'
                        }, {
                            offset: 1, color: '#39C0FF'
                        }]
                    }
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(24, 144, 255, 0.5)'
                        }, {
                            offset: 1, color: 'rgba(24, 144, 255, 0.1)'
                        }]
                    }
                }
            }]
        };
        
        console.log('正在设置总支出趋势图的选项');
        myChart.setOption(option);
        console.log('总支出趋势图选项已设置');
        
        // 响应窗口大小变化
        window.addEventListener('resize', function() {
            myChart.resize();
        });
        
        console.log('总支出趋势图初始化完成');
    } catch (error) {
        console.error('初始化总支出趋势图时出错:', error);
    }
}

// 主要支出领域对比图
function initExpenditureComparisonChart() {
    const chartDom = document.querySelector('#expenditure-comparison .chart-container');
    const myChart = echarts.init(chartDom);
    
    // 选择几个主要的支出领域
    const selectedCategories = ['education', 'socialSecurity', 'defense', 'healthcare', 'science'];
    const series = [];
    
    selectedCategories.forEach(category => {
        series.push({
            name: getCategoryName(category),
            type: 'line',
            data: calculateYearlyData(category),
            symbol: 'emptyCircle',
            symbolSize: 6,
            emphasis: {
                focus: 'series'
            }
        });
    });
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: selectedCategories.map(getCategoryName),
            textStyle: {
                color: '#8BABEF'
            },
            right: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: years,
            axisLabel: {
                rotate: 45,
                color: '#8BABEF'
            },
            axisLine: {
                lineStyle: {
                    color: '#243e6a'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '亿元',
            nameTextStyle: {
                color: '#8BABEF'
            },
            axisLabel: {
                color: '#8BABEF'
            },
            axisLine: {
                lineStyle: {
                    color: '#243e6a'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(36, 62, 106, 0.3)'
                }
            }
        },
        series: series,
        color: ['#FF9F43', '#0396FF', '#EA5455', '#7367F0', '#28C76F']
    };
    
    myChart.setOption(option);
    
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 教育与科技支出分析
function initEducationScienceChart() {
    const chartDom = document.querySelector('#education-science .chart-container');
    const myChart = echarts.init(chartDom);
    
    // 获取教育和科技的数据
    const educationData = calculateYearlyData('education');
    const scienceData = calculateYearlyData('science');
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['教育支出', '科学技术支出'],
            textStyle: {
                color: '#8BABEF'
            },
            right: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: years,
            axisLabel: {
                rotate: 45,
                color: '#8BABEF'
            },
            axisLine: {
                lineStyle: {
                    color: '#243e6a'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '亿元',
            nameTextStyle: {
                color: '#8BABEF'
            },
            axisLabel: {
                color: '#8BABEF'
            },
            axisLine: {
                lineStyle: {
                    color: '#243e6a'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(36, 62, 106, 0.3)'
                }
            }
        },
        series: [
            {
                name: '教育支出',
                type: 'bar',
                data: educationData,
                itemStyle: {
                    color: '#28C76F'
                },
                barWidth: '20%'
            },
            {
                name: '科学技术支出',
                type: 'bar',
                data: scienceData,
                itemStyle: {
                    color: '#00CFE8'
                },
                barWidth: '20%'
            }
        ]
    };
    
    myChart.setOption(option);
    
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 国防与安全支出
function initDefenseSecurityChart() {
    const chartDom = document.querySelector('#defense-security .chart-container');
    const myChart = echarts.init(chartDom);
    
    // 获取国防和公共安全的数据
    const defenseData = calculateYearlyData('defense');
    const securityData = calculateYearlyData('publicSecurity');
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: ['国防支出', '公共安全支出'],
            textStyle: {
                color: '#8BABEF'
            },
            right: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: years,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    rotate: 45,
                    color: '#8BABEF'
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '亿元',
                axisLabel: {
                    color: '#8BABEF'
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(36, 62, 106, 0.3)'
                    }
                }
            }
        ],
        series: [
            {
                name: '国防支出',
                type: 'bar',
                data: defenseData,
                itemStyle: {
                    color: '#EA5455'
                },
                barWidth: '20%'
            },
            {
                name: '公共安全支出',
                type: 'line',
                yAxisIndex: 0,
                data: securityData,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#FF9F43'
                },
                itemStyle: {
                    color: '#FF9F43'
                }
            }
        ]
    };
    
    myChart.setOption(option);
    
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 社会保障与医疗卫生
function initSocialMedicalChart() {
    const chartDom = document.querySelector('#social-medical .chart-container');
    const myChart = echarts.init(chartDom);
    
    // 获取社会保障和医疗卫生的数据
    const socialData = calculateYearlyData('socialSecurity');
    const medicalData = calculateYearlyData('healthcare');
    
    // 计算比率
    const ratioData = [];
    for (let i = 0; i < years.length; i++) {
        if (socialData[i] && medicalData[i]) {
            ratioData.push(((socialData[i] + medicalData[i]) / totalExpenditure[i] * 100).toFixed(2));
        } else {
            ratioData.push(null);
        }
    }
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['社会保障支出', '医疗卫生支出', '占财政总支出比例'],
            textStyle: {
                color: '#8BABEF'
            },
            right: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: years,
                axisLabel: {
                    rotate: 45,
                    color: '#8BABEF'
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '亿元',
                position: 'left',
                axisLabel: {
                    color: '#8BABEF'
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(36, 62, 106, 0.3)'
                    }
                }
            },
            {
                type: 'value',
                name: '百分比',
                position: 'right',
                axisLabel: {
                    formatter: '{value}%',
                    color: '#8BABEF'
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '社会保障支出',
                type: 'bar',
                barWidth: '20%',
                stack: 'social',
                data: socialData,
                itemStyle: {
                    color: '#7367F0'
                }
            },
            {
                name: '医疗卫生支出',
                type: 'bar',
                barWidth: '20%',
                stack: 'social',
                data: medicalData,
                itemStyle: {
                    color: '#00CFE8'
                }
            },
            {
                name: '占财政总支出比例',
                type: 'line',
                yAxisIndex: 1,
                data: ratioData,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#FF9F43'
                },
                itemStyle: {
                    color: '#FF9F43'
                }
            }
        ]
    };
    
    myChart.setOption(option);
    
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 支出结构分析
function initStructureAnalysisChart() {
    const chartDom = document.querySelector('#structure-analysis .chart-container');
    const myChart = echarts.init(chartDom);
    
    // 默认展示最新一年的数据
    const latestYear = years[years.length - 2]; // 使用倒数第二年，因为最后一年可能数据不全
    const structureData = calculateStructureData(latestYear);
    
    // 按支出金额排序
    structureData.sort((a, b) => b.value - a.value);
    
    // 提取前8个领域，其余归为"其他"
    const pieData = structureData.slice(0, 8);
    let otherSum = 0;
    for (let i = 8; i < structureData.length; i++) {
        otherSum += structureData[i].value;
    }
    if (otherSum > 0) {
        pieData.push({
            name: '其他领域',
            value: otherSum,
            percentage: (otherSum / totalExpenditure[years.indexOf(latestYear)] * 100).toFixed(2)
        });
    }
    
    const option = {
        title: {
            text: `${latestYear}财政支出结构分析`,
            left: 'center',
            textStyle: {
                color: '#3d8dff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}亿元 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            top: 'center',
            textStyle: {
                color: '#8BABEF'
            }
        },
        series: [
            {
                name: '支出结构',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#0a1528',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: '{b}\n{c}亿元\n{d}%',
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: pieData
            }
        ],
        color: [
            '#FF9F43', '#0396FF', '#EA5455', '#7367F0', 
            '#28C76F', '#00CFE8', '#1890FF', '#6639B6', '#FFEB3B'
        ]
    };
    
    myChart.setOption(option);
    
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 生成测试数据 - 模拟图片中的颜色分布
function generateTestData() {
    // 直接调用年份相关的测试数据生成函数，使用默认年份
    return generateYearlyTestData('2018');
}

// 初始化水土流失治理图表
function initWaterResourcesChart() {
    try {
        const chartDom = document.getElementById('water-resources-chart');
        if (!chartDom) {
            console.error('找不到水土流失治理图表容器');
            return;
        }
        
        const myChart = echarts.init(chartDom);
        
        // 使用图片中的科技创新指标数据
        const years = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        
        // 科技人员数据（蓝线）从约120增长到650
        const sciencePeople = [120, 145, 180, 200, 240, 280, 310, 330, 350, 370, 380, 400, 430, 450, 480, 520, 560, 630, 650]; 
        
        // 科技支出数据（红线）从约50增长到720
        const scienceExpense = [50, 80, 100, 120, 140, 170, 210, 270, 300, 300, 310, 360, 460, 520, 560, 560, 680, 680, 720]; 
        
        // 科技专利数据（绿线）从约100增长到230
        const sciencePatent = [100, 110, 120, 125, 130, 140, 145, 150, 150, 155, 160, 170, 170, 190, 180, 190, 200, 210, 230]; 
        
        // 科技成果（黄线）从约10增长到220
        const scienceAchievement = [10, 18, 20, 30, 40, 50, 60, 65, 80, 100, 120, 150, 170, 180, 170, 180, 190, 210, 220]; 
        
        const option = {
            title: {
                text: '2005-2023年中国科技创新指标变化趋势',
                left: 'center',
                top: 0,
                textStyle: {
                    color: '#eaeaea',
                    fontSize: 12
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            legend: {
                data: ['研发人员(万人年)', '科技支出(十亿元)', '科技专利授权(万件)', '科技成果转化(亿元)'],
                textStyle: {
                    color: '#8BABEF',
                    fontSize: 10
                },
                top: 20,
                itemWidth: 15,
                itemHeight: 10
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '8%',
                top: '25%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: years,
                axisLabel: {
                    color: '#8BABEF',
                    fontSize: 10,
                    interval: 2  // 每隔2个标签显示一次
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '',
                axisLabel: {
                    color: '#8BABEF',
                    fontSize: 10
                },
                axisLine: {
                    lineStyle: {
                        color: '#243e6a'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(36, 62, 106, 0.3)'
                    }
                }
            },
            series: [
                {
                    name: '研发人员(万人年)',
                    type: 'line',
                    data: sciencePeople,
                    symbol: 'circle',
                    symbolSize: 5,
                    itemStyle: {
                        color: '#1E90FF'
                    },
                    lineStyle: {
                        color: '#1E90FF',
                        width: 2
                    }
                },
                {
                    name: '科技支出(十亿元)',
                    type: 'line',
                    data: scienceExpense,
                    symbol: 'circle',
                    symbolSize: 5,
                    itemStyle: {
                        color: '#FF4500'
                    },
                    lineStyle: {
                        color: '#FF4500',
                        width: 2
                    }
                },
                {
                    name: '科技专利授权(万件)',
                    type: 'line',
                    data: sciencePatent,
                    symbol: 'circle',
                    symbolSize: 5,
                    itemStyle: {
                        color: '#32CD32'
                    },
                    lineStyle: {
                        color: '#32CD32',
                        width: 2
                    }
                },
                {
                    name: '科技成果转化(亿元)',
                    type: 'line',
                    data: scienceAchievement,
                    symbol: 'circle',
                    symbolSize: 5,
                    itemStyle: {
                        color: '#FFD700'
                    },
                    lineStyle: {
                        color: '#FFD700',
                        width: 2
                    }
                }
            ]
        };
        
        myChart.setOption(option);
        
        window.addEventListener('resize', function() {
            myChart.resize();
        });
        
        console.log('科技创新指标图表初始化完成');
    } catch (error) {
        console.error('初始化科技创新指标图表时出错:', error);
    }
} 