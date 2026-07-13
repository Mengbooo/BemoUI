import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import './FileTree.css';

export type TreeViewElement = {
  id: string;
  name: string;
  type?: 'file' | 'folder';
  isSelectable?: boolean;
  children?: TreeViewElement[];
};

export type TreeSortMode =
  | 'default'
  | 'none'
  | ((a: TreeViewElement, b: TreeViewElement) => number);

type TreeContextProps = {
  selectedId: string | undefined;
  expandedItems: string[] | undefined;
  indicator: boolean;
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
  setExpandedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  direction: 'rtl' | 'ltr';
};

const TreeContext = createContext<TreeContextProps | null>(null);

const useTree = (): TreeContextProps => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTree must be used within FileTree');
  }
  return context;
};

const isFolderElement = (element: TreeViewElement): boolean => {
  if (element.type) return element.type === 'folder';
  return Array.isArray(element.children);
};

const mergeExpandedItems = (
  currentItems: string[] | undefined,
  nextItems: string[]
): string[] => [...new Set([...(currentItems ?? []), ...nextItems])];

const treeCollator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});

const defaultTreeComparator = (a: TreeViewElement, b: TreeViewElement): number => {
  const aIsFolder = isFolderElement(a);
  const bIsFolder = isFolderElement(b);
  if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
  return treeCollator.compare(a.name, b.name);
};

const getTreeComparator = (sort: TreeSortMode) => {
  if (sort === 'none') return undefined;
  if (sort === 'default') return defaultTreeComparator;
  return sort;
};

const sortTreeElements = (
  elements: TreeViewElement[],
  sort: TreeSortMode
): TreeViewElement[] => {
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

const FolderIcon = ({ open = false }: { open?: boolean }) => (
  <svg
    className="bemo-file-tree__icon"
    viewBox="0 0 24 24"
    width="16"
    height="16"
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

const FileGlyph = () => (
  <svg
    className="bemo-file-tree__icon"
    viewBox="0 0 24 24"
    width="16"
    height="16"
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

const renderTreeElements = (
  elements: TreeViewElement[],
  sort: TreeSortMode
): React.ReactNode =>
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

const TreeIndicator = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function TreeIndicator({ className = '', ...props }, ref) {
  const { direction } = useTree();
  return (
    <div
      ref={ref}
      dir={direction}
      className={['bemo-file-tree__indicator', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      {...props}
    />
  );
});

export type FolderProps = {
  value: string;
  element: string;
  isSelectable?: boolean;
  isSelect?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLLIElement>;

const Folder = forwardRef<HTMLLIElement, FolderProps>(function Folder(
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
  const isExpanded = Boolean(expandedItems?.includes(value));
  const isSelected = isSelect ?? selectedId === value;

  return (
    <li
      ref={ref}
      className="bemo-file-tree__node"
      role="treeitem"
      aria-expanded={isExpanded}
      aria-selected={isSelected && isSelectable}
      data-disabled={!isSelectable ? 'true' : undefined}
      {...props}
    >
      <button
        type="button"
        className={[
          'bemo-file-tree__trigger',
          isSelected && isSelectable ? 'bemo-file-tree__trigger--selected' : '',
          !isSelectable ? 'bemo-file-tree__trigger--disabled' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={!isSelectable}
        aria-disabled={!isSelectable}
        onClick={() => {
          if (!isSelectable) return;
          selectItem(value);
          handleExpand(value);
        }}
      >
        {isExpanded ? openIcon ?? <FolderIcon open /> : closeIcon ?? <FolderIcon />}
        <span className="bemo-file-tree__label">{element}</span>
      </button>
      <div
        className={[
          'bemo-file-tree__panel',
          isExpanded ? 'bemo-file-tree__panel--open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        hidden={!isExpanded}
      >
        {indicator ? <TreeIndicator /> : null}
        <ul className="bemo-file-tree__group" role="group" dir={direction}>
          {children}
        </ul>
      </div>
    </li>
  );
});

export type FileProps = {
  value: string;
  handleSelect?: (id: string) => void;
  isSelectable?: boolean;
  isSelect?: boolean;
  fileIcon?: ReactNode;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const File = forwardRef<HTMLButtonElement, FileProps>(function File(
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
    <li className="bemo-file-tree__node" role="none">
      <button
        ref={ref}
        type="button"
        role="treeitem"
        disabled={!isSelectable}
        aria-disabled={!isSelectable}
        aria-selected={isSelected && isSelectable}
        dir={direction}
        className={[
          'bemo-file-tree__file',
          isSelected && isSelectable ? 'bemo-file-tree__file--selected' : '',
          !isSelectable ? 'bemo-file-tree__file--disabled' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={(event) => {
          if (!isSelectable) return;
          selectItem(value);
          handleSelect?.(value);
          onClick?.(event);
        }}
        {...props}
      >
        {fileIcon ?? <FileGlyph />}
        <span className="bemo-file-tree__label">{children}</span>
      </button>
    </li>
  );
});

export type CollapseButtonProps = {
  elements?: TreeViewElement[];
  expandAll?: boolean;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CollapseButton = forwardRef<HTMLButtonElement, CollapseButtonProps>(
  function CollapseButton(
    { className = '', elements = [], expandAll = false, children, ...props },
    ref
  ) {
    const { expandedItems, setExpandedItems } = useTree();

    const expandAllTree = useCallback((treeElements: TreeViewElement[]) => {
      const expandedElementIds: string[] = [];
      const expandTree = (element: TreeViewElement) => {
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

    const hasExpanded = Boolean(expandedItems && expandedItems.length > 0);

    return (
      <button
        ref={ref}
        type="button"
        className={['bemo-file-tree__collapse', className].filter(Boolean).join(' ')}
        onClick={
          hasExpanded ? closeAll : () => setExpandedItems?.(expandAllTree(elements))
        }
        {...props}
      >
        {children ?? (hasExpanded ? 'Collapse all' : 'Expand all')}
      </button>
    );
  }
);

export type FileTreeProps = {
  initialSelectedId?: string;
  indicator?: boolean;
  elements?: TreeViewElement[];
  initialExpandedItems?: string[];
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  sort?: TreeSortMode;
  dir?: 'rtl' | 'ltr';
  children?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const FileTree = forwardRef<HTMLDivElement, FileTreeProps>(function FileTree(
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
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);
  const [expandedItems, setExpandedItems] = useState<string[] | undefined>(
    initialExpandedItems
  );

  const selectItem = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleExpand = useCallback((id: string) => {
    setExpandedItems((prev) => {
      if (prev?.includes(id)) return prev.filter((item) => item !== id);
      return [...(prev ?? []), id];
    });
  }, []);

  const expandSpecificTargetedElements = useCallback(
    (treeElements?: TreeViewElement[], selectId?: string) => {
      if (!treeElements || !selectId) return;
      const findParent = (
        currentElement: TreeViewElement,
        currentPath: string[] = []
      ) => {
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
        if (
          Array.isArray(currentElement.children) &&
          currentElement.children.length > 0
        ) {
          currentElement.children.forEach((child) => findParent(child, newPath));
        }
      };
      treeElements.forEach((element) => findParent(element));
    },
    []
  );

  useEffect(() => {
    if (initialSelectedId) {
      expandSpecificTargetedElements(elements, initialSelectedId);
    }
  }, [initialSelectedId, elements, expandSpecificTargetedElements]);

  const direction: 'rtl' | 'ltr' = dir === 'rtl' ? 'rtl' : 'ltr';
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
        className={['bemo-file-tree', className].filter(Boolean).join(' ')}
        dir={direction}
        {...props}
      >
        <div className="bemo-file-tree__scroll">
          <ul className="bemo-file-tree__root" role="tree" aria-label="File tree">
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
