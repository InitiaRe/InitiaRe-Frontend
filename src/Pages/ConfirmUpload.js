import { FileProvider } from "../Components/Context/UploadContext/FileProvider.js";
import ConfirmUploadJSX from "./jsx/ConfirmUpload.jsx";

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
