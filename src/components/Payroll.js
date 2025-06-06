import React, { useState, useEffect } from 'react';
import './PayrollModule.css';

export default function PayrollModule() {
  const tabs = [
    'Salary Structure',
    'Payroll Runs',
    'Tax & Deductions',
    'Bonuses & Advances',
    'Generate Salary Slip',
    'Employee Details',
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalarySlip, setShowSalarySlip] = useState(false);

  // Fetch users/employees on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // When an employee is selected from dropdown
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setIsDropdownVisible(false);
    setShowSalarySlip(false);
  };

  // Show salary slip UI
  const handleGenerateSlip = () => {
    if (selectedEmployee) setShowSalarySlip(true);
  };

  // Calculate net salary
  const calculateNetSalary = (employee) => {
    const earnings = (employee.basicPay ?? 0) + (employee.hra ?? 0) + (employee.bonuses ?? 0);
    const deductions = (employee.tds ?? 0) + (employee.pf ?? 0) + (employee.advances ?? 0);
    return earnings - deductions;
  };

  // Static data examples
  const salaryComponents = [
    { id: 1, name: 'Basic Pay', calculationType: 'Fixed', value: 30000 },
    { id: 2, name: 'HRA', calculationType: 'Percentage', value: 20 },
  ];

  const payrolls = [
    {
      id: 1,
      periodStart: '2025-05-01',
      periodEnd: '2025-05-31',
      status: 'Completed',
      payslipType: 'Monthly',
      salarySlip: { basic: 30000, hra: 6000, deductions: 5000, bonuses: 1000, netSalary: 34500 },
    },
    {
      id: 2,
      periodStart: '2025-06-01',
      periodEnd: '2025-06-30',
      status: 'Pending',
      payslipType: 'Monthly',
      salarySlip: { basic: 30000, hra: 6000, deductions: 5000, bonuses: 1000, netSalary: 34500 },
    },
  ];

  const deductions = [
    { id: 1, name: 'PF', rateType: '%', rate: 12 },
    { id: 2, name: 'TDS', rateType: '%', rate: 10 },
  ];

  const bonuses = [{ id: 1, name: 'Performance Bonus', amount: 5000 }];

  const advances = [{ id: 1, name: 'Salary Advance', amount: 10000 }];

  // Alert salary slip details on button click
  const generateSalarySlip = (payrollId) => {
    const payroll = payrolls.find((p) => p.id === payrollId);
    if (!payroll) return;
    alert(
      `Salary Slip for the period: ${payroll.periodStart} to ${payroll.periodEnd}\nNet Salary: ₹${payroll.salarySlip.netSalary.toLocaleString()}`
    );
  };

  return (
    <div className="payroll-container">
      <h2 className="module-title">Payroll Management</h2>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              setShowSalarySlip(false);
              setIsDropdownVisible(false);
            }}
            aria-label={`Switch to ${tab} tab`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {/* Salary Structure */}
        {activeTab === 'Salary Structure' && (
          <div className="card">
            <h3>Salary Components</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Calculation Type</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaryComponents.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.calculationType}</td>
                    <td>{c.value}</td>
                    <td>
                      <button className="action-btn">Edit</button>{' '}
                      <button className="action-btn danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payroll Runs */}
        {activeTab === 'Payroll Runs' && (
          <div className="card">
            <h3>Payroll Runs</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Status</th>
                  <th>Payslip Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.periodStart} to {p.periodEnd}
                    </td>
                    <td>{p.status}</td>
                    <td>{p.payslipType}</td>
                    <td>
                      <button className="action-btn" onClick={() => generateSalarySlip(p.id)}>
                        View Salary Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Generate Salary Slip */}
        {activeTab === 'Generate Salary Slip' && (
          <div className="card">
            <h3>Generate Salary Slip</h3>
            <p>Select a payroll run to generate the salary slip</p>
            <select className="select-payroll">
              {payrolls.map((p) => (
                <option key={p.id} value={p.id}>
                  Period: {p.periodStart} to {p.periodEnd}
                </option>
              ))}
            </select>
            <button className="action-btn" onClick={() => generateSalarySlip(1)}>
              Generate
            </button>
          </div>
        )}

        {/* Bonuses & Advances */}
        {activeTab === 'Bonuses & Advances' && (
          <div className="card two-sections">
            <div>
              <h3>Bonuses</h3>
              <ul>
                {bonuses.map((b) => (
                  <li key={b.id}>
                    {b.name}: ₹{b.amount.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Advances</h3>
              <ul>
                {advances.map((a) => (
                  <li key={a.id}>
                    {a.name}: ₹{a.amount.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tax & Deductions */}
        {activeTab === 'Tax & Deductions' && (
          <div className="card">
            <h3>Deductions</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rate Type</th>
                  <th>Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deductions.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.rateType}</td>
                    <td>{d.rate}%</td>
                    <td>
                      <button className="action-btn">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Employee Details */}
        {activeTab === 'Employee Details' && (
          <div className="card employee-details-card">
            <h3>Select Employee</h3>

            <button
              className="action-btn dropdown-toggle"
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownVisible}
            >
              {selectedEmployee
                ? `${selectedEmployee.fullName} (${selectedEmployee.role})`
                : 'Select Employee'}
              <span className={`arrow ${isDropdownVisible ? 'up' : 'down'}`}></span>
            </button>

            {isDropdownVisible && (
              <div className="employee-dropdown" role="listbox" tabIndex={-1}>
                {loading ? (
                  <div className="dropdown-item">Loading...</div>
                ) : users.length === 0 ? (
                  <div className="dropdown-item">No employees found.</div>
                ) : (
                  users.map((user) => (
                    <div
                      key={user._id}
                      className="dropdown-item"
                      onClick={() => handleEmployeeSelect(user)}
                      role="option"
                      tabIndex={0}
                      aria-selected={selectedEmployee && selectedEmployee._id === user._id}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleEmployeeSelect(user);
                      }}
                    >
                      {user.fullName} - {user.department}
                    </div>

                  ))
                )}
              </div>
            )}

            {selectedEmployee && (
              <>
                <div className="employee-info-table">
                  <table className="styled-table small">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{selectedEmployee.fullName}</td>
                        <td>{selectedEmployee.role}</td>
                        <td>{selectedEmployee.department}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button className="action-btn primary" onClick={handleGenerateSlip}>
                  Generate Salary Slip
                </button>
              </>
            )}

            {showSalarySlip && selectedEmployee && (
              <div className="salary-slip">
                <h3>Salary Slip</h3>

                <div className="slip-section earnings">
                  <h4>Earnings</h4>
                  <table className="styled-table small">
                    <tbody>
                      <tr>
                        <th>Basic Pay</th>
                        <td>₹{(selectedEmployee.basicPay ?? 0).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th>HRA</th>
                        <td>₹{(selectedEmployee.hra ?? 0).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th>Bonuses</th>
                        <td>₹{(selectedEmployee.bonuses ?? 0).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="slip-section deductions">
                  <h4>Deductions</h4>
                  <table className="styled-table small">
                    <tbody>
                      <tr>
                        <th>TDS</th>
                        <td>₹{(selectedEmployee.tds ?? 0).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th>PF</th>
                        <td>₹{(selectedEmployee.pf ?? 0).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th>Advances</th>
                        <td>₹{(selectedEmployee.advances ?? 0).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="slip-section net-salary-section">
                  <h4>Net Salary</h4>
                  <p className="net-salary">
                    ₹
                    {calculateNetSalary({
                      basicPay: selectedEmployee.basicPay ?? 0,
                      hra: selectedEmployee.hra ?? 0,
                      bonuses: selectedEmployee.bonuses ?? 0,
                      tds: selectedEmployee.tds ?? 0,
                      pf: selectedEmployee.pf ?? 0,
                      advances: selectedEmployee.advances ?? 0,
                    }).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
