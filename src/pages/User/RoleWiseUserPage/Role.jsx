import { Bucket_URL } from "../../../services/APIUtils";
import { useNavigate } from "react-router-dom";
import "./Role.css";
import { changeDocumentTitle } from "../../../features/changeDocumentTitle";
export default function Role() {
  changeDocumentTitle("Select your Role | engineerHUB");
  const handleCardClick = (role) => {
    let value;
    switch (role) {
      case "User":
        value = "User";
        break;
      case "Alumni":
        value = "User";
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
    sessionStorage.setItem("role", value);
    sessionStorage.setItem("value", value);
  };
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/auth/roleselection/`;
  const studentNavigation = () => {
    handleCardClick("User");
    navigate("/signup");
  };
  const mentorNavigation = () => {
    handleCardClick("Alumni");
    navigate("/signup");
  };
  const clubNavigation = () => {
    handleCardClick("Club");
    navigate("/club-signup");
  };
  const organizationNavigation = () => {
    handleCardClick("Organization");
    navigate("/organization-signup");
  };

  const roles = [
    {
      id: 1,
      title: "Student",
      image: `${bucket}student.png`,
      description:
        "Explore, learn and apply for opportunities by just one-click.",
      onClick: studentNavigation,
    },
    {
      id: 2,
      title: "Alma",
      image: `${bucket}alumni.png`,
      description:
        "Your juniors are waiting to connect with you. Lets create one account for them.",
      onClick: mentorNavigation,
    },
    {
      id: 3,
      title: "Club",
      image: `${bucket}club.png`,
      description:
        "Get you club activities reach millions. Register to have participants.",
      onClick: clubNavigation,
    },
    {
      id: 4,
      title: "Company",
      image: `${bucket}organization.png`,
      description: "Now post for free to have quality candidates.",
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
                  <p className="description">{role.description}</p>
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
