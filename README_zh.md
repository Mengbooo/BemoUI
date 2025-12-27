<div align="center">
  <img src="src/assets/logos/bemoUI-logo-color.svg" alt="BemoUI Logo" width="400">
  <h1>BemoUI</h1>
  <p>一个现代化、高性能的React动画组件库</p>
  
  <p>
    <a href="README.md">English</a> • 
    <a href="#chinese">中文</a>
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.3.4-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4.0.3-38B2AC?logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</div>

---

## <a name="chinese"></a>📖 概述

**BemoUI** 是一个功能丰富的 React 动画组件库，专为构建具有丰富视觉效果和交互体验的现代 Web 应用而设计。它整合了 React Spring、Framer Motion、GSAP 等业界领先的动画库，并提供清晰的架构和灵活的多版本实现方案。

### ✨ 核心特性

- **多版本支持**：每个组件提供 4 种实现版本（JS+CSS、JS+Tailwind、TS+CSS、TS+Tailwind），满足不同项目需求
- **高性能动画**：基于 React Spring、Framer Motion、GSAP 和 Three.js 等业界标准库构建
- **完全可定制**：每个组件都提供丰富的属性和配置选项，支持深度定制
- **响应式设计**：所有组件都适配不同屏幕尺寸和设备类型
- **完整的TypeScript支持**：提供完整的类型定义，提升开发体验和代码安全性
- **3D效果支持**：集成 Three.js，支持创建惊艳的 3D 交互效果
- **生产级别质量**：经过充分测试和性能优化，可直接用于生产环境

## 🚀 快速开始

### 安装

```bash
# 使用npm
npm install bemo-ui

# 使用yarn
yarn add bemo-ui

# 使用pnpm
pnpm add bemo-ui
```

### 基本使用

```jsx
import { AnimatedContent, Waves } from 'bemo-ui';
import 'bemo-ui/styles.css'; // 导入样式（CSS版本）

function App() {
  return (
    <div>
      <AnimatedContent>
        <h1>Hello BemoUI!</h1>
      </AnimatedContent>
      
      <div style={{ height: '300px', position: 'relative' }}>
        <Waves lineColor="#ffffff" />
      </div>
    </div>
  );
}

export default App;
```

## 📦 组件库

BemoUI 提供了丰富多样的动画组件集合：

### 文字效果
- **BlurText** - 模糊文本效果
- **GradientText** - 渐变文本效果
- **LetterGlitch** - 字母故障效果
- **ShinyText** - 闪光文本效果
- **SplitText** - 文本分割动画

### 布局与容器
- **AnimatedContent** - 内容出现动画
- **AnimatedList** - 列表动画效果
- **FadeContent** - 淡入淡出效果
- **SpotlightCard** - 聚光灯卡片效果
- **StarBorder** - 星形边框效果

### 交互效果
- **Magnet** - 磁性吸附效果
- **FlowingMenu** - 流动菜单效果
- **GridMotion** - 网格动效背景
- **MatrixCode** - 矩阵代码雨效果
- **Squares** - 方块背景效果
- **Waves** - 波浪动效背景

*完整的组件文档和在线演示请访问[官方网站](https://bemoui.com)。*

## 🛠️ 开发指南

### 环境要求

- Node.js 16 或更高版本
- npm 7+ / yarn 1.22+ / pnpm 7+

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/your-org/bemo-ui.git
cd bemo-ui

# 安装依赖
npm install
# 或
yarn install
# 或
pnpm install
```

### 可用命令

```bash
# 启动开发服务器（支持热更新）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建结果
npm run preview

# 创建新组件（自动生成4个版本）
npm run new:component ComponentName

# 删除组件
npm run delete:component ComponentName

# 组件版本同步
npm run sync:component ComponentName [--source=variant]

# 运行代码检查
npm run lint
```

### 创建自定义组件

BemoUI 提供了自动化脚本来生成新组件：

```bash
npm run new:component MyComponent
```

该命令会自动生成以下文件：

- `src/content/Components/MyComponent/MyComponent.jsx` - JS+CSS 版本
- `src/content/Components/MyComponent/MyComponent.css` - CSS 样式文件
- `src/tailwind/Components/MyComponent/MyComponent.jsx` - JS+Tailwind 版本
- `src/ts-default/Components/MyComponent/MyComponent.tsx` - TS+CSS 版本
- `src/ts-default/Components/MyComponent/MyComponent.css` - TS CSS 样式文件
- `src/ts-tailwind/Components/MyComponent/MyComponent.tsx` - TS+Tailwind 版本
- `src/demo/Components/MyComponentDemo.jsx` - 组件演示页面
- `src/constants/code/Components/myComponentCode.js` - 代码示例

### 组件版本同步

`sync:component` 脚本帮助您保持所有组件版本的一致性：

```bash
# 从 content 版本同步到其他所有版本
npm run sync:component ShinyText --source=content

# 从 TypeScript 版本同步
npm run sync:component ShinyText --source=ts-default
```

## 📁 项目结构

```
bemo-ui/
├── src/
│   ├── components/          # UI组件（导航、布局等）
│   ├── content/Components/  # JS+CSS 组件版本
│   ├── tailwind/Components/ # JS+Tailwind 组件版本
│   ├── ts-default/Components/  # TS+CSS 组件版本
│   ├── ts-tailwind/Components/ # TS+Tailwind 组件版本
│   ├── demo/Components/     # 组件演示页面
│   ├── constants/           # 配置常量
│   ├── hooks/              # 自定义 React 钩子
│   ├── css/                # 全局样式
│   └── utils/              # 工具函数
├── scripts/
│   ├── generateComponent.js # 组件生成器
│   ├── deleteComponent.js  # 组件删除器
│   ├── syncComponent.js    # 组件同步器
│   └── ...
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 设计系统

所有组件遵循一致的设计理念：

- **性能优先**：动画经过优化，最小化重新渲染
- **易访问性**：符合 ARIA 标准，支持键盘操作
- **高度定制**：灵活的属性和 CSS/Tailwind 集成
- **一致性**：统一的命名约定和 API 设计

## 📚 文档

详细的文档和交互式组件演示请访问：
- [官方网站](https://bemoui.com)
- [组件文档](https://bemoui.com/docs)
- [API 参考](https://bemoui.com/api)

## 🤝 贡献指南

欢迎贡献！请按以下步骤操作：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

BemoUI 基于以下优秀的库构建：
- [React](https://react.dev)
- [Framer Motion](https://www.framer.com/motion)
- [React Spring](https://www.react-spring.dev)
- [GSAP](https://greensock.com/gsap)
- [Three.js](https://threejs.org)
- [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">
  <p>由 BemoUI 团队倾情打造 ❤️</p>
  <p>
    <a href="https://github.com/your-org/bemo-ui">GitHub</a> • 
    <a href="https://twitter.com/bemoui">Twitter</a> • 
    <a href="https://discord.gg/bemoui">Discord</a>
  </p>
</div>
