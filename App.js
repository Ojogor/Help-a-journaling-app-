import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import Journal from './components/Journal.js';
import Navigator from './components/Navigator';
import data from './data';

function App() {
  const [currentEntry, setCurrentEntry] = useState(0); // Initial entry index
  const [journalData, setJournalData] = useState(data); // State for journal data

  const Print = () => {
    const printContents = document.getElementById('printablediv').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContents);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Load data from local storage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('journalData');
    if (savedData) {
      setJournalData(JSON.parse(savedData));
    }
  }, []);

  // Save data to local storage whenever the journalData state changes
  useEffect(() => {
    localStorage.setItem('journalData', JSON.stringify(journalData));
  }, [journalData]);

  const handleNextEntry = () => {
    setCurrentEntry((prevEntry) => (prevEntry + 1) % journalData.length);
  };

  const handlePreviousEntry = () => {
    setCurrentEntry((prevEntry) =>
      prevEntry === 0 ? journalData.length - 1 : prevEntry - 1
    );
  };

  const handleEditEntry = (id) => {
    const index = journalData.findIndex((entry) => entry.id === id);
    setCurrentEntry(index);
  };

  const handleEntryUpdate = (updatedTitle, updatedMood, updatedDate, updatedContent) => {
    if (updatedTitle === 'New Entry') {
      const maxId = Math.max(...journalData.map((entry) => entry.id));
      const newEntry = {
        id: maxId + 1,
        heading: updatedTitle,
        mood: updatedMood,
        date: updatedDate,
        entry: updatedContent,
      };
      setJournalData((prevData) => [...prevData, newEntry]);
    } else {
      setJournalData((prevData) =>
        prevData.map((entry) =>
          entry.id === journalData[currentEntry].id
            ? { ...entry, heading: updatedTitle, mood: updatedMood, date: updatedDate, entry: updatedContent }
            : entry
        )
      );
    }
  };

  const handleAddEntry = () => {
    const maxId = Math.max(...journalData.map((entry) => entry.id));
    const newEntry = {
      id: maxId + 1,
      heading: 'New Entry',
      mood: '',
      date: '',
      entry: '',
    };
    setJournalData((prevData) => {
      const newData = [...prevData, newEntry];
      setCurrentEntry(newData.length - 1);
      return newData;
    });
  };

  const handleDeleteEntry = () => {
    setJournalData((prevData) => {
      const newData = prevData.filter((entry) => entry.id !== journalData[currentEntry].id);
      if (currentEntry >= newData.length) {
        setCurrentEntry(newData.length - 1);
      }
      return newData;
    });
  };

  return (
    <div className="background">
      <Navbar />
      <div id="printablediv">
        <Journal
          item={journalData[currentEntry]}
          handleAddEntry={handleAddEntry}
          onSave={handleEntryUpdate}
          handleDeleteEntry={handleDeleteEntry}
          onEdit={handleEditEntry}
          onPrint={Print}
        />
      </div>
      <Navigator handlePreviousEntry={handlePreviousEntry} handleNextEntry={handleNextEntry} />
    </div>
  );
}

export default App;
