import React, { useState } from 'react';

export default function Journal(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.item.heading);
  const [mood, setMood] = useState(props.item.mood);
  const [date, setDate] = useState(props.item.date);
  const [entry, setEntry] = useState(props.item.entry);

  const handleSaveClick = () => {
    setIsEditing(false);
    props.onSave(title, mood, date, entry);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNewClick = () => {
    handleEditClick();
    setTitle('Please Enter the tile of your journal'); 
    setMood('How are you feeling today'); // Reset mood
    setDate('Enter the date'); // Reset date
    setEntry('Enter your journal entry here')
  };

  const handleDeleteClick = () => {
    props.handleDeleteEntry();
  };

  return (
    <div className="Journal">
      <div className="journal__buttons">
        {isEditing ? (
          <button className="journal__save" onClick={handleSaveClick}>Save</button>
        ) : (
          <button className="journal__edit" onClick={handleEditClick}>Edit</button>
        )}
        <button className="journal__new" onClick={handleNewClick}>New</button>
        <button className="journal__delete" onClick={handleDeleteClick}>Delete</button>
      </div>
      {isEditing ? (
        <input type="text" className="journal_title_edit" value={title} onChange={handleTitleChange} placeholder={title} />
      ) : (
        <h1 className="journal__title">{props.item.heading}</h1>
      )}
      {isEditing ? (
        <input type="text" className="journal_mood_edit" value={mood} onChange={handleMoodChange} placeholder={mood} />
      ) : (
        <h4 className="journal-mood">Mood: {props.item.mood}</h4>
      )}
      {isEditing ? (
        <input type="date" className="journal_date_edit" value={date} onChange={handleDateChange} placeholder={date} />
      ) : (
        <h4 className="journal-date">Date: {props.item.date}</h4>
      )}
      {isEditing ? (
        <textarea className="journal_entry_edit" value={entry} onChange={handleEntryChange} placeholder={entry} />
      ) : (
        <p className="journal-entry">{props.item.entry}</p>
      )}
    </div>
  );
      }  