import React from 'react'
import jwt_decode from "jwt-decode";
import { useEffect ,useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useNavbar from "../../hooks/use-navbar";
import { API_URL,API_URLT } from "../../services/APIUtils";
const Success = () => {

    const navigate=useNavigate();
    const { setSelectedPageNavbar } = useNavbar();
    useEffect(() => {
      document.title = "Redirecting | engineerHUB";
      setSelectedPageNavbar("home");
      window.scrollTo(0, 0);
    
    }, []);
    
    const [me, setMe] = useState({});
    // const redirect=false;
    
    useEffect(() => {
      setSelectedPageNavbar("home");
      window.scrollTo(0, 0);
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URLT}api/v1/auth/details`, {
            withCredentials: true,
          });
  
          console.log(response.data);
          console.log(response.data.success);
          setMe(response.data);
  
          if (response.data.success === true ) {
            const decoded = jwt_decode(response.data.accessToken);
            const _id = decoded._id;
            const firstName = decoded.firstName;
            console.log(decoded);
            const lastName = decoded.lastName;
            // const chatDomain=JSON.stringfy(decoded.chatDomain);
            const name = firstName.concat(" ", lastName);
            Cookies.set("access_token", response.data.accessToken, { expires: 400 });
            Cookies.set("name", name, { expires: 400 });
            Cookies.set("firstName", firstName, { expires: 400 });
            Cookies.set("lastName", lastName, { expires: 400 });

            Cookies.set("userName", decoded.userName, { expires: 400 });
            Cookies.set("email", decoded.email, { expires: 400 });
            Cookies.set("_id", _id, { expires: 400 });
            Cookies.set("image", decoded.image, { expires: 400 });
            Cookies.set("role", decoded.role, { expires: 400 });
            Cookies.set("mobile", decoded.mobile, { expires: 400 });
            Cookies.set("chatDomain", JSON.stringify(decoded.chatDomain), { expires: 400 });
            console.log(response.data);
            if (sessionStorage.getItem("redirectToAuth") === "true") {
              sessionStorage.removeItem("redirectToAuth");
              window.location.href =
                sessionStorage.getItem("redirectToAuthLink");
              // navigate(sessionStorage.getItem("redirectToAuthLink"));
              sessionStorage.removeItem("redirectToAuthLink");
            } else window.location.href = `/profile/user/${_id}`;
            // if(!redirect)
            // window.location.href=`/profile/user/${_id}`;
            // navigate(`/profile/user/${_id}`);
            // window.location.reload();
            // redirect= true;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      setTimeout(()=>{
        fetchData();
      },1000);
  // Delay in milliseconds (1-2 seconds)
  
    }, []);


  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "600",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "-4rem",
        }}
      >
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>
          You’re being redirected to an another page, This may take few seconds
        </div>
      </div>
    </main>
  );
}

export default Success