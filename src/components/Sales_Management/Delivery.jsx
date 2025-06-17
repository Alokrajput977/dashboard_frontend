// DeliveryTracking.js

import React, { useState, useEffect } from 'react';
import './DeliveryTracking.css';
import {
  FaListAlt,
  FaChartLine,
  FaCog,
} from 'react-icons/fa';

const mockShipments = [
  {
    id: 'SO-1001',
    trackingNumber: 'TRK123456789',
    status: 'In Transit',
    orderDate: '2025-06-01',
    shipmentDate: '2025-06-02',
    deliveryDate: '',
    clientName: 'Alice Johnson',
    item: 'Product A',
    quantity: 10,
    origin: 'Warehouse 1',
    destination: 'Mumbai',
  },
  {
    id: 'SO-1002',
    trackingNumber: 'TRK987654321',
    status: 'Delivered',
    orderDate: '2025-05-25',
    shipmentDate: '2025-05-26',
    deliveryDate: '2025-06-04',
    clientName: 'Bob Smith',
    item: 'Product B',
    quantity: 5,
    origin: 'Warehouse 2',
    destination: 'Delhi',
  },
  {
    id: 'SO-1003',
    trackingNumber: 'TRK112233445',
    status: 'Pending',
    orderDate: '2025-06-05',
    shipmentDate: '',
    deliveryDate: '',
    clientName: 'Charlie Lee',
    item: 'Product C',
    quantity: 20,
    origin: 'Warehouse 1',
    destination: 'Bangalore',
  },
  // Add more mock entries as desired
];

function DeliveryTracking() {
  // Top nav pages: 'tracking', 'reports', 'settings'
  const [activePage, setActivePage] = useState('tracking');

  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filtered, setFiltered] = useState([]);

  // In real use, fetch from API
  useEffect(() => {
    // Simulate API fetch; replace with real fetch
    setShipments(mockShipments);
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = [...shipments];
    if (statusFilter !== 'All') {
      temp = temp.filter((s) => s.status === statusFilter);
    }
    if (searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase();
      temp = temp.filter(
        (s) =>
          s.id.toLowerCase().includes(term) ||
          s.trackingNumber.toLowerCase().includes(term) ||
          s.clientName.toLowerCase().includes(term) ||
          s.item.toLowerCase().includes(term)
      );
    }
    setFiltered(temp);
  }, [shipments, searchTerm, statusFilter]);

  // Handler for status update (demo)
  const handleStatusChange = (id, newStatus) => {
    const updated = shipments.map((s) =>
      s.id === id
        ? {
            ...s,
            status: newStatus,
            shipmentDate:
              newStatus !== 'Pending'
                ? s.shipmentDate || new Date().toISOString().slice(0, 10)
                : '',
            deliveryDate:
              newStatus === 'Delivered'
                ? s.deliveryDate || new Date().toISOString().slice(0, 10)
                : s.deliveryDate,
          }
        : s
    );
    setShipments(updated);
  };

  // Demo “Add Shipment”
  const handleAddShipment = () => {
    const id = prompt('Enter Sales Order ID (e.g., SO-1004):');
    if (!id) return;
    const trackingNumber = prompt('Enter Tracking Number:');
    if (!trackingNumber) return;
    const clientName = prompt('Enter Client Name:');
    if (!clientName) return;
    const item = prompt('Enter Item Description:');
    if (!item) return;
    const quantityStr = prompt('Enter Quantity:');
    const quantity = parseInt(quantityStr, 10) || 0;
    const origin = prompt('Enter Origin Location:') || '';
    const destination = prompt('Enter Destination Location:') || '';
    const newEntry = {
      id,
      trackingNumber,
      status: 'Pending',
      orderDate: new Date().toISOString().slice(0, 10),
      shipmentDate: '',
      deliveryDate: '',
      clientName,
      item,
      quantity,
      origin,
      destination,
    };
    setShipments([newEntry, ...shipments]);
  };

  // Render the tracking view (table + filters)
  const renderTrackingView = () => (
    <>
      {/* Filters */}
      <section className="dt-filters">
        <input
          type="text"
          placeholder="Search by Order ID, Tracking #, Client, Item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dt-search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="dt-select"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delayed">Delayed</option>
        </select>
      </section>

      {/* Table/List */}
      <section className="dt-table-section">
        {filtered.length === 0 ? (
          <p className="dt-no-results">No shipments found.</p>
        ) : (
          <div className="dt-table-wrapper">
            <table className="dt-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Tracking #</th>
                  <th>Client</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Shipment Date</th>
                  <th>Delivery Date</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.trackingNumber}</td>
                    <td>{s.clientName}</td>
                    <td>{s.item}</td>
                    <td>{s.quantity}</td>
                    <td>
                      <select
                        className="dt-status-select"
                        value={s.status}
                        onChange={(e) =>
                          handleStatusChange(s.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Delayed">Delayed</option>
                      </select>
                    </td>
                    <td>{s.orderDate}</td>
                    <td>{s.shipmentDate || '-'}</td>
                    <td>{s.deliveryDate || '-'}</td>
                    <td>{s.origin}</td>
                    <td>{s.destination}</td>
                    <td>
                      <button
                        className="dt-action-btn"
                        onClick={() => alert(`View details for ${s.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );

  // Placeholder for other pages
  const renderPlaceholder = (title) => (
    <>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#94a3b8',
        }}
      >
        <p style={{ fontSize: '1.2rem' }}>{title} - Coming soon...</p>
      </div>
    </>
  );

  return (
    <div className="dt-container">
      <main className="dt-main">
        {/* Header with title, nav buttons, and add button */}
        <header className="dt-header">
          <div className="title-and-nav">
            <h1>Delivery Tracker</h1>
            <nav className="dt-top-nav">
              <button
                className={`dt-top-nav-btn ${
                  activePage === 'tracking' ? 'active' : ''
                }`}
                onClick={() => setActivePage('tracking')}
              >
                <FaListAlt style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Tracking
              </button>
              <button
                className={`dt-top-nav-btn ${
                  activePage === 'reports' ? 'active' : ''
                }`}
                onClick={() => setActivePage('reports')}
              >
                <FaChartLine style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Reports
              </button>
              <button
                className={`dt-top-nav-btn ${
                  activePage === 'settings' ? 'active' : ''
                }`}
                onClick={() => setActivePage('settings')}
              >
                <FaCog style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Settings
              </button>
            </nav>
          </div>
          {activePage === 'tracking' && (
            <button className="dt-add-btn" onClick={handleAddShipment}>
              + Add Shipment
            </button>
          )}
        </header>

        {/* Main content under header */}
        <div className="dt-content">
          {activePage === 'tracking' && renderTrackingView()}
          {activePage === 'reports' && renderPlaceholder('Reports')}
          {activePage === 'settings' && renderPlaceholder('Settings')}
        </div>
      </main>
    </div>
  );
}

export default DeliveryTracking;
