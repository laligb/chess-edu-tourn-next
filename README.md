# Chess Education Tournament Next.js

## Overview

Chess Education Tournament is a frontend application for managing chess tournaments and educational features. It communicates with the backend Chess Education API to manage tournament data, users, and students and professors.

## Technologies Used

- **Next.js**: React-based framework for building frontend applications.
- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **JWT Authentication**: Manages authentication for secure access to tournament and educational data.

## Setup and Run Locally

### Prerequisites

- Node.js and npm (or yarn) installed.

### Steps to Run the Frontend Locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/laligb/chess-edu-tourn-next.git
   cd chess-edu-tourn-next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The frontend will be available at `http://localhost:3001`. Ensure the API is running locally at `localhost:3000` to fetch and push data.

## How to Push Data to Localhost API

Ensure that both the API (`chess-education-api`) and the frontend (`chess-edu-tourn-next`) are running locally.

1. Authenticate by logging in through the frontend interface.
2. Interact with the frontend to create tournaments, players, and manage educational content.
3. Data will be pushed to the API, which should be running on `http://localhost:3000`.

For further details, refer to the frontend code and how API calls are made using Axios.
