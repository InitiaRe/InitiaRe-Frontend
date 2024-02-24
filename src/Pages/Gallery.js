import GalleryJSX from "./jsx/Gallery.jsx";
import { SortProvider } from "../Components/Context/SortContext/SortProvider.js";

export default function Gallery() {
  return (
    <>
      <SortProvider>
        <GalleryJSX />
      </SortProvider>
    </>
  );
}
