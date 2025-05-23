import React, { useEffect, useState } from "react";
import axios from "axios";
import NotesCard from "./NotesCardCommunityPage";
import "./SliderNotesCommunityPage.css";
import { API_URL } from "../../services/APIUtils";
import { controller, getRandomNotes } from "../../services/APIConfig"; 

//const API_URL = import.meta.env.VITE_APP_API;

const SliderNotesCommunityPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const notesPerPage = 3;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${API_URL}api/v1/randomNotes`);
        setNotes(res.data.data||[]); // fallback to [] if undefined
         console.log("Fetched res_data_notes:", res.data.data); 
        // console.log("Fetched notes:",notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const startIndex = currentPage * notesPerPage;
  const visibleNotes = notes.slice(startIndex, startIndex + notesPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="slider-section">
      <h4 className="slider-heading"  >Read Notes </h4>

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div className="slider-container">
         {/* <button className="slider-arrow" onClick={handlePrev}>
            &lt;
          </button>*/}

          <div className="slider-box" >
            <div className="cards-wrapper" >
              {visibleNotes.map((note) => (
                <NotesCard key={note._id} note={note} />
              ))}
            </div>
          </div>

         {/* <button className="slider-arrow" onClick={handleNext}>
            &gt;
          </button>*/}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-btn ${index === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderNotesCommunityPage;


{/*
  import { useEffect, useState } from "react";
import axios from "axios";
import NotesCard from "./NotesCardCommunityPage";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "../../components/Loader/Loading";
import "./SliderNotesCommunityPage.css";
import { API_URL } from "../../services/APIUtils";
import { controller, getRandomNotes } from "../../services/APIConfig"; 


// Constants
const CARDS_PER_PAGE = 3;
//const API_URL = import.meta.env.VITE_BACKEND_URL; // or your defined backend URL

export default function SliderNotes() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}api/v1/randomNotes`);
      if (res.data?.status === 200) {
        setNotes(res.data?.data || []);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(notes.length / CARDS_PER_PAGE);
  const startIdx = (page - 1) * CARDS_PER_PAGE;
  const visibleNotes = notes.slice(startIdx, startIdx + CARDS_PER_PAGE);

  return (
    <div className="slider-container">
      <h3>Download notes</h3>

      {loading ? (
        <div className="d-flex justify-content-center py-4">
          <Loading />
        </div>
      ) : (
        <>
          <div className="slider-box">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="nav-btn"
            >
              <FaChevronLeft />
            </button>

            <div className="cards-wrapper"  style={{ border: "2px solid red" }}>
              {visibleNotes.map((note) => (
                <NotesCard key={note._id} note={note} />
              ))}
            </div>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="nav-btn"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={i + 1 === page ? "active-page" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
*/}