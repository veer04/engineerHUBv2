export default function FilterButton({
  title,
  iconOpened,
  iconClosed,
  correspondingModal,
  isOpen,
  setIsOpen,
}) {
  return (
    <button
      onClick={() =>
        setIsOpen((prev) => {
          // close all and toggle the correspondingModal
          const newState = {};
          for (const key in prev) {
            newState[key] = false;
          }
          return {
            ...newState,
            [correspondingModal]: !prev[correspondingModal],
          };
        })
      }
      className="filter-btn label-sm"
    >
      {title} {isOpen ? iconOpened : iconClosed}
    </button>
  );
}
