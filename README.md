# 个人博客及其后台管理系统
[在线预览](http://weeeblog.me/)

WeeBlog 是一个现代化的博客系统，包含前台展示和后台管理两个部分。本项目采用前后端分离架构，提供了完整的博客发布、管理和浏览功能。

## 🚀 项目特性

- 💡 前后端分离架构
- 📱 响应式设计，支持移动端访问
- 🎨 美观的用户界面
- 📝 Markdown 编辑器支持
- 🏷️ 文章分类，目录索引

## 🛠️ 技术栈

### 前台客户端 (weeeblog_client)

- Vue2.js
- Vue Router
- Vuex
- Axios
- Element UI
- Webpack

### 后台管理系统 (weeeblog_background-system)

- Vue2.js
- Vue Router
- Vuex
- Element UI

## 📦 项目结构

```
weeeblog/
├── weeeblog_client/          # 前台客户端
│   ├── src/                  # 源代码
│   ├── public/              # 静态资源
│   └── dist/                # 构建输出目录
│
└── weeeblog_background-system/  # 后台管理系统
   └── src/                 # 源代码
```

## 🚀 快速开始

### 前台客户端

```bash
cd weeeblog_client
npm install
npm run serve     # 开发环境
npm run build     # 生产环境构建
```

### 后台管理系统

```bash
cd weeeblog_background-system
npm install
npm run dev      # 开发环境
npm run build    # 生产环境构建
```

## 🌐 环境要求

- Node.js >= 12.0.0 不能过高  推荐 16.20.0
- npm >= 6.0.0
