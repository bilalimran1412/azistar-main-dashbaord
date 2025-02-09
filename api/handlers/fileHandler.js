const { extractTextFromFile } = require('../utils/fileProcessing');
const { generateIntents, saveIntents } = require('../utils/scrapDataUtils');
const nextConnect = require('next-connect');
const multer = require('multer');
const ScrapDataSite = require('../model/ScrapDataSite');

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  try {
    const { userId } = req.body; // Ensure userId is passed in the request body
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Step 1: Extract text content from the uploaded file (Word or PDF)
    const content = await extractTextFromFile(fileBuffer, fileName);

    // Step 2: Generate intents based on the extracted content
    const intents = await generateIntents(content);

    // Step 3: Save the generated intents to the database
    await saveIntentsToDb(fileName, userId, intents);

    // Step 4: Respond with the generated intents
    res.status(200).json({ success: true, intents });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: `Failed to process the file. ${error.message}` });
  }
});

async function saveIntentsToDb(fileName, userId, intents) {
  console.log(`Saving intents for file: ${fileName} with userId ${userId}`);

  const newIntentEntry = new ScrapDataSite({
    url: fileName, // URL or fileName of the uploaded file
    user_id: userId,
    scrap_data: intents, // Save the generated intents
  });

  try {
    await newIntentEntry.save();
    console.log(`Intents saved successfully for ${fileName}.`);
  } catch (error) {
    console.error(`Error saving intents for ${fileName}:`, error);
  }
}

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, multer handles it
  },
};
