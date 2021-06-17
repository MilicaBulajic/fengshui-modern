import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import file from  "../../public/img/book.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js`;

function Book() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
    <div id="PDFContainer">
      <Document className="PDFDocument" file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page className="PDFPage PDFPageOne" pageNumber={pageNumber} />
      </Document>
    </div>
    <div>
    <p>
        Page {pageNumber} of {numPages}
      </p>
      <a type="button" className="bookbutton" disabled={pageNumber <= 1} onClick={previousPage}>
        Previous
      </a>
      <a
        className="bookbutton"
        type="button"
        disabled={pageNumber >= numPages}
        onClick={nextPage}
      >
        Next
      </a>
    </div>
    </>
  );
}

export default Book;
