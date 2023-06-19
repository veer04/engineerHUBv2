import { Bucket_URL } from "../../../services/APIUtils";
import { useNavigate } from "react-router-dom";
import "./Role.css";
export default function Role() {
  const handleCardClick = (role) => {
    localStorage.setItem("role", role);
    let value;
    switch (role) {
      case "User":
        value = "User";
        break;
      case "Alumni":
        value = "Alumni";
        break;
      case "Organization":
        value = "Organization";
        break;
      case "Club":
        value = "Club";
        break;
      default:
        value = "";
    }
    localStorage.setItem("value", value);
  };
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/auth/roleselection/`;
  const studentNavigation = () => {
    handleCardClick("User");
    navigate("/student-signup");
  };
  const mentorNavigation = () => {
    handleCardClick("Alumni");
    navigate("/mentorSignup");
  };
  const clubNavigation = () => {
    handleCardClick("Club");
    navigate("/clubSignup");
  };
  const organizationNavigation = () => {
    handleCardClick("Organization");
    navigate("/organizationSignup");
  };

  const roles = [
    {
      id: 1,
      title: "Student",
      image: `${bucket}student.png`,
      description:
        "Lorem ipsum dolor sit amet consectetur. Enim sed id porttitor vivamus. Velit libero leo tincidunt id sed.",
      onClick: studentNavigation,
    },
    {
      id: 2,
      title: "Alma",
      image: `${bucket}alumni.png`,
      description:
        "Lorem ipsum dolor sit amet consectetur. Enim sed id porttitor vivamus. Velit libero leo tincidunt id sed.",
      onClick: mentorNavigation,
    },
    {
      id: 3,
      title: "Club",
      image: `${bucket}club.png`,
      description:
        "Lorem ipsum dolor sit amet consectetur. Enim sed id porttitor vivamus. Velit libero leo tincidunt id sed.",
      onClick: clubNavigation,
    },
    {
      id: 4,
      title: "Company",
      image: `${bucket}organization.png`,
      description:
        "Lorem ipsum dolor sit amet consectetur. Enim sed id porttitor vivamus. Velit libero leo tincidunt id sed.",
      onClick: organizationNavigation,
    },
  ];
  return (
    <>
      <main className="role-selection-page">
        <h1>Get Started Now</h1>
        <h2>Select for whom you have to create account for</h2>
        <section>
          {roles.map((role) => {
            return (
              <div className="role-card" key={role.id}>
                <div
                  style={{
                    backgroundImage: `url(${role.image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "var(--primary-color-green)",
                  }}
                  className="role-image"
                ></div>
                <div className="body">
                  <h2 className="title">For {role.title}</h2>
                  <p className="description text-crop-3">{role.description}</p>
                  <button onClick={role.onClick}>Create Account</button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
