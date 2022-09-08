import React, { useState, useEffect } from "react";
import axios from "axios";
import "../magzineandHandbook/magzineandhandbook.css";
import MCard from "./MCard";
export default function MagzineAndHandbook() {
  const [handbookData, setHandBookData] = useState([]);

  useEffect(() => {
    const getHandBookDetails = async () => {
      const response = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/handbook`
      );
      console.log(response.data);
      setHandBookData(response.data);
    };
    getHandBookDetails();
  }, []);
  return (
    <>
      <div className="container-hiring">
        <div className="heading">Magzines &amp; HandBook</div>
        <p className="texthire">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
        >
          {handbookData.map((hdb) => {
            return <MCard bookTitle={hdb.bookTitle} pdfUrl={hdb.pdfUrl} />;
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
