
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { Profile } from './pages/Profile'

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
            path="/"
            element={<Homepage />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
