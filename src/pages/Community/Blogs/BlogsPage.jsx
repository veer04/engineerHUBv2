import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import filter from "./img/filter-icon.png";
import { controller, getBlogs } from "../../../services/APIConfig";
import BlogCard from "../../../components/BlogCard/BlogCard";
import BlogWindow from "../../../components/BlogWindow/BlogWindow";

export default function BlogsPage({ path }) {
  const { id } = useParams();

  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [blogOpened, setBlogOpened] = useState(undefined);

  const [currentFilters, setCurrentFilters] = useState([]);

  const [blogs, setBlogs] = useState(
    sessionStorage.getItem(`${id} blogs`)
      ? JSON.parse(sessionStorage.getItem(`${id} blogs`))
      : {}
  );

  const filters = [
    {
      id: 1,
      name: "HTML",
    },
    {
      id: 2,
      name: "JavaScript",
    },
    {
      id: 3,
      name: "CSS",
    },
    {
      id: 4,
      name: "Reactive native",
    },
    {
      id: 5,
      name: "Firebase",
    },
  ];

  useEffect(() => {
    getBlogs(setBlogs, id);
    window.scrollTo(0, 0);

    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(`${id} blogs`, JSON.stringify(blogs));
  }, [blogs]);

  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    if (blogs.length > 0) {
      setFilteredBlogs(
        blogs.filter((blog) => {
          if (currentFilters.length === 0) {
            return true;
          } else {
            return blog.techStack.some((tag) => currentFilters.includes(tag));
          }
        })
      );
    }
  }, [currentFilters, blogs]);

  return (
    <div className="project-page">
      <div className="community__subpage__heading">Blogs</div>
      <div className="community__subpage__content">
        <Sidebar path={path} />
        <div className="project__content">
          <div className="project__searchbar__container">
            <div className="project__searchbar input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                <img src={filter} alt="filter" />
              </span>
            </div>
          </div>
          {/* <div className="project__chips__container">
            {filters.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (currentFilters.includes(item.name)) {
                    const newFilters = currentFilters.filter(
                      (filter) => filter !== item.name
                    );
                    setCurrentFilters(newFilters);
                  } else {
                    setCurrentFilters((prevValue) => {
                      return [...prevValue, item.name];
                    });
                  }
                }}
                className={`project__chip ${
                  currentFilters.includes(item.name) && "project__chip--active"
                }`}
              >
                {item.name}
              </div>
            ))}
          </div> */}
          <div className="project__list__container">
            <div
              className={`project__list ${
                isBlogOpen && "project__list--collapsed"
              }`}
            >
              {filteredBlogs.map((blog) => (
                <BlogCard
                  setBlogOpened={setBlogOpened}
                  setIsBlogOpen={setIsBlogOpen}
                  key={blog._id}
                  {...blog}
                />
              ))}
            </div>
            {isBlogOpen && (
              <BlogWindow
                blogOpened={blogOpened}
                setIsBlogOpen={setIsBlogOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
