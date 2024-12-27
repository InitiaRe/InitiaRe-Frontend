import { SortProvider } from "../Components/Context/SortContext/SortProvider.js";
import GalleryJSX from "./jsx/Gallery.jsx";

export default function Gallery() {
  return (
    <>
      <SortProvider>
        <GalleryJSX />
      </SortProvider>
    </>
  );
}
