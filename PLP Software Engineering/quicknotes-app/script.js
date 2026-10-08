const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

const STORAGE_KEY = 'quicknotes-notes';
let notes = loadNotes();

function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (!savedNotes) return [];

    const parsedNotes = JSON.parse(savedNotes);
    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function getCategoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  notesList.textContent = '';
  updateCount();

  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-message';
    emptyItem.textContent = searchTerm
      ? 'No notes match your search.'
      : 'No notes yet. Add your first note above.';
    notesList.appendChild(emptyItem);
    return;
  }

  filteredNotes.forEach((note) => {
    const listItem = document.createElement('li');
    listItem.className = `note-card ${getCategoryClass(note.category)}`;

    const text = document.createElement('p');
    text.textContent = note.text;

    const meta = document.createElement('div');
    meta.className = 'note-meta';

    const category = document.createElement('span');
    category.className = 'category-label';
    category.textContent = note.category;

    const date = document.createElement('time');
    date.className = 'note-date';
    date.dateTime = note.createdAt;
    date.textContent = new Date(note.createdAt).toLocaleString();

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteNote(note.id));

    meta.append(category, date, deleteButton);
    listItem.append(text, meta);
    notesList.appendChild(listItem);
  });
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  const note = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text,
    category: noteCategory.value,
    createdAt: new Date().toISOString()
  };

  notes.unshift(note);
  saveNotes();
  noteForm.reset();
  errorMessage.textContent = '';
  render();
  noteInput.focus();
});

searchInput.addEventListener('input', render);

render();
