import React, { useEffect, useState } from "react";
import { getAllFees, deleteFee } from "../services/feeAPI";
import SearchBar from "../components/SearchBar";
import FeeStatus from "../components/FeeStatus";
import "../styles/Dashboard.css";

function Fees() {
  const [fees, setFees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFee, setSelectedFee] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getAllFees().then((data) => {
      setFees(data);
      setFiltered(data);
      setSelectedFee(data[0] || null);
    });
  }, []);

  useEffect(() => {
    let results = fees;
    
    // Filter by search term
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      results = results.filter((f) => {
        const studentName = f.student?.name?.toLowerCase() || "";
        const courseName = f.course?.name?.toLowerCase() || "";
        const status = f.status?.toLowerCase() || "";
        return studentName.includes(lower) || courseName.includes(lower) || status.includes(lower);
      });
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      results = results.filter((f) => f.status === statusFilter);
    }
    
    setFiltered(results);
    if (!results.find((f) => f._id === selectedFee?._id)) {
      setSelectedFee(results[0] || null);
    }
  }, [searchTerm, statusFilter, fees]);

  const handleSelect = (fee) => {
    setSelectedFee(fee);
  };

  const handleDelete = async (id) => {
    await deleteFee(id);
    const updated = fees.filter((f) => f._id !== id);
    setFees(updated);
    setFiltered(updated);
    if (selectedFee?._id === id) {
      setSelectedFee(null);
    }
  };

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <h2>Fee Management</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="status-filter">
          <label>Status Filter:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        
        <ul className="dash-student-list">
          {filtered.map((fee) => (
            <li
              key={fee._id}
              className={`dash-student-item ${
                selectedFee?._id === fee._id ? "active" : ""
              }`}
              onClick={() => handleSelect(fee)}
            >
              <div>
                <strong>{fee.student?.name || "N/A"}</strong>
                <br />
                <small>{fee.course?.name} - ₹{fee.amount}</small>
                <br />
                <span className={`status ${fee.status}`}>{fee.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="dash-main">
        {selectedFee ? (
          <FeeStatus
            fee={selectedFee}
            onDelete={handleDelete}
            layout="detail"
          />
        ) : (
          <p className="dash-empty">Select a fee record</p>
        )}
      </main>
    </div>
  );
}

export default Fees;