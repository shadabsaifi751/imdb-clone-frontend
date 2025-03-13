# IMDb Clone Frontend

This is the frontend for the IMDb Clone application, built with React and Vite. It provides a user interface to interact with the backend APIs for managing movies, actors, and producers. The app is deployed on Vercel.

## Features
- View, add, update, and delete movies.
- Authentication support (if implemented).
- Responsive design.
- Integration with backend APIs via Axios.

## Tech Stack
- **React**: UI library.
- **Vite**: Build tool and development server.
- **Axios**: HTTP client for API requests.
- **Vercel**: Deployment platform.

## Project Structure


## Prerequisites
- Node.js (v18.x recommended)
- Vercel CLI (`npm install -g vercel`)
- Backend deployed and accessible (e.g., `https://imdb-clone-backend.vercel.app`)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone [https://github.com/shadabsaifi751/imdb-clone-frontend](https://github.com/shadabsaifi751/imdb-clone-frontend)
cd imdb-clone/frontend

npm install

VITE_BASE_URL=https://imdb-clone-backend.vercel.app/api/v1

npm run dev
