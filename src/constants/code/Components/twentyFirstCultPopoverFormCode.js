import code from '@content/Components/TwentyFirstCultPopoverForm/TwentyFirstCultPopoverForm.jsx?raw';
import css from '@content/Components/TwentyFirstCultPopoverForm/TwentyFirstCultPopoverForm.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstCultPopoverForm/TwentyFirstCultPopoverForm.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstCultPopoverForm/TwentyFirstCultPopoverForm.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstCultPopoverForm/TwentyFirstCultPopoverForm.tsx?raw';

export const twentyFirstCultPopoverForm = {
  usage: `import { useState } from 'react';
import TwentyFirstCultPopoverForm, {
  TwentyFirstCultPopoverFormButton,
  TwentyFirstCultPopoverFormSuccess,
  TwentyFirstCultPopoverFormSeparator,
} from './TwentyFirstCultPopoverForm';

function Example() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <TwentyFirstCultPopoverForm
      open={open}
      setOpen={setOpen}
      title="Feedback"
      showCloseButton
      showSuccess={showSuccess}
      width="364px"
      height="220px"
      openChild={
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setShowSuccess(true);
              setTimeout(() => {
                setOpen(false);
                setShowSuccess(false);
              }, 1600);
            }, 800);
          }}
          style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 12px 12px' }}
        >
          <textarea placeholder="Your message…" style={{ flex: 1, border: 'none', resize: 'none', outline: 'none' }} />
          <div style={{ position: 'relative', display: 'flex', paddingTop: 8 }}>
            <TwentyFirstCultPopoverFormSeparator width="100%" />
            <TwentyFirstCultPopoverFormButton loading={loading} text="Send" />
          </div>
        </form>
      }
      successChild={
        <TwentyFirstCultPopoverFormSuccess title="Thanks!" description="We received your feedback." />
      }
    />
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
