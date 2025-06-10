// SalesLifecycle.jsx
import React from 'react';
import './SalesLifecycle.css';
import { FaCheck, FaClock, FaTruck, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SalesLifecycle = () => {
    const navigate = useNavigate();

    const salesData = [
        {
            id: 1, clientName: "ABC Corp", salesOpportunity: "Enterprise Upgrade",
            quotationAmount: "$5,000", conversionRate: "80%", status: "Pending", closeDate: "2023-01-10"
        },
        {
            id: 2, clientName: "XYZ Ltd", salesOpportunity: "New Client Onboarding",
            quotationAmount: "$3,200", conversionRate: "65%", status: "Approved", closeDate: "2023-02-05"
        },
        {
            id: 3, clientName: "InnoTech", salesOpportunity: "Software Integration",
            quotationAmount: "$4,500", conversionRate: "70%", status: "Delivered", closeDate: "2023-03-12"
        },
        {
            id: 4, clientName: "TechNova", salesOpportunity: "Cloud Migration",
            quotationAmount: "$8,000", conversionRate: "85%", status: "Approved", closeDate: "2023-04-01"
        },
        {
            id: 5, clientName: "BrightSoft", salesOpportunity: "System Maintenance",
            quotationAmount: "$1,200", conversionRate: "60%", status: "Pending", closeDate: "2023-04-20"
        },
        {
            id: 6, clientName: "CoreData", salesOpportunity: "Data Analysis",
            quotationAmount: "$2,500", conversionRate: "75%", status: "Delivered", closeDate: "2023-05-15"
        }, {
            id: 7,
            clientName: "MarketWave",
            salesOpportunity: "Market Expansion",
            quotationAmount: "$6,300",
            conversionRate: "68%",
            status: "Pending",
            closeDate: "2023-06-10",
        },
        {
            id: 8,
            clientName: "NextGen",
            salesOpportunity: "Technology Upgrade",
            quotationAmount: "$7,100",
            conversionRate: "80%",
            status: "Approved",
            closeDate: "2023-07-07",
        },
        {
            id: 9,
            clientName: "Processify",
            salesOpportunity: "Process Optimization",
            quotationAmount: "$3,800",
            conversionRate: "72%",
            status: "Delivered",
            closeDate: "2023-08-16",
        },
        {
            id: 10,
            clientName: "SecureX",
            salesOpportunity: "Security Enhancement",
            quotationAmount: "$4,900",
            conversionRate: "78%",
            status: "Approved",
            closeDate: "2023-09-01",
        },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <FaCheck className="status-icon approved" />;
            case 'Pending': return <FaClock className="status-icon pending" />;
            case 'Delivered': return <FaTruck className="status-icon delivered" />;
            default: return null;
        }
    };

    const handleRowClick = (row) => {
        navigate(`/details/${row.id}`, { state: row });
    };

    return (
        <div className="sales-lifecycle">
            <div className="header">
                <FaChartLine className="header-icon" />
                <div>
                    <h1 className="title">Sales Lifecycle</h1>
                    <p className="subtitle">Track opportunities from quotation to delivery</p>
                </div>
            </div>
            <div className="table-container">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Sales Opportunity</th>
                            <th>Quotation Amount</th>
                            <th>Conversion Rate</th>
                            <th>Status</th>
                            <th>Close Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map((sale) => (
                            <tr key={sale.id} onClick={() => handleRowClick(sale)} style={{ cursor: 'pointer' }}>
                                <td>{sale.clientName}</td>
                                <td>{sale.salesOpportunity}</td>
                                <td>{sale.quotationAmount}</td>
                                <td>{sale.conversionRate}</td>
                                <td className="status-cell">{getStatusIcon(sale.status)} {sale.status}</td>
                                <td>{sale.closeDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesLifecycle;
