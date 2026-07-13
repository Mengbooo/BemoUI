<div align="center">
  <img src="src/assets/logos/bemoUI-logo-color.svg" alt="BemoUI Logo" width="400">
  <h1>BemoUI</h1>
  <p>A Modern, High-Performance React Animation Component Library</p>
  
  <p>
    <a href="#english">English</a> • 
    <a href="README_zh.md">中文</a>
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

## <a name="english"></a>📖 Overview

**BemoUI** is a comprehensive React animation component library designed for building modern web applications with rich visual effects and interactive experiences. It combines powerful animation libraries like React Spring, Framer Motion, and GSAP with a clean, scalable architecture that supports multiple implementation variants.

### ✨ Key Features

- **Multi-Version Support**: Each component is available in 4 variants (JS+CSS, JS+Tailwind, TS+CSS, TS+Tailwind) to suit different project needs
- **High-Performance Animations**: Built with industry-standard libraries including React Spring, Framer Motion, GSAP, and Three.js
- **Fully Customizable**: Rich props and configuration options for every component, allowing complete customization
- **Responsive Design**: All components are optimized for different screen sizes and device types
- **Complete TypeScript Support**: Full type definitions for excellent development experience and type safety
- **3D Effects**: Integrated Three.js support for creating stunning 3D interactive effects
- **Production-Ready**: Thoroughly tested and optimized for performance and reliability

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install bemo-ui

# Using yarn
yarn add bemo-ui

# Using pnpm
pnpm add bemo-ui
```

### Basic Usage

```jsx
import { AnimatedContent, Waves } from 'bemo-ui';
import 'bemo-ui/styles.css'; // Import styles (for CSS version)

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

## 📦 Component Library

BemoUI provides a diverse collection of animation components:

### Text Effects
- **BlurText** - Blur effect animation
- **GradientText** - Gradient color animation
- **LetterGlitch** - Glitch effect animation
- **ShinyText** - Shiny/gloss effect
- **SplitText** - Text split animation

### Layout & Container
- **AnimatedContent** - Content reveal animation
- **AnimatedList** - List item animations
- **FadeContent** - Fade in/out effect
- **SpotlightCard** - Spotlight lens effect
- **StarBorder** - Star-shaped border effect

### Interactive Effects
- **Magnet** - Magnetic attraction effect
- **FlowingMenu** - Flowing menu animation
- **GridMotion** - Grid motion background
- **MatrixCode** - Matrix rain effect
- **Squares** - Square pattern background
- **Waves** - Wave animation background

*Full component documentation and live demos available on the [official website](https://bemoui.com).*

## 🛠️ Development Guide

### Prerequisites

- Node.js 16 or higher
- npm 7+ / yarn 1.22+ / pnpm 7+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/bemo-ui.git
cd bemo-ui

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Create a new component (generates all 4 variants)
npm run new:component ComponentName

# Delete a component
npm run delete:component ComponentName

# Synchronize component versions
npm run sync:component ComponentName [--source=variant]

# Run ESLint checks
npm run lint
```

### Creating Custom Components

BemoUI provides automated scripts to scaffold new components:

```bash
npm run new:component MyComponent
```

This command automatically generates:

- `src/content/Components/MyComponent/MyComponent.jsx` - JS+CSS variant
- `src/content/Components/MyComponent/MyComponent.css` - CSS styles
- `src/tailwind/Components/MyComponent/MyComponent.jsx` - JS+Tailwind variant
- `src/ts-default/Components/MyComponent/MyComponent.tsx` - TS+CSS variant
- `src/ts-default/Components/MyComponent/MyComponent.css` - TS CSS styles
- `src/ts-tailwind/Components/MyComponent/MyComponent.tsx` - TS+Tailwind variant
- `src/demo/Components/MyComponentDemo.jsx` - Component demo page
- `src/constants/code/Components/myComponentCode.js` - Code examples for showcase

### Component Synchronization

The `sync:component` script helps maintain consistency across all component variants:

```bash
# Sync from content version to all other variants
npm run sync:component ShinyText --source=content

# Sync from TypeScript version
npm run sync:component ShinyText --source=ts-default
```

## 📁 Project Structure

```
bemo-ui/
├── src/
│   ├── components/          # UI components (navigation, layout, etc.)
│   ├── content/Components/  # JS+CSS components
│   ├── tailwind/Components/ # JS+Tailwind components
│   ├── ts-default/Components/  # TS+CSS components
│   ├── ts-tailwind/Components/ # TS+Tailwind components
│   ├── demo/Components/     # Component demonstrations
│   ├── constants/           # Configuration constants
│   ├── hooks/              # Custom React hooks
│   ├── css/                # Global styles
│   └── utils/              # Utility functions
├── scripts/
│   ├── generateComponent.js # Component generator
│   ├── deleteComponent.js  # Component remover
│   ├── syncComponent.js    # Component synchronizer
│   └── ...
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

All components follow a consistent design philosophy:

- **Performance First**: Optimized animations with minimal re-renders
- **Accessibility**: ARIA-compliant components with keyboard support
- **Customization**: Flexible props and CSS/Tailwind integration
- **Consistency**: Uniform naming conventions and API design

## 📚 Documentation

For detailed documentation and interactive component demos, visit:
- [Official Website](https://bemoui.com)
- [Component Documentation](https://bemoui.com/docs)
- [API Reference](https://bemoui.com/api)

## 🤖 CodePen Import Pipeline

CodePen's terms prohibit crawling, and its public API does not expose arbitrary Pen source. BemoUI therefore uses a curated workflow: manually select a Pen, download its official ZIP export, then automate conversion.

Create a Git-ignored `.env.local` file for the configured OpenAI-compatible provider:

```bash
OPENAI_API_KEY="..."
OPENAI_BASE_URL="https://www.micuapi.ai/v1"
OPENAI_MODEL="grok-4.5"
OPENAI_USER_AGENT="codex_cli_rs/0.77.0 (Windows 10.0.26100; x86_64) WindowsTerminal"
```

Then run:

```bash
npm run import:codepen -- \
  --source /path/to/codepen-export.zip \
  --name AuroraButton \
  --url https://codepen.io/author/pen/pen-id \
  --author author \
  --license MIT \
  --confirm-rights
```

The importer reads the exported HTML/CSS/JavaScript, generates the BemoUI React component, demo, code entry, and source record, then leaves the result for review. Run `npm run test:codepen-import`, `npm run lint`, and `npm run build` before opening a Pull Request. Merging into `main` publishes through the existing Vercel project. The configured provider is MicuAPI using the OpenAI Responses protocol and `grok-4.5`. Override the endpoint, model, or required User-Agent with the corresponding environment variables.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

BemoUI is built upon these excellent libraries:
- [React](https://react.dev)
- [Framer Motion](https://www.framer.com/motion)
- [React Spring](https://www.react-spring.dev)
- [GSAP](https://greensock.com/gsap)
- [Three.js](https://threejs.org)
- [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">
  <p>Made with ❤️ by BemoUI Team</p>
  <p>
    <a href="https://github.com/your-org/bemo-ui">GitHub</a> • 
    <a href="https://twitter.com/bemoui">Twitter</a> • 
    <a href="https://discord.gg/bemoui">Discord</a>
  </p>
</div>

## Magic UI import workflow

`.github/workflows/import-magicui.yml` fetches a component from the official Magic UI registry, converts it into BemoUI's JavaScript, Tailwind, TypeScript, and demo variants, validates the result, and opens a pull request.

Configure the `MICUAPI_API_KEY` Actions secret and allow GitHub Actions to write repository contents and create pull requests. Then run **Actions → Import Magic UI component** with the registry `slug` and a PascalCase `component_name`. Generated code is never merged automatically and still requires visual, accessibility, and attribution review.
