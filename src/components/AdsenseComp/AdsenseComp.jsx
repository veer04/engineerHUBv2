
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdsenseComp = ({ adSlot }) => {
  const location = useLocation();

  useEffect(() => {
    const scriptSrc = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8474972598474156";

    let scriptElement = document.querySelector(`script[src="${scriptSrc}"]`);

    const addScript = () => {
      scriptElement = document.createElement("script");
      scriptElement.src = scriptSrc;
      scriptElement.async = true;
      scriptElement.crossOrigin = "anonymous";
      document.head.appendChild(scriptElement);
    };

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.error("Adsense error:", error);
      }
    };

    if (!scriptElement) {
      addScript();
    }

    scriptElement?.addEventListener("load", handleScriptLoad);
    handleScriptLoad();

    return () => {
      scriptElement?.removeEventListener("load", handleScriptLoad);
    };
  }, [location.pathname, location.search]);

  return (
    <div style={{ overflow: "hidden", margin: "10px auto", width: "100%", display: "flex", justifyContent: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", maxWidth: "970px", height: "auto" }}
        data-ad-client="ca-pub-8474972598474156"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdsenseComp;


{/* import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdsenseComp = () => {
  const location = useLocation();
  
  useEffect(() => {
    const url = `${location.pathname}${location.search}`;
    // console.log(url);

    const scriptElement = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8474972598474156"]`
    );

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          // console.log("pushing ads");
          window.adsbygoogle.push({});
        } else {
          scriptElement.addEventListener("load", handleScriptLoad);
          console.log("waiting until adsense lib is loaded");
        }
      } catch (error) {
        // console.log("error in adsense", error);
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



import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdsenseComp = () => {
  const location = useLocation();

  useEffect(() => {
    const url = `${location.pathname}${location.search}`;
    let scriptElement = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8474972598474156"]`
    );

    const addScript = () => {
      scriptElement = document.createElement("script");
      scriptElement.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8474972598474156";
      scriptElement.async = true;
      scriptElement.crossOrigin = "anonymous";
      document.head.appendChild(scriptElement);
    };

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.error("Adsense error:", error);
      }
    };

    if (!scriptElement) {
      addScript();
    }

    scriptElement?.addEventListener("load", handleScriptLoad);
    handleScriptLoad();

    return () => {
      scriptElement?.removeEventListener("load", handleScriptLoad);
    };
  }, [location.pathname, location.search]);

  return (
    <div style={{ overflow: "hidden", margin: "10px auto", width: "100%", display: "flex", justifyContent: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", maxWidth: "970px", height: "auto" }}
        data-ad-client="ca-pub-8474972598474156"
        data-ad-slot= {adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdsenseComp;

*/}