// import React from 'react';
// import './Viewer.css';
// import cp from "../pdf/cp.pdf";

// function Viewer() {
//   return (
//     // <div>Viewer</div>
    
//     <object data={cp} type="application/pdf" className='viewer'>
//       <a href={cp} style={{color:"#002a36"}}>Download Now</a>
//   </object>
//   // </ReactPDF>
//   )
// }

// export default Viewer;

import React, {useState} from 'react'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import './Viewer.css';
import cp from "../pdf/cp.pdf";
function Viewer() {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet){
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  function changePageBack(){
    changePage(-1)
  }

  function changePageNext(){
    changePage(+1)
  }

  return (
    <div className="Viewer">
      {/* <header className="App-header">
        <Document file={cp} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height="600" pageNumber={pageNumber} />
        </Document>
        <p> Page {pageNumber} of {numPages}</p>
        { pageNumber > 1 && 
        <button onClick={changePageBack}>Previous Page</button>
        }
        {
          pageNumber < numPages &&
          <button onClick={changePageNext}>Next Page</button>
        }
      </header> */}
      <center>
        <div  className="pdff">
          <Document file={cp} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(
              new Array(numPages),
              (el,index) => (
                <Page 
                  key={`page_${index+1}`}
                  pageNumber={index+1}
                />
              )
            )}
          </Document>
        </div>
      </center>
    </div>
  );
}

export default Viewer;