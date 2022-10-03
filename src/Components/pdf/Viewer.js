import React from 'react';
import './Viewer.css';
import cp from "../pdf/cp.pdf";

function Viewer() {
  return (
    // <div>Viewer</div>
    
    <object data={cp} type="application/pdf" className='viewer'>
      <a href={cp} style={{color:"#002a36"}}>Download Now</a>
  </object>
  // </ReactPDF>
  )
}

export default Viewer;