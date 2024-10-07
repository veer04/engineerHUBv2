import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdsenseComp = () => {
  const location = useLocation();
  
  useEffect(() => {
    const url = `${location.pathname}${location.search}`;
    console.log(url);

    const scriptElement = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8474972598474156"]`
    );

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          console.log("pushing ads");
          window.adsbygoogle.push({});
        } else {
          scriptElement.addEventListener("load", handleScriptLoad);
          console.log("waiting until adsense lib is loaded");
        }
      } catch (error) {
        console.log("error in adsense", error);
      }
    };

    handleScriptLoad();

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener("load", handleScriptLoad);
      }
    };
  }, [location.pathname, location.search]);

  return (
    <div style={{ overflow: "hidden", margin: "5px", width: "100%" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        width="300px"
        data-ad-layout-key="-ff-x+8-eb+f5"
        data-ad-client="ca-pub-8474972598474156"
        data-ad-slot="2127277024"
      ></ins>
    </div>
  );
};

export default AdsenseComp;
