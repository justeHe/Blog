# Personal Homepage and Blog

[中文版](README.md)

---

This project contains a personal homepage and an integrated Hexo blog. The homepage is a static site built with Pug and Sass, while the blog is powered by Hexo and features the highly customizable Butterfly theme.

## ✨ Features

*   **Dual Platform**: Manages both a personal homepage and a blog in a single repository, with a unified build and deployment process handled by Gulp.
*   **Highly Customized Blog**:
    *   **Theme**: Uses the beautiful and powerful [Hexo-Theme-Butterfly](https://github.com/jerryc127/hexo-theme-butterfly).
    *   **Comment System**: Integrated with a self-hosted [Artalk](https://artalk.js.org/) comment system.
    *   **Math Formulas**: Supports [MathJax](https://www.mathjax.org/) for displaying complex mathematical formulas.
    *   **Local Search**: Integrated local search functionality without relying on external services.
    *   **Code Highlighting**: Uses the `pale night` theme with `Mac` style for code blocks, including a one-click copy feature.
    *   **Dynamic Effects**: Enabled typewriter effects, background animations (canvas_nest), and page loading animations to enhance user experience.
    *   **Multi-language**: Supports switching between Simplified and Traditional Chinese.
*   **Modern Frontend Workflow**: The homepage uses Gulp for an automated build process, compiling Pug, Sass, and ES6+ JavaScript.

## 🛠️ Tech Stack

*   **Homepage**:
    *   **Template Engine**: [Pug](https://pugjs.org/) (formerly Jade)
    *   **CSS Pre-processor**: [Sass](https://sass-lang.com/)
    *   **JavaScript**: ES6+ (compiled with Babel)
    *   **Build Tool**: [Gulp.js](https://gulpjs.com/)

*   **Blog**:
    *   **Framework**: [Hexo](https://hexo.io/)
    *   **Theme**: [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
    *   **Comments**: [Artalk](https://artalk.js.org/)
    *   **Math Rendering**: [MathJax](https://www.mathjax.org/)
    *   **Search**: `hexo-generator-searchdb` (Local Search)

## 📂 Project Structure

```
.
├── /dist/              # Compiled output directory for deployment
├── /src/               # Homepage source files (Pug, Sass, JS)
│   ├── /assets         # Static assets (images, etc.)
│   ├── /components     # Pug components
│   ├── /css            # Sass stylesheets
│   ├── /js             # JavaScript files
│   └── index.pug       # Homepage entry file
├── /blog/              # Hexo blog source files
│   ├── /source         # Blog posts and pages
│   ├── _config.yml     # Hexo core configuration
│   └── _config.butterfly.yml # Butterfly theme configuration
├── gulpfile.js         # Gulp build tasks
└── package.json        # Homepage dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14.x or higher recommended)
*   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/justeHe/Blog.git
    cd HomePage
    ```

2.  **Install homepage dependencies:**
    ```bash
    cnpm install
    ```

3.  **Install blog dependencies:**
    ```bash
    cd blog
    npm install
    ```

## 💻 Development

You can run the development servers for the homepage and the blog simultaneously.

*   **To develop the homepage:**
    Run the following command from the project root directory. This will start a local server at `http://localhost:8080` with live reload.
    ```bash
    cnpm run dev
    ```

*   **To develop the blog:**
    Navigate to the `blog` directory and start the Hexo server. The blog will run at `http://localhost:4000`.
    ```bash
    cd blog
    hexo c && hexo g
    hexo s
    ```

## 📦 Building for Production

The build process compiles and integrates all files from both the homepage and the blog into the `/dist` directory.

1.  **Build the Hexo blog:**
    First, generate the static files for the blog and the static files are in the public folder.
    ```bash
    cd blog
    hexo c && hexo g
    hexo s
    ```

2.  **Build the entire project:**
    Return to the root directory and run the main build script. This command compiles the homepage assets and automatically copies the generated blog files into the `dist/blog` directory.
    ```bash
    cd ..
    cnpm run build
    ```

After the build is complete, the `/dist` directory will contain all the static files ready for deployment.

## 📚 Resource Sharing

This project was built and optimized using several excellent tools, services, and learning resources. Here is a summary of some of them, which you might find helpful.

*   **Server & Deployment**:
    *   [Tencent Cloud Student Discount](https://cloud.tencent.com/act/campus?fromSource=gwzcw.7502004.7502004.7502004&utm_medium=cpc&utm_id=gwzcw.7502004.7502004.7502004&bd_vid=11264964216929139476): Server hosting for the blog.
    *   [Artalk](https://github.com/ArtalkJS/Artalk): A self-hosted comment system.

*   **Frontend & Design**:
    *   [WebGL Fluid Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation): Fluid simulation effect for the homepage.
    *   [Pace.js](https://codebyzach.github.io/pace/): Page loading animations.
    *   [Font Awesome](https://fontawesome.com/icons?from=io): Icon library.
    *   [Frontend Templates](https://github.com/huangshiyu13/webtemplate): A collection of web templates.

*   **Image Optimization**:
    *   [Image Engine](https://control.imageengine.io/): Image CDN with a free tier.
    *   [Caesium](https://saerasoft.com/caesium): A local image compression tool.
    *   [Convertio](https://convertio.co/zh/): An online image format conversion tool.
    *   [Anime Wallpaper Site](https://bz.zzzmh.cn/index): Wallpaper and image resources.

*   **Learning Resources**:
    *   [Responsive Images Guide](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Responsive_images): MDN tutorial on responsive images.
    *   [Image Lazy Loading](https://github.com/amandakelake/blog/issues/46): Discussion and implementation of lazy loading.
    *   [Browser Caching Strategy](https://github.com/amandakelake/blog/issues/43): In-depth introduction to browser caching.
    *   [CSS Sprites](https://www.w3schools.com/css/css_image_sprites.asp): W3Schools tutorial on CSS Sprites.

## 📄 License

This project is licensed under the MIT License.
