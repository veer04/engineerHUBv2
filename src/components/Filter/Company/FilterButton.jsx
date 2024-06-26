import "./FilterButton.css";

export default function FilterButton({
  title,
  iconOpened,
  iconClosed,
  counter,
  onClick,
  isOpen,
}) {
  return (
    <button
      onClick={() => onClick()}
      className="filter-button label-sm"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {title}{" "}
      {counter ? (
        <span className={`counter ${counter > 5 ? "--large-border" : ""}`}>
          {counter > 5 ? "5+" : counter}
        </span>
      ) : (
        ""
      )}{" "}
      {isOpen ? iconOpened : iconClosed}
    </button>
  );
}
