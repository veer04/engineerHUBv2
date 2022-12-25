import React, {useState} from 'react'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import './Viewer.css';
function Viewer({pdfUrl}) {

  const [numPages, setNumPages] = useState(null);


  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
   
  }

 
 


  return (
    <div className="Viewer">
      {/* <header className="App-header">
        <Document file={cp} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height="800" pageNumber={pageNumber} />
        </Document>
        <div className='d-flex mt-2'>
        { pageNumber > 1 && 
        <button onClick={changePageBack} className="arrow-btn"><KeyboardArrowLeftIcon /></button>
        }
        <p> Page {pageNumber} of {numPages}</p>
        {
          pageNumber < numPages &&
          <button onClick={changePageNext} className="arrow-btn"><KeyboardArrowRightIcon /></button>
        }
        </div>
      </header> */}
      <center>
        <div  className="pdff" style={{backgroundColor: "#282c34"}}>
          <Document file="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/pdf/cp.pdf" onLoadSuccess={onDocumentLoadSuccess}>
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