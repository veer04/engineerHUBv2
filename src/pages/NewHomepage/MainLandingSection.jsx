import "./MainLandingSection.css";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";

export default function MainLandingSection() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}api/v1/featuredList`)
      .then((res) => {
        setData([
          ...res.data.data.students.map((item) => ({
            ...item,
            type: "Student",
          })),
          ...res.data.data.alumni.map((item) => ({
            ...item,
            type: "Alumni",
          })),
          ...res.data.data.clubs.map((item) => ({
            ...item,
            type: "Club",
          })),
          ...res.data.data.organizations.map((item) => ({
            ...item,
            type: "Company",
          })),
        ]);
      })
      .catch((err) => {
        setData([]);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  }, []);

  // const data = [
  //   {
  //     _id: 8,
  //     name: "Kunika Maam",
  //     type: "Student",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64f2cf6f7ef4eb43387fa371.jpg",
  //   },
  //   {
  //     _id: 4,
  //     name: "Yash Vardhan",
  //     type: "Student",
  //     image:
  //       "https://media.istockphoto.com/id/876177980/vector/university-vector.jpg?s=612x612&w=0&k=20&c=FqW7PHJFlpzTfK3ax3zPhxgTCgCnVQaPnnmTRPmdjjc=",
  //   },
  //   {
  //     _id: 2,
  //     name: "Girish Shedge",
  //     type: "Alumni",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64f2191025d4e975cdef39a6.jpg",
  //   },
  //   {
  //     _id: 6,
  //     name: "Kunwar Vidya Niwas",
  //     type: "Alumni",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64f2cf6f7ef4eb43387fa371.jpg",
  //   },
  //   {
  //     _id: 3,
  //     name: "Swapnil Raj",
  //     type: "Club",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64854cb91cb8a37947e8a090.jpg",
  //   },
  //   {
  //     _id: 7,
  //     name: "Karan Veer Singh",
  //     type: "Club",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64ae9a4d6dc6d78031fe1355.jpg",
  //   },
  //   {
  //     _id: 1,
  //     name: "Decimal",
  //     type: "Company",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/user/64ae9e736dc6d78031fe141f1696450195468.jpg",
  //   },

  //   {
  //     _id: 5,
  //     name: "Manish Rai",
  //     type: "Company",
  //     image:
  //       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/organization/64d0b565e4e4201287d09086.jpg",
  //   },
  // ];

  return (
    <section className="landing-section">
      <div className="content">
        <h1 className="splash-heading">
          One stop career solution for engineers !
        </h1>
        <h2 className="splash-subheading">
          A platform to learn with like minded people & get hired by your dream companies...
        </h2>
        <Link to="/get-featured">
          <button className="waitlist-btn">
            <FaStar className="star-svg" />
            Join the waitlist to get featured
            <IoArrowForward className="arrow-svg" />
          </button>
        </Link>
      </div>
      <div className="featured-container">
        {data?.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                id={`item-${index + 1}`}
                key={item._id}
                onClick={() =>
                  navigate(
                    `/profile/${item.profileModel.toLowerCase()}/${
                      item.profile
                    }`
                  )
                }
                className={`item feature-item vibrate-${((index + 1) % 4) + 1}`}
              >
                <div className="image">
                  <img src={item.image} alt="" />
                </div>
                <div className="details">
                  <span className="text-crop-1 overflow-hidden">
                    {item.name}
                  </span>
                  <span>{item.type}</span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
