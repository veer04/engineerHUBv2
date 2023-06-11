// import React, { useState, useEffect } from "react";
// import "./ProfilePage.css";
// import defaultPoster from "../../../../assets/defaultPoster";
// import SimpleInputField from "../../../../components/SimpleInputField/SimpleInputField";
// import useNavbar from "../../../../hooks/use-navbar";
// import { Outlet, useNavigate, useParams } from "react-router-dom";
// import LoadingPage from "../../../../components/Loader/LoadingPage";
// import { set } from "react-hook-form";
// import { handleLogout } from "../../../../features/logout";
// import { controller, getUserProfileById } from "../../../../services/APIConfig";

// export default function ProfilePage() {
//   const { userId } = useParams();
//   const [profile, setProfile] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     // window.scrollTo(0, 0);
//     setSelectedPageNavbar("profile");
//     getUserProfileById(setProfile, userId);

//     return () => {
//       controller.abort();
//     };
//   }, [userId]);

//   useEffect(() => {
//     if (Object.keys(profile).length !== 0) {
//       setIsLoading(false);
//     }
//   });

//   const { setSelectedPageNavbar } = useNavbar();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [campus, setCampus] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [image, setImage] = useState("");
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
//   const [verifiedByEhub, setVerifiedByEhub] = useState(false);
//   const [branch, setBranch] = useState("");
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [role, setRole] = useState("");
//   const [socialMediaLinks, setSocialMediaLinks] = useState({
//     instagram: "",
//     linkedin: "",
//   });
//   const [techStack, setTechStack] = useState([]);

//   useEffect(() => {
//     console.log(profile);
//     if (Object.keys(profile).length !== 0) {
//       setIsLoading(false);
//       setName(profile.name);
//       setUserName(profile.userName);
//       setCampus(() => {
//         if (profile.institutionName?.collegeName === undefined)
//           return "Not Available";
//         else return profile.institutionName?.collegeName;
//       });

//       setEmail(profile.email);
//       setPhoneNumber(profile.mobile);
//       setImage(profile.image);
//       setBranch(profile.branch);
//       setCountry(profile.country);
//       setState(profile.state);
//       setCity(profile.city);
//       setRole(profile.role);
//       setIsEmailVerified(profile.isVerified);
//       // setIsPhoneNumberVerified(profile.verifiedByEhub);
//       setVerifiedByEhub(profile.verifiedByEhub);
//       setSocialMediaLinks({
//         instagram: profile.socialMedia?.instagram,
//         linkedin: profile.socialMedia?.linkedin,
//       });
//       setTechStack(profile.techStack);
//     }
//   }, [profile]);

//   const profilePage = (
//     <main className="profile-page">
//       <header className="heading-3">Profile</header>
//       <section>
//         <aside className="options-container">
//           <button className="option --is-selected">User Profile</button>
//           <button className="option">Edit Profile</button>
//           <button className="option">Change Address</button>
//           <button className="option">Social Media Links</button>
//           <button className="option">Tech Stack</button>
//         </aside>
//         <div className="details-container">
//           <p>Profile Picture</p>
//           <div>
//             <div
//               style={{
//                 backgroundImage: `url(${image ? image : defaultPoster})`,
//               }}
//               className="profile-picture"
//             ></div>
//           </div>
//           <p>Name</p>
//           <SimpleInputField
//             name="Name"
//             value={name}
//             setValue={setName}
//             disabled
//           />
//           <div className="verifiable-fields">
//             <div>
//               <p>Email ID</p>
//               <SimpleInputField
//                 name="Email"
//                 value={email}
//                 setValue={setEmail}
//                 disabled
//               />
//             </div>
//             <div>
//               <button
//                 className={`verification-btn ${
//                   isEmailVerified ? "--is-verified" : ""
//                 }`}
//               >
//                 {isEmailVerified ? "Verified" : "Verify"}
//               </button>
//             </div>
//           </div>
//           <div className="verifiable-fields">
//             <div>
//               <p>Phone Number</p>
//               <SimpleInputField
//                 name="Phone Number"
//                 value={phoneNumber}
//                 setValue={setPhoneNumber}
//                 disabled
//               />
//             </div>
//             <div>
//               <button
//                 className={`verification-btn ${
//                   isPhoneNumberVerified ? "--is-verified" : ""
//                 }`}
//               >
//                 {isPhoneNumberVerified ? "Verified" : "Verify"}
//               </button>
//             </div>
//           </div>
//           <p>Campus</p>
//           <SimpleInputField
//             name="Campus"
//             value={campus}
//             setValue={setCampus}
//             disabled
//           />
//           <p>Branch</p>
//           <SimpleInputField
//             name="Branch"
//             value={branch}
//             setValue={setBranch}
//             disabled
//           />
//           <p>Country</p>
//           <SimpleInputField
//             name="Branch"
//             value={country}
//             setValue={set}
//             disabled
//           />
//           <p>State</p>
//           <SimpleInputField
//             name="Branch"
//             value={state}
//             setValue={setState}
//             disabled
//           />
//           <p>City</p>
//           <SimpleInputField
//             name="Branch"
//             value={city}
//             setValue={setCity}
//             disabled
//           />
//           <button
//             className="logBtn logout-btn"
//             style={{
//               textAlign: "center",
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </section>
//     </main>
//   );

//   return isLoading ? <LoadingPage /> : profilePage;
// }
