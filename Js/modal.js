// 显示弹窗
document.getElementById('relationAuthor').addEventListener('click', function() {
    document.getElementById('wechatModal').style.display = 'block';
});

// 复制功能
document.getElementById('copyBtn').addEventListener('click', function() {
    const wechatId = document.getElementById('wechatId').textContent;
    
    // 使用现代 Clipboard API
    navigator.clipboard.writeText(wechatId).then(() => {
        alert('微信号已复制到剪贴板！');
        document.getElementById('wechatModal').style.display = 'none'; // 关闭弹窗
    }).catch(err => {
        console.error('复制失败:', err);
        // 降级方案：使用老式方法
        const textArea = document.createElement('textarea');
        textArea.value = wechatId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('微信号已复制！');
        document.getElementById('wechatModal').style.display = 'none';
    });
});

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target === document.getElementById('wechatModal')) {
        document.getElementById('wechatModal').style.display = 'none';
    }
}