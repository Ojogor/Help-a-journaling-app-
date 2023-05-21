// data.js

// Load journal data from local storage
const savedData = localStorage.getItem('journalData');
let initialData = [];
if (savedData) {
  initialData = JSON.parse(savedData);
} else {
  // Set initial data if no data is available in local storage
  initialData = [
    {
      id: 1,
      heading: 'Sample Entry 1',
      mood: 'Happy',
      date: '2021-01-01',
      entry: 'This is a sample journal entry.',
    },
    {
      id: 2,
      heading: 'Sample Entry 2',
      mood: 'Sad',
      date: '2021-02-02',
      entry: 'This is another sample journal entry.',
    },
  ];

  // Save initial data to local storage
  localStorage.setItem('journalData', JSON.stringify(initialData));
}

export default initialData;
