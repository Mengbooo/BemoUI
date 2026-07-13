import './preview-controls.css';

const PreviewSlider = ({ title = '', min = 0, max = 100, step = 1, value = 0, valueUnit = '', displayValue, isDisabled = false, onChange }) => (
  <label className="reactbits-control">
    <span>{title}</span>
    <input type="range" min={min} max={max} step={step} value={value} disabled={isDisabled} onChange={event => onChange?.(Number(event.target.value))} />
    <output>{displayValue ? displayValue(value) : `${value}${valueUnit}`}</output>
  </label>
);

export default PreviewSlider;
