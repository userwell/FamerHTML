const fixedDate = "2025-03-07"; // 固定日期
const fixePrice = 2;            //固定初始价格
function calculate() {
    // 获取页面元素
    const floorInput = document.getElementById('floor');
    //const priceInput = document.getElementById('price');
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');

    // 重置状态
    errorDiv.style.display = 'none';
    resultDiv.style.display = 'none';

    // 验证层数输入
    const floor = parseInt(floorInput.value);
    if (isNaN(floor) || floor < 1 || floor > 100) {
        errorDiv.textContent = "请输入1-100之间的整数层数";
        errorDiv.style.display = 'block';
        return;
    }

    // 获取价格信息
    const price = parseFloat(today_price());
    const hasPrice = !isNaN(price) && price >= 0;

    // 计算元宝数据
    const totalRequired = 5 * floor * (floor + 1);       // 总需求元宝
    const totalObtained = 7.5 * floor * (floor + 1);     // 总获得元宝
    const totalProfit = totalObtained - totalRequired;   // 总利润元宝

    // 构建结果展示
    let resultHTML = `
        <div class="result-item">
            🏰 累计需要元宝：${totalRequired.toLocaleString()}
            ${hasPrice ? `≈ ¥${(totalRequired * price).toFixed(2)}` : ''}
        </div>
        <div class="result-item">
            🎉 最终获得元宝：${totalObtained.toLocaleString()}
            ${hasPrice ? `≈ ¥${(totalObtained * price).toFixed(2)}` : ''}
        </div>
        <div class="result-item">
            💰 净收益元宝：+${totalProfit.toLocaleString()}
            ${hasPrice ? `≈ ¥${(totalProfit * price).toFixed(2)}` : ''}
        </div>
    `;

    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
}

// 今日元宝价格,每日增加0.03元, 3/7/2025初始价格为2
function today_price(){
    // 获取今日日期（年月日）
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 计算两个日期之间的天数差
    function getDateDifference(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return diffDays;
    }

    const today = getTodayDate(); // 获取今日日期

    const differenceInDays = getDateDifference(today, fixedDate); // 计算相差天数
    
    //计算价格
    const price = fixePrice + differenceInDays * 0.03;
    return price;
}

function setTodyPrice(){
    const todayPrice = document.getElementById("todayPrice");
    todayPrice.textContent = "今日元宝单价:" + String(today_price());
}
setTodyPrice();


