type Props = {
  children: React.ReactNode;
  menuItems: JSX.Element[];
};

/**
 * ドロップダウンの中身
 * childrenで受け取った要素がボタン、menuItemsで受け取った要素がドロップダウンの中身になる
 * @returns summary & ul > li
 */
export const DropdownItem = ({ children, menuItems }: Props) => (
  <>
    <summary className="flex cursor-pointer items-center justify-center">
      {children}
    </summary>
    <ul className="menu dropdown-content menu-lg absolute right-0 z-50 mt-3 rounded-box bg-base-100 p-2 shadow md:menu-md [&>li>*]:whitespace-nowrap">
      {menuItems.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </>
);
