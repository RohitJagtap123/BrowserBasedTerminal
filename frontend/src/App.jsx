import React from 'react';
import TerminalWindow from './components/TerminalWindow';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
function App() {
  return (
    <div >
     <BrowserRouter>
         <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/terminal/:language" element={<TerminalWindow/>}></Route>
         </Routes>
     </BrowserRouter>
     </div> 
  );
}

export default App;
