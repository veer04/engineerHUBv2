import React from 'react';
import './Viewer.css';
import cp from "../pdf/cp.pdf";

function Viewer() {
  return (
    // <div>Viewer</div>
    <object data={cp} type="application/pdf" className='viewer'>
      <p>Alternative text - include a link <a href={cp}>to the PDF!</a></p>
  </object>
  )
}

export default Viewer