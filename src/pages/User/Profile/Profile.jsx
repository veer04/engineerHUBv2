import "./Profile.css";
import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import ProfileImg from "./profile.jpeg";
const Profile = () => {
    const [username, setUsername] = useState("");

    function getCookie(name) {
        // Get the value of a cookie by name
        const cookieValue = document.cookie.match(
          "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
        );
        return cookieValue ? cookieValue.pop() : "";
      }
      useEffect(() => {
        // Check if user is logged in by checking for the 'userName' cookie
        const storedUsername = getCookie("userName");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);
    
  return (
    <>
    <div className="profileSection">
        <div className="container ProfileHeader">
            <p className="profilHeadTxt">
                Profile Dashboard
            </p>
            <p className="profileText">
                Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Quibusdam dignissimos totam dolorum
                eligendi quis reprehenderit, illo in error unde molestias,
                illum laudantium sint deserunt repudiandae mollitia? 
                Aspernatur vel quidem possimus?
            </p>
        </div>
        <div className="container">

            <div className="row">
                <div className="col-lg-3 sideMenuLogin">

                <p className="sidemenuBarHeaderLogin">
        For Users

    </p>
    <div className="formSideMenuBar">
        <div className="sideMenuList">
        Registraions
        </div>
        <div className="sideMenuList">
        Watchlist
        </div>
        <div className="sideMenuList">
        Recently viewed
        </div>
        <div className="sideMenuList">
        Mentor Sessions
        </div>
        <div className="sideMenuList">
        Courses
        </div>
        <div className="sideMenuList">
        Liked domains
        </div>
        <div className="sideMenuList">
        Prizes/Rewards
        </div>
        <div className="sideMenuList">
       Notifications
        </div>
    </div>
    <p className="sidemenuBarHeaderLogin">
        For Organizations

    </p>
    <div className="formSideMenuBar">
    <div className="sideMenuList">
       Manage Lists
        </div>
         <div className="sideMenuList">
       My Events
        </div> 
       
    </div>
    <p className="sidemenuBarHeaderLogin">
        For Mentors

    </p>
    <div className="formSideMenuBar">
    <div className="sideMenuList">
      Mentor Profile
        </div>
    
    </div>

                </div>
                <div className="col-lg-9">
                    <div className="row">
                        <div className="col-lg-6 whiteCard">
                        <div className="row">
                            <div className="col-lg-4">
                                <img src={ProfileImg} className="profileImageSection" alt="" />
                            </div>
                            <div className="col-lg-4">

                            </div>
                            <div className="col-lg-4">
                            <div className="row">
                                Share Profile
                            </div>
                            <div className="row">
                                Edit Profile
                            </div>
                            </div>
                        </div>
                        <div className="row profileUserName">
                            {username}
                        </div>
                        <div className="row clgNameProfile">
                            College Name
                        </div>
                        <div className="row collegeName">
                        Indian Institute of Information Technology Bombay (IITB)
                        </div>
                        <div className="row EmailHeader">
                            Email ID
                        </div>
                        <div className="row emailIdProfile">
                        johndoe@gmail.com
                        </div>
                        <div className="row EmailHeader">
                           Social Links
                        </div>
                        <div className="row socialProfileIcons">
                        
                        </div>
                        </div>
                        <div className="col-lg-6 ">
                            <div className="row cardProfile1">
                               <p className="headingProfileSection"> My skilss</p> 
                                <div className="row">
                                <span className="roundedCardTxt">Frontend Development</span>
                                <span className="roundedCardTxt">MySQL</span>
                                </div>
                                <div className="row">
                                <span className="roundedCardTxt">Product Design</span>
                                <span className="roundedCardTxt">Java</span>
                                <span className="roundedCardTxt">+3 more</span>
                                </div>
                            </div>
                            <div className="row cardProfile2">
                              <p className="headingProfileSection">
                              My Certifications
                                </p>  
                                <ul>
                                    <li>
                                    Full Stack Web Development - by engineerHUB
                                    </li>
                                    <li>
                                    Full Stack Web Development - by engineerHUB
                                    </li>
                                    <li>
                                    Full Stack Web Development - by engineerHUB
                                    </li>
                                    <li>
                                    Full Stack Web Development - by engineerHUB
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
  }

export default Profile;