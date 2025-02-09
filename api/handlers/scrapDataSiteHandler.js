const ScrapDataSite = require('../model/ScrapDataSite');
const { getLastUrlFromDatabase } = require('./dbUtils'); 
const { saveScrapData, updateScrapingStatus, deleteScrapDataById, getUrlIdByUrl } = require('../utils/dbUtils');
const {saveIntents, sanitizeText, genrateautoIntents, generateIntents, saveScrapedData, initializeNlpManager, customdata, getWebData} = require('../utils/scrapDataUtils')
const getPagesFromDomain = require('../../subdomain');
const fs = require('fs');
// Get all data for a specific user


exports.getDataByUserId = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const results = await ScrapDataSite.find({ user_id: userId });
        res.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.getStatusById = async (req, res) => {
    const { id } = req.params;

    try {
        const scrapData = await ScrapDataSite.findById(id);

        if (!scrapData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.json({ status: scrapData.status }); // Assuming status is a field in your model
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).json({ message: 'Failed to fetch status' });
    }
};

const SCRAP_DATA = false;


async function saveIntentsToDb(pageUrl, userId, pageIntents) {
    console.log(`Saving intents for ${pageUrl} with userId ${userId} and intents:`, pageIntents);
    const newIntentEntry = new ScrapDataSite({
        url: pageUrl,      // URL of the page being saved
        user_id: userId,   // User ID
        scrap_data: pageIntents // Array of intents for the page
    });

    try {
        await newIntentEntry.save();
        console.log(`Intents for ${pageUrl} saved successfully to the database.`);
    } catch (error) {
        console.error(`Error saving intents for ${pageUrl}:`, error);
    }
}




async function scrapDataSites(currentUrlId, userId) {
    let SCRAP_DATA = true;
    (async () => {
        try {
            const lastUrl = await getLastUrlFromDatabase();

            const lastUrlId = await getUrlIdByUrl(lastUrl);

            console.log(currentUrlId)
            console.log('Pages found:', lastUrl);

            if (SCRAP_DATA) {
                const lastUrl = await getLastUrlFromDatabase();
                const pages = await getPagesFromDomain(lastUrl);
                console.log('Pages found:', pages);
                var allIntents = [];
                allIntents = allIntents.concat(customdata);
                for (const pageUrl of pages) {
                    const webData = await getWebData(pageUrl);
                    if (webData) {
                        const sanitizedData = sanitizeText(webData);
                        await saveScrapedData(pageUrl, sanitizedData);

                        // Generate intents for this specific page's data
                        const pageIntents = await generateIntents(sanitizedData);
                        // await saveIntentsToDb(pageUrl, userId, pageIntents); 

                        allIntents = allIntents.concat(pageIntents);
                        // console.log("COncata : ", allIntents)

                    } else {
                        console.log(`Failed to fetch web data for ${pageUrl}.`);
                    }
                }
                await saveIntents(allIntents);
                console.log('All intents to save:', JSON.stringify(allIntents, null, 2));

                
                // await initializeNlpManager();
                await updateScrapingStatus(currentUrlId, 'Completed', allIntents);
               
            } else {
                await initializeNlpManager();
            }
            // pm2.restart('app', (err) => {
            //     if (err) {
            //         console.error('Error restarting application:', err);
            //         // console.log('Application restarted successfully');
            //     } else {
            //         console.log('Application restarted successfully');
            //     }
            // });
        } catch (error) {
            console.error('Error in scraping process:', error);
            SCRAP_DATA = false;
        }

    })();


    initializeNlpManager();

}


// Add a new URL
exports.addUrl = async (req, res) => {
    console.log('Request body:', req.body);
    const { url, userId } = req.body;

    // const webData = await getWebData(url);
    // const sanitizedData = sanitizeText(webData);
    // const scrapData = await generateIntents(sanitizedData);

    if (!url || !userId ) {
        return res.status(400).json({ error: 'URL and User ID are required' });
    }
    try {
        const newEntry = new ScrapDataSite({ url, user_id: userId });
        await newEntry.save();
        const currentUrlId = newEntry._id;
        console.log('URL inserted successfully', currentUrlId);
        // Assuming you have these functions defined somewhere
        await scrapDataSites(currentUrlId, userId);
        await getLastUrlFromDatabase();

        res.status(200).json({ message: 'URL inserted successfully', data: newEntry });
    } catch (error) {
        console.error('Error inserting URL into database:', error);
        res.status(500).json({ message: 'Failed to insert URL' });
    }
};

// Get all scrap data site data
exports.getAllData = async (req, res) => {
    try {
        const results = await ScrapDataSite.find();
        res.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};


exports.deleteUrl = async (req, res) => {
    const { id } = req.params;

    try {
        // Attempt to delete the URL from the database
        const deletedUrl = await ScrapDataSite.findByIdAndDelete(id);

        if (deletedUrl) {
            // pm2.restart('app', (err) => {
            //     if (err) {
            //         console.error('Error restarting application:', err);
            //     } else {
            //         console.log('Application restarted successfully');
            //     }
            // });
            res.status(200).json({ message: `Deleted record with ID ${id} successfully` });
        } else {
            res.status(404).json({ message: `Record with ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Failed to delete record' });
    }
};


exports.addintent = async (req, res) => {
    const { tag, patterns, responses } = req.body;

    if (!tag || !patterns || !responses || patterns.length !== responses.length) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    let intents = [];

    try {
        intents = JSON.parse(fs.readFileSync('intents.json', 'utf8'));
    } catch (error) {
        console.error('Error reading intents.json:', error);
        return res.status(500).json({ message: 'Error reading intents' });
    }

    // Create a new intent object
    const newIntent = {
        tag: tag,
        patterns: patterns,
        responses: responses
    };

    // Generate variations
    const generatedVariations = await genrateautoIntents(patterns, responses);

    // Add generated variations directly to intents array
    intents.push(newIntent);
    intents.push(...generatedVariations);

    // Write intents back to intents.json file
    fs.writeFile('intents.json', JSON.stringify(intents, null, 2), (err) => {
        if (err) {
            console.error('Error writing intents.json:', err);
            return res.status(500).json({ message: 'Error saving intent' });
        }
        console.log('Intents added successfully:', newIntent);
        res.json({ message: 'Intents added successfully' });

        // Optionally restart the application if needed
        // pm2.restart('app', (err) => {
        //     if (err) {
        //         console.error('Error restarting application:', err);
        //     } else {
        //         console.log('Application restarted successfully');
        //     }
        // });
    });
};


