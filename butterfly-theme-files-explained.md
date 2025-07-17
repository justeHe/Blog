
# Hexo Theme Butterfly 文件结构详解

本文档旨在详细解释 `hexo-theme-butterfly` 主题的目录结构和其中各个文件的核心作用，帮助用户更好地理解和自定义主题。

## 根目录

| 文件/目录 | 作用 |
| :--- | :--- |
| `LICENSE` | **许可证文件**。Butterfly 主题使用 Apache-2.0 许可证。 |
| `README.md` | **主题介绍（英文）**。包含主题的安装、配置、特性介绍等。 |
| `README_CN.md` | **主题介绍（中文）**。`README.md` 的中文版本。 |
| `package.json` | **NPM 包管理文件**。定义了项目名称、版本、依赖（如 `pug` 和 `stylus` 渲染器）等。 |
| `plugins.yml` | **第三方插件CDN管理**。定义了主题所依赖的第三方JS/CSS库的名称、版本和CDN路径，由`scripts/events/cdn.js`处理。 |
| `.gitignore` | **Git忽略文件**。告诉 Git 哪些文件或目录不需要纳入版本控制。 |

---

## `.github` 目录

存放与 GitHub 仓库相关配置的目录。

| 文件/目录 | 作用 |
| :--- | :--- |
| `FUNDING.yml` | **赞助配置**。用于在 GitHub 仓库页面显示赞助按钮和链接。 |
| `ISSUE_TEMPLATE/` | **Issue 模板目录**。存放用户提交 Issue 时使用的模板。 |
| ├─ `bug_report.yml` | Bug 反馈模板。 |
| ├─ `config.yml` | Issue 模板的全局配置，如禁用空白 Issue。 |
| └─ `feature_request.yml` | 新功能请求模板。 |
| `workflows/` | **GitHub Actions 工作流目录**。用于自动化任务。 |
| ├─ `publish.yml` | 当创建新的 Release 时，自动将主题发布到 NPM。 |
| └─ `stale.yml` | 自动标记和关闭长时间未活动的 Issue 和 PR。 |

---

## `languages` 目录

存放主题的国际化（i18n）语言文件。每个文件定义了网站上显示的文本。

| 文件 | 作用 |
| :--- | :--- |
| `default.yml` | 默认语言包。 |
| `en.yml` | 英语。 |
| `ja.yml` | 日语。 |
| `ko.yml` | 韩语。 |
| `zh-CN.yml` | 简体中文。 |
| `zh-HK.yml` | 繁体中文（香港）。 |
| `zh-TW.yml` | 繁体中文（台湾）。 |

---

## `layout` 目录

**核心布局目录**，使用 Pug (`.pug`) 模板语言定义了网站的 HTML 结构。

| 文件/目录 | 作用 |
| :--- | :--- |
| `index.pug` | **首页布局**。 |
| `post.pug` | **文章页布局**。 |
| `page.pug` | **普通页面布局**（如关于、留言板等）。 |
| `archive.pug` | **归档页布局**。 |
| `category.pug` | **分类页布局**。 |
| `tag.pug` | **标签页布局**。 |
| `includes/` | **可重用组件目录**。存放被其他布局文件引用的代码片段。 |
| ├─ `layout.pug` | **基础布局**。所有页面的根模板，定义了`<html>`, `<head>`, `<body>`等基本结构。 |
| ├─ `head.pug` | **`<head>`部分**。包含 meta 标签、CSS/JS 引用、SEO 配置等。 |
| ├─ `header/` | **页眉组件**。包含导航栏、网站标题、文章信息等。 |
| ├─ `footer.pug` | **页脚组件**。 |
| ├─ `sidebar.pug` | **移动端侧边栏**。 |
| ├─ `rightside.pug` | **右侧浮动工具栏**（如返回顶部、深色模式切换）。 |
| ├─ `additional-js.pug` | **JS脚本引入**。在 `<body>` 底部集中引入必要的 JS 文件。 |
| ├─ `mixins/` | **Pug Mixins**。可重用的 Pug 代码块，如文章列表 (`article-sort.pug`) 和首页文章UI (`indexPostUI.pug`)。 |
| ├─ `page/` | **特定页面模板**。如 404 页面、友链页面 (`flink.pug`) 的具体实现。 |
| ├─ `post/` | **文章页组件**。如版权声明、打赏模块等。 |
| ├─ `widget/` | **侧边栏小组件**。如作者信息、公告、最新文章、目录 (TOC) 等。 |
| └─ `third-party/` | **第三方服务集成**。包含评论系统、分享、数学公式、图表等功能的代码片段。 |

---

## `scripts` 目录

**Hexo 脚本目录**。这些 JS 文件在 `hexo generate` 过程中由 Node.js 执行，用于扩展 Hexo 功能。

| 文件/目录 | 作用 |
| :--- | :--- |
| `common/` | **通用脚本**。 |
| └─ `postDesc.js` | 生成文章摘要的辅助函数。 |
| `events/` | **事件监听脚本**。在 Hexo 的特定生命周期事件（如 `before_generate`）触发。 |
| ├─ `404.js` | 注册生成器，用于创建 `404.html` 页面。 |
| ├─ `cdn.js` | 处理 `plugins.yml`，生成第三方库的 CDN 链接。 |
| ├─ `merge_config.js` | 合并用户配置 (`_config.butterfly.yml`) 和主题的默认配置。 |
| └─ `stylus.js` | 向 Stylus 预处理器注入变量（如主题色、配置开关）。 |
| `filters/` | **过滤器脚本**。用于修改生成过程中的数据。 |
| ├─ `post_lazyload.js` | 在 HTML 生成后，为图片添加懒加载属性。 |
| └─ `random_cover.js` | 为未设置封面的文章随机分配封面。 |
| `helpers/` | **辅助函数 (Helpers)**。定义可在 Pug 模板中直接调用的函数。 |
| ├─ `aside_archives.js` | 生成归档列表小组件的 HTML。 |
| ├─ `inject_head_js.js` | 向 HTML 的 `<head>` 中注入关键的内联 JS（如深色模式初始化逻辑）。 |
| └─ `page.js` | 提供多种页面相关的辅助函数，如生成标签云、格式化URL等。 |
| `tag/` | **自定义标签 (Tag Plugins)**。定义了用户可以在 Markdown 中使用的自定义标签。 |
| ├─ `button.js` | 实现 `{% btn %}` 标签，用于生成美化按钮。 |
| ├─ `note.js` | 实现 `{% note %}` 标签，用于生成不同样式的提示框。 |
| └─ `tabs.js` | 实现 `{% tabs %}` 标签，用于生成选项卡容器。 |

---

## `source` 目录

**静态资源目录**。存放主题的 CSS、浏览器端 JS、图片等资源。

| 文件/目录 | 作用 |
| :--- | :--- |
| `css/` | **样式文件目录**。使用 Stylus (`.styl`) 语法。 |
| ├─ `index.styl` | **主样式入口**。引入所有其他样式文件。 |
| ├─ `var.styl` | **全局样式变量**。定义了主题的颜色、字体、尺寸等变量。 |
| ├─ `_global/` | 全局基础样式。 |
| ├─ `_layout/` | 布局样式，如页眉、页脚、侧边栏等。 |
| ├─ `_page/` | 页面相关样式，如首页、文章页、归档页等。 |
| ├─ `_highlight/` | 代码高亮样式。 |
| ├─ `_mode/` | **显示模式样式**，包含深色模式 (`darkmode.styl`) 和阅读模式 (`readmode.styl`)。 |
| └─ `_tags/` | 自定义标签插件的样式，如 `note`、`tabs` 等。 |
| `js/` | **浏览器端 JS 文件**。 |
| ├─ `main.js` | **主脚本文件**。负责主题大部分的交互功能，如菜单、滚动事件、代码块处理等。 |
| ├─ `utils.js` | **工具函数库**。定义了 `btf` 对象，包含防抖、节流、滚动、动画等常用函数。 |
| ├─ `tw_cn.js` | **简繁转换脚本**。 |
| └─ `search/` | **搜索功能脚本**，包含本地搜索和 Algolia 搜索的实现。 |
| `img/` | **图片目录**。用于存放主题所需的图片资源。 |
