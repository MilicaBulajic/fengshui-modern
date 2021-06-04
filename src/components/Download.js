import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import React from 'react';
import { DocumentPdf, getProps } from './document-pdf';

export const Download = () => (
  <button
    onClick={async () => {
      const props = await getProps();
      const doc = <DocumentPdf {...props} />;
      const asPdf = pdf({}); 
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, 'document.pdf');
    }}
  >DOWNLOAD E-BOOK</button>
);