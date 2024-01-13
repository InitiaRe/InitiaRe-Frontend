import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

const PDFViewer = ({ blobDownloadLink }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    const fetchPdfBlob = async () => {
      fetch(blobDownloadLink)
        .then((response) => response.blob())
        .then((blob) => setPdfBlob(blob))
        .catch((error) => console.error("Error fetching PDF blob:", error));
    };
    fetchPdfBlob();
  }, [blobDownloadLink]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  console.log(pdfBlob)
  return (
    <div>
      {pdfBlob && (
        <Document file={pdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      )}
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PDFViewer;
