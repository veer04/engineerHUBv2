import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./toggleswitch.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { toggleResume } from "../../../../store/slices/resumeToggleSlice";

const ToggleSwitch = () => {
  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.resumeToggle.isVisible);

  console.log(isChecked, "kjhgf");

  const handleToggle = () => {
    console.log("Before Dispatch:", isChecked);
    dispatch(toggleResume({ isVisible: !isChecked }));
    console.log("After Dispatch:", !isChecked);
    toast(isChecked ? "😔 Resume Hidden!" : "🥳 Resume Visible To All!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <div className="slider round"></div>
    </label>
  );
};

export default ToggleSwitch;
