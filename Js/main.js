//水果市场价格
var fruitPrice = {}
//水果消耗数量
var fruitCostNumber = {}
//默认的水晶价格
const SHUIJINGPRICE = 0.12;
// 土地转换图
const graph = {
    "黄土地":{"红土地":{"萝卜":200,"苹果":200,"水晶":100}},
    "红土地":{"黑土地":{"西瓜":300,"辣椒":300,"水晶":500},
            "银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "黑土地":{"金土地":{"草莓":600,"南瓜":600,"水晶":1000},
            "银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "金土地":{"蓝晶土地":{"草莓":2000,"南瓜":2000,"水晶":2000},
            "银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "蓝晶土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "银土地":{"水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "水晶土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "焱土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "紫土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "青土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100}},
}

// 房屋等级和消耗
var classConsume = [
    ['萝卜', '苹果', '辣椒', '西瓜', '南瓜', '草莓', '水晶'],
    [150, 150, 0, 0, 0, 0, 5],                          // 1->2
    [1500, 1500, 0, 0, 0, 0, 20],                       // 2->3
    [3000, 3000, 225, 225, 0, 0, 200],                  // 3->4
    [30000, 30000, 6750, 6750, 0, 0, 1000],             // 4->5
    [60000, 60000, 11250, 11250, 9000, 9000, 2500]      // 5->6
];

// 模拟后端API地址（替换为你的真实API地址）
const API_URL = 'http://47.98.242.216:8080/api/products';
// 获取市场水果价格文本框元素,从后端API获得数据
const FruitPrice_textBox = document.getElementById('scrollable-textbox_FruitPrice');
// 所需要水果数量文本框元素
const NeedFruit_textBox = document.getElementById('scrollable-textbox_NeedFruit');



//返回的是水果总消耗(房屋加上土地) 返回dict
function totalCost(){
    // 计算消耗的水果字典表
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
    var resultstr = ""
    const currentLevel = document.getElementById("currentLevel").value;
    const targetLevel = document.getElementById("targetLevel").value;
    //计算土地消耗
    var Dict2 = {}
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
    var landDict = {}
    for(var landName in targetLandDict){
        landDict[landName] = currentLandDict[landName] - targetLandDict[landName];
    }
    var s = 0;
    for(var i in landDict)  s += landDict[i];
    
    if(s < 0 ) return "目标土地数量大于当前土地数量,无法实现转换,请调整土地数量!!";
    // 这里逻辑是多个土地数量转换
    /*  1.能用红土地转特殊土地就用红转特殊土地 
    */  
    const l = ["蓝晶土地","金土地","黑土地","红土地","黄土地"]; //土地从大到小排列
    const sp = ["银土地","水晶土地","焱土地","紫土地","青土地"];
    //这里特殊土地默认为红土地升级过来的,用户可能输入是目前土地上的土地种类数量,没有计算仓库内的土地数量
    console.log("==========普通土地升级=========");
    // 普通土地升级,从低级到高级,从特殊到普通(黄土地不用升级)
    for(let i=0;i<l.length - 1;++i){
        //如果要升级成当前土地,那么从当前土地到小遍历
        while(landDict[l[i]] < 0){
            var succes = false;
            //先从普通土地升级
            for(let j=i+1;j<l.length;j++){
                //找到最适合升级到当前土地的土地对象
                if(landDict[l[j]] > 0){
                    succes = true;
                    var cost = dijkstra(graph,l[j],l[i]).materials;
                    console.log(l[j]+"->"+l[i]);
                    resultstr += l[j]+"->"+l[i] + '\n';
                    landDict[l[j]]--;
                    landDict[l[i]]++;
                    Dict2 = addDict(Dict2,cost);
                    console.log(Dict2)
                    break;
                }
            }
            if(!succes){
                console.log("当前土地:"+l[i]+"没有土地可以转换");
                return "当前土地:"+l[i]+"没有土地可以转换";
            }
        }
    }
    console.log("==========特殊土地升级===========");
    //这里摆放顺序是有优先级的
    const change1=["红土地","黄土地","黑土地"];
    const change2 = ["金土地","蓝晶土地"];
    // 特殊土地升级 从红土地开始往高级土地
    for(let i=0;i<sp.length;++i){
        while(landDict[sp[i]] < 0){
            var succes = false;
            //尝试从change1顺序来升级土地
            for(let c=0;c<change1.length;++c){
                if(landDict[change1[c]] > 0){
                    console.log(change1[c]+"->"+sp[i]);
                    resultstr += change1[c]+"->"+sp[i] +'\n';
                    Dict2 = addDict(dijkstra(graph,change1[c],sp[i]).materials,Dict2);
                    succes = true;
                    landDict[sp[i]]++;
                    landDict[change1[c]]--;
                    break;
                }
            }
            if(succes) continue;
            //尝试从特殊土地->特殊土地
            for(let c=0;c<sp.length;++c){
                if(landDict[sp[c]] > 0){
                    console.log(sp[c]+"->"+ sp[i]);
                    resultstr += sp[c]+"->"+ sp[i] +'\n';
                    Dict2 = addDict(dijkstra(graph,sp[c],sp[i]).materials,Dict2);
                    succes = true;
                    landDict[sp[i]]++;
                    landDict[sp[c]]--;
                    break;
                }
            }
            if(succes) continue;
            //尝试从高级点土地change2升级
            //尝试从change1顺序来升级土地
            for(let c=0;c<change2.length;++c){
                if(landDict[change2[c]] > 0){
                    console.log(change2[c]+"->"+sp[i]);
                    resultstr += change2[c]+"->"+sp[i] + '\n';
                    Dict2 = addDict(dijkstra(graph,change2[c],sp[i]).materials,Dict2);
                    succes = true;
                    landDict[sp[i]]++;
                    landDict[change2[c]]--;
                    break;
                }
            }
            if(!succes){
                console.log("当前土地:",sp[i]+"无法升级");
                return "当前土地:",sp[i]+"没有土地可以转换";
            }

        }
    }

    for(var i in landDict){
        if(landDict[i] < 0) return "选择的目标土地:"+i+"没有土地可以升级到他,请输入正确的土地数量";
    }
    const Dict1 = calculateDiamondConsumption(currentLevel,targetLevel);
    return {
        houseDict: Dict1,
        landDict:Dict2,
	str:resultstr
    };
}

function addDict(dict1,dict2){
    var result = {};
    for(var i in dict1){
	result[i] = dict1[i];
    }
    for(var i in dict2){
        if(!result[i]){
            result[i] = dict2[i];
        }else{
            result[i] += dict2[i];
        }
    }
    return result;
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
    if(typeof(cost) == "string"){
	displayFruitNumber({});
        resultText.textContent = cost;
        return;
    }

    fruitCostNumber = addDict(cost.houseDict,cost.landDict);
    displayFruitNumber(fruitCostNumber);
    //console.log(fruitCostNumber)
    
    //输出总价
    if(!BaoshiPrice.value){ 
	resultText.textContent += "请先输入水晶价格\n";
	return;
    }
    var s = "";
    resultText.textContent += "总共需要花费: " + calculate(fruitCostNumber,BaoshiPrice.value) + "元\n\n";
    resultText.textContent += "房屋消耗:" + calculate(cost.houseDict,BaoshiPrice.value) + "元\n";
    s = JSON.stringify(cost.houseDict);
    resultText.textContent += s + '\n'; 
    resultText.textContent += "土地消耗:" + calculate(cost.landDict,BaoshiPrice.value) + "元\n";
    s = JSON.stringify(cost.landDict);
    resultText.textContent += s + '\n'; 
    resultText.textContent += "土地转换表\n==================\n"
    resultText.textContent += cost.str;
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


function dijkstra(graph, start, end) {
    const costs = {}; // 记录从起点到每个节点的总材料消耗
    const parents = {}; // 记录每个节点的父节点
    const processed = new Set(); // 记录已处理的节点

    // 初始化 costs
    for (const node in graph) {
        costs[node] = { total: Infinity, materials: {} }; // 初始化为无穷大
    }
    costs[start] = { total: 0, materials: {} }; // 起点到自身的消耗为 0

    // 找到消耗最低的未处理节点
    function findLowestCostNode(costs) {
        let lowestCost = Infinity;
        let lowestCostNode = null;
        for (const node in costs) {
            if (costs[node].total < lowestCost && !processed.has(node)) {
                lowestCost = costs[node].total;
                lowestCostNode = node;
            }
        }
        return lowestCostNode;
    }

    // 主循环
    let node = findLowestCostNode(costs);
    while (node) {
        const cost = costs[node].total; // 当前节点的总消耗
        const materials = costs[node].materials; // 当前节点的材料消耗
        const neighbors = graph[node]; // 当前节点的邻居

        // 更新邻居节点的消耗
        for (const neighbor in neighbors) {
            const newMaterials = { ...materials }; // 复制当前节点的材料消耗
            for (const material in neighbors[neighbor]) {
                newMaterials[material] = (newMaterials[material] || 0) + neighbors[neighbor][material];
            }
            const newCost = Object.values(newMaterials).reduce((a, b) => a + b, 0);

            if (newCost < costs[neighbor].total) {
                costs[neighbor].total = newCost;
                costs[neighbor].materials = newMaterials;
                parents[neighbor] = node;
            }
        }

        processed.add(node); // 标记当前节点为已处理
        node = findLowestCostNode(costs); // 处理下一个节点
    }

    // 回溯路径
    const path = [end];
    let parent = parents[end];
    while (parent) {
        path.unshift(parent);
        parent = parents[parent];
    }

    return {
        path: path,
        materials: costs[end].materials
    };
}

// 获取数据的异步函数
async function fetchProductData() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP错误 ${response.status}`);
        }
       	
	console.log(response)
        // 假设后端返回的是 JSON 格式的商品数据
        const data = await response.json();
	
	console.log(data)
        // 假设你要在网页上显示这些数据
	FruitPrice_textBox.classList.remove('loading', 'error');
	var str = "";
        // 遍历数据并渲染到页面
	for(var i in data){
		str += data[i]['name'] + ": "+data[i]['price'] + '宝石/个' + '\n';
		fruitPrice[data[i]['name']] = parseFloat(data[i]['price']);
	}
	FruitPrice_textBox.textContent = str;
	console.log("fruitPrice====");
	console.log(fruitPrice);
	console.log("==============");
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
    setInterval(fetchProductData, 30000);
});







// ==========
