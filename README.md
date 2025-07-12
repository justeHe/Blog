# 个人主页与博客

[English Version](README_en.md)

---

这是一个包含个人主页和 Hexo 博客的复合项目。主页是使用 Pug 和 Sass 构建的静态页面，博客则由 Hexo 驱动，并使用了功能丰富的 Butterfly 主题。

## ✨ 功能特性

*   **双平台**: 一个仓库，同时管理个人主页和博客，通过 Gulp 实现统一构建和部署。
*   **高度定制化的博客**: 
    *   **主题**: 使用了美观且功能强大的 [Hexo-Theme-Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)。
    *   **评论系统**: 集成了自部署的 [Artalk](https://artalk.js.org/) 评论系统。
    *   **数学公式**: 支持 [MathJax](https://www.mathjax.org/)，方便展示复杂的数学公式。
    *   **本地搜索**: 集成了本地搜索功能，无需外部服务。
    *   **代码高亮**: 使用 `pale night` 主题和 `Mac` 风格的代码块，并提供一键复制功能。
    *   **动态特效**: 启用了打字机、背景动效 (canvas_nest) 和页面加载动画，提升了用户体验。
    *   **多语言**: 支持简繁体中文切换。
*   **现代化前端工作流**: 主页采用 Gulp 进行自动化构建，编译 Pug, Sass 和 ES6+ JavaScript。

## 🛠️ 技术栈

*   **主页 (Homepage)**:
    *   **模板引擎**: [Pug](https://pugjs.org/) (Jade)
    *   **CSS 预处理器**: [Sass](https://sass-lang.com/)
    *   **JavaScript**: ES6+ (使用 Babel 编译)
    *   **构建工具**: [Gulp.js](https://gulpjs.com/)

*   **博客 (Blog)**:
    *   **框架**: [Hexo](https://hexo.io/)
    *   **主题**: [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
    *   **评论**: [Artalk](https://artalk.js.org/) (自部署于 `https://artalk.juste.com.cn`)
    *   **数学渲染**: [MathJax](https://www.mathjax.org/)
    *   **搜索**: `hexo-generator-searchdb` (本地搜索)

## 📂 项目结构

```
.
├── /dist/              # 编译输出目录，用于部署
├── /src/               # 主页源文件 (Pug, Sass, JS)
│   ├── /assets         # 静态资源 (图片等)
│   ├── /components     # Pug 组件
│   ├── /css            # Sass 样式文件
│   ├── /js             # JavaScript 文件
│   └── index.pug       # 主页入口文件
├── /blog/              # Hexo 博客源文件
│   ├── /source         # 博客文章和页面
│   ├── _config.yml     # Hexo 核心配置
│   └── _config.butterfly.yml # Butterfly 主题配置
├── gulpfile.js         # Gulp 构建任务
└── package.json        # 主页依赖和脚本
```

## 🚀 开始使用

#### 环境要求

*   [Node.js](https://nodejs.org/) (推荐 v14.x 或更高版本)
*   [Git](https://git-scm.com/)

#### 安装步骤

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/justeHe/Blog.git
    cd HomePage
    ```

2.  **安装主页依赖:**
    ```bash
    npm install
    ```

3.  **安装博客依赖:**
    ```bash
    cd blog
    npm install
    ```

## 💻 开发流程

主页和博客拥有独立的开发服务器，可以同时运行。

*   **开发主页:**
    在项目根目录运行以下命令。这将启动一个位于 `http://localhost:8080` 的本地服务器，并支持实时刷新。
    ```bash
    npm run dev
    ```

*   **开发博客:**
    进入 `blog` 目录并启动 Hexo 服务器。博客将在 `http://localhost:4000` 上运行。
    ```bash
    cd blog
    npm run server
    ```

## 📦 构建与部署

构建过程会将主页和博客的所有文件编译并整合到 `/dist` 目录中。

1.  **构建 Hexo 博客:**
    首先，生成博客的静态文件。
    ```bash
    cd blog
    npm run build
    ```

2.  **构建整个项目:**
    返回到根目录并运行主构建脚本。此命令会编译主页资源，并自动将已生成的博客文件复制到 `dist/blog` 目录。
    ```bash
    cd ..
    npm run build
    ```

构建完成后，`/dist` 目录将包含所有可用于部署的静态文件。

## 📄 开源许可

本项目基于 MIT 许可证开源。
