import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Student.css'; 

function Student() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    placedCom: "",
    package: "",
    avatar: "",
    Stuid: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setStudents(res));
  }, [refresh]);

  const handleAddStudent = (e) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setShowForm(false);
        setFormData({ name: "", placedCom: "", package: "", avatar: "" });
        setRefresh(!refresh);
      });
  }; 


  return (
    <>
      <div className="dashboard-container mt-5">
    {/* Header & Add Button */}
    <div className="d-flex justify-content-between align-items-center mb-4 header-section">
      <div className="intro-text">
        <h2 className="fw-bolder text-dark mb-1">Placement Records</h2>
        <p className="text-muted mb-0">
          Manage placed students, company details, and packages seamlessly.
        </p>
      </div>
      <button
        className="premium-btn shadow-sm"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "+ Add Placed Student"}
      </button>
    </div>

    {/* Add Form (Soft UI) */}
    {showForm && (
      <div className="card soft-ui-form mb-5 border-0">
        <div className="card-body p-4">
          <h5 className="mb-4 fw-bold text-dark">✨ Add New Placement</h5>
          <form onSubmit={handleAddStudent} className="row g-3">
            <div className="col-md-3">
              <label className="form-label text-muted fw-semibold">Student Name</label>
              <input
                type="text"
                className="premium-input"
                placeholder="e.g. UseName"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted fw-semibold">Company</label>
              <input
                type="text"
                className="premium-input"
                placeholder="e.g. Com Name"
                required
                value={formData.placedCom}
                onChange={(e) =>
                  setFormData({ ...formData, placedCom: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <label className="form-label text-muted fw-semibold">Package (LPA)</label>
              <input
                type="number"
                className="premium-input"
                placeholder="e.g. 12"
                required
                value={formData.package}
                onChange={(e) =>
                  setFormData({ ...formData, package: e.target.value })
                }
              />
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button type="submit" className="save-btn w-100 h-75">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    
    <div className="row g-4">
      {students.length === 0 ? (
        <div className="col-12 text-center text-muted mt-5">
          <div className="spinner-border text-primary me-2" role="status" style={{width: "1.5rem", height: "1.5rem"}}></div>
          Fetching premium placement records...
        </div>
      ) : (
        students.map((student) => {
          return (
            
            <div
              className="col-12 col-md-6 col-lg-3"
              key={student.id ?? student.Stuid}
            >
              <div className="premium-card h-100 p-3">
                
                
                <div className="id-tag">ID: {student.Stuid ?? student.id}</div>

                <div className="d-flex align-items-center mb-4 mt-2">
                  <div className="avatar-wrapper me-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="student-avatar"
                    />
                  </div>
                  <div>
                    <h6 className="student-name text-truncate" title={student.name}>
                      {student.name}
                    </h6>
                    <span className="company-badge">
                      <i className="bi bi-briefcase-fill me-1"></i>
                      {student.placedCom}
                    </span>
                  </div>
                </div>

                <div className="package-section d-flex justify-content-between align-items-end mt-auto">
                  <span className="text-muted" style={{fontSize: "12px", fontWeight: "600"}}>OFFERED</span>
                  <div className="package-pill">
                    <span className="amount">{student.package}</span>
                    <span className="unit">LPA</span>
                  </div>
                </div>
                <button 
                      className="btn w-100 mt-3 shadow-sm" 
                      style={{ backgroundColor: "#eff6ff", color: "#3b82f6", fontWeight: "600", borderRadius: "10px", fontSize: "14px" }}
                      onClick={() => navigate(`/student/${student.id ?? student.Stuid}`)}
                    >
                      View Profile <i className="bi bi-arrow-right ms-1"></i>
                    </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
    </>
  );
}

export default Student;