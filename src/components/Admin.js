// src/components/Admin.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import '../styles/Survey.css';

const Admin = () => {
  const [message, setMessage] = useState('');

  const generateExcel = async (surveyType) => {
    const q = query(collection(db, surveyType), orderBy('nomeCognome')); // Example ordering by 'nome'
    const querySnapshot = await getDocs(q);

    let surveyData = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      // Convert arrays to strings for Excel export
      for (let key in data) {
        if (Array.isArray(data[key])) {
          data[key] = data[key].join(', ');
        }
      }
      surveyData.push(data);
    });

    const worksheet = XLSX.utils.json_to_sheet(surveyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Surveys');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${surveyType}Survey.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleGenerateAllExcels = async () => {
    try {
      await generateExcel('Subscribe');
      setMessage('All Excel files generated successfully!');
    } catch (error) {
      console.error('Error generating Excel files: ', error);
      setMessage('Error generating Excel files. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <button onClick={handleGenerateAllExcels}>Generate All Excel Files</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Admin;
