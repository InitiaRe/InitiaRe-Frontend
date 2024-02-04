import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { Image, pdf } from "@react-pdf/renderer";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import pdfcss from "./pdfviewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ blobDownloadLink }) => {
  const nav = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    const fetchPdfBlob = async () => {
      await fetch(
        blobDownloadLink?.replace(
          "https:/initiarestorage.blob.core.windows.net/",
          "https://initiarestorage.blob.core.windows.net/"
        ),
        {
          mode: "cors",
          method: "GET",
        }
      )
        .then((response) => response.blob())
        .then((blob) => {
          setPdfBlob(blob);
        })
        .catch((error) => console.error("Error fetching PDF blob:", error));
    };
    fetchPdfBlob();
  }, [blobDownloadLink]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className={pdfcss.pdfwrap}>
      {pdfBlob && (
        <Document
          className={pdfcss.pdfdoc}
          file={pdfBlob}
          onLoadSuccess={onDocumentLoadSuccess}
          error={""}
          // onLoadError={(error) => alert("Error while loading document! " + error.message)}
          renderMode="canvas"
          loading="PDF đang được Load..."
        >
          <Page
            className={pdfcss.pdfpage}
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            devicePixelRatio={1}
            scale={1}
          ></Page>
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;
