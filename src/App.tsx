import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Profile } from "./components/Profile/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/:login" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
