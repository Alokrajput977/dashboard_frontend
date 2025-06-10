import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import './RowDetails.css';

const RowDetails = () => {
  const { boxId, rowId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state;
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleDownloadPDF = () => {
    const cardElement = document.querySelector('.details-card');
    if (cardElement) {
      html2canvas(cardElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, imgHeight);
        pdf.save(`row-details-${boxId}-${rowId}.pdf`);
      });
    }
  };

  const handleDownloadExcel = () => {
    const sheetData = Object.entries(rowData).map(([key, value]) => ({
      Field: key,
      Value: value !== null && value !== undefined ? value : 'null'
    }));
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Details");
    XLSX.writeFile(workbook, `row-details-${boxId}-${rowId}.xlsx`);
  };

  if (!rowData) {
    return (
      <div className={`row-details ${darkMode ? 'dark' : 'light'}`}>
        <div className="details-header">
          <h2>No row data available</h2>
          <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`row-details ${darkMode ? 'dark' : 'light'}`}>
      <div className="details-header">
        <h1>Row Details - {boxId}</h1>
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={handleDownloadPDF}>Download PDF</button>
          <button onClick={handleDownloadExcel}>Download Excel</button>
        </div>
      </div>

      <div className="details-card">
        <h2>Detail Information</h2>
        <table>
          <tbody>
            {Object.entries(rowData).map(([key, value], index) => (
              <tr key={index}>
                <th>{key}</th>
                <td>{value !== null && value !== undefined ? value : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RowDetails;
