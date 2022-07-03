import React from 'react';
import './freecourses.css';



function Card(props) {
    const { image,  heading, link, text, date } = props

    return (

        <>
            <div className="card">
                <div className="inner-card">
                    <img
                        src={image}
                        className="card-img-left card-img img-fluid" />
                    <div className="cardForImg">
                        <div className="section1">
                            <h6 className="card-title-small">
                                {heading}
                            </h6>
                            <div className="right_side">
                                <div className="views">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 576 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" /></svg>
                                    <span>
                                        1000
                                    </span>
                                </div>
                                <a href={link} className="btn btn-second">
                                    Free
                                </a>
                            </div>
                        </div>
                        <p className="small_text">
                            {text}
                        </p>
                    </div>
                </div>




                <div className="card-body">
                    <h5 className="card-title">
                        {heading}
                        <a className="share-icon" href={link}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 448 512"><path d="M448 127.1C448 181 405 223.1 352 223.1C326.1 223.1 302.6 213.8 285.4 197.1L191.3 244.1C191.8 248 191.1 251.1 191.1 256C191.1 260 191.8 263.1 191.3 267.9L285.4 314.9C302.6 298.2 326.1 288 352 288C405 288 448 330.1 448 384C448 437 405 480 352 480C298.1 480 256 437 256 384C256 379.1 256.2 376 256.7 372.1L162.6 325.1C145.4 341.8 121.9 352 96 352C42.98 352 0 309 0 256C0 202.1 42.98 160 96 160C121.9 160 145.4 170.2 162.6 186.9L256.7 139.9C256.2 135.1 256 132 256 128C256 74.98 298.1 32 352 32C405 32 448 74.98 448 128L448 127.1zM95.1 287.1C113.7 287.1 127.1 273.7 127.1 255.1C127.1 238.3 113.7 223.1 95.1 223.1C78.33 223.1 63.1 238.3 63.1 255.1C63.1 273.7 78.33 287.1 95.1 287.1zM352 95.1C334.3 95.1 320 110.3 320 127.1C320 145.7 334.3 159.1 352 159.1C369.7 159.1 384 145.7 384 127.1C384 110.3 369.7 95.1 352 95.1zM352 416C369.7 416 384 401.7 384 384C384 366.3 369.7 352 352 352C334.3 352 320 366.3 320 384C320 401.7 334.3 416 352 416z" /></svg>
                        </a>
                    </h5>
                    <p className="card-text"> 
                        {text}
                    </p>

                    <div className="btn-container">
                        <a href={link} className="btn btn-primary">
                            Register
                        </a>
                        <p className="card-date">
                            {date}
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Card