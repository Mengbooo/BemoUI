import { useNavigate } from 'react-router-dom';

import Magnet from '../../../content/Animations/Magnet/Magnet';

import MatrixCode from '../../../content/Backgrounds/MatrixCode/MatrixCode';
import AnimatedContent from '../../../content/Animations/AnimatedContent/AnimatedContent';
import Squares from '../../../content/Backgrounds/Squares/Squares';
import Waves from '../../../content/Backgrounds/Waves/Waves';
import LetterGlitch from '../../../content/Backgrounds/LetterGlitch/LetterGlitch';

import './HeroShowcase.css';

const HeroShowcase = () => {
  const navigate = useNavigate();

  return (
    <nav className="component-nav-container">
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle feat-1" onClick={() => navigate('/backgrounds/matrix-code')}>
          <MatrixCode color='#1620E4'/>
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="square feat-2" onClick={() => navigate('/backgrounds/waves')}>
          <Waves lineColor='#1620E4' xGap={8} yGap={8} />
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle link" onClick={() => navigate('/text-animations/split-text')}>
          <Magnet padding={25}>
            <div className="docs-link">
              <p>Browse Docs</p>
            </div>
          </Magnet>
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="square feat-3" onClick={() => navigate('/backgrounds/letter-glitch')}>
          <LetterGlitch
            glitchSpeed={10}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
          />
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle feat-4" onClick={() => navigate('/backgrounds/squares')}>
          <Squares speed={0.2} borderColor='#1620E4' hoverFillColor='#1620E4' />
        </div>
      </AnimatedContent>
    </nav>
  );
}

export default HeroShowcase;