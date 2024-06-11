import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBook from "./pages/CreateBooks";
import DeleteBook from "./pages/DeleteBook";

import AllBooks from "./components/allBooks/AllBooks";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/allbooks" element={<AllBooks />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
