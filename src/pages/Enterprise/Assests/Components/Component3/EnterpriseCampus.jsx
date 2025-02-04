import React from "react";
import bharatiVidyapeethLogo1 from "./bharati_vidyapeeth_logo_1.png";
import "./EnterpriseCampus.css";
import th1 from "./th-1.png";
import th2 from "./th-1.png";

export const EnterpriseCampus = () => {
    return (
        <div className="frameCampusEntr">
            <div className="frameCampusEntr-wrapper">
                <div className="div-wrapper">
                    <div className="div">
                        <div className="div-wrapper-2">
                            <div className="text-wrapper">Our Campuses</div>
                        </div>

                        <div className="div-wrapper-2">
                            <p className="p">
                                We have engineers from 1950+ colleges across India
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="frameCampusEntr-wrapper">
                <div className="div-2">
                    <div className="container">
                        <div className="bits-min-png" />

                        <div className="text-wrapper-2">BITS Pilani</div>
                    </div>

                    <div className="container">
                        <img className="th" alt="Th" src={th1} />

                        <div className="text-wrapper-2">IIT Bombay</div>
                    </div>

                    <div className="container-2">
                        <div className="iimcal-min-webp">
                            <img className="img" alt="Th" src={th2} />
                        </div>

                        <div className="text-wrapper-2">IIT Madras</div>
                    </div>

                    <div className="container">
                        <div className="vnit-logo-webp" />

                        <div className="text-wrapper-2">VNIT, Nagpur</div>
                    </div>

                    <div className="container">
                        <div className="srm-logo-webp" />

                        <div className="text-wrapper-2">SRM University</div>
                    </div>

                    <div className="container">
                        <div className="nmims-min-png" />

                        <div className="text-wrapper-2">NMIMS</div>
                    </div>

                    <div className="container">
                        <div className="spjain-min-webp">
                            <img
                                className="bharati-vidyapeeth"
                                alt="Bharati vidyapeeth"
                                src={bharatiVidyapeethLogo1}
                            />
                        </div>

                        <div className="text-wrapper-2">Bharati Vidyapeeth</div>
                    </div>

                    <div className="container">
                        <div className="bml-munjal-min-png" />

                        <div className="text-wrapper-2">BML</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
