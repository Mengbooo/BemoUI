import './preview-controls.css';

const PreviewSelect = ({ title = '', options = [], value = '', isDisabled = false, onChange }) => (
  <label className="reactbits-control">
    <span>{title}</span>
    <select value={value} disabled={isDisabled} onChange={event => onChange?.(event.target.value)}>
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </label>
);

export default PreviewSelect;
