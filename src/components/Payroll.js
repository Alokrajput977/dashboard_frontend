import React, { useState } from 'react';
import './PayrollModule.css';

// Sample data for components, payroll runs, deductions, bonuses, and advances
const salaryComponents = [
  { id: 1, name: 'Basic Pay', calculationType: 'Fixed', value: 30000 },
  { id: 2, name: 'HRA', calculationType: 'Percentage', value: 20 }, // 20% of Basic Pay
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

export default function PayrollModule() {
  const tabs = ['Salary Structure', 'Payroll Runs', 'Tax & Deductions', 'Bonuses & Advances', 'Generate Salary Slip'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Function to generate salary slip (example)
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
                <tr>
                  <th>Period</th>
                  <th>Status</th>
                  <th>Payslip Type</th>
                  <th>Actions</th>
                </tr>
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

        {activeTab === 'Generate Salary Slip' && (
          <div className="card">
            <h3>Generate Salary Slip</h3>
            <p>Select a payroll run to generate the salary slip</p>
            <select>
              {payrolls.map(p => (
                <option key={p.id} value={p.id}>Period: {p.periodStart} to {p.periodEnd}</option>
              ))}
            </select>
            <button className="action-btn" onClick={() => generateSalarySlip()}>Generate</button>
          </div>
        )}
      </div>
    </div>
  );
}
