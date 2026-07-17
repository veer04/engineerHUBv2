import { useEffect, useState } from "react";
import {
  getAccessToken,
  getUserEmail,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import Page404 from "../Maintenance/Page404";
import "./ReferralAdminPage.css"; // Reuse ReferralAdminPage CSS styles
import { Helmet } from "react-helmet";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PAYMENT_API_URL } from "../../services/APIUtils";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import Loading from "../../components/Loader/Loading";

export default function ReferralUploadPage() {
  if (!isUserLoggedIn()) return <Page404 />;
  const allowedEmailIds = [
    "rishabhs883@gmail.com",
    "career@engineerhub.in",
  ];
  if (!allowedEmailIds.includes(getUserEmail().toLowerCase()))
    return <Page404 />;

  const navigate = useNavigate();

  // Upload view state and CRUD
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [snapshotUrl, setSnapshotUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const snapshotsQuery = useQuery({
    queryKey: ["admin", "referralSnapshots"],
    queryFn: () =>
      axios.get(`${PAYMENT_API_URL}payment/referral-snapshots`).then((res) => res.data),
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setSnapshotUrl(""); // clear text URL input if file is chosen
    }
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setCompany("");
    setEmail("");
    setDate("");
    setFile(null);
    setSnapshotUrl("");
    setPreviewUrl("");
    setEditingId(null);
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    if (!name || !role || !company) {
      setSubmitError("Name, role, and company are required.");
      setSubmitting(false);
      return;
    }

    if (!file && !snapshotUrl && !editingId) {
      setSubmitError("Please upload a snapshot file or provide an image URL.");
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);
      formData.append("company", company);
      if (email) formData.append("email", email);
      if (date) formData.append("date", date);

      if (file) {
        formData.append("snapshot", file);
      } else if (snapshotUrl) {
        formData.append("snapshot", snapshotUrl);
      }

      const headers = {
        accessToken: getAccessToken(),
        "Content-Type": "multipart/form-data",
      };

      let response;
      if (editingId) {
        response = await axios.put(
          `${PAYMENT_API_URL}payment/referral-snapshots/update/${editingId}`,
          formData,
          { headers }
        );
      } else {
        response = await axios.post(
          `${PAYMENT_API_URL}payment/referral-snapshots/create`,
          formData,
          { headers }
        );
      }

      if (response.data.success) {
        setSubmitSuccess(
          editingId
            ? "Referral snapshot updated successfully!"
            : "Referral snapshot created successfully!"
        );
        resetForm();
        snapshotsQuery.refetch();
      } else {
        setSubmitError(response.data.message || "Failed to save snapshot.");
      }
    } catch (error) {
      console.error("Error saving snapshot:", error);
      setSubmitError(
        error.response?.data?.message || "An error occurred while saving the snapshot."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (snap) => {
    setEditingId(snap._id);
    setName(snap.name);
    setRole(snap.role);
    setCompany(snap.company);
    setEmail(snap.email || "");
    setDate(snap.date ? moment(snap.date).format("YYYY-MM-DD") : "");
    setSnapshotUrl(snap.snapshot);
    setPreviewUrl(snap.snapshot);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this snapshot?")) {
      return;
    }

    try {
      const headers = {
        accessToken: getAccessToken(),
      };
      const response = await axios.delete(
        `${PAYMENT_API_URL}payment/referral-snapshots/${id}`,
        { headers }
      );

      if (response.data.success) {
        snapshotsQuery.refetch();
      } else {
        alert(response.data.message || "Failed to delete snapshot.");
      }
    } catch (error) {
      console.error("Error deleting snapshot:", error);
      alert(
        error.response?.data?.message || "An error occurred while deleting the snapshot."
      );
    }
  };

  return (
    <div className="referral-admin-layout">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Upload Snapshots | Admin Panel</title>
      </Helmet>

      {/* Sidebar Panel */}
      <aside className="referral-admin-sidebar">
        <div className="sidebar-brand">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className="referral-sidebar-btn"
            onClick={() => navigate("/admin/referrals?pageNo=1&limit=30")}
          >
            <span>Bookings</span>
          </button>
          <button 
          className="referral-sidebar-btn" 
          onClick={() => navigate("/admin/digital-products?pageNo=1&limit=30")}>
            <span>Digital Products</span>
          </button>
          <button
            className="referral-sidebar-btn active"
            onClick={() => navigate("/admin/upload")}
          >
            <span>Upload </span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="referral-admin-main">
        <div className="snapshots-upload-panel">
          {/* <h1 className="admin-view-title">Upload referral snapshots here</h1> */}

          {/* Form component */}
          <div className="admin-form-card">
            <h2 className="card-subtitle">{editingId ? "Edit Referral Snapshot" : "Add Referral Snapshot"}</h2>
            <form onSubmit={handleSubmit} className="snapshot-upload-form">
              <div className="form-input-grid">
                <div className="form-input-group">
                  <label htmlFor="name-input">Candidate Name *</label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="role-input">Role *</label>
                  <input
                    id="role-input"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    required
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="company-input">Company *</label>
                  <input
                    id="company-input"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google"
                    required
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="email-input">Email (Optional)</label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@gmail.com"
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="date-input">Date (Optional)</label>
                  <input
                    id="date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-input-group file-field">
                  <label>Snapshot Image *</label>
                  <div className="image-choice-inputs">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="snapshot-file-input"
                    />
                    <span className="choice-divider">or paste URL:</span>
                    <input
                      type="text"
                      value={snapshotUrl}
                      onChange={(e) => {
                        setSnapshotUrl(e.target.value);
                        setPreviewUrl(e.target.value);
                        setFile(null);
                      }}
                      placeholder="e.g. https://domain.com/snap.png"
                    />
                  </div>
                </div>
              </div>

              {previewUrl && (
                <div className="snapshot-preview-block">
                  <p className="preview-label">Snapshot Image Preview:</p>
                  <img src={previewUrl} alt="Preview" className="preview-img-element" />
                </div>
              )}

              {submitError && <div className="form-alert error">{submitError}</div>}
              {submitSuccess && <div className="form-alert success">{submitSuccess}</div>}

              <div className="form-btn-actions">
                <button
                  type="submit"
                  className="submit-action-btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : editingId ? "Update Snapshot" : "Add Snapshot"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="submit-action-btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List component */}
          <div className="admin-list-card">
            <h2 className="card-subtitle">Uploaded Snapshots</h2>
            {snapshotsQuery.isPending && <Loading />}
            {snapshotsQuery.isSuccess && (
              <div className="snapshots-list-table-container">
                <table className="snapshots-list-table">
                  <thead>
                    <tr>
                      <th>Preview</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapshotsQuery.data.data.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-row-text">
                          No snapshots uploaded yet.
                        </td>
                      </tr>
                    ) : (
                      snapshotsQuery.data.data.map((snap) => (
                        <tr key={snap._id}>
                          <td>
                            <img
                              src={snap.snapshot}
                              alt={snap.name}
                              className="snap-table-thumb"
                            />
                          </td>
                          <td className="candidate-name-col">{snap.name}</td>
                          <td>{snap.role}</td>
                          <td className="company-badge-col">{snap.company}</td>
                          <td className="optional-data">
                            {snap.email || <span className="placeholder-text">N/A</span>}
                          </td>
                          <td className="optional-data">
                            {snap.date ? (
                              moment(snap.date).format("DD/MM/YYYY")
                            ) : (
                              <span className="placeholder-text">N/A</span>
                            )}
                          </td>
                          <td>
                            <div className="row-action-buttons">
                              <button
                                className="action-icon-btn edit"
                                onClick={() => handleEdit(snap)}
                                title="Edit"
                              >
                                <FaEdit size={15} />
                              </button>
                              <button
                                className="action-icon-btn delete"
                                onClick={() => handleDelete(snap._id)}
                                title="Delete"
                              >
                                <FaTrash size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
