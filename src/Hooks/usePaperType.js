import { useContext } from "react";
import PaperTypeContext from "../Components/UploadContext/PaperTypeProvider";


const usePaperType = () => {
    return useContext(PaperTypeContext);
}

export default usePaperType;