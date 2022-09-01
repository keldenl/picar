
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Homepage } from './pages/Homepage';
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings';
import { Requests } from './pages/Requests';

import './App.css';

function App() {
  return (
    <Router basename="/picar">
      <div className="App">
        <Navbar />

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
            path="/requests"
            element={<Requests />}
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
