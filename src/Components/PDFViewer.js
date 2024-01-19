import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { Image } from "@react-pdf/renderer";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ blobDownloadLink }) => {
  const nav = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    const fetchPdfBlob = async () => {
      await fetch(blobDownloadLink, {
        mode: "cors",
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          setPdfBlob(blob);
          console.log(blob);
        })
        .catch((error) => console.error("Error fetching PDF blob:", error));
    };
    fetchPdfBlob();
  }, [blobDownloadLink]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "clip",
        display: "flex",
        "justify-content": "center",
      }}
    >
      {pdfBlob && (
        <Document
          file={pdfBlob}
          onLoadSuccess={onDocumentLoadSuccess}
          style={{ height: "70%", width: "100%" }}
        >
          <Page
            pageNumber={1}
            width={600}
            height={600}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          ></Page>
          {/* <Image pageNumber={1} width={600} height={600}/> */}
        </Document>
      )}
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
};

export default PDFViewer;
