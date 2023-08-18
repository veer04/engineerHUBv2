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
      setSelectedPageNavbar("home");
      window.scrollTo(0, 0);
    
    }, []);
    
    const [me, setMe] = useState({});
    const redirect=false;
    
    useEffect(() => {
      setSelectedPageNavbar("home");
      window.scrollTo(0, 0);
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://engineerhub-yash.onrender.com/api/v1/auth/details`, {
            withCredentials: true,
          });
  
          console.log(response.data);
          console.log(response.data.success);
          setMe(response.data);
  
          if (response.data.success === true ) {
            const decoded = jwt_decode(response.data.accessToken);
            const _id = decoded._id;
            Cookies.set("access_token", response.data.accessToken);
            Cookies.set("name", decoded.name);
            Cookies.set("userName", decoded.userName);
            Cookies.set("email", decoded.email);
            Cookies.set("_id", _id);
            Cookies.set("image", decoded.image);
            Cookies.set("role", decoded.role);
            Cookies.set("mobile", decoded.mobile);
            console.log(response.data);
            if(!redirect)
            navigate("/login");
            // redirect= true;
            // window.location.reload();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      setTimeout(()=>{
        fetchData();
      },2000);
  // Delay in milliseconds (1-2 seconds)
  
    }, []);


  return (
    <div style={{
        textAlign:"center",
    }}>
        
        If logged in successfully u will be redirect

    </div>
  )
}

export default Success