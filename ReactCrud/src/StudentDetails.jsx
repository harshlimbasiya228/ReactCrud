import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import './StudentDetails.css';
function StudentDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [student,setStudent] = useState(null);

    const apiUrl = `${import.meta.env.VITE_API_URL}/${id}`;

    useEffect(()=>{
        fetch(apiUrl,{
            method:"GET"
        })
        .then((res)=>res.json())
        .then(res => setStudent(res))
    },[id])

    const handleDelete =() => {
        fetch(apiUrl,{method: "DELETE"})
        .then((res)=>res.json())
        .then(()=>{

            navigate('/student');
        })
    }

    const handleEdit = () => {
        navigate(`/student/edit/${id}`);
    }
    if (!student) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status"></div>
                <span className="ms-2 fw-bold text-muted">Loading Details...</span>
            </div>
        );
    }
  return (
    <>
    <div className="detail-page-wrapper">
      
      <button className="btn-back" onClick={() => navigate("/student")}>
        <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
      </button>

      <div className="detail-card shadow-lg">
        <div className="card-header-bg"></div>
        
        <div className="avatar-section">
          <img src={student.avatar} alt={student.name} className="detail-avatar shadow" />
          <h2 className="mt-3 fw-bold text-dark">{student.name}</h2>
          <span className="badge bg-secondary mb-3 px-3 py-2">Student ID: {student.Stuid ?? student.id}</span>
        </div>

        <div className="info-section">
          <div className="info-box">
            <span className="info-label"><i className="bi bi-building me-2"></i>Company</span>
            <span className="info-value text-primary fw-bold">{student.placedCom}</span>
          </div>
          
          <div className="info-box">
            <span className="info-label"><i className="bi bi-cash-coin me-2"></i>Package Offered</span>
            <span className="info-value text-success fw-bold">{student.package} LPA</span>
          </div>
        </div>

        <div className="action-buttons mt-4">
          <button className="btn-action btn-edit shadow-sm" onClick={handleEdit}>
            <i className="bi bi-pencil-square me-2"></i> Edit Details
          </button>
          <button className="btn-action btn-delete shadow-sm" onClick={handleDelete}>
            <i className="bi bi-trash3-fill me-2"></i> Delete Record
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default StudentDetails