import { useNavigate, useParams } from "react-router-dom";
import "./NewSidebarMobile.css";
import { RiChat3Line } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { BsJournalBookmark } from "react-icons/bs";
import useSidebar from "../../hooks/use-sidebar";
import { useScrollDirection } from "../../features/scrollDirection";

export default function NewSidebarMobile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedItem, setSelectedItem } = useSidebar();

  return (
    <div
      style={{
        height: useScrollDirection() === "down" ? 0 : "66.55px",
        transition: "height 0.2s ease-in-out",
        padding: useScrollDirection() === "down" ? "0 .5rem" : "0.75rem 0.5rem",
      }}
      id="new-community-sidebar-mobile"
      className="options"
    >
      <div
        style={{
          color: selectedItem === "chat" ? "#FFD600" : "#b0b0b0",
        }}
        onClick={() => {
          navigate(`/community/chat/${encodeURIComponent(id)}`);
          setSelectedItem("chat");
        }}
        className="option"
      >
        <RiChat3Line />
        <span
          style={{
            fontWeight: selectedItem === "chat" ? "600" : "400",
          }}
        >
          Chat
        </span>
      </div>
      <div
        style={{
          color: selectedItem === "projects" ? "#FFD600" : "#b0b0b0",
        }}
        onClick={() => {
          navigate(`/community/projects/${encodeURIComponent(id)}`);
          setSelectedItem("projects");
        }}
        className="option"
      >
        <CiViewList />
        <span
          style={{
            fontWeight: selectedItem === "projects" ? "600" : "400",
          }}
        >
          Projects
        </span>
      </div>
      <div
        style={{
          color: selectedItem === "events" ? "#FFD600" : "#b0b0b0",
        }}
        onClick={() => {
          navigate(`/community/events/${encodeURIComponent(id)}`);
          setSelectedItem("events");
        }}
        className="option"
      >
        <MdOutlineCalendarMonth />
        <span
          style={{
            fontWeight: selectedItem === "events" ? "600" : "400",
          }}
        >
          Events
        </span>
      </div>
      <div
        style={{
          color: selectedItem === "blogs" ? "#FFD600" : "#b0b0b0",
        }}
        onClick={() => {
          navigate(`/community/blogs/${encodeURIComponent(id)}`);
          setSelectedItem("blogs");
        }}
        className="option"
      >
        <TbFileText />
        <span
          style={{
            fontWeight: selectedItem === "blogs" ? "600" : "400",
          }}
        >
          Blogs
        </span>
      </div>
      <div
        style={{
          color: selectedItem === "notes" ? "#FFD600" : "#b0b0b0",
        }}
        onClick={() => {
          navigate(`/community/notes/${encodeURIComponent(id)}`);
          setSelectedItem("notes");
        }}
        className="option"
      >
        <BsJournalBookmark />
        <span
          style={{
            fontWeight: selectedItem === "notes" ? "600" : "400",
          }}
        >
          Notes
        </span>
      </div>
    </div>
  );
}
