# Photo Gallery Web App 

A responsive React application that fetches images from the Picsum API, featuring a real-time search filter and a persistent favourites system.

## 🚀 Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** useReducer (for Favorites)
- **Hooks:** useMemo, useCallback
- **API:** Picsum Photos

## 📂 Project Structure
```text
src/
├── hooks/
│   └── useFetchPhotos.js      # Custom hook for API logic & loading states
├── reducers/
│   └── favouritesReducer.js   # useReducer logic with LocalStorage persistence
├── App.jsx                    # Main UI, Search logic, and Responsive Grid
├── index.css                  # Tailwind imports and Custom Spinner CSS
└── main.jsx                   