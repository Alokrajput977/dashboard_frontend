import React, { useState, useRef, useCallback , useEffect} from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Attendance.css";
import "./Employees.css";

const AttendanceApp = ({theme }) => {
  const [page, setPage] = useState("attendance");

  return (
    <div className={`container ${theme} container`} >
      <header className="top-nav">
        {["attendance", "shifts", "leave", "overtime", "employees"].map((p, label) => (
          <button
            key={p}
            className={page === p ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage(p)}
          >
            {["attendance", "shifts", "leave", "overtime", "employees"][label] === "attendance" && "🕒 Attendance"}
            {["attendance", "shifts", "leave", "overtime", "employees"][label] === "shifts" && "🕐 Shifts"}
            {["attendance", "shifts", "leave", "overtime", "employees"][label] === "leave" && "📆 Leave"}
            {["attendance", "shifts", "leave", "overtime", "employees"][label] === "overtime" && "⏱ Overtime"}
            {["attendance", "shifts", "leave", "overtime", "employees"][label] === "employees" && "📄 Employees"}
          </button>
        ))}
      </header>
      <main className="content">
        {{
          attendance: <Attendance />,
          shifts: <Shifts />,
          leave: <Leave />,
          overtime: <Overtime />,
          employees: <Employees />
        }[page]}
      </main>
    </div>
  );
};

const Attendance = () => {
  const webcamRef = useRef(null);
  const [showCam, setShowCam] = useState(false);
  const [records, setRecords] = useState([]); // {id,type,time,data}

  const recordEvent = useCallback((type, data = null) => {
    setRecords(r => [
      ...r,
      { id: uuidv4(), type, time: format(new Date(), "yyyy-MM-dd HH:mm:ss"), data }
    ]);
    if (type === "camera") setShowCam(false);
  }, []);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    recordEvent("camera", imageSrc);
  };

  const handleFingerprint = async () => {
    try {
      const cred = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([ /* dummy */]),
          timeout: 60000,
          allowCredentials: [],
          userVerification: "required"
        }
      });
      recordEvent("fingerprint", cred.id || "unknown-id");
    } catch (e) {
      console.error(e);
      alert("Fingerprint scan failed or not supported");
    }
  };

  return (
    <div className="page">
      <h1>Clock In / Out</h1>

      <div className="sensor-section">
        <div
          className="sensor-card clickable"
          onClick={() => recordEvent("clock-in")}
        >
          <h3>🕑 Clock In</h3>
        </div>
        <div
          className="sensor-card clickable"
          onClick={() => recordEvent("clock-out")}
        >
          <h3>🕘 Clock Out</h3>
        </div>
        <div
          className="sensor-card clickable"
          onClick={() => handleFingerprint()}
        >
          <h3>🔒 Fingerprint</h3>
          <div className="sensor-box small">Tap fingerprint sensor</div>
        </div>
        <div
          className="sensor-card clickable"
          onClick={() => setShowCam(true)}
        >
          <h3>📷 Camera</h3>
          <div className="sensor-box small">Open camera</div>
        </div>
      </div>

      {showCam && (
        <div className="cam-modal">
          <Webcam
            audio={false}
            mirrored
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
          />
          <button className="action-btn" onClick={handleCapture}>
            Capture
          </button>
          <button className="action-btn" onClick={() => setShowCam(false)}>
            Cancel
          </button>
        </div>
      )}

      <h2>Records</h2>
      <table className="records-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.time}</td>
              <td>{r.type}</td>
              <td>
                {r.type === "camera" ? (
                  <img src={r.data} alt="capture" className="thumb" />
                ) : (
                  r.data || "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Shifts = () => (
  <div className="page">
    <h1>Shift Scheduling</h1>
    <table>
      <thead>
        <tr>
          <th>Shift Name</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Morning</td>
          <td>08:00 AM</td>
          <td>04:00 PM</td>
        </tr>
        <tr>
          <td>Evening</td>
          <td>04:00 PM</td>
          <td>12:00 AM</td>
        </tr>
      </tbody>
    </table>
  </div>
);
const Leave = () => (
  <div className="page">
    <h1>Leave Application</h1>
    <form className="leave-form">
      <input type="text" placeholder="Leave Type (e.g. Sick)" />
      <input type="date" />
      <input type="date" />
      <textarea placeholder="Reason for leave" />
      <button type="submit" className="action-btn">Apply</button>
    </form>
  </div>
);
const Overtime = () => (
  <div className="page">
    <h1>Overtime Records</h1>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Employee ID</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-05-01</td>
          <td>EMP123</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2025-05-03</td>
          <td>EMP124</td>
          <td>2.5</td>
        </tr>
      </tbody>
    </table>
  </div>
);
const Employees = () => {
  const [employees, setEmployees] = useState([useEffect]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (emp) => setSelectedEmployee(emp);

  const calculateGST = (salary) => {
    const gst = salary * 0.18;
    return {
      gst,
      netSalary: salary - gst,
    };
  };

  return (
    <div className="employee-page">
      <h1 className="section-title">Employee List</h1>
      <div className="employee-table-container">
        {loading ? (
          <p className="loading-text">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p className="loading-text">No employees found.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} onClick={() => handleSelect(emp)}>
                  <td>{emp.fullName}</td>
                  <td>{emp.username}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                  <td>
                    {new Date(emp.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedEmployee && (
        <div className="salary-slip">
          <h2>Salary Slip</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Employee ID:</strong></td>
                <td>{selectedEmployee._id}</td>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{selectedEmployee.fullName}</td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>{selectedEmployee.department}</td>
              </tr>
              <tr>
                <td><strong>Role:</strong></td>
                <td>{selectedEmployee.role}</td>
              </tr>
              <tr>
                <td><strong>Gross Salary:</strong></td>
                <td>₹{selectedEmployee.salary?.toLocaleString() || '0'}</td>
              </tr>
              <tr>
                <td><strong>GST (18%):</strong></td>
                <td>
                  ₹{calculateGST(selectedEmployee.salary || 0).gst.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td><strong>Net Salary:</strong></td>
                <td>
                  ₹{calculateGST(selectedEmployee.salary || 0).netSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceApp;
