import ConfirmUploadJSX from "./jsx/ConfirmUpload.jsx";
import { FileProvider } from "../Components/Context/UploadContext/FileProvider.js";

function ConfirmUpload() {
  return (
    <div>
      <FileProvider>
        <ConfirmUploadJSX />
      </FileProvider>
    </div>
  );
}

export default ConfirmUpload;
