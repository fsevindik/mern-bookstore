import React from "react";
import { Route, Routes } from "react-router-dom";
import Trends from "./components/allBooks/Trends";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import CreateBook from "./pages/CreateBooks";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/trends" element={<Trends />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
