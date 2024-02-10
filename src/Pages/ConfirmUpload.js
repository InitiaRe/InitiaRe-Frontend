import ConfirmUploadJSX from "./jsx/ConfirmUpload.jsx";
import { FileProvider } from "../Components/UploadContext/FileProvider.js";
import { CategoryProvider } from "../Components/UploadContext/CategoryProvider.js";
import { SubCategoryProvider } from "../Components/UploadContext/SubCategoryProvider.js";
import { PaperTypeProvider } from "../Components/UploadContext/PaperTypeProvider.js";
function ConfirmUpload() {
  return (
    <div>
      <FileProvider>
        <CategoryProvider>
          <SubCategoryProvider>
            <PaperTypeProvider>
              <ConfirmUploadJSX />
            </PaperTypeProvider>
          </SubCategoryProvider>
        </CategoryProvider>
      </FileProvider>
    </div>
  );
}

export default ConfirmUpload;
