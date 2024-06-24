import { createContext, useState } from "react";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const initialState = {
    search: "",
  };

  const [search, setSearch] = useState(initialState.search);

  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  return (
    <BooksContext.Provider value={{ search, handleSearch }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContext;
