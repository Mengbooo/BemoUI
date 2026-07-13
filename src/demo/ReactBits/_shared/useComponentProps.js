import { useCallback, useMemo, useRef, useState } from 'react';

const useComponentProps = defaultProps => {
  const defaults = useRef(defaultProps).current;
  const [props, setProps] = useState(defaults);
  const updateProp = useCallback((name, value) => setProps(current => ({ ...current, [name]: value })), []);
  const updateProps = useCallback(updates => setProps(current => ({ ...current, ...updates })), []);
  const resetProps = useCallback(() => setProps(defaults), [defaults]);
  const hasChanges = useMemo(
    () => Object.keys(defaults).some(key => props[key] !== defaults[key]),
    [defaults, props]
  );
  return { props, defaultProps: defaults, updateProp, updateProps, resetProps, hasChanges };
};

export default useComponentProps;
