const animations = {
  'animated-content': () => import("../demo/Animations/AnimatedContentDemo"),
  'magnet': () => import("../demo/Animations/MagnetDemo"),
  'fade-content': () => import("../demo/Animations/FadeContentDemo"),
  'star-border': () => import("../demo/Animations/StarBorderDemo"),
  'meta-balls': () => import("../demo/Animations/MetaBallsDemo")
};

const textAnimations = {
  'split-text': () => import("../demo/TextAnimations/SplitTextDemo"),
  'blur-text': () => import("../demo/TextAnimations/BlurTextDemo"),
  'shiny-text': () => import("../demo/TextAnimations/ShinyTextDemo"),
  'gradient-text': () => import("../demo/TextAnimations/GradientTextDemo"),
  'count-up': () => import("../demo/TextAnimations/CountUpDemo"),
  'scroll-velocity': () => import("../demo/TextAnimations/ScrollVelocityDemo"),
  'glitch-text': () => import("../demo/TextAnimations/GlitchTextDemo")
};

const components = {
  'spotlight-card': () => import("../demo/Components/SpotlightCardDemo"),
  'flowing-menu': () => import("../demo/Components/FlowingMenuDemo"),
  'animated-list': () => import("../demo/Components/AnimatedListDemo")
};

const backgrounds = {
  'squares': () => import("../demo/Backgrounds/SquaresDemo"),
  'grid-motion': () => import("../demo/Backgrounds/GridMotionDemo"),
  'waves': () => import("../demo/Backgrounds/WavesDemo"),
  'letter-glitch': () => import("../demo/Backgrounds/LetterGlitchDemo"),
  'matrix-code':() => import("../demo/Backgrounds/MatrixCodeDemo")
};

export const componentMap = {
  ...animations,
  ...textAnimations,
  ...components,
  ...backgrounds
};
