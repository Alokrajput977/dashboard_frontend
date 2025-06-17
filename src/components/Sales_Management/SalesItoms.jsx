import React from "react";
import "./SalesLineItems.css";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4f61d5", "#7c88e8", "#a6b1f2", "#d1d9ff"];

const salesData = [
  {
    id: 1,
    invoice: "INV1001",
    customer: "Amit Sharma",
    product: "Wireless Mouse",
    description: "Ergonomic mouse with USB receiver",
    category: "Electronics",
    quantity: 2,
    unitPrice: 1200,
    discount: 5,
    tax: 18,
  },
  {
    id: 2,
    invoice: "INV1002",
    customer: "Priya Mehta",
    product: "Bluetooth Keyboard",
    description: "Slim, rechargeable keyboard",
    category: "Accessories",
    quantity: 1,
    unitPrice: 1800,
    discount: 10,
    tax: 18,
  },
  {
    id: 3,
    invoice: "INV1003",
    customer: "Rahul Verma",
    product: "Monitor Stand",
    description: "Adjustable aluminum stand",
    category: "Furniture",
    quantity: 3,
    unitPrice: 2500,
    discount: 0,
    tax: 18,
  },
];

const SalesLineItems = () => {
  const calculateTotal = (item) => {
    const discountAmt = (item.unitPrice * item.discount) / 100;
    const priceAfterDiscount = item.unitPrice - discountAmt;
    const taxAmt = (priceAfterDiscount * item.tax) / 100;
    return (priceAfterDiscount + taxAmt) * item.quantity;
  };

  const grandTotal = salesData.reduce((acc, item) => acc + calculateTotal(item), 0);

  const productData = salesData.map((item) => ({
    name: item.product,
    value: calculateTotal(item),
  }));

  const taxData = salesData.map((item) => ({
    name: item.product,
    value: ((item.unitPrice - (item.unitPrice * item.discount) / 100) * item.tax * item.quantity) / 100,
  }));

  return (
    <div className="sales-container">
      <h2 className="sales-heading">Sales Line Items Report</h2>

      <div className="chart-top-row">
        <div className="chart-box">
          <h3>Sales by Product</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={productData} dataKey="value" nameKey="name" outerRadius={100} label>
                {productData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Tax Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={taxData} dataKey="value" nameKey="name" outerRadius={100} label>
                {taxData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <table className="sales-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Description</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Unit Price (₹)</th>
            <th>Discount (%)</th>
            <th>Tax (%)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.invoice}</td>
              <td>{item.customer}</td>
              <td>{item.product}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice.toFixed(2)}</td>
              <td>{item.discount}</td>
              <td>{item.tax}</td>
              <td>{calculateTotal(item).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="10" style={{ textAlign: "right" }}>Grand Total (₹)</td>
            <td><strong>{grandTotal.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <div className="footer-note">Report generated on {new Date().toLocaleDateString()}</div>
    </div>
  );
};

export default SalesLineItems;
