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

     response.data[0]['cardImage'] =  `.${__dirname}Images/python.jpg` ;
     response.data[1]['cardImage'] =  `.${__dirname}Images/cpp.jpg` ;
     response.data[2]['cardImage'] =  `.${__dirname}Images/appdev.jpeg` ;
     response.data[3]['cardImage'] =  `.${__dirname}Images/cyber.jpg` ;


      setHandBookData(response.data);
    };
    getHandBookDetails();
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
          {handbookData.map((hdb) => {
            return <MCard bookTitle={hdb.bookTitle} pdfUrl={hdb.pdfUrl} cardImage={hdb.cardImage} />;
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
