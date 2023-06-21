import React from "react";
import "./SidebarItem.css";
import classNames from "classnames";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SidebarItem({
  path,
  setSelectedItem,
  isCollapsed,
  selectedItem,
  domainId,
  svg,
  title,
  link,
}) {
  const sidebarItemClass = classNames("sidebar__item", {
    "sidebar__item--active": selectedItem === link,
    "sidebar__item--collapsed": isCollapsed,
  });

  const sidebarItemSvgClass = classNames("sidebar__item__svg", {
    "sidebar__item__svg--active": selectedItem === link && isCollapsed,
    "sidebar__item__svg--collapsed": isCollapsed,
  });

  function handleClick() {
    setSelectedItem(link);
  }

  const { id } = useParams();
  if(title === "PROJECT IDEAS")
  return (
    <Link to={`https://discord.com/invite/ZMZAEZ5NfA`}>
      <div onClick={() => handleClick()} className={sidebarItemClass}>
        <div className={sidebarItemSvgClass}>{svg}</div>
        {!isCollapsed && title}
      </div>
    </Link>
  )
  else

  return (
    <Link to={`/community/${link}/${encodeURIComponent(id)}`}>
      <div onClick={() => handleClick()} className={sidebarItemClass}>
        <div className={sidebarItemSvgClass}>{svg}</div>
        {!isCollapsed && title}
      </div>
    </Link>
  );
}
