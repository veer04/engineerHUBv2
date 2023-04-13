import React from "react";
import "./CategoryBar.css";
import classNames from "classnames";

export default function CategoryBar({
  className,
  categories,
  current,
  setCurrent,
  ...rest
}) {
  const renderedCategories = categories.map((category) => {
    const classes = classNames(
      "category",
      category.id === current && "category-active"
    );
    return (
      <div
        key={category.id}
        className={classes}
        onClick={() => {
          setCurrent(category.id);
        }}
      >
        {category.title}
      </div>
    );
  });

  return (
    <div {...rest} className={`category-bar ${className}`}>
      {renderedCategories}
    </div>
  );
}
