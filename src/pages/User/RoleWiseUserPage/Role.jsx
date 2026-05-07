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
  const bucket = `${Bucket_URL}ui/banners/`;
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
      title: "Job Seekers",
      image: `${bucket}Student.png`,
      description:
        "Connect with like minded people & get hired by your dream companies",
      onClick: studentNavigation,
    },
    /*
    {
      id: 2,
      title: "Alma",
      image: `${bucket}alumni_new.png`,
      description:
        "Your juniors are waiting to connect with you. Lets create one account for them.",
      onClick: mentorNavigation,
    },*/
      /*
    {
      id: 3,
      title: "Club",
      image: `${bucket}club.png`,
      description:
        "Get you club activities reach millions. Register to have participants.",
      onClick: clubNavigation,
    },*/
    {
      id: 4,
      title: "Employer",
      image: `${bucket}employer_new.png`,
      description: "Get the right candidates, already shortlisted, within 3 days.",
      onClick: organizationNavigation,
    },
  ];
  return (
    <>
      <main className="role-selection-page">
        <h3>Let’s Get Started</h3>
        <h2>Choose your role to continue !</h2>
        <section>
          {roles.map((role) => {
            return (
              <div className="role-card" key={role.id}>
                <div
                  style={{
                    backgroundImage: `url(${role.image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    
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
