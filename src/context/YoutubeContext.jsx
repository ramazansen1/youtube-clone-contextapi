import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { options } from "../utils/api";

// context yapısı temelini oluşturma
export const YoutubeContext = createContext();

export const ContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [searchResult, setSearchResult] = useState(null);
  // console.log(searchResult);

  useEffect(() => {
    setSearchResult(null);
    fetchCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchCategory = (category) => {
    axios
      .get(`https://youtube138.p.rapidapi.com/search/?q=${category}`, options)
      .then((res) => setSearchResult(res.data.contents))
      .catch((err) => console.log(err));
  };
  return (
    <YoutubeContext.Provider
      value={{ selectedCategory, setSelectedCategory, searchResult }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};
