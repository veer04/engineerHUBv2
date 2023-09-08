import { useState, useEffect } from "react";
import "../Dashboard.css"; // !import this file first
import "../EditProfile.css"; // !import this file second
import "./CompanyEditProfile.css";
import { IoIosArrowBack } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanyEditProfile() {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const options = ["Basic Information"];
  const [chosenOption, setChosenOption] = useState(options[0]);

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  const renderOption1 = (
    <>
      <section className="box">
        <p className="heading">COMPANY PROFILE PICTURE</p>
        <div>
          <div className="logo">
            <img
              src="https://via.placeholder.com/150"
              loading="lazy"
              alt="logo"
            />
          </div>
          <div className="buttons">
            <button>Upload new Picture</button>
            <button>Delete</button>
            <p className="alert-text">
              *Note Image size must be not more than 100kb
            </p>
          </div>
        </div>
      </section>
      <section className="box">
        <p className="heading">BASIC INFORMATION</p>
        <label className="label">
          Sample Text Field for Strings<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your String"
        />
        <label className="label" draggable>
          Sample Text Area for Long Description
          <span className="required">*</span>
        </label>
        <textarea
          name="about"
          id="about"
          className="input-field"
          rows={5}
          placeholder="Enter your long Description here"
        />
        <label className="label">
          Sample Text Field for Number<span className="required">*</span>
        </label>
        <input
          type="number"
          className="input-field"
          placeholder="Enter your Number"
        />
        <label className="label">
          Sample Dropdown<span className="required">*</span>
        </label>
        <select className="input-field">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="sigma">Sigma</option>
          <option value="alpha">Giga Chad</option>
        </select>
        {/* <label className="label">
          Sample Datalist<span className="required">*</span>
        </label>
        <input
          className="input-field"
          list="browsers"
          name="browser"
          id="browser"
        />
        <datalist id="browsers">
          <option value="Edge"></option>
          <option value="Firefox"></option>
          <option value="Chrome"></option>
          <option value="Opera"></option>
          <option value="Safari"></option>
        </datalist> */}
        <label className="label">
          Sample Calendar<span className="required">*</span>
        </label>
        <input
          type="date"
          className="input-field"
          placeholder="Enter your Organization / Company Name"
        />
        <label className="label">
          Organization / Company Name<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Organization / Company Name"
        />
        <label className="label">
          Organization / Company Sub-heading<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Organization / Company Sub-heading"
        />
        <label className="label">
          Organization / Company Type<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Organization / Company Type"
        />
        <label className="label">
          Organization / Company Website<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Organization / Company Website"
        />
        <label className="label">
          Location<span className="required">*</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your Location"
        />
      </section>
      <section className="box">
        <p className="heading">ABOUT US</p>
        <label className="label">
          About<span className="required">*</span>
        </label>
        <textarea
          name="about"
          id="about"
          className="input-field"
          rows={5}
          placeholder="Describe about your Organization / Company"
        />
      </section>
      <button className="update-btn">Update Details</button>
    </>
  );

  return (
    <main className="edit-profile profile-dashboard">
      <h1 className="title">Edit Profile</h1>
      <h2 className="subheading">
        Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus
        platea feugiat odio.
      </h2>
      <div>
        <aside>
          <div className="options">
            {options.map((option) => (
              <button
                className={`option ${
                  chosenOption === option ? "--is-selected" : ""
                }`}
                key={option}
                onClick={() => setChosenOption(option)}
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate(`/profile/organization/${organizationId}`)}
            className="back-btn"
          >
            <IoIosArrowBack /> <span>Back to Profile</span>
          </button>
          <button className="logout-button">
            <CgLogOut /> <span>Logout</span>
          </button>
        </aside>
        <div>{chosenOption === options[0] && renderOption1}</div>
      </div>
    </main>
  );
}
