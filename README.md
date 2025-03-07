# Chess Hub - Next.js

## 📚 Overview

Chess Hub is a frontend application for managing chess tournaments and educational features. It communicates with the backend Chess Education API to manage tournament data, users, students, professors, and online games. Players can find tournaments, join them, discover chess professors, and follow games—all data is fetched from the backend API. Users can also watch online games being played, directly fetched from the API.

You can check the backend project here: [Chess Education API](https://github.com/laligb/chess-education-api)
Frontend project: [Chess Edu Tourn Next](https://github.com/laligb/chess-edu-tourn-next)

## 💻 Technologies Used

- **Next.js**: React-based framework for building frontend applications.
- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **Firebase Authentication**: Manages authentication for secure access to users.
- **Material UI**: A popular React component library for building modern, responsive UIs with pre-designed components following Material Design principles.
- **React Chessboard**: A React component library for rendering a chessboard and managing chess game states.
- **Chess.js**: A JavaScript library for chess game logic, handling moves, validations, and game state management.
- **Redux**: For state management with `@reduxjs/toolkit` and `react-redux`.
- **Chart.js**: A library for rendering charts, used with `react-chartjs-2`.
- **FullCalendar**: For handling calendar views and interactions.
- **Mapbox GL**: For map rendering.
- **NextAuth**: For authentication management.
- **Socket.IO**: For real-time communication.
- **React Testing Library**: For testing React components.
- **TypeScript**: A superset of JavaScript that adds static types, improving code quality and maintainability.

## 🔧 Setup and Run Locally

### 🛠️ Prerequisites

- Node.js and npm (or yarn) installed.

### ⚙️ Steps to Run the Frontend Locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/laligb/chess-edu-tourn-next.git
   cd chess-edu-tourn-next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.example` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   After creating `.env.example`, copy it to `.env`, remove the `.example` extension, and add the corresponding keys (e.g., API URL, Firebase credentials, etc.).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The frontend will be available at `http://localhost:3001`. Ensure the API is running locally at `localhost:3000` to fetch and push data.

## 🎮 How to Watch Online Games

Users can watch ongoing chess games streamed live via the API. Follow the API's endpoints for live game data and track progress in real-time.

1. Ensure that both the API (`chess-education-api`) and the frontend (`chess-edu-tourn-next`) are running locally.
2. Navigate to the section where online games are available.
3. Live games can be watched directly from the frontend interface.

## 🚀 How to Push Data to Localhost API

Ensure that both the API (`chess-education-api`) and the frontend (`chess-edu-tourn-next`) are running locally.

1. Authenticate by logging in through the frontend interface.
2. Interact with the frontend to create tournaments, players, and manage educational content.
3. Data will be pushed to the API, which should be running on `http://localhost:3000`.

For further details, refer to the frontend code and how API calls are made using Axios.
