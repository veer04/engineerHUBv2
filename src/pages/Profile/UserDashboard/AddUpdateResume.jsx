import React from 'react'
import "../Dashboard.css";
import "../CompanyDashboard/CompanyDashboard.css";
import "./UserDashboard.css";
import { useEffect } from "react";
import CustomSnackbar from "../../User/Login/CustomSnackbar";
import { controller, getUserProfileById, patchResume } from "../../../services/APIConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Bucket_URL } from "../../../services/APIUtils";
import { getUserRole } from "../../../features/User/UserDetails";
import LoadingPage from "../../../components/Loader/LoadingPage";
import Page404 from "../../Maintenance/Page404";
import defaultPoster from "../../../assets/defaultPoster";
const AddUpdateResume = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [resume, setResume] = useState(null);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({})
  return (
   <>
   </>
  )
}

export default AddUpdateResume