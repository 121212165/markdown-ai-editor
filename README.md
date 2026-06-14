# Markdown 编辑器

一个简洁的浏览器端 Markdown 编辑器，支持实时预览。

## 功能

- Markdown 实时预览（基于 marked.js）
- 工具栏：粗体、斜体、标题、链接、图片、列表、代码块
- 快捷键支持（Ctrl+B/I/K/L/P/S/O）
- 本地文件打开与保存
- 编辑器与预览区域同步滚动
- 状态栏：行号、列号、字数、阅读时间估算

## 使用

直接在浏览器中打开 `index.html` 即可。

无需安装、无需构建、无需服务器。

## 项目结构

```
├── index.html          # 入口页面
├── css/style.css       # 样式
├── js/main.js          # 编辑器逻辑
├── js/marked.min.js    # Markdown 解析库
├── 帮助.md             # 使用帮助
└── README.md           # 本文件
```

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl + B | 粗体 |
| Ctrl + I | 斜体 |
| Ctrl + K | 插入链接 |
| Ctrl + Shift + I | 插入图片 |
| Ctrl + L | 插入列表 |
| Ctrl + Shift + C | 插入代码块 |
| Ctrl + P | 切换预览模式 |
| Ctrl + S | 保存文件 |
| Ctrl + O | 打开文件 |

## 技术栈

- HTML / CSS / 原生 JavaScript
- [marked.js](https://github.com/markedjs/marked) — Markdown 解析

## 许可证

MIT
