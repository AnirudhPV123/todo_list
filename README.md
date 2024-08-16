TodoList Application

Overview
The TodoList application is a full-stack project with distinct frontend and backend components. The application allows users to manage their tasks efficiently with a seamless integration between the client and server.

Node.js (v14 or higher)
npm (v6 or higher)
Installation
Clone the Repository

Copy code
git clone https://github.com/AnirudhPV123/todo_list.git
cd frontend
cd backend
Setup Environment Files

Both the frontend and backend directories contain a .env.sample file. Copy these files to .env and populate them with the required environment variables.

Install Dependencies

Navigate to both the frontend and backend directories and install the necessary dependencies:

zsh
Copy code
cd frontend
npm install
cd ../backend
npm install
Running the Application
To start both the frontend and backend servers, use the following script:

zsh
Copy code
npm run dev
This script will launch both servers concurrently.

Frontend: The application will be available at http://localhost:5173.
Backend: The API will be available at http://localhost:6060.
Environment Variables
The .env files in both the frontend and backend directories must be configured with the appropriate environment variables. Refer to the .env.sample files for a list of required variables.
