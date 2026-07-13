/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const TreeContext = createContext(null);

const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTree must be used within FileTree');
  }
  return context;
};

const isFolderElement = (element) => {
  if (element.type) return element.type === 'folder';
  return Array.isArray(element.children);
};

const mergeExpandedItems = (currentItems, nextItems) =>
  [...new Set([...(currentItems ?? []), ...nextItems])];

const treeCollator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});

const defaultTreeComparator = (a, b) => {
  const aIsFolder = isFolderElement(a);
  const bIsFolder = isFolderElement(b);
  if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
  return treeCollator.compare(a.name, b.name);
};

const getTreeComparator = (sort) => {
  if (sort === 'none') return undefined;
  if (sort === 'default') return defaultTreeComparator;
  return sort;
};

const sortTreeElements = (elements, sort) => {
  const comparator = getTreeComparator(sort);
  const nextElements = elements.map((element) => {
    if (!Array.isArray(element.children)) return element;
    return {
      ...element,
      children: sortTreeElements(element.children, sort),
    };
  });
  if (!comparator) return nextElements;
  return [...nextElements].sort(comparator);
};

const FolderIcon = ({ open = false }) => (
  <svg
    className="size-4 shrink-0 text-[#1620E4]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {open ? (
      <>
        <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1" />
        <path d="M3 11h18l-1.5 7.5A2 2 0 0 1 17.55 20H6.45a2 2 0 0 1-1.95-1.5L3 11z" />
      </>
    ) : (
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    )}
  </svg>
);

const FileGlyph = ({ selected = false }) => (
  <svg
    className={`size-4 shrink-0 ${selected ? 'text-[#7BE9C6]' : 'text-gray-500'}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

const renderTreeElements = (elements, sort) =>
  sortTreeElements(elements, sort).map((element) => {
    if (isFolderElement(element)) {
      return (
        <Folder
          key={element.id}
          value={element.id}
          element={element.name}
          isSelectable={element.isSelectable}
        >
          {Array.isArray(element.children)
            ? renderTreeElements(element.children, sort)
            : null}
        </Folder>
      );
    }
    return (
      <File key={element.id} value={element.id} isSelectable={element.isSelectable}>
        <span>{element.name}</span>
      </File>
    );
  });

const TreeIndicator = forwardRef(function TreeIndicator({ className = '', ...props }, ref) {
  const { direction } = useTree();
  return (
    <div
      ref={ref}
      dir={direction}
      className={`pointer-events-none absolute inset-y-1 start-1.5 w-px rounded-full bg-[#7BE9C6]/55 transition-colors duration-200 hover:bg-[#1620E4] motion-reduce:transition-none ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
});

const Folder = forwardRef(function Folder(
  {
    className = '',
    element,
    value,
    isSelectable = true,
    isSelect,
    children,
    ...props
  },
  ref
) {
  const {
    direction,
    handleExpand,
    expandedItems,
    indicator,
    selectedId,
    selectItem,
    openIcon,
    closeIcon,
  } = useTree();
  const isExpanded = expandedItems?.includes(value);
  const isSelected = isSelect ?? selectedId === value;

  return (
    <li
      ref={ref}
      className="relative list-none"
      role="treeitem"
      aria-expanded={isExpanded}
      aria-selected={isSelected && isSelectable}
      data-disabled={!isSelectable ? 'true' : undefined}
      {...props}
    >
      <button
        type="button"
        disabled={!isSelectable}
        aria-disabled={!isSelectable}
        onClick={() => {
          if (!isSelectable) return;
          selectItem(value);
          handleExpand(value);
        }}
        className={`inline-flex max-w-full items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] ${isSelected && isSelectable ? 'bg-[#1620E4]/10 text-[#1620E4] shadow-[inset_0_0_0_1px_color-mix(in_srgb,#1620E4_30%,transparent)]' : 'text-gray-900 hover:bg-gray-100'} ${!isSelectable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
      >
        {isExpanded ? openIcon ?? <FolderIcon open /> : closeIcon ?? <FolderIcon />}
        <span className="truncate">{element}</span>
      </button>
      <div
        hidden={!isExpanded}
        className={`relative overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${isExpanded ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'}`}
      >
        {indicator ? <TreeIndicator /> : null}
        <ul className="ms-5 flex min-h-0 flex-col gap-1 py-1" role="group" dir={direction}>
          {children}
        </ul>
      </div>
    </li>
  );
});

const File = forwardRef(function File(
  {
    value,
    className = '',
    handleSelect,
    onClick,
    isSelectable = true,
    isSelect,
    fileIcon,
    children,
    ...props
  },
  ref
) {
  const { direction, selectedId, selectItem } = useTree();
  const isSelected = isSelect ?? selectedId === value;

  return (
    <li className="list-none" role="none">
      <button
        ref={ref}
        type="button"
        role="treeitem"
        disabled={!isSelectable}
        aria-disabled={!isSelectable}
        aria-selected={isSelected && isSelectable}
        dir={direction}
        className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] ${isSelected && isSelectable ? 'bg-[#1620E4]/10 text-[#1620E4] shadow-[inset_0_0_0_1px_color-mix(in_srgb,#1620E4_30%,transparent)]' : 'text-gray-900 hover:bg-gray-100'} ${!isSelectable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
        onClick={(event) => {
          if (!isSelectable) return;
          selectItem(value);
          handleSelect?.(value);
          onClick?.(event);
        }}
        {...props}
      >
        {fileIcon ?? <FileGlyph selected={isSelected && isSelectable} />}
        <span className="truncate">{children}</span>
      </button>
    </li>
  );
});

const CollapseButton = forwardRef(function CollapseButton(
  { className = '', elements = [], expandAll = false, children, ...props },
  ref
) {
  const { expandedItems, setExpandedItems } = useTree();

  const expandAllTree = useCallback((treeElements) => {
    const expandedElementIds = [];
    const expandTree = (element) => {
      const selectable = element.isSelectable ?? true;
      if (selectable && element.children && element.children.length > 0) {
        expandedElementIds.push(element.id);
        for (const child of element.children) expandTree(child);
      }
    };
    for (const element of treeElements) expandTree(element);
    return [...new Set(expandedElementIds)];
  }, []);

  const closeAll = useCallback(() => {
    setExpandedItems?.([]);
  }, [setExpandedItems]);

  useEffect(() => {
    if (expandAll) setExpandedItems?.(expandAllTree(elements));
  }, [expandAll, elements, expandAllTree, setExpandedItems]);

  const hasExpanded = expandedItems && expandedItems.length > 0;

  return (
    <button
      ref={ref}
      type="button"
      className={`absolute end-2 bottom-1 z-10 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-900 transition-colors duration-200 hover:border-[#1620E4] hover:bg-[#1620E4]/10 hover:text-[#1620E4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] motion-reduce:transition-none ${className}`}
      onClick={hasExpanded ? closeAll : () => setExpandedItems?.(expandAllTree(elements))}
      {...props}
    >
      {children ?? (hasExpanded ? 'Collapse all' : 'Expand all')}
    </button>
  );
});

const FileTree = forwardRef(function FileTree(
  {
    className = '',
    elements,
    initialSelectedId,
    initialExpandedItems,
    children,
    indicator = true,
    openIcon,
    closeIcon,
    sort = 'default',
    dir,
    ...props
  },
  ref
) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [expandedItems, setExpandedItems] = useState(initialExpandedItems);

  const selectItem = useCallback((id) => setSelectedId(id), []);
  const handleExpand = useCallback((id) => {
    setExpandedItems((prev) => {
      if (prev?.includes(id)) return prev.filter((item) => item !== id);
      return [...(prev ?? []), id];
    });
  }, []);

  const expandSpecificTargetedElements = useCallback((treeElements, selectId) => {
    if (!treeElements || !selectId) return;
    const findParent = (currentElement, currentPath = []) => {
      const selectable = currentElement.isSelectable ?? true;
      const newPath = [...currentPath, currentElement.id];
      if (currentElement.id === selectId) {
        if (selectable) {
          setExpandedItems((prev) => mergeExpandedItems(prev, newPath));
        } else if (newPath.includes(currentElement.id)) {
          newPath.pop();
          setExpandedItems((prev) => mergeExpandedItems(prev, newPath));
        }
        return;
      }
      if (Array.isArray(currentElement.children) && currentElement.children.length > 0) {
        currentElement.children.forEach((child) => findParent(child, newPath));
      }
    };
    treeElements.forEach((element) => findParent(element));
  }, []);

  useEffect(() => {
    if (initialSelectedId) expandSpecificTargetedElements(elements, initialSelectedId);
  }, [initialSelectedId, elements, expandSpecificTargetedElements]);

  const direction = dir === 'rtl' ? 'rtl' : 'ltr';
  const treeChildren = useMemo(
    () => children ?? (elements ? renderTreeElements(elements, sort) : null),
    [children, elements, sort]
  );

  return (
    <TreeContext.Provider
      value={{
        selectedId,
        expandedItems,
        handleExpand,
        selectItem,
        setExpandedItems,
        indicator,
        openIcon,
        closeIcon,
        direction,
      }}
    >
      <div
        ref={ref}
        dir={direction}
        className={`relative h-full min-h-48 w-full rounded-xl border border-gray-200 bg-white text-gray-900 ${className}`}
        {...props}
      >
        <div className="relative h-full max-h-full overflow-auto px-3 py-2">
          <ul className="flex flex-col gap-1" role="tree" aria-label="File tree">
            {treeChildren}
          </ul>
        </div>
      </div>
    </TreeContext.Provider>
  );
});

FileTree.displayName = 'FileTree';
Folder.displayName = 'Folder';
File.displayName = 'File';
CollapseButton.displayName = 'CollapseButton';

export { FileTree, Folder, File, CollapseButton, useTree };
export default FileTree;

/*
Required global keyframes for Tailwind v4 (add to your global CSS if you prefer keyframe-based panel animation instead of grid-rows):

@keyframes bemo-file-tree-expand {
  from { opacity: 0; transform: translateY(-0.15rem); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bemo-file-tree-collapse {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-0.15rem); }
}

@media (prefers-reduced-motion: reduce) {
  .bemo-file-tree-animate {
    animation: none !important;
  }
}
*/
