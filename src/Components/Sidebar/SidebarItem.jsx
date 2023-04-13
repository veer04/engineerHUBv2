import React from "react";
import "./SidebarItem.css";
import classNames from "classnames";

export default function SidebarItem({
  setSelectedItem,
  isCollapsed,
  selectedItem,
  id,
  svg,
  title,
}) {
  const sidebarItemClass = classNames("sidebar__item", {
    "sidebar__item--active": selectedItem === id,
    "sidebar__item--collapsed": isCollapsed,
  });

  const sidebarItemSvgClass = classNames("sidebar__item__svg", {
    "sidebar__item__svg--active": selectedItem === id && isCollapsed,
    "sidebar__item__svg--collapsed": isCollapsed,
  });

  return (
    <div onClick={() => setSelectedItem(id)} className={sidebarItemClass}>
      <div className={sidebarItemSvgClass}>{svg}</div>
      {!isCollapsed && title}
    </div>
  );
}
