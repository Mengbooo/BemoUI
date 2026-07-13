import code from '@content/Components/TwentyFirstDialog/TwentyFirstDialog.jsx?raw';
import css from '@content/Components/TwentyFirstDialog/TwentyFirstDialog.css?raw';
import tailwind from '@tailwind/Components/TwentyFirstDialog/TwentyFirstDialog.jsx?raw';
import tsCode from '@ts-default/Components/TwentyFirstDialog/TwentyFirstDialog.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/TwentyFirstDialog/TwentyFirstDialog.tsx?raw';

export const twentyFirstDialog = {
  usage: `import TwentyFirstDialog from './TwentyFirstDialog';

export default function Example() {
  return (
    <TwentyFirstDialog>
      <TwentyFirstDialog.Trigger>Open dialog</TwentyFirstDialog.Trigger>
      <TwentyFirstDialog.Content>
        <TwentyFirstDialog.Header>
          <TwentyFirstDialog.Title>Title</TwentyFirstDialog.Title>
          <TwentyFirstDialog.Description>
            Optional supporting text for this dialog.
          </TwentyFirstDialog.Description>
        </TwentyFirstDialog.Header>
        <TwentyFirstDialog.Footer>
          <TwentyFirstDialog.Close>Cancel</TwentyFirstDialog.Close>
          <button type="button">Confirm</button>
        </TwentyFirstDialog.Footer>
      </TwentyFirstDialog.Content>
    </TwentyFirstDialog>
  );
}`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
