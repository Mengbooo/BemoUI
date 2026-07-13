import code from '@content/ReactBits/Components/Stepper/Stepper.jsx?raw';
import css from '@content/ReactBits/Components/Stepper/Stepper.css?raw';
import tailwind from '@tailwind/ReactBits/Components/Stepper/Stepper.jsx?raw';
import tsCode from '@ts-default/ReactBits/Components/Stepper/Stepper.tsx?raw';
import tsTailwind from '@ts-tailwind/ReactBits/Components/Stepper/Stepper.tsx?raw';

export const stepper = {
  dependencies: `framer-motion`,
  usage: `import Stepper, { Step } from './Stepper';

<Stepper
  initialStep={1}
  onStepChange={(step) => {
    console.log(step);
  }}
  onFinalStepCompleted={() => console.log("All steps completed!")}
  backButtonText="Previous"
  nextButtonText="Next"
>
  <Step>
    <h2>Welcome to the BemoUI stepper!</h2>
    <p>Check out the next step!</p>
  </Step>
  <Step>
    <h2>Step 2</h2>
    <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
    <p>Custom step content!</p>
  </Step>
  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>
  <Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step>
</Stepper>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
