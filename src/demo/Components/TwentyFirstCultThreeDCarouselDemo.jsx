import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import TwentyFirstCultThreeDCarousel from '../../content/Components/TwentyFirstCultThreeDCarousel/TwentyFirstCultThreeDCarousel';
import { twentyFirstCultThreeDCarousel } from '../../constants/code/Components/twentyFirstCultThreeDCarouselCode';

const DEMO_IMAGES = [
  { src: '/assets/demo/cs1.webp', alt: 'City skyline at dusk' },
  { src: '/assets/demo/cs2.webp', alt: 'Abstract architecture detail' },
  { src: '/assets/demo/cs3.webp', alt: 'Neon street scene' },
  { src: '/assets/demo/cs1.webp', alt: 'Urban bridge lights' },
  { src: '/assets/demo/cs2.webp', alt: 'Modern glass facade' },
  { src: '/assets/demo/cs3.webp', alt: 'Night cityscape' },
  { src: '/assets/demo/cs1.webp', alt: 'Skyscraper silhouette' },
  { src: '/assets/demo/cs2.webp', alt: 'Downtown reflection' },
];

const propData = [
  {
    name: 'images',
    type: 'Array<string | { src: string; alt?: string }>',
    default: 'local demo assets',
    description:
      'Carousel images. Accepts URL strings or objects with src and optional alt. Used for the 3D cylinder faces.',
  },
  {
    name: 'height',
    type: 'number | string',
    default: '500',
    description: 'Height of the carousel stage in pixels or any valid CSS length.',
  },
  {
    name: 'onImageOpen',
    type: '(image: { src: string; alt: string }, index: number) => void',
    default: 'undefined',
    description: 'Callback fired when a face is opened in the lightbox overlay.',
  },
  {
    name: 'onImageClose',
    type: '() => void',
    default: 'undefined',
    description: 'Callback fired when the overlay is dismissed (click outside, close button, or Escape).',
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'Optional class name applied to the root element.',
  },
];

export default function TwentyFirstCultThreeDCarouselDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            width: '100%',
            maxWidth: 960,
            margin: '0 auto',
            padding: '1.5rem 1rem 2rem',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ marginBottom: '1.25rem' }}>
            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#f5f5f5',
                letterSpacing: 0,
              }}
            >
              3D Photo Carousel
            </h2>
            <p
              style={{
                margin: '0.5rem 0 0',
                color: '#a3a3a3',
                fontSize: '0.95rem',
                lineHeight: 1.55,
                maxWidth: 42 + 'rem',
              }}
            >
              Drag horizontally to spin the cylinder. Click a face to expand it in a modal
              overlay. Press Escape or click the backdrop / close control to dismiss.
              Respects prefers-reduced-motion and includes keyboard focus styles.
            </p>
          </div>

          <TwentyFirstCultThreeDCarousel
            images={DEMO_IMAGES}
            height={480}
            onImageOpen={(img, index) => {
              // Demo-only: optional logging for interaction verification
              if (typeof console !== 'undefined') {
                console.info('Opened', img.alt, 'at index', index);
              }
            }}
          />

          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '0.8125rem',
              color: '#6b7280',
              lineHeight: 1.5,
            }}
          >
            Source:{' '}
            <a
              href="https://21st.dev/@cult-ui/components/3d-carousel"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', fontWeight: 600 }}
            >
              Cult UI — 3D Carousel
            </a>{' '}
            · MIT License
          </p>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstCultThreeDCarousel} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
