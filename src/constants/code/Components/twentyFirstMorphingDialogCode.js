import code from '@content/Components/TwentyFirstMorphingDialog/TwentyFirstMorphingDialog.jsx?raw';
import css from '@content/Components/TwentyFirstMorphingDialog/TwentyFirstMorphingDialog.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstMorphingDialog/TwentyFirstMorphingDialog.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstMorphingDialog/TwentyFirstMorphingDialog.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstMorphingDialog/TwentyFirstMorphingDialog.tsx?raw';

export const twentyFirstMorphingDialog = {
  usage: `import {
  TwentyFirstMorphingDialog,
  TwentyFirstMorphingDialogTrigger,
  TwentyFirstMorphingDialogContainer,
  TwentyFirstMorphingDialogContent,
  TwentyFirstMorphingDialogClose,
  TwentyFirstMorphingDialogTitle,
  TwentyFirstMorphingDialogSubtitle,
  TwentyFirstMorphingDialogDescription,
  TwentyFirstMorphingDialogImage,
} from './TwentyFirstMorphingDialog';

export function Example() {
  return (
    <TwentyFirstMorphingDialog
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
    >
      <TwentyFirstMorphingDialogTrigger className="bemo-21st-morphing-dialog-card">
        <TwentyFirstMorphingDialogImage
          src="/assets/demo/cs1.webp"
          alt="Aurora Peak"
          style={{ height: 140, objectFit: 'cover' }}
        />
        <div className="bemo-21st-morphing-dialog-card-body">
          <TwentyFirstMorphingDialogTitle>Aurora Peak</TwentyFirstMorphingDialogTitle>
          <TwentyFirstMorphingDialogSubtitle>Landscape series</TwentyFirstMorphingDialogSubtitle>
        </div>
      </TwentyFirstMorphingDialogTrigger>

      <TwentyFirstMorphingDialogContainer>
        <TwentyFirstMorphingDialogContent>
          <TwentyFirstMorphingDialogImage
            src="/assets/demo/cs1.webp"
            alt="Aurora Peak"
            className="bemo-21st-morphing-dialog-expanded-image"
          />
          <div className="bemo-21st-morphing-dialog-expanded-body">
            <TwentyFirstMorphingDialogTitle>Aurora Peak</TwentyFirstMorphingDialogTitle>
            <TwentyFirstMorphingDialogSubtitle>Landscape series</TwentyFirstMorphingDialogSubtitle>
            <TwentyFirstMorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 8 },
              }}
            >
              Soft gradients over alpine ridgelines with a shared-layout morph.
            </TwentyFirstMorphingDialogDescription>
          </div>
          <TwentyFirstMorphingDialogClose />
        </TwentyFirstMorphingDialogContent>
      </TwentyFirstMorphingDialogContainer>
    </TwentyFirstMorphingDialog>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
