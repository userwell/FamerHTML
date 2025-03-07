function calculate() {
    // 获取页面元素
    const floorInput = document.getElementById('floor');
    const priceInput = document.getElementById('price');
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
    const price = parseFloat(priceInput.value);
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