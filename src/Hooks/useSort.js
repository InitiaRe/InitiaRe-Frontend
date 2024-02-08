import { useContext } from "react";
import SortContext from "../Components/SortContext/SortProvider";

const useSort = () => {
    return useContext(SortContext);
}

export default useSort;