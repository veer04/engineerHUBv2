import React, { useState, useEffect } from "react";

import { cancelToken, getHandBook } from "../../services/APIConfig";

import "../magzineandHandbook/magzineandhandbook.css";
import MCard from "./MCard";

export default function MagzineAndHandbook() {
  const [handbookData, setHandBookData] = useState([]);

  useEffect(() => {
    getHandBook(setHandBookData);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <>
      <div className="container-hiring">
        <div className="heading">Magzines &amp; HandBook</div>
        <p className="texthire">
          Engineerhub issues various magazines & handbooks regularly that
          contribute to expanding knowledge for the benefit of students.
        </p>

        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
        >
          {handbookData.reverse().map((hdb) => {
            return (
              <MCard
                bookTitle={hdb.bookTitle}
                pdfUrl={hdb.pdfUrl}
                description={hdb.description}
                img={hdb.bookimgUrl}
              />
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
