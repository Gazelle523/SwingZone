#!/bin/bash

# Create root directory
mkdir -p SwingZone

# Create backend folders
mkdir -p SwingZone/backend/controllers
mkdir -p SwingZone/backend/models
mkdir -p SwingZone/backend/routes
mkdir -p SwingZone/backend/config

# Create frontend folders
mkdir -p SwingZone/frontend/public
mkdir -p SwingZone/frontend/src/components
mkdir -p SwingZone/frontend/src/pages
mkdir -p SwingZone/frontend/src/services

# Create .gitignore file
cat <<EOL > SwingZone/.gitignore
node_modules
build
.env
EOL

# Create package.json file
cat <<EOL > SwingZone/package.json
{
  "name": "swingzone",
  "version": "1.0.0",
  "description": "A golf simulator rental app",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "client": "cd frontend && npm start",
    "server": "nodemon backend/server.js",
    "dev": "concurrently \\"npm run server\\" \\"npm run client\\""
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.12.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.7",
    "concurrently": "^6.0.0"
  },
  "author": "",
  "license": "ISC"
}
EOL

# Create README.md file
cat <<EOL > SwingZone/README.md
# SwingZone

SwingZone is a golf simulator rental app where users can list their golf simulators and search for available simulators in their area to rent.

## Folder Structure

\`\`\`plaintext
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.js
│   │   └── index.js
├── .gitignore
├── package.json
└── README.md
\`\`\`

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   \`\`\`sh
   git clone https://github.com/Gazelle523/SwingZone.git
   cd SwingZone
   \`\`\`

2. Install dependencies:
   \`\`\`sh
   npm install
   cd frontend
   npm install
   cd ..
   \`\`\`

### Running the App

\`\`\`sh
npm run dev
\`\`\`

This will start both the backend server and the frontend development server.

## License

This project is licensed under the MIT License.
EOL

# Create backend server.js file
cat <<EOL > SwingZone/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/swingzone', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/simulators', require('./routes/simulatorRoutes'));

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
EOL

# Create frontend public index.html file
cat <<EOL > SwingZone/frontend/public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SwingZone</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOL

# Create frontend src App.js file
cat <<EOL > SwingZone/frontend/src/App.js
import React from 'react';

function App() {
  return (
    <div>
      <h1>Welcome to SwingZone</h1>
    </div>
  );
}

export default App;
EOL

# Create frontend src index.js file
cat <<EOL > SwingZone/frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
EOL

echo "Folder structure and initial files for SwingZone created successfully."