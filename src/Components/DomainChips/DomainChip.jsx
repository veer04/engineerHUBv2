import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import "./DomainChip.css";

export default function DomainChips({
  children,
  to,
  orange,
  red,
  green,
  ...rest
}) {
  const classes = classNames(rest.className, "domain-chip", "text-dark-green", {
    "domain-orange": orange,
    "domain-red": red,
    "domain-green": green,
  });

  return (
    <Link to={to} className={classes}>
      <div {...rest}>{children}</div>
    </Link>
  );
}

DomainChips.propTypes = {
  checkTypeValue: ({ orange, red, green }) => {
    const count = Number(!!orange) + Number(!!red) + Number(!!green);
    if (count > 1) {
      return new Error("Only one of orange, red, green can be true ");
    }
  },
};
