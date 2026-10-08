# QuickNotes

QuickNotes is a simple browser-based note-taking app built with HTML, CSS and vanilla JavaScript. It lets users create short notes, organize them into Personal, Work or Study categories, search their notes, delete individual notes and keep their notes available after refreshing the page through browser localStorage.

## Features

- Semantic HTML5 page structure
- Add notes with Personal, Work and Study categories
- Validation for empty notes and notes longer than 200 characters
- Delete individual notes
- Search notes without case sensitivity
- Note count for zero, one and multiple notes
- Category-specific card styling
- LocalStorage persistence using JSON.stringify and JSON.parse
- Responsive layout for screens 600px wide or smaller
- Accessible labels, live status messages and keyboard-friendly controls

## How to run locally

1. Clone or download this repository.
2. Open the `quicknotes-app` folder.
3. Open `index.html` in a modern web browser.
4. Start adding, searching and deleting notes.

No build tools, dependencies or server are required.

## What I learned

- I learned how to build a semantic HTML5 page using elements such as `header`, `main`, `section` and `footer`.
- I learned how to use CSS Flexbox and media queries to create a responsive layout.
- I learned how to store application data as an array of JavaScript objects and render it dynamically with `createElement` and `textContent`.
- I learned how to use localStorage with `JSON.stringify()` and `JSON.parse()` to persist data between page refreshes.
- I learned how to implement form validation, search filtering and delete functionality with JavaScript event listeners.
