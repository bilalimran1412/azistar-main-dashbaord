const mongoose = require('mongoose');
const ScrapData = require('../model/ScrapDataSite'); 

exports.websiteData = async (req, res) => {
    const { id } = req.params;

    try {
        const scrapData = await ScrapData.findById(id);

        if (!scrapData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.json({ scrapData: scrapData }); // Assuming status is a field in your model
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).json({ message: 'Failed to fetch status' });
    }
};



// Update function
exports.updateScrapData = async (req, res) => {
    const { id } = req.params;
    const { tag, patterns, responses } = req.body;

    try {
        const updatedData = await ScrapData.findOneAndUpdate(
            { _id: id, 'scrap_data.tag': tag }, // Find the document with the specified id and tag
            { 
                $set: { 
                    'scrap_data.$.patterns': patterns, // Update the patterns for the matched tag
                    'scrap_data.$.responses': responses // Update the responses for the matched tag
                } 
            }, 
            { new: true, runValidators: true } 
        );

        if (!updatedData) {
            console.log('chl')
            return res.status(404).json({ message: 'Data not found' });
        }
        console.log('howa')

        res.json({ message: 'Data updated successfully', updatedData });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Failed to update data' });
    }
};


exports.websiteQuestionData = async (req, res) => {
    const { userId } = req.params; 

    try {
        const scrapData = await ScrapData.findOne({ userId })
            .sort({ timestamp: -1 }) 
            .exec();

        if (!scrapData) {
            return res.status(404).json({ message: 'Data not found for this user' });
        }

        res.json({ scrapData });
    } catch (error) {
        console.error('Error fetching scrap data:', error);
        res.status(500).json({ message: 'Failed to fetch scrap data' });
    }
};
