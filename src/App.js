import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import Journal from './components/Journal.js';
import Navigator from './components/Navigator';
import data from './data';

function App() {
  const [currentEntry, setCurrentEntry] = useState(0); // Initial entry index
  const [journalData, setJournalData] = useState(data); // State for journal data

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
    setCurrentEntry((prevEntry) => (prevEntry === 0 ? journalData.length - 1 : prevEntry - 1));
  };

  const handleEntryUpdate = (updatedTitle, updatedMood, updatedDate, updatedContent) => {
    setJournalData((prevData) =>
      prevData.map((entry, index) =>
        index === currentEntry ? { ...entry, heading: updatedTitle, mood: updatedMood, date: updatedDate, entry: updatedContent } : entry
      )
    );
  };

  const handleAddEntry = () => {
    setJournalData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        heading: "New Entry",
        mood: "",
        date: "",
        entry: ""
      }
    ]);
    setCurrentEntry(journalData.length);
  };

  const handleDeleteEntry = () => {
    setJournalData((prevData) => prevData.filter((entry, index) => index !== currentEntry));
    setCurrentEntry((prevEntry) => Math.max(0, prevEntry - 1));
  };

  return (
    <div className="background">
      <Navbar handleAddEntry={handleAddEntry} />
      <Journal
        item={journalData[currentEntry]}
        onSave={(updatedTitle, updatedMood, updatedDate, updatedContent) =>
          handleEntryUpdate(updatedTitle, updatedMood, updatedDate, updatedContent)
        }
        handleAddEntry={handleAddEntry}
        handleDeleteEntry={handleDeleteEntry}
        onDelete={handleDeleteEntry}
      />
      <Navigator handlePreviousEntry={handlePreviousEntry} handleNextEntry={handleNextEntry} />
    </div>
  );
}

export default App;
