import './preview-controls.css';

const PreviewInput = ({ title = '', value = '', placeholder = '', maxLength, isDisabled = false, onChange }) => (
  <label className="reactbits-control">
    <span>{title}</span>
    <input type="text" value={value} placeholder={placeholder} maxLength={maxLength} disabled={isDisabled} onChange={event => onChange?.(event.target.value)} />
  </label>
);

export default PreviewInput;
