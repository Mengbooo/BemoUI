import { HeroType, PerspectiveGrid } from "../svg/SvgComponents";

import { useMediaQuery } from "react-haiku";
import { useActiveBeams } from "../../hooks/useActiveBeams";

import AnimatedContent from "../../content/Animations/AnimatedContent/AnimatedContent";
import HeroShowcase from "./HeroShowcase/HeroShowcase";

const LandingHero = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const activeBeams = useActiveBeams();

  return (
    <div className="hero-content">
      <div className="type-logo">
        <AnimatedContent
          initialOpacity={isMobile ? 0 : 1}
          scale={0.8}
          reverse={isMobile}
        >
          <HeroType />
        </AnimatedContent>
      </div>

      <div className="hero-info">
        <HeroShowcase />
        <div className="headline">
          <div className="landing-bottom">
            <div className="divider"></div>
          </div>
        </div>
      </div>

      <div className="perspective-grid">
        <PerspectiveGrid activeBeams={activeBeams} />
      </div>
    </div>
  );
};

export default LandingHero;
