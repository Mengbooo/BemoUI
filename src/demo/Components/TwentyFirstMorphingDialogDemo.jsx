import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from '../../components/common/TabbedLayout';
import CodeExample from '../../components/code/CodeExample';
import CliInstallation from '../../components/code/CliInstallation';
import PropTable from '../../components/common/PropTable';
import {
  TwentyFirstMorphingDialog,
  TwentyFirstMorphingDialogTrigger,
  TwentyFirstMorphingDialogContainer,
  TwentyFirstMorphingDialogContent,
  TwentyFirstMorphingDialogClose,
  TwentyFirstMorphingDialogTitle,
  TwentyFirstMorphingDialogSubtitle,
  TwentyFirstMorphingDialogDescription,
  TwentyFirstMorphingDialogImage,
} from '../../content/Components/TwentyFirstMorphingDialog/TwentyFirstMorphingDialog';
import { twentyFirstMorphingDialog } from '../../constants/code/Components/twentyFirstMorphingDialogCode';

const propData = [
  {
    name: 'transition',
    type: 'Transition',
    default: 'undefined',
    description:
      'Optional framer-motion transition applied via MotionConfig to the dialog tree (layout morph, open/close).',
  },
  {
    name: 'className / style',
    type: 'string | CSSProperties',
    default: '—',
    description:
      'Styling props accepted by Trigger, Content, Container, Title, Subtitle, Description, Image, and Close.',
  },
  {
    name: 'src / alt',
    type: 'string',
    default: 'required on Image',
    description: 'Image source and accessible alt text for TwentyFirstMorphingDialogImage.',
  },
  {
    name: 'disableLayoutAnimation',
    type: 'boolean',
    default: 'false',
    description:
      'On Description: skip shared layoutId so description only uses enter/exit variants.',
  },
  {
    name: 'variants',
    type: '{ initial, animate, exit }',
    default: 'undefined',
    description:
      'Optional motion variants for Description and Close enter/exit animations.',
  },
];

const cards = [
  {
    title: 'Aurora Peak',
    subtitle: 'Landscape series',
    image: '/assets/demo/cs1.webp',
    body: 'Soft gradients over alpine ridgelines. Click the card to morph into a focused detail view with shared layout motion.',
  },
  {
    title: 'Neon Harbor',
    subtitle: 'City nights',
    image: '/assets/demo/cs2.webp',
    body: 'Reflections along the waterfront at dusk. The dialog reuses image, title, and subtitle layout IDs for a seamless transition.',
  },
  {
    title: 'Mint Studio',
    subtitle: 'Product stills',
    image: '/assets/demo/cs3.webp',
    body: 'Clean product framing with mint accents. Escape, outside click, and the close control all dismiss while restoring focus.',
  },
];

function MorphingCard({
  title,
  subtitle,
  image,
  body,
}) {
  return (
    <TwentyFirstMorphingDialog
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 28,
        mass: 0.8,
      }}
    >
      <TwentyFirstMorphingDialogTrigger className="bemo-21st-morphing-dialog-card">
        <TwentyFirstMorphingDialogImage
          src={image}
          alt={title}
          className="bemo-21st-morphing-dialog-image"
          style={{ height: 140, objectFit: 'cover' }}
        />
        <div className="bemo-21st-morphing-dialog-card-body">
          <TwentyFirstMorphingDialogTitle>{title}</TwentyFirstMorphingDialogTitle>
          <TwentyFirstMorphingDialogSubtitle>
            {subtitle}
          </TwentyFirstMorphingDialogSubtitle>
        </div>
      </TwentyFirstMorphingDialogTrigger>

      <TwentyFirstMorphingDialogContainer>
        <TwentyFirstMorphingDialogContent>
          <TwentyFirstMorphingDialogImage
            src={image}
            alt={title}
            className="bemo-21st-morphing-dialog-expanded-image"
          />
          <div className="bemo-21st-morphing-dialog-expanded-body">
            <TwentyFirstMorphingDialogTitle>{title}</TwentyFirstMorphingDialogTitle>
            <TwentyFirstMorphingDialogSubtitle>
              {subtitle}
            </TwentyFirstMorphingDialogSubtitle>
            <TwentyFirstMorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 8 },
              }}
            >
              {body}
            </TwentyFirstMorphingDialogDescription>
            <p
              style={{
                margin: 0,
                fontSize: '0.8125rem',
                color: '#6b7280',
              }}
            >
              Accent:{' '}
              <span className="bemo-21st-morphing-dialog-accent">#1620E4</span>
              {' · '}
              <span className="bemo-21st-morphing-dialog-accent-mint">
                #7BE9C6
              </span>
            </p>
          </div>
          <TwentyFirstMorphingDialogClose />
        </TwentyFirstMorphingDialogContent>
      </TwentyFirstMorphingDialogContainer>
    </TwentyFirstMorphingDialog>
  );
}

export default function TwentyFirstMorphingDialogDemo() {
  return (
    <TabbedLayout>
      <PreviewTab>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            maxWidth: 720,
            margin: '0 auto',
            padding: '1rem 0 2rem',
          }}
        >
          <header style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              Morphing Dialog
            </h2>
            <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.55 }}>
              Shared-layout dialog that morphs from a compact trigger into a
              modal. Keyboard (Enter / Space / Escape / Tab trap), focus restore,
              click-outside, and reduced-motion friendly via MotionConfig.
            </p>
          </header>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
              gap: '1.25rem',
              alignItems: 'start',
            }}
          >
            {cards.map((card) => (
              <MorphingCard key={card.title} {...card} />
            ))}
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '0.8125rem',
              color: '#6b7280',
              lineHeight: 1.5,
            }}
          >
            Source credit:{' '}
            <a
              href="https://21st.dev/@ibelick/components/morphing-dialog"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1620E4', textDecoration: 'underline' }}
            >
              Morphing Dialog on 21st.dev
            </a>
            {' · '}
            Motion Primitives · MIT License
          </p>

          <PropTable data={propData} />
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={twentyFirstMorphingDialog} />
      </CodeTab>

      <CliTab>
        <CliInstallation />
      </CliTab>
    </TabbedLayout>
  );
}
