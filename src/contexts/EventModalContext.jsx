import { createContext } from "react";
import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import Modal from "../components/EventModal/Modal";
import { MdCancel } from "react-icons/md";

export const EventModalContext = createContext();

export const EventModalProvider = ({ children }) => {
  const [isEventOpen, setIsEventOpen] = useState(true);
  const [eventOpened, setEventOpened] = useState(undefined);

  function handleOpen() {
    setIsEventOpen(true);
  }

  function handleClose() {
    setIsEventOpen(false);
  }

  // useEffect(() => {
  //   console.log(isEventOpen);
  // }, [isEventOpen]);

  // useEffect(() => {
  //   document.body.classList.add("overflow-hidden");

  //   isEventOpen &&
  //     ReactDOM.createRoot(document.getElementById("event-modal")).render(
  //       <div id="event-modal-container">
  //         <div className="event-modal">
  //           <div className="close-btn">
  //             <div
  //               onClick={() => {
  //                 console.log("close clicked");
  //                 console.log(handleClose);
  //                 handleClose();
  //               }}
  //             >
  //               <MdCancel />
  //             </div>
  //           </div>
  //           <div className="event-type">
  //             <div>Podcast</div>
  //           </div>
  //           <div className="event-title">
  //             <div>ALL IT TAKES IS $1</div>
  //           </div>
  //           <div className="tags">
  //             <div>Investing</div>
  //             <div>Money</div>
  //             <div>General</div>
  //             <div>Company Event</div>
  //           </div>
  //           <div className="event-description">
  //             <div>
  //               Master DSA by building 100 projects in 100 days. Learn data
  //               science, automation, build websites, games and apps!
  //             </div>
  //           </div>
  //           <div className="divider"></div>
  //           <div className="event-data">
  //             <div className="poster-container">
  //               <div>Event Poster</div>
  //               <img src="https://source.unsplash.com/random" alt="" />
  //             </div>
  //             <div className="features-container">
  //               <div>Key Features</div>
  //               <div className="features">
  //                 <ul>
  //                   <li>
  //                     Master DSA by building 100 projects in 100 days. Learn
  //                     data science, automation, build websites, games and apps!
  //                   </li>
  //                   <li>
  //                     Master DSA by building 100 projects in 100 days. Learn
  //                     data science, automation, build websites, games and apps!
  //                   </li>
  //                 </ul>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="details-container">
  //             <div className="details">
  //               <div>Logistics</div>
  //               <div>Sunday / 31st July / 06:00 PM</div>
  //             </div>
  //             <div onClick={() => handleClose()} className="link">
  //               Event Link
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );

  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // }, []);

  return (
    <EventModalContext.Provider
      value={{ isEventOpen, setIsEventOpen, eventOpened, setEventOpened }}
    >
      {children}
    </EventModalContext.Provider>
  );
};
