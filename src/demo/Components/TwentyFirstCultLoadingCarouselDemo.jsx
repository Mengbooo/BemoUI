import { useMemo, useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultLoadingCarousel from '../../content/Components/TwentyFirstCultLoadingCarousel/TwentyFirstCultLoadingCarousel';
import { twentyFirstCultLoadingCarousel } from '../../constants/code/Components/twentyFirstCultLoadingCarouselCode';

const DEMO_TIPS = [
  {
    text: 'Ship polished loading states that keep users engaged while content resolves.',
    image: '/assets/demo/cs1.webp',
  },
  {
    text: 'Progress indicators and keyboard navigation make wait time feel intentional.',
    image: '/assets/demo/cs2.webp',
  },
  {
    text: 'Pair tip copy with imagery for a product-ready loading carousel experience.',
    image: '/assets/demo/cs3.webp',
  },
];

const propData = [
  {
    name: 'tips',
    type: 'Tip[]',
    default: 'built-in demo tips',
    description: 'Array of tip objects with text, image, and optional url.',
  },
  {
    name: 'autoplayInterval',
    type: 'number',
    default: '4500',
    description: 'Milliseconds between automatic slide advances.',
  },
  {
    name: 'showNavigation',
    type: 'boolean',
    default: 'false',
    description: 'Show previous/next arrow controls over the media.',
  },
  {
    name: 'showIndicators',
    type: 'boolean',
    default: 'true',
    description: 'Show segment indicators under the media.',
  },
  {
    name: 'showProgress',
    type: 'boolean',
    default: 'true',
    description: 'Animate a progress fill on the active indicator segment.',
  },
  {
    name: 'aspectRatio',
    type: "'video' | 'square' | 'wide'",
    default: "'video'",
    description: 'Aspect ratio of the carousel media area.',
  },
  {
    name: 'textPosition',
    type: "'top' | 'bottom'",
    default: "'bottom'",
    description: 'Overlay tip text position when backgroundTips is enabled.',
  },
  {
    name: 'backgroundTips',
    type: 'boolean',
    default: 'false',
    description: 'Render tip copy as an overlay on the image instead of the footer caption.',
  },
  {
    name: 'backgroundGradient',
    type: 'boolean',
    default: 'false',
    description: 'Add a dark gradient overlay for readable background tip text.',
  },
  {
    name: 'shuffleTips',
    type: 'boolean',
    default: 'false',
    description: 'Shuffle tip order once on mount.',
  },
  {
    name: 'paused',
    type: 'boolean',
    default: 'false',
    description: 'Pause autoplay while true.',
  },
  {
    name: 'onTipChange',
    type: '(index: number) => void',
    default: 'undefined',
    description: 'Callback fired when the active tip index changes.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Optional class name for the root carousel container.',
  },
];

export default function TwentyFirstCultLoadingCarouselDemo() {
  const [showNavigation, setShowNavigation] = useState(true);
  const [showIndicators, setShowIndicators] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [backgroundTips, setBackgroundTips] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('video');
  const [activeIndex, setActiveIndex] = useState(0);

  const tips = useMemo(() => DEMO_TIPS, []);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          <div
            style={{
              borderRadius: '1rem',
              border: '1px solid #e4e4e7',
              background: '#fafafa',
              padding: '1.25rem',
            }}
          >
            <TwentyFirstCultLoadingCarousel
              tips={tips}
              showNavigation={showNavigation}
              showIndicators={showIndicators}
              showProgress={showProgress}
              backgroundTips={backgroundTips}
              backgroundGradient={backgroundGradient}
              aspectRatio={aspectRatio}
              autoplayInterval={4500}
              onTipChange={setActiveIndex}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gap: '0.75rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              alignItems: 'center',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={showNavigation}
                onChange={(e) => setShowNavigation(e.target.checked)}
              />
              Navigation
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={showIndicators}
                onChange={(e) => setShowIndicators(e.target.checked)}
              />
              Indicators
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={showProgress}
                onChange={(e) => setShowProgress(e.target.checked)}
              />
              Progress
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={backgroundTips}
                onChange={(e) => setBackgroundTips(e.target.checked)}
              />
              Background tips
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={backgroundGradient}
                onChange={(e) => setBackgroundGradient(e.target.checked)}
              />
              Gradient
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              Aspect
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                style={{
                  borderRadius: '0.375rem',
                  border: '1px solid #d4d4d8',
                  padding: '0.25rem 0.5rem',
                  background: '#fff',
                }}
              >
                <option value="video">video</option>
                <option value="square">square</option>
                <option value="wide">wide</option>
              </select>
            </label>
          </div>

          <p style={{ margin: 0, fontSize: '0.875rem', color: '#52525b' }}>
            Active tip: <strong style={{ color: '#1620E4' }}>{activeIndex + 1}</strong> / {tips.length}
          </p>

          <p style={{ margin: 0, fontSize: '0.875rem', color: '#71717a', lineHeight: 1.5 }}>
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/loading-carousel"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Cult UI Loading Carousel
            </a>{' '}
            on 21st.dev · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultLoadingCarousel} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
