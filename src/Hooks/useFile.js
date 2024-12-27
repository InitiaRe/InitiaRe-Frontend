import { useContext } from "react";

import FileContext from "../Components/Context/UploadContext/FileProvider";

const useFile = () => {
  return useContext(FileContext);
};

export default useFile;
