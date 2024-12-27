import { useContext } from "react";

import SortContext from "../Components/Context/SortContext/SortProvider";
const useSort = () => {
  return useContext(SortContext);
};

export default useSort;
