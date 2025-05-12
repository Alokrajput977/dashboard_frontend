import React, { useState } from 'react';
import './ShiftScheduling.css';

const ShiftScheduling = () => {
  const [shifts, setShifts] = useState([
    { id: 1, employee: 'Amit Sharma', shiftType: 'Day', attendance: 'Present', compliance: 'Compliant' },
    { id: 2, employee: 'Priya Verma', shiftType: 'Night', attendance: 'Absent', compliance: 'Non-Compliant' },
  ]);

  const [newShift, setNewShift] = useState({
    employee: '',
    shiftType: 'Day',
    attendance: 'Present',
    compliance: 'Compliant',
  });

  const handleChange = (e) => {
    setNewShift({ ...newShift, [e.target.name]: e.target.value });
  };

  const addShift = () => {
    if (!newShift.employee.trim()) return alert("Please enter employee name");
    const updated = [...shifts, { id: Date.now(), ...newShift }];
    setShifts(updated);
    setNewShift({
      employee: '',
      shiftType: 'Day',
      attendance: 'Present',
      compliance: 'Compliant',
    });
  };

  return (
    <div className="shift-container">
      <h2><i className="fas fa-calendar-check icon-title" /> Shift Scheduling</h2>

      <div className="shift-form">
        <div className="form-group">
          <i className="fas fa-user" />
          <input
            type="text"
            name="employee"
            placeholder="Employee Name"
            value={newShift.employee}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <i className="fas fa-moon" />
          <select name="shiftType" value={newShift.shiftType} onChange={handleChange}>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
            <option value="Rotational">Rotational</option>
          </select>
        </div>

        <div className="form-group">
          <i className="fas fa-user-check" />
          <select name="attendance" value={newShift.attendance} onChange={handleChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="form-group">
          <i className="fas fa-clipboard-check" />
          <select name="compliance" value={newShift.compliance} onChange={handleChange}>
            <option value="Compliant">Compliant</option>
            <option value="Non-Compliant">Non-Compliant</option>
          </select>
        </div>

        <button onClick={addShift}><i className="fas fa-plus-circle button" /> Add Shift</button>
      </div>

      <table className="shift-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Shift Type</th>
            <th>Attendance</th>
            <th>Compliance</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.employee}</td>
              <td>{shift.shiftType}</td>
              <td className={shift.attendance === 'Present' ? 'present' : 'absent'}>
                {shift.attendance}
              </td>
              <td className={shift.compliance === 'Compliant' ? 'compliant' : 'non-compliant'}>
                {shift.compliance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftScheduling;
