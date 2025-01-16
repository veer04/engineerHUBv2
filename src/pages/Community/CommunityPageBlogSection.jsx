import React, { useEffect, useState } from "react";
import "./communitypageblogsection.css";
import { controller, getGeneralBlogs } from "../../services/APIConfig";
import { useParams } from "react-router-dom";
import NewBlogCard from "../../components/NewBlogCard/NewBlogCard";
import NewBlogCard2 from "../../components/NewBlogCard/NewBlogCard2";
import Loading from "../../components/Loader/Loading";
import PaginationBar from "../../components/PaginationBar/PaginationBar";

const CommunityPageBlogSection = () => {
  const [generalBlogData, setGeneralBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(3);
  const [blogsData, setBlogsData] = useState({});
  const [blogs, setBlogs] = useState([]);
  const { id, blogId } = useParams();

  useEffect(() => {
    document.title = `Blogs | ${id} | engineerHUB`;
    // window.scrollTo(0, 0);
    getGeneralBlogs(setBlogsData, id, currentPage, limit);

    return () => {
      controller.abort();
      setBlogsData({});
    };
  }, [id, currentPage, limit]);

  useEffect(() => {
    if (blogsData && blogsData.data && blogsData.data.blogs) {
      setBlogs(
        Array.isArray(blogsData?.data?.blogs) ? blogsData?.data?.blogs : []
      );
      const totalBlogs = blogsData.data.blogs.length || 0;

      setTotalPages(blogsData?.data?.totalPage);
      setCurrentPage(blogsData?.data?.currentPage);
    }
  }, [blogsData, limit]);

  useEffect(() => {}, []);
  return (
    <div className="main-community-blog-section-div">
      <div className="mb-4">
        <h4 className="h4-com-blog-sec">Community Blog Section</h4>
      </div>

      <div className="main-community-blog-sub">
        {blogs.length === 0 ? (
          <div
            style={{ minHeight: "30vh" }}
            className="d-flex justify-content-center align-items-center flex-column w-100"
          >
            <Loading />
          </div>
        ) : (
          blogs &&
          blogs.map((blog) => {
            return <NewBlogCard2 key={blog._id} blog={blog} />;
          })
        )}
      </div>

      <PaginationBar
        currentPage={currentPage}
        pages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CommunityPageBlogSection;
