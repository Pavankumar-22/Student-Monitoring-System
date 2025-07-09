import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentCard.css";

function FeeStatus({ fee, onDelete, layout }) {
  const navigate = useNavigate();

  if (!fee) return null;

  if (layout === "detail") {
    return (
      <div className="student-card-detail">
        <h3>Fee Details</h3>
        <p><strong>Student:</strong> {fee.student?.name || "N/A"}</p>
        <p><strong>Course:</strong> {fee.course?.code} - {fee.course?.name || "N/A"}</p>
        <p><strong>Amount:</strong> ₹{fee.amount || "N/A"}</p>
        <p><strong>Due Date:</strong> {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : "N/A"}</p>
        <p><strong>Status:</strong>
          <span className={`fee-status ${fee.status}`}>{fee.status || "N/A"}</span>
        </p>
        <p><strong>Payment Date:</strong> {fee.paymentDate ? new Date(fee.paymentDate).toLocaleDateString() : "Not paid"}</p>
        <p><strong>Payment Method:</strong> {fee.paymentMethod || "N/A"}</p>
        <p><strong>Transaction ID:</strong> {fee.transactionId || "N/A"}</p>
        <p><strong>Remarks:</strong> {fee.remarks || "None"}</p>

        <div className="student-card-actions">
          <button onClick={() => navigate(`/edit-fee/${fee._id}`)}>Edit</button>
          <button
            className="danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this fee record?")) {
                onDelete(fee._id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  // Default layout (compact)
  return (
    <div className="student-card">
      <h4>{fee.student?.name || "N/A"}</h4>
      <p><strong>Course:</strong> {fee.course?.name || "N/A"}</p>
      <p><strong>Amount:</strong> ₹{fee.amount || "N/A"}</p>
      <p><strong>Status:</strong>
        <span className={`fee-status ${fee.status}`}>{fee.status || "Unknown"}</span>
      </p>
      <div className="student-card-actions">
        <button onClick={() => navigate(`/fee/${fee._id}`)}>View</button>
        <button
          className="danger"
          onClick={() => {
            if (window.confirm("Delete this fee record?")) {
              onDelete(fee._id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FeeStatus;