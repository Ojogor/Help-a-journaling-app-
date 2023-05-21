const savedData = localStorage.getItem('journalData');
let initialData;

if (savedData) {
  initialData = JSON.parse(savedData);
} else {
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
  localStorage.setItem('journalData', JSON.stringify(initialData));
}

export default initialData;



