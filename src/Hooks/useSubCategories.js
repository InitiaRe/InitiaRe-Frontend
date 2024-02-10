import { useContext } from "react";
import SubCategoryContext from "../Components/UploadContext/SubCategoryProvider";


const useSubCategories = () => {
    return useContext(SubCategoryContext);
}

export default useSubCategories;