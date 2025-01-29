import React from "react";
import mail from "./mail.svg";
import phone from "./phone.svg";
import "./bookaSlot.css";

export const Frame = () => {
    return (
        <div className="frame">
            <div className="div">
                <div className="frame-wrapper">
                    <div className="div-2">
                        <div className="div-wrapper">
                            <div className="text-wrapper">Connect with us</div>
                        </div>

                        <div className="div-wrapper-2">
                            <p className="p">Let us help you to hire the best</p>
                        </div>

                        <div className="div-wrapper-2">
                            <p className="text-wrapper-2">
                                Book a slot with our TEAM or reach out to us via call/mail.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="div-3">
                    <div className="div-wrapper-3">
                        <div className="text-wrapper-3">Book a slot now</div>
                    </div>

                    <div className="div-4">
                        <div className="div-5">
                            <img className="img" alt="Phone" src={phone} />

                            <div className="div-wrapper-4">
                                <p className="element">
                                    <span className="span">83031 56089 </span>

                                    <span className="text-wrapper-4">/</span>

                                    <span className="span"> 91298 83089</span>
                                </p>
                            </div>
                        </div>

                        <div className="div-5">
                            <img className="img" alt="Mail" src={mail} />

                            <div className="div-wrapper-4">
                                <div className="text-wrapper-5">info@engineerhub.in</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
