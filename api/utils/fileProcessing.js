import pdf from 'pdf-parse';
import mammoth from 'mammoth';

// Function to extract text from PDF or Word files
export async function extractTextFromFile(fileBuffer, fileName) {
  const fileExtension = fileName.split('.').pop().toLowerCase();

  if (fileExtension === 'pdf') {
    const data = await pdf(fileBuffer);
    return data.text;
  } else if (fileExtension === 'docx' || fileExtension === 'doc') {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } else {
    throw new Error('Unsupported file type');
  }
}