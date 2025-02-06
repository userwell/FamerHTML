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
    "粉土地":{"银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "酒红土地":{"西瓜":1500,"辣椒":1500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100}},
    "酒红土地":{
            "银土地":{"萝卜":27500,"苹果":27500,"水晶":100},
            "水晶土地":{"火龙果":1000,"水晶":100},
            "焱土地":{"菠萝":3000,"木瓜":3000,"水晶":100},
            "紫土地":{"橘子":6000,"水晶":100},
            "青土地":{"芒果":5000,"水晶":100},
            "粉土地":{"草莓":550,"南瓜":550,"水晶":100}}
}


// 贪心算法 不一定是最优解
function calculate(currentLands, targetLands, priceTable) {
    function addDict(dict1,dict2){
        var d1 = {...dict1};
        var d2 = {...dict2};
        for(const key in d2){
            if(key in d1) d1[key] += d2[key];
            else d1[key] = d2[key];
        }
        return d1;
    }
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
            totalCost:totalCost ,
            landHuan:landHuan,
            totalDict:totalDict,
        };
}

const priceTable = {
    萝卜: 0.034,
    苹果: 0.034,
    水晶: 1,
    西瓜: 0.3,
    辣椒: 0.3,
    草莓: 1.11,
    南瓜: 1.115,
    火龙果: 0.86,
    菠萝: 0.55,
    木瓜: 0.623,
    橘子: 0.6,
    芒果: 1
};

const currentLands = {
    "红土地": 1,
    "水晶土地": 3,
    "粉土地": 1
};
const targetLands = {
    "黑土地": 1,
    // "红土地":1,
    "紫土地": 1,
    "焱土地": 1
};

const result = calculate(currentLands, targetLands, priceTable);
console.log(result);