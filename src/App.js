
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import News from './Components/News';

// function App() {
//   return (
//     <Router>
//       <Navbar />
       
//       <Routes>
//         <Route path="/" element={<Navigate to="/general" />} />
//         <Route path="/:category" element={<News />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Login from './Components/Login';         
import Bookmarks from './Components/Bookmarks'; 
import Register from './Components/Register';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/general" />} />
        <Route path="/login" element={<Login />} />               
        <Route path="/bookmarks" element={<Bookmarks />} />       
        <Route path="/:category" element={<News />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

