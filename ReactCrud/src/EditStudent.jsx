import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './EditStudent.css';
function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    placedCom: "",
    package: "",
    avatar: "",
  });
  const [isLoading, SetIsLoading] = useState(null);
 const apiUrl = `${import.meta.env.VITE_API_URL}/${id}`;

  useEffect(() => {
    fetch(apiUrl, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setFormData({ ...res });
        SetIsLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        navigate(`/student/${id}`);
      });
  };
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-2 fw-bold text-muted">Loading Data...</span>
      </div>
    );
  }
  return (
    <>
      <div className="edit-page-wrapper">
        <div className="edit-card shadow-lg">
          <div className="edit-header">
            <h3 className="fw-bold mb-0">Edit Placement Record</h3>
            <p className="text-muted mb-0 mt-1">
              Update details for {formData.name}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="edit-form-body p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  Student Name
                </label>
                <input
                  type="text"
                  className="premium-input"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  Company Name
                </label>
                <input
                  type="text"
                  className="premium-input"
                  required
                  value={formData.placedCom}
                  onChange={(e) =>
                    setFormData({ ...formData, placedCom: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  Package (LPA)
                </label>
                <input
                  type="number"
                  className="premium-input"
                  required
                  value={formData.package}
                  onChange={(e) =>
                    setFormData({ ...formData, package: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  Avatar URL
                </label>
                <input
                  type="text"
                  className="premium-input"
                  required
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="d-flex gap-3 mt-5">
              <button
                type="button"
                className="btn btn-light w-50 fw-bold py-2"
                onClick={() => navigate(`/student/${id}`)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-dark w-50 fw-bold py-2 shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditStudent;
