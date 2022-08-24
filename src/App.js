
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings';

import './App.css';

function App() {
  return (
    <Router basename="/picar">
      <div className="App">
        <Routes>
          {/* <Route
            path="/users"
            element={<Users />}
          /> */}
          <Route
            path="/profile/:username"
            element={<Profile />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
          <Route
            path="/"
            element={<Homepage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
