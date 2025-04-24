// ================== 财政支出数据 ==================
// 年份数据
const years = ['2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年', '2024年'];

// 总财政支出数据（亿元）
const totalExpenditure = [140212.1, 151785.56, 175877.77, 187755.21, 203085.49, 220904.13, 238858.37, 245679.03, 245673, 260552.12, 274622.94, 284612];

// 各类支出数据（亿元）
const expenditureData = {
    // 一般公共服务
    generalPublicServices: [13755.13, 13267.5, 13547.79, 14790.5, 16510.36, 18374.69, 20344.66, 20061.1, 19880.24, 20879.4, 21242.45],
    
    // 外交
    diplomacy: [355.76, 361.54, 480.32, 482, 521.75, 586.36, 617.5, 515.44, 492.66, 490.43, 572.08],
    
    // 国防
    defense: [7410.62, 8299.5, 9087.84, 9765.8, 10432.37, 11280.46, 12122.1, 12918.77, 13787.23, 14752.22, 15805.08],
    
    // 公共安全
    publicSecurity: [7786.78, 8357.23, 9379.96, 11031.98, 12461.27, 13781.48, 13901.93, 13862.9, 13781.15, 14420.19, 14870.12],
    
    // 教育
    education: [22001.76, 23041.71, 26271.88, 28072.8, 30153.18, 32169.47, 34796.94, 36359.94, 37468.35, 39447.59, 41248.29],
    
    // 科学技术
    science: [5084.3, 5314.5, 5862.57, 6564, 7266.98, 8326.65, 9470.79, 9018.34, 9669.77, 10032.02, 10885.84],
    
    // 文化体育与传媒
    culture: [2544.39, 2691.48, 3076.64, 3163.08, 3391.93, 3537.86, 4086.31, 4245.58, 3985.23, 3913.32, 3965.36],
    
    // 社会保障和就业
    socialSecurity: [14490.54, 15968.9, 19018.69, 21591.5, 24611.68, 27012.09, 29379.08, 32568.51, 33788.26, 36609.15, 39881.65],
    
    // 医疗卫生
    healthcare: [8279.9, 10176.8, 11953.18, 13158.8, 14450.63, 15623.55, 16665.34, 19216.19, 19142.68, 22536.72, 22396.01],
    
    // 环境保护
    environmentProtection: [3435.15, 3815.6, 4802.89, 4734.8, 5617.33, 6297.61, 7390.2, 6333.4, 5525.14, 5412.8, 5636.78],
    
    // 城乡社区事务
    urbanRuralAffairs: [11165.57, 12959.5, 15886.36, 18394.6, 20585, 22124.13, 24895.24, 19945.91, 19453.99, 19425.22, 20535.76],
    
    // 农林水事务
    agricultureForestryWater: [13349.55, 14173.8, 17350.49, 18587.4, 19088.99, 21085.59, 22862.8, 23948.46, 22034.5, 22499.76, 23989.85],
    
    // 交通运输
    transportation: [9348.82, 10400.4, 12356.27, 10498.7, 10673.98, 11282.76, 11817.55, 12197.88, 11420.68, 12044.09, 12222.11],
    
    // 其他支出
    other: [3271.79, 3254.53, 3670.55, 1899.33, 1729.31, 2312.64, 1748.79, 1737.18, 1376.05, 1460.67, 1515.08]
};

// 计算主要领域支出的年份数据
const calculateYearlyData = (category) => {
    return years.map((year, index) => {
        if (index < expenditureData[category].length) {
            return expenditureData[category][index];
        } else {
            return null; // 对于没有数据的年份返回null
        }
    });
};

// 计算每年财政支出的结构分布（百分比）
const calculateStructureData = (year) => {
    const yearIndex = years.indexOf(year);
    if (yearIndex === -1 || yearIndex >= totalExpenditure.length) return [];
    
    const total = totalExpenditure[yearIndex];
    const result = [];
    
    for (const category in expenditureData) {
        if (yearIndex < expenditureData[category].length) {
            const value = expenditureData[category][yearIndex];
            const percentage = (value / total * 100).toFixed(2);
            result.push({
                name: getCategoryName(category),
                value: value,
                percentage: parseFloat(percentage)
            });
        }
    }
    
    return result;
};

// 获取分类的中文名称
function getCategoryName(category) {
    const nameMap = {
        generalPublicServices: '一般公共服务',
        diplomacy: '外交',
        defense: '国防',
        publicSecurity: '公共安全',
        education: '教育',
        science: '科学技术',
        culture: '文化体育与传媒',
        socialSecurity: '社会保障和就业',
        healthcare: '医疗卫生',
        environmentProtection: '环境保护',
        urbanRuralAffairs: '城乡社区事务',
        agricultureForestryWater: '农林水事务',
        transportation: '交通运输',
        other: '其他支出'
    };
    
    return nameMap[category] || category;
}

// ================== 创新指数数据 ==================
// 中国与其他主要经济体创新指数比较数据(2024)
const agriculturalInputsData = {
    // 国家/地区名称数据
    years: ['印度', '加拿大', '日本', '法国', '中国', '德国', '韩国', '英国', '新加坡', '美国'],
    // 创新指数数据
    fertilizer: [39, 14, 13, 12, 11, 9, 6, 5, 4, 3],
    // 保留原有字段名称但使用新数据
    diesel: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pesticide: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    plasticFilm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

// 科技财政投入数据 - 根据雷达图更新
const scienceFundingData = {
    // 年份数据
    years: ['2011年', '2016年', '2021年'],
    
    // 各项指标数据
    indicators: [
        { name: '国家财政科学技术支出(亿元)', max: 10000 },
        { name: '地方财政科学技术支出(亿元)', max: 7000 },
        { name: '中央财政科学技术支出(亿元)', max: 6000 },
        { name: '国家财政文化体育与传媒支出(亿元)', max: 6000 },
        { name: '国家财政环境保护支出(亿元)', max: 6000 }
    ],
    
    // 不同年份的各指标值，根据雷达图数据
    values: [
        // 2011年数据
        [3828.0, 1885.9, 1710.0, 1893.4, 2641.0],
        // 2016年数据
        [6564.0, 3877.9, 2686.1, 3163.1, 4734.8],
        // 2021年数据
        [9669.8, 6464.2, 5205.5, 3985.2, 5525.1]
    ]
};

// ================== 地图数据 ==================
// 中国地图数据
const regionNames = [
    '北京', '天津', '河北', '山西', '内蒙古', 
    '辽宁', '吉林', '黑龙江', '上海', '江苏', 
    '浙江', '安徽', '福建', '江西', '山东', 
    '河南', '湖北', '湖南', '广东', '广西', 
    '海南', '重庆', '四川', '贵州', '云南', 
    '西藏', '陕西', '甘肃', '青海', '宁夏', 
    '新疆', '台湾', '香港', '澳门'
];

// 规模以上工业企业R&D人员全时当量(人年) 数据
const rdPersonnelData = {
    // 年份数据
    years: ['2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年'],
    
    // 各地区数据
    regionData: {
        '北京': [50773, 51143, 52719, 46929, 44241, 46172, 41496, 53459, 59993],
        '天津': [84291, 78336, 57881, 53280, 45685, 45227, 49404, 51110, 56539],
        '河北': [79452, 82971, 79135, 68956, 76096, 86337, 83401, 111333, 128602],
        '山西': [28927, 29450, 31757, 27228, 27478, 32547, 35468, 40034, 42266],
        '内蒙古': [29190, 30126, 23243, 15777, 15001, 18393, 15433, 24931, 26554],
        '辽宁': [49097, 49254, 49463, 53133, 52104, 59978, 63156, 67503, 67329],
        '吉林': [23202, 23469, 21056, 11124, 11849, 11806, 16124, 15297, 16859],
        '黑龙江': [31762, 32219, 24046, 13110, 15054, 14272, 15444, 18483, 21864],
        '上海': [94981, 98671, 88967, 88016, 80694, 87957, 93966, 100972, 112518],
        '江苏': [316672, 321845, 333646, 394147, 451752, 480493, 482140, 519168, 651025],
        '浙江': [441304, 451885, 455468, 455530, 508375, 538781, 612676, 655930, 721248],
        '安徽': [96791, 99451, 103598, 106744, 124491, 139988, 170421, 180814, 196251],
        '福建': [99180, 102250, 105533, 120723, 126089, 140850, 186328, 193782, 211921],
        '江西': [31321, 34924, 45082, 67394, 85032, 100473, 97497, 101018, 126157],
        '山东': [241395, 241761, 239170, 236515, 198205, 255281, 349379, 391781, 444404],
        '河南': [131051, 132731, 123619, 128054, 140361, 145464, 162562, 175486, 182729],
        '湖北': [86813, 96340, 94241, 105041, 115743, 125066, 147504, 168695, 183963],
        '湖南': [83821, 86440, 94228, 102800, 106946, 121470, 143908, 174121, 209066],
        '广东': [411059, 423730, 457342, 621950, 642490, 700017, 709119, 772585, 920359],
        '广西': [19000, 19402, 16163, 17228, 22102, 20407, 28508, 37341, 33516],
        '海南': [3325, 2688, 1971, 1971, 1779, 2050, 2911, 3961, 5700],
        '重庆': [45129, 47392, 56416, 61956, 62424, 69843, 83845, 83623, 86802],
        '四川': [56841, 60146, 71968, 77848, 78289, 90128, 95650, 117859, 128074],
        '贵州': [14916, 15774, 18786, 20041, 23164, 26261, 26717, 29129, 27878],
        '云南': [16381, 17166, 21393, 24048, 29440, 28894, 28234, 27950, 37271],
        '西藏': [43, 208, 202, 326, 264, 190, 266, 173, 236],
        '陕西': [45052, 45362, 44672, 39315, 42983, 48809, 50997, 60713, 71868],
        '甘肃': [12578, 12610, 10096, 8026, 8547, 8614, 12547, 14487, 17229],
        '青海': [1285, 1750, 1799, 1157, 2379, 1626, 1878, 2137, 2137],
        '宁夏': [5470, 5686, 6392, 7060, 8073, 8333, 10930, 10804, 12038],
        '新疆': [7188, 7310, 6191, 5806, 4698, 4752, 8995, 10248, 14308],
        '台湾': [null, null, null, null, null, null, null, null, null],
        '香港': [null, null, null, null, null, null, null, null, null],
        '澳门': [null, null, null, null, null, null, null, null, null]
    }
};

// 地图数据格式转换 - 将原始数据转换为地图所需格式
const mapData = {};

// 生成各年份的地图数据
rdPersonnelData.years.forEach((yearStr, index) => {
    const year = parseInt(yearStr.replace('年', ''));
    
    mapData[year] = regionNames.map(region => {
        const data = rdPersonnelData.regionData[region];
        
        if (!data) {
            return {
                name: region,
                value: null
            };
        }
        
        return {
            name: region,
            value: data[index]
        };
    });
});

// 颜色配置
const mapColors = {
    min: 0,
    max: 900000,  // 调整最大值以匹配数据范围
    range: ['#d4e7a9', '#B3D465', '#fbe789', '#f59a5e', '#dc5356', '#985356']  // 使用适合数据的颜色范围
};

// ================== 图表初始化函数 ================== 
// 初始化农用投入图表
function initAgriculturalInputsChart() {
    const chartDom = document.querySelector('#agricultural-inputs .chart-container');
    if (!chartDom) {
        console.error('找不到农用投入图表容器');
        return;
    }
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['创新指数排名'],
            textStyle: {
                color: '#8BABEF'
            },
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '20%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
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
        yAxis: {
            type: 'category',
            data: agriculturalInputsData.years,
            axisLabel: {
                color: '#8BABEF'
            },
            axisLine: {
                lineStyle: {
                    color: '#243e6a'
                }
            }
        },
        series: [
            {
                name: '创新指数排名',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    position: 'right'
                },
                emphasis: {
                    focus: 'series'
                },
                data: agriculturalInputsData.fertilizer,
                itemStyle: {
                    color: function(params) {
                        // 给中国项添加红色
                        return params.dataIndex === 4 ? '#FF4500' : '#8884d8';
                    }
                }
            }
        ]
    };
    
    myChart.setOption(option);
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 初始化科技财政投入图表（雷达图）
function initScienceFundingChart() {
    const chartDom = document.querySelector('#agricultural-resources .chart-container');
    if (!chartDom) {
        console.error('找不到科技财政投入图表容器');
        return;
    }
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        // 移除title配置，避免与HTML中的标题重叠
        color: ['#4E79A7', '#59A14F', '#EDC948'],
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: scienceFundingData.years,
            textStyle: {
                color: '#8BABEF'
            },
            bottom: 0
        },
        radar: {
            radius: '65%', // 调整雷达图半径
            center: ['50%', '50%'], // 调整雷达图位置
            indicator: scienceFundingData.indicators,
            splitArea: {
                areaStyle: {
                    color: ['rgba(0, 56, 117, 0.1)', 'rgba(0, 56, 117, 0.2)'],
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(211, 253, 250, 0.8)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(211, 253, 250, 0.8)'
                }
            },
            name: {
                textStyle: {
                    color: '#8BABEF',
                    fontSize: 12
                },
                formatter: function(value) {
                    // 对长文字进行适当换行处理
                    if (value.length > 10) {
                        let parts = [];
                        if (value.includes('(')) {
                            // 如果包含括号，在括号前换行
                            parts = value.split('(');
                            return parts[0] + '\n(' + parts[1];
                        } else {
                            // 否则尝试在适当位置换行
                            return value.substring(0, 10) + '\n' + value.substring(10);
                        }
                    }
                    return value;
                }
            }
        },
        series: scienceFundingData.years.map((year, index) => {
            return {
                name: year,
                type: 'radar',
                data: [
                    {
                        value: scienceFundingData.values[index],
                        name: year,
                        symbolSize: 6,
                        lineStyle: {
                            width: 2
                        },
                        areaStyle: {
                            opacity: 0.3
                        }
                    }
                ]
            };
        })
    };
    
    myChart.setOption(option);
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 初始化时间轴
function initTimelineMarkers() {
    const yearMarkersContainer = document.querySelector('.year-markers');
    if (!yearMarkersContainer) {
        console.error('找不到年份标记容器');
        return;
    }
    
    yearMarkersContainer.innerHTML = ''; // 清空现有标记
    
    // 使用实际年份
    rdPersonnelData.years.forEach(year => {
        const marker = document.createElement('span');
        marker.textContent = year.replace('年', '');
        yearMarkersContainer.appendChild(marker);
    });
    
    // 设置默认年份
    setCurrentYear(2018);
}

// 设置当前年份
function setCurrentYear(year) {
    const yearDisplay = document.querySelector('.year-display');
    if (!yearDisplay) {
        console.error('找不到年份显示元素');
        return;
    }
    
    yearDisplay.textContent = `${year}年`;
    
    // 计算时间轴进度
    const years = rdPersonnelData.years.map(y => parseInt(y.replace('年', '')));
    const index = years.indexOf(year);
    const progress = index / (years.length - 1) * 100;
    
    // 更新时间轴UI
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineThumb = document.querySelector('.timeline-thumb');
    
    if (timelineProgress) {
        timelineProgress.style.width = `${progress}%`;
    }
    
    if (timelineThumb) {
        timelineThumb.style.left = `${progress}%`;
    }
    
    // 更新地图数据
    updateMapData(year);
}

// 更新地图数据
function updateMapData(year) {
    console.log('更新地图数据:', year);
    if (window.chinaMapChart && mapData[year]) {
        window.chinaMapChart.setOption({
            series: [{
                data: mapData[year]
            }]
        });
    } else {
        console.error('未找到地图实例或对应年份数据:', year);
        console.log('chinaMapChart:', window.chinaMapChart);
        console.log('mapData年份:', Object.keys(mapData));
    }
}

// 初始化时间轴交互
function initTimelineInteraction() {
    const playPauseBtn = document.getElementById('play-pause');
    const timelineTrack = document.querySelector('.timeline');
    const timelineThumb = document.querySelector('.timeline-thumb');
    const pauseIcon = document.querySelector('.pause-icon');
    const playIcon = document.querySelector('.play-icon');
    
    if (!playPauseBtn || !timelineTrack || !timelineThumb || !pauseIcon || !playIcon) {
        console.error('找不到时间轴交互元素');
        return;
    }
    
    let isPlaying = false;
    let playInterval;
    const years = rdPersonnelData.years.map(y => parseInt(y.replace('年', '')));
    let currentYearIndex = years.indexOf(2018);
    
    // 播放/暂停按钮点击事件
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'inline';
            
            // 开始播放
            playInterval = setInterval(() => {
                currentYearIndex = (currentYearIndex + 1) % years.length;
                setCurrentYear(years[currentYearIndex]);
                
                // 如果播放到最后，停止播放
                if (currentYearIndex === years.length - 1) {
                    clearInterval(playInterval);
                    isPlaying = false;
                    pauseIcon.style.display = 'inline';
                    playIcon.style.display = 'none';
                }
            }, 1500);
        } else {
            // 暂停播放
            pauseIcon.style.display = 'inline';
            playIcon.style.display = 'none';
            clearInterval(playInterval);
        }
    });
    
    // 时间轴点击事件
    timelineTrack.addEventListener('click', function(event) {
        const rect = timelineTrack.getBoundingClientRect();
        const position = (event.clientX - rect.left) / rect.width;
        const yearIndex = Math.floor(position * years.length);
        
        currentYearIndex = Math.min(Math.max(0, yearIndex), years.length - 1);
        setCurrentYear(years[currentYearIndex]);
        
        // 如果正在播放，暂停播放
        if (isPlaying) {
            clearInterval(playInterval);
            isPlaying = false;
            pauseIcon.style.display = 'inline';
            playIcon.style.display = 'none';
        }
    });
    
    // 拖动时间轴滑块
    let isDragging = false;
    
    timelineThumb.addEventListener('mousedown', function() {
        isDragging = true;
    });
    
    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            const rect = timelineTrack.getBoundingClientRect();
            let position = (event.clientX - rect.left) / rect.width;
            position = Math.min(Math.max(0, position), 1);
            
            const yearIndex = Math.floor(position * years.length);
            currentYearIndex = Math.min(Math.max(0, yearIndex), years.length - 1);
            setCurrentYear(years[currentYearIndex]);
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

// ================== 导出全局变量和函数 ================== 
// 在全局作用域中公开数据
window.rdPersonnelData = rdPersonnelData;
window.mapData = mapData;
window.mapColors = mapColors;
window.regionNames = regionNames;

// 在全局作用域中公开函数
window.initTimelineMarkers = initTimelineMarkers;
window.initTimelineInteraction = initTimelineInteraction;
window.setCurrentYear = setCurrentYear;
window.updateMapData = updateMapData;

// 等待DOM加载完成后初始化图表
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initAgriculturalInputsChart();
        initScienceFundingChart();
    }, 1000);
}); 