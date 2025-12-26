<div align="center">
  <img src="src/assets/logos/bemoUI-logo-color.svg" alt="BemoUI Logo" width="400">
  <h1>BemoUI</h1>
  <p>一个现代化、高性能的React动画组件库</p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.3.4-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4.0.3-38B2AC?logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</div>

## 📋 概述

BemoUI 是一个功能丰富的 React 动画组件库，提供了多种实现方式以满足不同开发者的需求。项目架构清晰，组件设计灵活，支持高度定制，适合用于构建具有丰富视觉效果和交互体验的现代 Web 应用。

### ✨ 特点

- **多种实现方式**：每个组件提供四种实现版本（JS+CSS、JS+Tailwind、TS+CSS、TS+Tailwind）
- **高性能动画**：基于 React Spring、Framer Motion 和 GSAP 等优秀动画库构建
- **完全可定制**：每个组件都提供丰富的属性和选项，可根据需求进行定制
- **响应式设计**：所有组件都适配不同屏幕尺寸，提供最佳用户体验
- **TypeScript支持**：完整的TypeScript类型定义，提供优秀的开发体验
- **3D效果支持**：集成Three.js和相关库，支持创建3D交互效果

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
import 'bemo-ui/styles.css'; // 导入样式（如果使用CSS版本）

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
```

## 📦 组件列表

BemoUI 提供了丰富的组件：

- **BlurText** - 模糊文本效果
- **GradientText** - 渐变文本效果
- **LetterGlitch** - 字母故障效果
- **ShinyText** - 闪光文本效果
- **SplitText** - 文本分割动画
- **AnimatedContent** - 内容出现动画
- **AnimatedList** - 列表动画效果
- **FadeContent** - 淡入淡出效果
- **Magnet** - 磁性吸附效果
- **FlowingMenu** - 流动菜单效果
- **SpotlightCard** - 聚光灯卡片效果
- **StarBorder** - 星形边框效果
- **GridMotion** - 网格动效背景
- **MatrixCode** - 矩阵代码雨效果
- **Squares** - 方块背景效果
- **Waves** - 波浪动效背景

目前CLI正在WIP，但我们提供了所有组建的源代码供你使用！

## 🛠️ 开发

### 环境要求

- Node.js 16+
- npm 7+ 或 yarn 1.22+ 或 pnpm 7+

### 安装依赖

```bash
# 使用npm
npm install

# 使用yarn
yarn

# 使用pnpm
pnpm install
```

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview

# 创建新组件
npm run new:component ComponentName

# 删除组件
npm run delete:component ComponentName

# 代码检查
npm run lint
```

## 🔧 自定义组件

BemoUI 提供了方便的脚本来创建新组件：

```bash
npm run new:component MyComponent
```

这将自动创建以下文件：

- `src/content/Components/MyComponent/MyComponent.jsx` - JS+CSS 版本
- `src/content/Components/MyComponent/MyComponent.css` - CSS 样式
- `src/tailwind/Components/MyComponent/MyComponent.jsx` - JS+Tailwind 版本
- `src/ts-default/Components/MyComponent/MyComponent.tsx` - TS+CSS 版本
- `src/ts-default/Components/MyComponent/MyComponent.css` - TS 版本的 CSS 样式
- `src/ts-tailwind/Components/MyComponent/MyComponent.tsx` - TS+Tailwind 版本
- `src/demo/Components/MyComponentDemo.jsx` - 组件演示页面
- `src/constants/code/Components/myComponentCode.js` - 组件代码示例

## 📄 许可证

[MIT License](LICENSE)