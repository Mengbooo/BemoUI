import { useNavigate } from 'react-router-dom';

import Magnet from '../../../content/Components/Magnet/Magnet';

import MatrixCode from '../../../content/Components/MatrixCode/MatrixCode';
import AnimatedContent from '../../../content/Components/AnimatedContent/AnimatedContent';
import Squares from '../../../content/Components/Squares/Squares';
import Waves from '../../../content/Components/Waves/Waves';
import LetterGlitch from '../../../content/Components/LetterGlitch/LetterGlitch';

import './HeroShowcase.css';

const HeroShowcase = () => {
  const navigate = useNavigate();

  return (
    <nav className="component-nav-container">
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle feat-1" onClick={() => navigate('/components/matrix-code')}>
          <MatrixCode color='#1620E4'/>
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="square feat-2" onClick={() => navigate('/components/waves')}>
          <Waves lineColor='#1620E4' xGap={8} yGap={8} />
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle link" onClick={() => navigate('/components/split-text')}>
          <Magnet padding={25}>
            <div className="docs-link">
              <p>Browse Docs</p>
            </div>
          </Magnet>
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="square feat-3" onClick={() => navigate('/components/letter-glitch')}>
          <LetterGlitch
            glitchSpeed={10}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
          />
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle feat-4" onClick={() => navigate('/components/squares')}>
          <Squares speed={0.2} borderColor='#1620E4' hoverFillColor='#1620E4' />
        </div>
      </AnimatedContent>
    </nav>
  );
}

export default HeroShowcase;