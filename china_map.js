// 中国地图注册
(function() {
    // 检查echarts是否已加载
    if (typeof echarts === 'undefined') {
        console.error('ECharts未加载，无法注册中国地图');
        return;
    }
    
    console.log('正在注册中国地图...');
    
    // 中国省份列表
    const provinces = [
        '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
        '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
        '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
        '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
        '香港', '澳门'
    ];
    
    // 仅在尚未注册中国地图时才注册
    if (!echarts.getMap('china')) {
        console.log('未检测到中国地图，进行本地注册');
        
        // 生成简单的地图数据
        const features = provinces.map((name, index) => {
            // 简化的地理数据，每个省份用一个方块表示，排列成网格
            const cols = 8; // 每行8个省份
            const x = (index % cols) * 10;
            const y = Math.floor(index / cols) * 10;
            
            return {
                type: 'Feature',
                id: name, // 添加ID
                properties: { name: name },
                geometry: {
                    type: 'Polygon',
                    coordinates: [[[x, y], [x+9, y], [x+9, y+9], [x, y+9], [x, y]]]
                }
            };
        });
        
        // 注册地图
        echarts.registerMap('china', {
            type: 'FeatureCollection',
            features: features
        });
        
        console.log('中国地图本地注册完成');
    } else {
        console.log('中国地图已注册，无需重复注册');
    }
    
    // 通知系统China地图已加载
    window.chinaMapLoaded = true;
})(); 