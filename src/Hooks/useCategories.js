import { useContext } from "react";
import CategoryContext from "../Components/UploadContext/CategoryProvider";


const useCategories = () => {
    return useContext(CategoryContext);
}

export default useCategories;