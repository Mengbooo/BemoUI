import code from '@content/Components/Confetti/Confetti.jsx?raw';
import css from '@content/Components/Confetti/Confetti.css?raw';
import tailwind from '@tailwind/Components/Confetti/Confetti.jsx?raw';
import tsCode from '@ts-default/Components/Confetti/Confetti.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Confetti/Confetti.tsx?raw';

export const confetti = {
  usage: `import { useRef } from 'react';
import { Confetti, ConfettiButton } from './Confetti';

export default function Example() {
  const confettiRef = useRef(null);

  return (
    <>
      <Confetti
        ref={confettiRef}
        manualstart
        options={{ particleCount: 80, colors: ['#1620E4', '#7BE9C6'] }}
      >
        <button type="button" onClick={() => confettiRef.current?.fire()}>
          Celebrate
        </button>
      </Confetti>

      <ConfettiButton options={{ spread: 70 }}>
        Confetti Button
      </ConfettiButton>
    </>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
