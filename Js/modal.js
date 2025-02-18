// 显示弹窗
document.getElementById('relationAuthor').addEventListener('click', function() {
    document.getElementById('wechatModal').style.display = 'block';
});

// 复制功能（优化版）
document.getElementById('copyBtn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.focus();
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const wechatId = document.getElementById('wechatId').textContent;
    
    try {
        const textArea = document.createElement('textarea');
        textArea.value = wechatId;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.select();
        
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (success) {
            alert('微信号已复制！');
            document.getElementById('wechatModal').style.display = 'none';
        } else {
            throw new Error('复制失败');
        }
    } catch (err) {
        navigator.clipboard.writeText(wechatId).then(() => {
            alert('微信号已复制到剪贴板！');
            document.getElementById('wechatModal').style.display = 'none';
        }).catch(() => {
            alert('复制失败，请手动长按微信号复制！');
        });
    }
});

// 点击外部关闭弹窗
window.onclick = function(event) {
    if (event.target === document.getElementById('wechatModal')) {
        document.getElementById('wechatModal').style.display = 'none';
    }
};