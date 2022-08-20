
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Homepage } from './pages/Homepage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
