import { useState } from 'react';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCarousel, {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from '../../content/Components/TwentyFirstCarousel/TwentyFirstCarousel';
import { twentyFirstCarousel } from '../../constants/code/Components/twentyFirstCarouselCode';

const slides = [
  {
    id: 1,
    title: 'Motion primitives',
    description: 'Spring-driven slides with drag, keyboard, and indicator support.',
    image: '/assets/demo/cs1.webp',
    accent: '#1620E4',
  },
  {
    id: 2,
    title: 'Accessible by default',
    description: 'ARIA roles, focus-visible rings, and reduced-motion aware transitions.',
    image: '/assets/demo/cs2.webp',
    accent: '#7BE9C6',
  },
  {
    id: 3,
    title: 'Composable API',
    description: 'Use the compound components or the convenience TwentyFirstCarousel wrapper.',
    image: '/assets/demo/cs3.webp',
    accent: '#1620E4',
  },
];

const propData = [
  {
    name: 'initialIndex',
    type: 'number',
    default: '0',
    description: 'Starting slide index when uncontrolled.',
  },
  {
    name: 'index',
    type: 'number',
    default: '—',
    description: 'Controlled slide index.',
  },
  {
    name: 'onIndexChange',
    type: '(index: number) => void',
    default: '—',
    description: 'Called when the active slide changes.',
  },
  {
    name: 'disableDrag',
    type: 'boolean',
    default: 'false',
    description: 'Disables pointer drag gestures on the track.',
  },
  {
    name: 'showNavigation',
    type: 'boolean',
    default: 'true',
    description: 'Shows prev/next navigation controls (wrapper API).',
  },
  {
    name: 'showIndicators',
    type: 'boolean',
    default: 'true',
    description: 'Shows pagination indicators (wrapper API).',
  },
  {
    name: 'alwaysShowNavigation',
    type: 'boolean',
    default: 'false',
    description: 'Keeps navigation buttons visible without hover.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Class name for the carousel root.',
  },
];

const TwentyFirstCarouselDemo = () => {
  const [index, setIndex] = useState(0);

  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: '100%',
            maxWidth: 720,
            margin: '0 auto',
            padding: '1.5rem 0',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
              TwentyFirstCarousel
            </h2>
            <p style={{ margin: 0, color: '#71717a', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Drag, arrow keys, indicators, or buttons to move between slides. Hover to reveal
              navigation on larger screens.
            </p>
          </div>

          <TwentyFirstCarousel
            index={index}
            onIndexChange={setIndex}
            alwaysShowNavigation
            style={{ maxWidth: '100%' }}
          >
            {slides.map((slide) => (
              <TwentyFirstCarousel.Item key={slide.id}>
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    background: '#18181b',
                    border: '1px solid #e4e4e7',
                  }}
                >
                  <img
                    src={slide.image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '1.25rem',
                      color: '#fff',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: 9999,
                        background: slide.accent,
                        marginBottom: 8,
                        boxShadow: '0 0 0 3px rgba(123,233,198,0.35)',
                      }}
                    />
                    <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', fontWeight: 600 }}>
                      {slide.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.45 }}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              </TwentyFirstCarousel.Item>
            ))}
          </TwentyFirstCarousel>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: '0.875rem',
              color: '#52525b',
            }}
          >
            <span>
              Active slide: <strong style={{ color: '#1620E4' }}>{index + 1}</strong> / {slides.length}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  style={{
                    border: '1px solid',
                    borderColor: index === i ? '#1620E4' : '#e4e4e7',
                    background: index === i ? '#1620E4' : '#fff',
                    color: index === i ? '#fff' : '#3f3f46',
                    borderRadius: 9999,
                    padding: '0.35rem 0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 600 }}>
              Compound API
            </h3>
            <Carousel disableDrag>
              <CarouselContent>
                {slides.map((slide) => (
                  <CarouselItem key={`compound-${slide.id}`}>
                    <div
                      style={{
                        padding: '2rem 1.5rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #e4e4e7',
                        background: 'linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%)',
                        minHeight: 140,
                      }}
                    >
                      <p
                        style={{
                          margin: '0 0 0.35rem',
                          fontSize: '0.75rem',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: '#1620E4',
                          fontWeight: 600,
                        }}
                      >
                        Slide {slide.id}
                      </p>
                      <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem' }}>{slide.title}</h4>
                      <p style={{ margin: 0, color: '#71717a', fontSize: '0.9rem' }}>
                        {slide.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNavigation alwaysShow />
              <CarouselIndicator />
            </Carousel>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '0.8rem',
              color: '#71717a',
              lineHeight: 1.5,
              borderTop: '1px solid #e4e4e7',
              paddingTop: '1rem',
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@ibelick/components/carousel"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              21st.dev carousel
            </a>
            {' · '}Motion Primitives · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCarousel} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
};

export default TwentyFirstCarouselDemo;
