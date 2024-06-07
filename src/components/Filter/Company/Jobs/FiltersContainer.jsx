import "./FiltersContainer.css";
import FilterButton from "./FilterButton";
import { MdFilterList } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ExperienceContainer from "./ExperienceContainer";
import JobTypeContainer from "./JobTypeContainer";
import JobModeContainer from "./JobModeContainer";
import LocationContainer from "./LocationContainer";

export default function FiltersContainer() {
  const [openModal, setOpenModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
    modal6: false,
  });

  useEffect(() => {
    const handleClick = (e) => {
      // if the click is outside filters-container then close all modals
      if (!document.querySelector(".filters-container").contains(e.target)) {
        setOpenModal({
          modal1: false,
          modal2: false,
          modal3: false,
          modal4: false,
          modal5: false,
          modal6: false,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <aside className="filters-container">
      <div className="filters-btn-container">
        <FilterButton
          title="Filters"
          iconOpened={<MdFilterList />}
          iconClosed={<MdFilterList />}
          correspondingModal="modal1"
          isOpen={openModal.modal1}
          setIsOpen={setOpenModal}
        />
        <FilterButton
          title="Recently Posted"
          iconOpened={<></>}
          iconClosed={<></>}
          correspondingModal="modal2"
          isOpen={openModal.modal2}
          setIsOpen={setOpenModal}
        />
        <FilterButton
          title="Experience"
          iconOpened={<IoIosArrowUp />}
          iconClosed={<IoIosArrowDown />}
          correspondingModal="modal3"
          isOpen={openModal.modal3}
          setIsOpen={setOpenModal}
        />
        <FilterButton
          title="Job Type"
          iconOpened={<IoIosArrowUp />}
          iconClosed={<IoIosArrowDown />}
          correspondingModal="modal4"
          isOpen={openModal.modal4}
          setIsOpen={setOpenModal}
        />
        <FilterButton
          title="Job Mode"
          iconOpened={<IoIosArrowUp />}
          iconClosed={<IoIosArrowDown />}
          correspondingModal="modal5"
          isOpen={openModal.modal5}
          setIsOpen={setOpenModal}
        />
        <FilterButton
          title="Location"
          iconOpened={<IoIosArrowUp />}
          iconClosed={<IoIosArrowDown />}
          correspondingModal="modal6"
          isOpen={openModal.modal6}
          setIsOpen={setOpenModal}
        />
      </div>
      <ExperienceContainer
        correspondingModal="modal3"
        isOpen={openModal.modal3}
        setIsOpen={setOpenModal}
      />
      <JobTypeContainer
        correspondingModal="modal4"
        isOpen={openModal.modal4}
        setIsOpen={setOpenModal}
      />
      <JobModeContainer
        correspondingModal="modal5"
        isOpen={openModal.modal5}
        setIsOpen={setOpenModal}
      />
      <LocationContainer
        correspondingModal="modal6"
        isOpen={openModal.modal6}
        setIsOpen={setOpenModal}
      />
    </aside>
  );
}
