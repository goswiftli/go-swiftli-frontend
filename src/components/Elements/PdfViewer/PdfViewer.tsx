import { Box, Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
interface PDFViewerProps {
  base64String: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ base64String }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfData, setPdfData] = useState<string | null>(null);

  useEffect(() => {
    if (base64String) {
      const dataUri = base64String.startsWith('data:')
        ? base64String
        : `data:application/pdf;base64,${base64String}`;

      setPdfData(dataUri);
    }
  }, [base64String]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return numPages ? Math.max(1, Math.min(numPages, newPageNumber)) : 1;
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  if (!pdfData) {
    return (
      <VStack spacing={6}>
        <Text fontFamily="body" fontWeight="extrabold" fontSize="lg">
          Loading PDF data...
        </Text>
        <Spinner />
      </VStack>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Box mb={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg="white">
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
          error="Failed to load PDF"
          loading="Loading PDF..."
        >
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </Box>

      {numPages && (
        <Flex alignItems="center" gap={4}>
          <Button
            onClick={previousPage}
            isDisabled={pageNumber <= 1}
            colorScheme="blue"
            variant="solid"
          >
            Previous
          </Button>

          <Text fontSize="md" fontWeight="medium">
            Page {pageNumber} of {numPages}
          </Text>

          <Button
            onClick={nextPage}
            isDisabled={pageNumber >= numPages}
            colorScheme="blue"
            variant="solid"
          >
            Next
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default PDFViewer;
