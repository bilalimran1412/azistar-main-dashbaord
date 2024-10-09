const ScrapDataSite = require('../model/ScrapDataSite');
const { getLastUrlFromDatabase } = require('./dbUtils'); 
const { saveScrapData, updateScrapingStatus, deleteScrapDataById, getUrlIdByUrl } = require('../utils/dbUtils');
const {saveIntents, sanitizeText, genrateautoIntents, generateIntents, saveScrapedData, initializeNlpManager, customdata, getWebData} = require('../utils/scrapDataUtils')
const getPagesFromDomain = require('../../subdomain');
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


async function scrapDataSites() {
    let SCRAP_DATA = true;
    (async () => {
        try {
            const lastUrl = await getLastUrlFromDatabase();

            const lastUrlId = await getUrlIdByUrl(lastUrl);

            console.log(lastUrlId)
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

                        allIntents = allIntents.concat(pageIntents);
                        // console.log("COncata : ", allIntents)

                    } else {
                        console.log(`Failed to fetch web data for ${pageUrl}.`);
                    }
                }


                await saveIntents(allIntents);
                // await initializeNlpManager();
                await updateScrapingStatus(lastUrlId, 'Completed');
               
            } else {
                await initializeNlpManager();
            }
            pm2.restart('app', (err) => {
                if (err) {
                    console.error('Error restarting application:', err);
                    // console.log('Application restarted successfully');
                } else {
                    console.log('Application restarted successfully');
                }
            });
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

    if (!url || !userId) {
        return res.status(400).json({ error: 'URL and User ID are required' });
    }

    try {
        const newEntry = new ScrapDataSite({ url, user_id: userId });
        await newEntry.save();
        
        console.log('URL inserted successfully');
        // Assuming you have these functions defined somewhere
        await scrapDataSites();
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





