// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './user/pages/Login'
import BookList from './user/components/BookList';
import Signup from './user/pages/Signup';

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome to Our Application</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/booklist" element={<BookList />} />  
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;