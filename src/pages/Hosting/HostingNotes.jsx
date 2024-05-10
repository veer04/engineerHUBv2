import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  getAccessToken,
  getUserEmail,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { API_URL, Bucket_URL, EDITOR_API_KEY } from "../../services/APIUtils";
import { changeDocumentTitle } from "../../features/changeDocumentTitle";
import axios from "axios";
import useNavbar from "../../hooks/use-navbar";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import FormIndicator from "../../components/FormInputs/FormIndicator";
import FormInput from "../../components/FormInputs/FormInput";
import FormInputDropdown from "../../components/FormInputs/FormInputDropdown";
import FormInputFileUpload from "../../components/FormInputs/FormInputFileUpload";
import FormButton from "../../components/FormInputs/FormButton";
import "./HostingCulturalEvent.css";
import { Editor } from "@tinymce/tinymce-react";
import Page404 from "../Maintenance/Page404";

export default function HostingNotes() {
  if (!isUserLoggedIn()) {
    redirectToAuth("/login");
  }
  const specialUserEmails = [
    {
      onlyForReference: "Email used by Kunwar Vidya Niwas for Notes posting",
      value: "kunwar7376niwas@gmail.com",
    },
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

  changeDocumentTitle("Upload Notes | engineerHUB");

  const navigate = useNavigate();
  const { setSelectedPageNavbar } = useNavbar();
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();
  const bucket = `${Bucket_URL}frontend/hosting/`;
  const totalPages = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [domain, setDomain] = useState({});
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    domain: "",
    file: "",
    description: "",
  });
  let errorStack = [];
  const domainOptions = [
    {
      label: "Data Structures & Algorithms",
      value: "Data Structures & Algorithms",
    },
    { label: "Web Development", value: "Web Development" },
    { label: "App Development", value: "App Development" },
    { label: "Machine Learning & AI", value: "Machine Learning & AI" },
    { label: "UI/UX Design", value: "UI/UX Design" },
    { label: "Cyber Security", value: "Cyber Security" },
    { label: "DevOps", value: "DevOps" },
    // { label: "Other", value: "Other" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPageNavbar("host");
  }, []);

  function addToErrorStack(elem) {
    errorStack.push(elem);
  }

  function handleFormErrors() {
    if (errorStack.length > 0) {
      const element = document.querySelector(errorStack[0]);
      if (element) {
        window.scrollTo({
          behavior: "smooth",
          top: element.offsetTop - 200,
        });
      }
      setSnackbarMessage("Please fill all the required fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    errorStack = [];
  }

  function validateForm1() {
    let isValid = true;
    const errors = {
      name: "",
      image: "",
      domain: "",
      file: "",
      description: "",
    };

    if (!name) {
      errors.name = "Name is required";
      isValid = false;
      addToErrorStack("#name");
    } else if (name.length < 3) {
      errors.name = "Name should be minimum 3 characters";
      isValid = false;
      addToErrorStack("#name");
    } else if (name.length > 150) {
      errors.name = "Name should be maximum 150 characters";
      isValid = false;
      addToErrorStack("#name");
    }

    if (image && !image?.type?.includes("image")) {
      errors.image = "Please upload an image file";
      isValid = false;
      addToErrorStack("#image");
    } else if (image && image?.size > 1024 * 1024 * 10) {
      errors.image = "File size should be less than 10MB";
      isValid = false;
      addToErrorStack("#image");
    }

    if (Object.keys(domain).length === 0) {
      errors.domain = "Domain is required";
      isValid = false;
      addToErrorStack("#domain");
    }

    if (!file) {
      errors.file = "File is required";
      isValid = false;
      addToErrorStack("#file");
    } else if (!file?.type?.includes("pdf")) {
      errors.file = "Please upload a pdf file";
      isValid = false;
      addToErrorStack("#file");
    }

    setErrors(errors);
    handleFormErrors();
    return isValid;
  }

  async function submitForm() {
    const form = new FormData();
    form.append("title", name);
    form.append("image", image);
    form.append("domainName", domain?.value);
    form.append("pdfLink", file);
    form.append("description", description);

    setIsLoading(true);
    await axios
      .post(`${API_URL}api/v1/addNotes`, form, {
        headers: {
          accesstoken: getAccessToken(),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSnackbarMessage(
          <>
            Notes uploaded successfully.{" "}
            <Link
              to={`/community/notes/${encodeURIComponent(
                res?.data?.data?.domainName
              )}/${res?.data?.data?._id}`}
              style={{ color: "rgb(13, 110, 253)" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Click here
            </Link>{" "}
            to view
          </>
        );
        setSnackbarSeverity("success");
        setSnackbarDuration(10000);
        setSnackbarOpen(true);
        emptyAllFields();
        setCurrentPage(1);
      })
      .catch((err) => {
        setIsLoading(false);
        setSnackbarMessage(
          <>
            <span>Failed to upload notes</span>
            {err?.response?.data?.message && (
              <>
                {" "}
                <br />
                <span>Error: {err?.response?.data?.message}</span>
              </>
            )}
          </>
        );
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
      });
  }

  function emptyAllFields() {
    setName("");
    setImage("");
    setDomain({});
    setFile("");
    setDescription("");
  }

  const handleNext = () => {
    if (currentPage === 1) {
      if (validateForm1()) submitForm();
    }
  };

  return (
    <main className="hosting-container">
      <aside
        style={{
          backgroundImage: `url(${bucket}internship-poster-large.png)`,
        }}
        className="poster-container"
      >
        <div className="fact">
          <p>Upload Your Notes Here .</p>
          <p>Help Shape Tomorrow's Workforce</p>
        </div>
      </aside>
      <section className="main">
        <div className="header">
          <span onClick={() => navigate(`/host`)} className="navigate-back">
            <IoIosArrowBack /> Back
          </span>
          <div
            style={{
              backgroundImage: `url(${bucket}internship-poster-small.png)`,
            }}
            className="poster-container-mobile"
          />
          <h1 className="title">Notes</h1>
          <FormIndicator
            className="mt-2"
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
        <div id="content" className="content">
          {currentPage === 1 && (
            <>
              <FormInput
                label="Title"
                id="name"
                name="name"
                required
                placeholder="Enter a title for your notes"
                value={name}
                setValue={setName}
                helperText={errors.name}
                className="mb-4"
              />

              <FormInputFileUpload
                label="Image / Poster"
                id="image"
                name="image"
                placeholder="Upload an image for your notes"
                fileType="image/*"
                value={image}
                setValue={setImage}
                helperText={errors.image}
                className="mb-4"
              />

              <FormInputDropdown
                label="Domain Name"
                id="domain"
                name="domain"
                required
                placeholder="Select your domain"
                value={domain}
                setValue={setDomain}
                options={domainOptions}
                helperText={errors.domain}
                className="mb-4"
              />

              <FormInputFileUpload
                label="Upload Notes"
                id="file"
                name="file"
                required
                placeholder="Upload the pdf file of your notes"
                fileType="application/pdf, application/vnd.ms-excel"
                value={file}
                setValue={setFile}
                helperText={errors.file}
                className="mb-4"
              />

              <h2>Description</h2>

              <div id="description" className="mb-5">
                <Editor
                  apiKey={EDITOR_API_KEY}
                  value={description}
                  onEditorChange={(content) => {
                    setDescription(content);
                  }}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: "file",
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
                      "undo redo" +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat",
                    content_style:
                      "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                <div className="custom-form-input">
                  {errors.description && (
                    <span className="helper-text">{errors.description}</span>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="d-flex justify-content-between form-buttons-container">
            <FormButton onClick={handleNext} isLoading={isLoading}>
              {currentPage === totalPages ? "Submit" : "Next"}
            </FormButton>
          </div>
        </div>
      </section>
    </main>
  );
}
