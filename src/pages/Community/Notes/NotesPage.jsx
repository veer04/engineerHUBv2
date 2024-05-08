import React, { useEffect, useState, useMemo } from "react";
import "../Project/NewProjectsPage.css";
import { useParams, useSearchParams } from "react-router-dom";
import {
  controller,
  getDomains,
  getProjects,
} from "../../../services/APIConfig";
import useNavbar from "../../../hooks/use-navbar";
import { Outlet } from "react-router-dom";
import NewProjectCard from "../../../components/NewProjectCard/NewProjectCard";
import NewSidebar from "../../../components/NewSidebar/NewSidebar";
import Loading from "../../../components/Loader/Loading";
import NewSidebarMobile from "../../../components/NewSidebarMobile/NewSidebarMobile";
import DomainSwitcher from "../../../components/DomainSwitcher/DomainSwitcher";
import DomainSwitcherMobile from "../../../components/DomainSwitcher/DomainSwitcherMobile";
import useSidebar from "../../../hooks/use-sidebar";
import NotesCard from "../../../components/NotesCard/NotesCard";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";

export default function NotesPage() {
  const { setSelectedPageNavbar } = useNavbar();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const { id, notesId } = useParams();
  const [isWindowOpen, setIsWindowOpen] = useState(!!notesId);
  const [data, setData] = useState({});
  const [notes, setNotes] = useState(
    // sessionStorage.getItem(`${id} notes`)
    //   ? JSON.parse(sessionStorage.getItem(`${id} notes`))
    //   :
    []
  );
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchedNotes, setSearchedNotes] = useState([]);
  const { setSelectedItem } = useSidebar();

  const getNotes = (setData, id) => {
    axios
      .get(`${API_URL}api/v1/domainWiseNotes/${encodeURIComponent(id)}`)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setData(err);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  };

  useEffect(() => {
    document.title = `Notes | ${id} | engineerHUB`;
    window.scrollTo(0, 0);
    getNotes(setData, id);
    setSelectedPageNavbar("community");
    setSelectedItem("notes");

    return () => {
      controller.abort();
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (!!Object.keys(data).length) {
      setNotes(data?.data?.data || []);
    }
  }, [data]);

  useEffect(() => {
    if (!notesId) {
      document.title = `Notes | ${id} | engineerHUB`;
    }
    setIsWindowOpen(!!notesId);
  }, [notesId]);

  useEffect(() => {
    if (searchedNotes.length > 0) {
      setFilteredNotes(searchedNotes);
    } else {
      setFilteredNotes([]);
    }
  }, [searchedNotes]);

  const filteredData = useMemo(() => {
    return notes.filter((value) => {
      return (
        value.title?.toLowerCase().includes(q.toLowerCase()) ||
        value.domainName?.toLowerCase().includes(q.toLowerCase())
      );
    });
  }, [notes, q]);

  useEffect(() => {
    setSearchedNotes(filteredData);
  }, [q, filteredData]);

  function handleHeight() {
    setTimeout(() => {
      document.getElementById("project-list").style.height = `${
        document.getElementById("project-window").offsetHeight
      }px`;
    }, 100);
  }

  const renderContentContainer = (
    <>
      {!isWindowOpen && (
        <div
          id="project-list"
          className={`project-list ${
            isWindowOpen ? "--flip-direction" : "h-100"
          }`}
        >
          {filteredNotes.length === 0 && (
            <div
              style={{ minHeight: "30vh" }}
              className="d-flex justify-content-center align-items-center flex-column w-100"
            >
              <h4>No Notes found</h4>
            </div>
          )}
          {filteredNotes.map((notes) => (
            <NotesCard key={notes._id} data={notes} />
          ))}
        </div>
      )}
      <Outlet context={[handleHeight]} />
    </>
  );

  return (
    <>
      <DomainSwitcherMobile />
      <NewSidebarMobile />
      <main className="projects-page">
        {/* <div className="heading">
          <span>Project Ideas</span>
        </div> */}
        {!isWindowOpen && (
          <div className="project__searchbar__container company_searchbar_container">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={q}
                onChange={(e) => {
                  setSearchParams(
                    (prev) => {
                      prev.set("q", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              />

              <span className="input-group-text" id="basic-addon2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z"
                    fill="#3C3C43"
                    fillOpacity="0.6"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}
        <div className="main-container">
          {!isWindowOpen && (
            <aside className="options-container">
              <DomainSwitcher />
              <NewSidebar />
            </aside>
          )}
          <div className="content-container">
            {Object.keys(data).length === 0 && (
              <div
                style={{ minHeight: "30vh" }}
                className="d-flex justify-content-center align-items-center w-100"
              >
                <Loading />
              </div>
            )}
            {Object.keys(data).length !== 0 && (
              <>
                {data?.status === 200 ? (
                  notes.length === 0 ? (
                    <div
                      style={{ minHeight: "30vh" }}
                      className="d-flex justify-content-center align-items-center flex-column w-100"
                    >
                      <h4>No Notes found</h4>
                    </div>
                  ) : (
                    renderContentContainer
                  )
                ) : (
                  <div
                    style={{ minHeight: "30vh" }}
                    className="d-flex justify-content-center align-items-center flex-column w-100"
                  >
                    <h4>No Notes found</h4>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
