import "../Login/login.css";
import { Link,useNavigate } from "react-router-dom";
import google from "../Login/svg/google.svg";
// import fb from "./svg/fb.svg";
import "./Modal.css";
import Ehub from "../Login/svg/Ehub.svg";
const Modal = ({closeModal}) => {
  const Navigate =useNavigate();
  return (
<div className="modalBackground">
<div className="modalContainer">
<div className="cont containerModal">
    <div class="modal-form" onClick={()=> Navigate("/courses")}>
	<span class="close-btn"></span>
</div>
      <div className="cont-head">
        <img src={Ehub} alt="Ehub" className='imageEhubmain'/>
        <div className="my-form-head modalheadt">Let's you in</div>
      </div>

      <div className="sign-field signfieldModal">
        <div className="sign-opt ">
          <img src={google} alt="google" />
          Continue with Google
        </div>
        {/* <div className="sign-opt ">
          <img src={fb} alt="Facebook" />
          Continue with Facebook
        </div> */}
      </div>
      <div className="divisor d-flex justify-content-center">
        <hr style={{ color: "#6c757d" }} />
        <span className="d-flex justify-content-center">OR</span>
        <hr />
      </div>
      <div className="my-form myLowerform">
        <div className="form-opt form-optmodal">
          <Link to="/register" className="my-btn si siModal">Sign in with Password</Link>
          <div className="my-item-cont">
            <div>Didn't have an account?</div>
            <Link to="/signup" className="f-p ">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
</div>
</div>
  )
}

export default Modal