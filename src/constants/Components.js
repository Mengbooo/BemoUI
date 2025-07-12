const componentMap = {
  // Animations
  'animated-content': () => import("../demo/Components/AnimatedContentDemo"),
  'magnet': () => import("../demo/Components/MagnetDemo"),
  'fade-content': () => import("../demo/Components/FadeContentDemo"),
  'star-border': () => import("../demo/Components/StarBorderDemo"),
  
  // Text Animations
  'split-text': () => import("../demo/Components/SplitTextDemo"),
  'blur-text': () => import("../demo/Components/BlurTextDemo"),
  'shiny-text': () => import("../demo/Components/ShinyTextDemo"),
  'gradient-text': () => import("../demo/Components/GradientTextDemo"),
  
  // Components
  'spotlight-card': () => import("../demo/Components/SpotlightCardDemo"),
  'flowing-menu': () => import("../demo/Components/FlowingMenuDemo"),
  'animated-list': () => import("../demo/Components/AnimatedListDemo"),
  
  // Backgrounds
  'squares': () => import("../demo/Components/SquaresDemo"),
  'grid-motion': () => import("../demo/Components/GridMotionDemo"),
  'waves': () => import("../demo/Components/WavesDemo"),
  'letter-glitch': () => import("../demo/Components/LetterGlitchDemo"),
  'matrix-code':() => import("../demo/Components/MatrixCodeDemo")
};

export { componentMap };
