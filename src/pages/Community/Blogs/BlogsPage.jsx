import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { controller, getBlogs } from "../../../services/APIConfig";
import BlogCard from "../../../components/BlogCard/BlogCard";
import BlogWindow from "../../../components/BlogWindow/BlogWindow";
import MobileSidebar from "../../../components/MobileSidebar/MobileSidebar";
import useNavbar from "../../../hooks/use-navbar";

export default function BlogsPage({ path }) {
  const { setSelectedPageNavbar } = useNavbar();
  setSelectedPageNavbar("community");

  const { id } = useParams();
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [blogOpened, setBlogOpened] = useState(undefined);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [blogs, setBlogs] = useState(
    sessionStorage.getItem(`${id} blogs`)
      ? JSON.parse(sessionStorage.getItem(`${id} blogs`))
      : []
  );

  useEffect(() => {
    getBlogs(setBlogs, id);
    window.scrollTo(0, 0);
    console.log(blogs);

    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(`${id} blogs`, JSON.stringify(blogs));
  }, [blogs]);

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

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);

  const [query, setQuery] = useState("");
  const [searchedProjects, setSearchedProjects] = useState([]);

  const filteredData = useMemo(() => {
    return blogs.filter((value) => {
      return value.title.toLowerCase().includes(query.toLowerCase());
      //  ||
      // value.techStack.some((tag) =>
      //   tag.toLowerCase().includes(query.toLowerCase())
      // )
    });
  }, [blogs, query]);

  useEffect(() => {
    setSearchedProjects(filteredData);
  }, [query, filteredData]);

  useEffect(() => {
    if (searchedProjects.length > 0) {
      setFilteredBlogs(searchedProjects);
    } else {
      setFilteredBlogs([]);
    }
  }, [searchedProjects]);

  return (
    <>
      <MobileSidebar path={path} />
      <div className="project-page">
        <div className="community__subpage__heading">
          <span>Blogs</span>
        </div>
        <div className="community__subpage__content">
          <Sidebar path={path} />
          <div className="project__content">
            <div className="project__searchbar__container">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
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
            <div
              className={`project__list__container project__list_container--window-open `}
            >
              <div
                className={`project__list ${
                  isBlogOpen ? "project__list--collapsed" : ""
                } ${width <= 1000 && isBlogOpen ? "--no-display" : ""}`}
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
    </>
  );
}
