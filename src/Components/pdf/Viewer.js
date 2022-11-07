import React, {useState} from 'react'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import './Viewer.css';
import cp from "../pdf/cp.pdf";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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