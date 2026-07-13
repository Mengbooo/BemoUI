import './preview-controls.css';

const PreviewSwitch = ({ title = '', isChecked = false, isDisabled = false, onChange }) => (
  <label className="reactbits-control reactbits-control-switch">
    <span>{title}</span>
    <input type="checkbox" checked={isChecked} disabled={isDisabled} onChange={event => onChange?.(event.target.checked)} />
  </label>
);

export default PreviewSwitch;
