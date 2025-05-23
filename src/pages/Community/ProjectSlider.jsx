import React, { useState, useEffect } from "react";
import axios from "axios";

import "./ProjectSlider.css";
import { API_URL } from "../../services/APIUtils";
import NewProjectCardSlider from "../../components/NewProjectCard/NewProjectCardSlider";

export default function ProjectSlider() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectsPerPage = 3;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}api/v1/projects/random`);
        setProjects(response.data.data);
        console.log("Data fetching", response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <section className="project-slider-container">
      <h2 className="slider-heading">Build Projects</h2>

      {loading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}

      <div className="project-slider">
        {currentProjects.map((project) => (
          <NewProjectCardSlider
            key={project._id}
            project={project}
            basePath={`/community/projects/${encodeURIComponent(
              project.domainName
            )}`}
          />
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageClick(idx + 1)}
            className={`pagination-btn ${
              currentPage === idx + 1 ? "active" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

{
  /*import React, { useState } from "react";
import NewProjectCard from "../../components/NewProjectCard/NewProjectCard";
import "./ProjectSlider.css";

export default function ProjectSlider({ projects }) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <section className="project-slider-container">
      <h2 className="slider-heading">Explore Projects from Community</h2>
      <div className="project-slider">
        {currentProjects.map((project) => (
          <NewProjectCard key={project._id} project={project} />
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageClick(idx + 1)}
            className={`pagination-btn ${currentPage === idx + 1 ? "active" : ""}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
*/
}
