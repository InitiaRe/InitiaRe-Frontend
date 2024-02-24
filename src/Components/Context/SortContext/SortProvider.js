import { createContext, useState } from "react";

const SortContext = createContext({});

//this creates a context, or a state that can be used throughout the tree
//in this case, the categories the user has selected
export const SortProvider = ({ children }) => {
  const [sort, setSort] = useState({ categories: [], title: "" });

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  );
};

export default SortContext;
