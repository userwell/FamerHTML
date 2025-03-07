//水果市场价格
var fruitPrice = {}
//水果消耗数量
var fruitCostNumber = {}
// 土地转换图
const graph = {
    "黄土地":{"红土地":{"萝卜":200,"苹果":200,"水晶":100}},
    "红土地":{"黑土地":{"西瓜":300,"辣椒":300,"水晶":500},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "黑土地":{"金土地":{"草莓":600,"南瓜":600,"水晶":1000},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "金土地":{"蓝晶土地":{"草莓":2000,"南瓜":2000,"水晶":2000},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "蓝晶土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "银土地":{"水晶土地":{"火龙果":1000,"水晶":100},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "水晶土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "焱土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "紫土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "青土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100}},
}
// 房屋等级消耗表
var classConsume = [
    ['萝卜', '苹果', '辣椒', '西瓜', '南瓜', '草莓', '水晶'],
    [150, 150, 0, 0, 0, 0, 5],                          // 1->2
    [1500, 1500, 0, 0, 0, 0, 20],                       // 2->3
    [3000, 3000, 225, 225, 0, 0, 200],                  // 3->4
    [30000, 30000, 6750, 6750, 0, 0, 1000],             // 4->5
    [60000, 60000, 11250, 11250, 9000, 9000, 2500]      // 5->6
];

const API_URL = 'http://47.98.242.216:8080/api/products';
// 获取市场水果价格文本框元素,从后端API获得数据
const FruitPrice_textBox = document.getElementById('scrollable-textbox_FruitPrice');
// 所需要水果数量文本框元素
const NeedFruit_textBox = document.getElementById('scrollable-textbox_NeedFruit');


// 计算土地转换消耗
// 贪心算法 不一定是最优解
function calculateLand(currentLands, targetLands, priceTable) {
    
    function Money(dict) {
        let money = 0;
        for (const key in dict) {
            money += dict[key] * priceTable[key];
        }
        return money;
    }

    function costDict(currentType, targetType, visited = {}) {
        let minCost = Infinity;
        let minCostDict = {};

        if (currentType === targetType) {
            return { cost: 0, resources: {} };
        }

        for (const key in graph[currentType]) {
            if (visited[key]) continue;

            const newVisited = { ...visited, [key]: true };
            const nextResult = costDict(key, targetType, newVisited);

            if (nextResult.cost!== Infinity) {
                const currentCostDict = { ...graph[currentType][key], ...nextResult.resources };
                const currentCost = Money(currentCostDict);

                if (currentCost < minCost) {
                    minCost = currentCost;
                    minCostDict = currentCostDict;
                }
            }
        }

        return { cost: minCost, resources: minCostDict };
    }

    const sumCurrent = Object.values(currentLands).reduce((a, b) => a + b, 0);
    const sumTarget = Object.values(targetLands).reduce((a, b) => a + b, 0);

    if (sumCurrent < sumTarget) {
        return { success: false, message: "当前土地数量不足" };
    }

    let totalCost = 0;
    let landHuan = "";
    let totalDict = {};
    for (const tkey in targetLands) {
        while (targetLands[tkey] > 0) {
            let minLand = "";
            let minCust = Infinity;
            let minResources = {};

            for (const ckey in currentLands) {
                if (currentLands[ckey] > 0) {
                    const { cost, resources } = costDict(ckey, tkey);
                    if (cost < minCust) {
                        minLand = ckey;
                        minCust = cost;
                        minResources = resources;
                    }
                }
            }

            if (minLand === "") {
                return { success: false, message: `没有土地可以转换成 ${tkey}` };
            } else {
                targetLands[tkey]--;
                currentLands[minLand]--;
                totalCost += minCust;
                //console.log(`${minLand} --> ${tkey}`);
                landHuan += `${minLand} --> ${tkey}` + "\n";
                //console.log(minResources);
                totalDict = addDict(totalDict,minResources);
            }
        }
    }

    return {
            success: true, 
            totalCost:totalCost,
            landHuan:landHuan,
            totalDict:totalDict,
        };
}

// 计算房子消耗
function calculateDiamondConsumption(currentClass, targetClass) {
    var needMaterial = {};
    for (var i = currentClass; i < targetClass; i++) {
        for (var j = 0; j < classConsume[0].length; j++) {
            var material = classConsume[0][j];
            if (needMaterial[material]) {
                needMaterial[material] += classConsume[i][j];
            } else {
                needMaterial[material] = classConsume[i][j];
            }
        }
    }
    return needMaterial;
}

//返回的是水果总消耗(房屋加上土地) 返回dict
function totalCost(){
    const currentLevel = document.getElementById("currentLevel").value;
    const targetLevel = document.getElementById("targetLevel").value;

    var currentLandDict = {};
    var targetLandDict = {};
    //获取对应的的土地以及数量,跟随前端变化而变化
    {
        const currentSelects = document.getElementById("currentLandNumber").querySelectorAll('select');
        // 遍历每个 select 元素
        currentSelects.forEach(select => {
            // 获取当前 select 的父 div 元素
            const parentDiv = select.closest('div');
            // 获取父 div 中的土地名称（去掉多余的空白字符）
            const landName = parentDiv.textContent.trim().split('\n')[0];
            // 获取 select 中选中的值
            const selectedValue = select.value;
            // 将土地名称和值存入字典
            currentLandDict[landName] = parseInt(selectedValue);
        });
        const targetSelects = document.getElementById("targetLandNumber").querySelectorAll('select');
        // 遍历每个 select 元素
        targetSelects.forEach(select => {
            // 获取当前 select 的父 div 元素
            const parentDiv = select.closest('div');
            // 获取父 div 中的土地名称（去掉多余的空白字符）
            const landName = parentDiv.textContent.trim().split('\n')[0];
            // 获取 select 中选中的值
            const selectedValue = select.value;
            // 将土地名称和值存入字典
            targetLandDict[landName] = parseInt(selectedValue);
        });
    }
    
    //房屋消耗
    const houseCost = calculateDiamondConsumption(currentLevel,targetLevel);
    //土地消耗
    var fprice = {...fruitPrice};
    fprice['水晶'] = 1;
    const landCost = calculateLand(currentLandDict,targetLandDict,fprice);
    return {
        houseCost:houseCost,
        success:landCost.success,
        message:landCost.message,
        landCost:landCost.totalDict,
	    landStr:landCost.landHuan,
    };
}


function displayFruitNumber(costDict){
    const displayFruit = document.getElementById("scrollable-textbox_NeedFruit")
    displayFruit.textContent = ""
    //打印出对应的水果消耗
    for(const i in costDict){
        if(costDict[i] == 0) continue;
        var s = i + ":" + costDict[i] + "\n";
        //console.log(s)
        displayFruit.textContent += s;
    }
}
function addDict(dict1,dict2){
    var d1 = {...dict1};
    var d2 = {...dict2};
    for(const key in d2){
        if(key in d1) d1[key] += d2[key];
        else d1[key] = d2[key];
    }
    return d1;
}
//点击查询按钮事件
function querry(){
    function calculate(costDict,ShuijingPrice){
        var sum = 0;
        for(var i in costDict){
            if(i == "水晶"){
                sum += costDict[i];
                continue;	
            }
                sum += parseInt(costDict[i]) * parseFloat(fruitPrice[i]);
        }
        sum = sum * parseFloat(ShuijingPrice);
        return parseInt(sum);
    }
    // 如何用户只是查询土地升级消耗不查询房屋消耗,那么这里就不设置土地数量的要求
    const resultText = document.getElementById("resultDisplay");
    const BaoshiPrice = document.getElementById("BaoshiPrice");
    resultText.textContent = ""
    
    const cost = totalCost();
    if(!cost.success){
	    displayFruitNumber({});
        resultText.textContent = cost.message;
        return;
    }

    fruitCostNumber = addDict(cost.houseCost,cost.landCost);
    displayFruitNumber(fruitCostNumber);
    //console.log(fruitCostNumber)
    
    //输出总价
    if(!BaoshiPrice.value){ 
        resultText.textContent += "请先输入水晶价格\n";
        return;
    }
    var s = "";
    resultText.textContent += "总共需要花费: " + calculate(fruitCostNumber,BaoshiPrice.value) + "元\n\n";
    resultText.textContent += "房屋消耗:" + calculate(cost.houseCost,BaoshiPrice.value) + "元\n";
    s = JSON.stringify(cost.houseCost);
    resultText.textContent += s + '\n'; 
    resultText.textContent += "土地消耗:" + calculate(cost.landCost,BaoshiPrice.value) + "元\n";
    s = JSON.stringify(cost.landCost);
    resultText.textContent += s + '\n'; 
    resultText.textContent += "土地转换表\n==================\n"
    resultText.textContent += cost.landStr;
    resultText.textContent += "\n==================\n"
    console.log(BaoshiPrice.value)
}
//清除土地数量
function clearLandNumber(){
    const div_land = document.getElementById("LandNumber");
    const option = div_land.querySelectorAll("select");
    option.forEach((select,index)=>{
        select.value = 0;
    })
}

// 获取数据的异步函数
async function fetchProductData() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP错误 ${response.status}`);
        }
       	
        // 假设后端返回的是 JSON 格式的商品数据
        const data = await response.json();
	
        // 假设你要在网页上显示这些数据
	    FruitPrice_textBox.classList.remove('loading', 'error');
	    var str = "";
        // 遍历数据并渲染到页面
        for(var i in data){
            str += data[i]['name'] + ": "+data[i]['price'] + '宝石/个' + '\n';
            fruitPrice[data[i]['name']] = parseFloat(data[i]['price']);
        }
        FruitPrice_textBox.textContent = str;
        console.log(fruitPrice);
        // 移除加载状态
        FruitPrice_textBox.classList.remove('loading', 'error');
        
    } catch (error) {
        // 错误处理
        FruitPrice_textBox.classList.add('error');
        FruitPrice_textBox.innerHTML = `数据加载失败：${error.message}`;
    }
}


// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 首次加载数据
    fetchProductData();
    // 可选：定时刷新数据（每30秒）
    setInterval(fetchProductData, 1000 * 60);
});







// ==========
