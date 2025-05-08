import React, { useState, useEffect } from 'react';
import './PayrollModule.css';

export default function PayrollModule() {
  const tabs = ['Salary Structure', 'Payroll Runs', 'Tax & Deductions', 'Bonuses & Advances', 'Generate Salary Slip', 'Employee Details'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalarySlip, setShowSalarySlip] = useState(false);

  const handleGenerateSlip = () => {
    if (selectedEmployee) setShowSalarySlip(true);
  };


  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setIsDropdownVisible(false);
  };

  const calculateNetSalary = (employee) => {
    const earnings = employee.basicPay + employee.hra + employee.bonuses;
    const deductions = employee.tds + employee.pf + employee.advances;
    return earnings - deductions;
  };



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

  const bonuses = [
    { id: 1, name: 'Performance Bonus', amount: 5000 },
  ];

  const advances = [
    { id: 1, name: 'Salary Advance', amount: 10000 },
  ];

  const generateSalarySlip = (payrollId) => {
    const payroll = payrolls.find(p => p.id === payrollId);
    if (!payroll) return;
    alert(`Salary Slip for the period: ${payroll.periodStart} to ${payroll.periodEnd}\nNet Salary: ₹${payroll.salarySlip.netSalary}`);
  };

  return (
    <div className="payroll-container">
      <h2 className="module-title">Payroll Management</h2>
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'Salary Structure' && (
          <div className="card">
            <h3>Salary Components</h3>
            <table>
              <thead>
                <tr><th>Name</th><th>Calculation Type</th><th>Value</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {salaryComponents.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.calculationType}</td>
                    <td>{c.value}</td>
                    <td>
                      <button className="action-btn">Edit</button>
                      <button className="action-btn danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Payroll Runs' && (
          <div className="card">
            <h3>Payroll Runs</h3>
            <table>
              <thead>
                <tr><th>Period</th><th>Status</th><th>Payslip Type</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {payrolls.map(p => (
                  <tr key={p.id}>
                    <td>{p.periodStart} to {p.periodEnd}</td>
                    <td>{p.status}</td>
                    <td>{p.payslipType}</td>
                    <td>
                      <button className="action-btn" onClick={() => generateSalarySlip(p.id)}>View Salary Slip</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Generate Salary Slip' && (
          <div className="card">
            <h3>Generate Salary Slip</h3>
            <p>Select a payroll run to generate the salary slip</p>
            <select>
              {payrolls.map(p => (
                <option key={p.id} value={p.id}>Period: {p.periodStart} to {p.periodEnd}</option>
              ))}
            </select>
            <button className="action-btn" onClick={() => generateSalarySlip(1)}>Generate</button>
          </div>
        )}

        {activeTab === 'Bonuses & Advances' && (
          <div className="card two-sections">
            <div>
              <h3>Bonuses</h3>
              <ul>
                {bonuses.map(b => <li key={b.id}>{b.name}: ₹{b.amount}</li>)}
              </ul>
            </div>
            <div>
              <h3>Advances</h3>
              <ul>
                {advances.map(a => <li key={a.id}>{a.name}: ₹{a.amount}</li>)}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Tax & Deductions' && (
          <div className="card">
            <h3>Deductions</h3>
            <table>
              <thead>
                <tr><th>Name</th><th>Rate Type</th><th>Rate</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {deductions.map(d => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.rateType}</td>
                    <td>{d.rate}</td>
                    <td><button className="action-btn">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}



        {activeTab === 'Employee Details' && (
          <div className="card">
            <h3>Select Employee</h3>

            <button className="action-btn" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
              {selectedEmployee ? `${selectedEmployee.fullName} (${selectedEmployee.role})` : 'Select Employee'}
            </button>

            {isDropdownVisible && (
              <div className="employee-dropdown">
                {loading ? (
                  <div className="dropdown-item">Loading...</div>
                ) : (
                  users.map(user => (
                    <div
                      key={user._id}
                      className="dropdown-item"
                      onClick={() => handleEmployeeSelect(user)}
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
                  <table>
                    <thead>
                      <tr><th>Full Name</th><th>Role</th><th>Department</th></tr>
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
                <div className="slip-section">
                  <h4>Earnings</h4>
                  <table>
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

                <div className="slip-section">
                  <h4>Deductions</h4>
                  <table>
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

                <div className="slip-section">
                  <h4>Net Salary</h4>
                  <p className="net-salary">
                    ₹{calculateNetSalary({
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
