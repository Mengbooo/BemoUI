import './preview-controls.css';

const PreviewColorPickerCustom = ({ title = '', color = '#1620E4', onChange }) => (
  <label className="reactbits-control reactbits-control-color">
    <span>{title}</span>
    <input type="color" value={color} onChange={event => onChange?.(event.target.value)} />
    <code>{color}</code>
  </label>
);

export default PreviewColorPickerCustom;
