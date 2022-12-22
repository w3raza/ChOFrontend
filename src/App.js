import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/dodaj" element={<AddPage />} />
        <Route exact path="/movie" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
