import { useState, useEffect, useRef, useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import "./BlogHosting.css";
import axios from "axios";
import FormData from "form-data";
import useNavbar from "../../hooks/use-navbar";
import { API_URL, EDITOR_API_KEY } from "../../services/APIUtils";
import { getDomains } from "../../services/APIConfig";
import { getAccessToken } from "../../features/getCookieValues";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../User/Login/CustomSnackbar";
import JoditEditor from "jodit-react";
import { getUserEmail } from "../../features/User/UserDetails";
import { RxCross2 } from "react-icons/rx";
import { BsUpload } from "react-icons/bs";
import Page404 from "../Maintenance/Page404";
import { Editor } from "@tinymce/tinymce-react";

const JoditBlogEditor = ({ placeholder, setTextContent }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    setTextContent(content);
  }, [content]);

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typing here...",
    };
  }, []);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};

const BlogHosting = () => {
  const specialUserEmails = [
    {
      onlyForReference: "Email used by Kunwar Vidya Niwas for Blog posting",
      value: "kunwar7376niwas@gmail.com",
    },
    // {
    //   onlyForReference: "Email used by Madhur Tripathi for Blog posting",
    //   value: "madhurtripathi2001@gmail.com",
    // },
    {
      onlyForReference:
        "Email used only for testing purpose. Delete this email after testing",
      value: "raj.swapnil1708@gmail.com",
    },
  ];
  const currentUserEmail = getUserEmail();
  if (!specialUserEmails.some((e) => e.value === currentUserEmail)) {
    return <Page404 />;
  }

  const navigate = useNavigate();
  const ref = useRef(null);
  const fileInput = useRef(null);
  const { setSelectedPageNavbar } = useNavbar();
  const [userEmail, setUserEmail] = useState("");
  const [title, setTitle] = useState("");
  const [allDomains, setAllDomains] = useState([]);
  const [domain, setDomain] = useState("");
  const [techStack, setTechStack] = useState("");
  const [techStackArray, setTechStackArray] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    domain: "",
    techStack: "",
    coverImage: "",
    post: "",
  });
  const [isSpecialUser, setIsSpecialUser] = useState(false);
  const [validation, setValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    severity: "error",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    document.title = "Blog Posting | engineerHUB";
    setUserEmail(getUserEmail());
    getDomains(setAllDomains);
  }, []);

  function handleInput(e) {
    //check if the file is an image
    if (e.target.files[0]) {
      if (e.target.files[0].type.includes("image")) {
        setCoverImage(e.target.files[0]);
      } else {
        alert("Please choose an image file only");
      }
    }
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
  }, []);

  useEffect(() => {
    // check if the userEmail exist in specialUserEmails
    if (specialUserEmails.some((e) => e.value === userEmail)) {
      setIsSpecialUser(true);
    }
  }, [userEmail]);

  const validateInput1 = () => {
    let valid = true;
    const newErrors = {
      title: "",
      domain: "",
      techStack: "",
      coverImage: "",
      post: "",
    };

    if (!!!title) {
      newErrors.title = "Title is required!";
      valid = false;
    } else if (title.length < 3) {
      newErrors.title = "Title should be atleast 3 characters long!";
      valid = false;
    } else if (title.length > 250) {
      newErrors.title = "Title should be less than 250 characters!";
      valid = false;
    }

    if (!!!domain) {
      newErrors.domain = "Domain is required!";
      valid = false;
    }

    if (techStackArray.length === 0) {
      newErrors.techStack = "Tech Stack is required!";
      valid = false;
    } else if (techStackArray.length > 25) {
      newErrors.techStack = "Tech Stack should be less than 25!";
      valid = false;
    }

    function isImageFileName(fileName) {
      const imageRegex = /\.(jpg|jpeg|png)$/i;
      return imageRegex.test(fileName);
    }

    if (!!!coverImage?.name) {
      newErrors.coverImage = "Cover image is required!";
      valid = false;
    } else if (!isImageFileName(coverImage?.name)) {
      newErrors.coverImage = "Cover image should be in jpg/jpeg/png format!";
      valid = false;
    }

    if (!!!blogContent) {
      newErrors.post = "Post is required!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    const techStackArrayValues = techStackArray.map((tech) => tech.value);
    form.append("title", title);
    form.append("postArea", blogContent);
    form.append("domainName", domain);
    form.append("techStack", techStackArrayValues);
    form.append("postIcon", coverImage);

    if (validateInput1() === true) {
      setIsLoading(true);
      const response = await axios
        .post(`${API_URL}api/v1/blog`, form, {
          headers: {
            accesstoken: getAccessToken(),
          },
        })
        .then((res) => {
          console.log(res);
          setSnackbarValues({
            severity: "success",
            message: `New Blog created`,
          });
          setOpen(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          alert(err.response.data.err || err.response.data.message);
          setValidation(false);
        });
    }
  };

  return (
    <>
      <main className="blog-hosting-page">
        <h1 className="mb-4">Post your blogs here</h1>
        <label className="label">
          Title<span className="required">*</span>
        </label>
        <input
          name="title"
          type="text"
          className="input-field"
          placeholder="Enter the title of the blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="error-message">{errors.title}</label>
        <label className="label">
          Domain<span className="required">*</span>
        </label>
        <select
          disabled={allDomains?.length === 0}
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
          }}
          className="input-field"
        >
          {allDomains.length !== 0 && (
            <option value="" selected disabled>
              Select the domain of the blog
            </option>
          )}
          {allDomains.map((domain) => (
            <option key={domain.domain} value={domain.domain}>
              {domain.domain}
            </option>
          ))}
        </select>
        <label className="error-message">{errors.domain}</label>
        <label className="label">
          Tech Stack<span className="required">*</span>
        </label>
        <input
          name="techStack"
          type="text"
          className="input-field"
          placeholder="Enter the tech stack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          // when enter key is pressed console log the value
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              ref.current.click();
            }
          }}
        />
        <label className="error-message">{errors.techStack}</label>
        {techStackArray.length > 0 && (
          <div className="new-tech-stack-container">
            {techStackArray.map((currentTech, index) => (
              <div key={index} className="tech-stack">
                {currentTech.value}
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setTechStackArray(
                      techStackArray.filter(
                        (tech) => tech.id !== currentTech.id
                      )
                    );
                  }}
                >
                  <RxCross2 />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          ref={ref}
          onClick={() => {
            if (techStack === "") {
              return;
            }
            setTechStackArray((prev) => [
              ...prev,
              { id: techStackArray.length + 1, value: techStack },
            ]);
            setTechStack("");
          }}
          className="add-tech-stack-btn mt-1"
        >
          + Add
        </button>

        <label className="label mt-4">
          Cover Photo<span className="required">*</span>
        </label>
        <label className="error-message">{errors.coverImage}</label>
        <input
          style={{ display: "none" }}
          type="file"
          onChange={handleInput}
          ref={fileInput}
        />
        <div
          style={{
            maxHeight: "736px",
            maxWidth: "unset",
          }}
          className="modal-container"
        >
          <div
            onClick={() => {
              fileInput.current.click();
            }}
            style={{
              borderColor: !!!coverImage ? "#e6e6e6" : "#000",
              height: !!!coverImage ? "max-content" : "max-content !important",
            }}
            className="upload-img-container post-upload-img-container"
          >
            {!!!coverImage ? (
              <>
                <div className="upload-icon">
                  <BsUpload />
                </div>
                <span>Choose an image file to upload</span>
                <span className="hint">Recommended Dimensions (736x736)</span>
              </>
            ) : (
              <img
                style={{
                  aspectRatio: "unset",
                  objectFit: "cover",
                  width: "100%",
                  objectPosition: "center",
                }}
                className="uploaded-img"
                src={
                  typeof coverImage === "string"
                    ? coverImage
                    : URL.createObjectURL(coverImage)
                }
                loading="lazy"
                alt="logo"
              />
            )}
          </div>
        </div>

        <label className="label mt-4">
          Post<span className="required">*</span>
        </label>
        <label className="error-message">{errors.post}</label>

        <div className="mb-4">
          <Editor
            apiKey={EDITOR_API_KEY}
            value={blogContent}
            onEditorChange={(content) => {
              setBlogContent(content);
            }}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="Hi Kunwar sir😎"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat",
              content_style:
                "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {/* <button onClick={log}>Log editor content</button> */}
        </div>

        {/* <JoditBlogEditor
          placeholder={"Enter your blog here"}
          setTextContent={setBlogContent}
        /> */}
        <div className="button-container mt-4">
          <button
            // it should not run on any keypress
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => handleSubmit(e)}
            style={{
              float: "right",
              backgroundColor: "var(--primary-color-green)",
              color: "white",
              padding: ".5rem .75rem",
              border: "none",
              borderRadius: ".3125rem",
            }}
            type="submit"
            className="button next-button"
            disabled={isLoading}
          >
            Upload
          </button>
        </div>
        {snackbarValues.severity === "success" && (
          <CustomSnackbar
            setOpen={setOpen}
            open={open}
            message={snackbarValues.message}
            severity={snackbarValues.severity}
          />
        )}
      </main>
    </>
  );
};

export default BlogHosting;
