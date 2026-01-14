import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import ColorDots from "../ColorDots/ColorDots";
import Footer from "../footer/Footer";
import AddModal from "../AddModal/AddModal";
import Profile from "../Profile/Profile";

export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="app">
      <Header onAddClick={() => setIsAddOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <ColorDots />
              <Cards />
            </>
          }
        />

        <Route path="/profile" element={<Profile />} />
      </Routes>

      {isAddOpen && <AddModal onClose={() => setIsAddOpen(false)} />}

      <Footer />
    </div>
  );
}
