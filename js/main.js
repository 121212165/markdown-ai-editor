const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// 初始化marked
marked.setOptions({
    breaks: true,
    smartypants: true
});

// 编辑器内容变化时更新预览
editor.addEventListener('input', updatePreview);
editor.addEventListener('scroll', syncScroll);

// 页面加载完成后初始化预览
document.addEventListener('DOMContentLoaded', function() {
    updatePreview();
});

// 更新预览内容
function updatePreview() {
    preview.innerHTML = marked.parse(editor.value);
    updateStatusBar();
}

// 同步滚动（简化版）
function syncScroll() {
    const editorScroll = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    preview.scrollTop = editorScroll * (preview.scrollHeight - preview.clientHeight);
}

// 更新状态栏信息
function updateStatusBar() {
    const content = editor.value;
    const lines = content.split('\n');
    const cursorPosition = getCaretPosition(editor);
    const line = content.substr(0, cursorPosition).split('\n').length;
    const column = lines[line - 1] ? lines[line - 1].length + 1 : 1;
    const wordCount = content.trim() ? content.match(/\S+/g).length : 0;
    const readTime = Math.ceil(wordCount / 200); // 每分钟200词估算

    document.querySelector('.status-bar .status-item:nth-child(1)').textContent = `行: ${line}, 列: ${column}`;
    document.querySelector('.status-bar .status-item:nth-child(2)').textContent = `字数: ${wordCount}`;
    document.querySelector('.status-bar .status-item:nth-child(3)').textContent = `阅读时间: ${readTime}分钟`;
}

// 获取光标位置
function getCaretPosition(element) {
    if (typeof element.selectionStart === 'number') {
        return element.selectionStart;
    }
    return 0;
}

// 格式化按钮事件处理
document.getElementById('bold-btn').addEventListener('click', () => wrapSelection('**', '**'));
document.getElementById('italic-btn').addEventListener('click', () => wrapSelection('*', '*'));
document.getElementById('heading-btn').addEventListener('click', () => insertAtCursor('# '));
document.getElementById('link-btn').addEventListener('click', () => wrapSelection('[', '](url)'));
document.getElementById('image-btn').addEventListener('click', () => wrapSelection('![', '](image-url)'));
document.getElementById('list-btn').addEventListener('click', () => insertAtCursor('- '));
document.getElementById('code-btn').addEventListener('click', () => wrapSelection('```\n', '\n```'));
document.getElementById('preview-btn').addEventListener('click', togglePreview);
document.getElementById('save-btn').addEventListener('click', saveFile);
document.getElementById('open-btn').addEventListener('click', openFile);

// 包装选中文本
function wrapSelection(prefix, suffix) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    const wrappedText = prefix + selectedText + suffix;
    
    editor.value = editor.value.substring(0, start) + wrappedText + editor.value.substring(end);
    editor.focus();
    editor.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    updatePreview();
}

// 在光标位置插入文本
function insertAtCursor(text) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    
    editor.value = editor.value.substring(0, start) + text + editor.value.substring(end);
    editor.focus();
    editor.setSelectionRange(start + text.length, start + text.length);
    updatePreview();
}

// 切换预览模式
function togglePreview() {
    document.body.classList.toggle('preview-mode');
}

// 保存文件
function saveFile() {
    const content = editor.value;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = '未命名.md';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// 打开文件
function openFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md, .markdown, .txt';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            editor.value = event.target.result;
            updatePreview();
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// 快捷键处理
document.addEventListener('keydown', function(e) {
    // Ctrl+B 粗体
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        wrapSelection('**', '**');
    }
    
    // Ctrl+I 斜体
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        wrapSelection('*', '*');
    }
    
    // Ctrl+K 链接
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        wrapSelection('[', '](url)');
    }
    
    // Ctrl+Shift+I 图片
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        wrapSelection('![', '](image-url)');
    }
    
    // Ctrl+L 列表
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        insertAtCursor('- ');
    }
    
    // Ctrl+Shift+C 代码块
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        wrapSelection('```\n', '\n```');
    }
    
    // Ctrl+P 预览切换
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        togglePreview();
    }
    
    // Ctrl+S 保存
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveFile();
    }
    
    // Ctrl+O 打开
    if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        openFile();
    }
});

