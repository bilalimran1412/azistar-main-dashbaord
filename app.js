const express = require('express');
const { NlpManager } = require('node-nlp')
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { GLOBALS } = require('./utils/globals');
const getPagesFromDomain = require('./subdomain');
const app = express();
const chatRoutes = require('./api/Nodes/nodes-api');
const db = require('./db')
const mysql = require('mysql2/promise');
const pm2 = require('pm2');
// const authRoutes = require('./routes/auth');
// const messageRoute = require('./routes/getmessage');

const port = 3005;



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

customdata = [
    {
        "tag": "greeting",
        "patterns": [
            "Hi",
            "Hey",
            "How are you",
            "Is anyone there?",
            "Hello",
            "Good day",
            "Hi there",
            "Greetings",
            "Yo",
            "Hiya"
        ],
        "responses": [
            "Hey :-)",
            "Hello, thanks for visiting",
            "Hi there, what can I do for you?",
            "Hi there, how can I help?",
            "Greetings! How may I assist you?",
            "Yo! What's up?"
        ]
    },
    {
        "tag": "goodbye",
        "patterns": [
            "Bye",
            "See you later",
            "Goodbye",
            "Catch you later",
            "Take care",
            "Adios",
            "So long"
        ],
        "responses": [
            "See you later, thanks for visiting",
            "Have a nice day",
            "Bye! Come back again soon.",
            "Take care!",
            "Goodbye! Have a great day.",
            "Adios! Until next time."
        ]
    },
    {
        "tag": "thanks",
        "patterns": [
            "Thanks",
            "Thank you",
            "That's helpful",
            "Thank's a lot!",
            "Appreciate it",
            "Thanks a bunch",
            "Cheers"
        ],
        "responses": [
            "Happy to help!",
            "Any time!",
            "My pleasure",
            "You're welcome!",
            "Glad I could assist!",
            "Cheers!"
        ]
    }
]
console.log(`App Name: ${GLOBALS.appName}`);
console.log(`Score: ${GLOBALS.score}`);

app.use(bodyParser.json());
app.use(cors());

let manager;
const SCRAP_DATA = false;
// app.use('/api/auth', authRoutes);

// app.use('/api/', messageRoute);
// Fetch url From db


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbotes',
});

async function getLastUrlFromDatabase() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT url FROM scrap_data_site ORDER BY id DESC LIMIT 1');
        if (rows.length > 0) {
            return rows[0].url;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error querying last URL from database:', error);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// (async () => {

//     if (SCRAP_DATA) {
//         const lastUrl = await getLastUrlFromDatabase();
//         const pages = await getPagesFromDomain(lastUrl);
//         console.log('Pages found:', pages);
//         var allIntents = [];
//         allIntents = allIntents.concat(customdata);
//         for (const pageUrl of pages) {
//             const webData = await getWebData(pageUrl);
//             if (webData) {
//                 const sanitizedData = sanitizeText(webData);
//                 await saveScrapedData(pageUrl, sanitizedData); // Save sanitized data to a file (if needed)

//                 // Generate intents for this specific page's data
//                 const pageIntents = await generateIntents(sanitizedData);

//                 allIntents = allIntents.concat(pageIntents);
//                 console.log("COncata : ", allIntents)

//             } else {
//                 console.log(`Failed to fetch web data for ${pageUrl}.`);
//             }
//         }
//         // Save all intents together after processing all pages

//         saveIntents(allIntents)
//             .then(() => initializeNlpManager())
//             .catch(error => console.error('Error saving intents:', error));

//     } else {
//         await initializeNlpManager(); // If not scraping, directly initialize and train NLP manager
//     }
// })();
``


const scrapDataSites = () => {
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
                        await saveScrapedData(pageUrl, sanitizedData); // Save sanitized data to a file (if needed)

                        // Generate intents for this specific page's data
                        const pageIntents = await generateIntents(sanitizedData);

                        allIntents = allIntents.concat(pageIntents);
                        console.log("COncata : ", allIntents)

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



// Example usage
initializeNlpManager();


// async function initializeNlpManager() {
//     const manager = new NlpManager({ languages: ['en'] });
//     const intentsFile = path.join(__dirname, 'intents.json');

//     try {
//         if (fs.existsSync(intentsFile)) {
//             const intentsContent = fs.readFileSync(intentsFile, 'utf8');
//             const intents = JSON.parse(intentsContent);

//             intents.forEach(intent => {
//                 if (intent.patterns && Array.isArray(intent.responses)) {
//                     intent.patterns.forEach(pattern => {
//                         manager.addDocument('en', pattern, intent.tag);
//                     });

//                     intent.responses.forEach(response => {
//                         manager.addAnswer('en', intent.tag, response);
//                     });
//                 } else {
//                     console.error('Invalid or missing patterns or responses in intent:', intent);
//                 }
//             });

//             console.log('Training NLP manager...');
//             await manager.train();
//             console.log('NLP manager trained successfully.');

//             // Optionally save the model
//             manager.save();
//         } else {
//             console.error('Intents file does not exist:', intentsFile);
//         }
//     } catch (error) {
//         console.error('Error parsing intents JSON or training NLP manager:', error);
//     }
// }

async function initializeNlpManager() {
    manager = new NlpManager({ languages: ['en'] });
    const intentsFile = path.join(__dirname, 'intents.json');

    if (fs.existsSync(intentsFile)) {
        const intentsContent = fs.readFileSync(intentsFile, 'utf8');

        console.log("content", intentsContent)
        try {

            const intents = JSON.parse(intentsContent);
            intents.forEach(intent => {
                if (intent.patterns && intent.responses) {
                    intent.patterns.forEach(pattern => {
                        manager.addDocument('en', pattern, intent.tag);
                    });
                    intent.responses.forEach(response => {
                        manager.addAnswer('en', intent.tag, response);
                    });
                } else {
                    console.error('Missing patterns or responses in intent:', intent);
                }
            });
            console.log("Training Started")
            await manager.train();
            console.log('NLP manager trained successfully.');
            // Optionally save the model
            manager.save();


        } catch (error) {

            console.error('Error parsing intents JSON or training NLP manager:', error);
            // console.log("And the intent is ", intent)
        }
    } else {
        console.error('Intents file does not exist:', intentsFile);
    }
}


async function saveIntents(intents) {
    const fileName = path.join(__dirname, 'intents.json');

    fs.writeFile(fileName, JSON.stringify(intents, null, 2), (err) => {
        if (err) {
            console.error('Error saving intents:', err);
        } else {
            console.log(`Intents saved to file: ${fileName}`);
        }
    });
}
function splitIntoChunks(text, maxSize) {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
    let chunks = [];
    let chunk = '';

    for (const sentence of sentences) {
        if ((chunk + sentence).length > maxSize) {
            chunks.push(chunk);
            chunk = sentence;
        } else {
            chunk += sentence;
        }
    }

    if (chunk.length > 0) {
        chunks.push(chunk);
    }

    return chunks;
}

async function getWebData(url) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    };

    try {
        const response = await axios.get(url, { headers });
        const html = response.data;
        const $ = cheerio.load(html);

        $('script, style, img, link').remove();

        const bodyText = $('body').text();
        return bodyText.trim();
    } catch (error) {
        console.error('Error fetching web data:', error);
        return null;
    }
}

function sanitizeText(text) {
    const regex = /<img[^>]*>|<\s*link[^>]*>|<\s*style[^>]*>.*?<\/style>|<\s*style[^>]*>/gi;
    const textContent = text.replace(regex, '');
    return textContent;
}

async function saveScrapedData(url, data) {
    const fileName = path.join(__dirname, 'scraped_data', `${url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_')}.json`);
    const content = { url, data };

    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => {
        if (err) {
            console.error('Error saving scraped data:', err);
        } else {
            console.log(`Scraped data saved for URL: ${url} to file: ${fileName}`);
        }
    });
}

async function generateIntents(data) {
    try {
        const OpenAI = await import('openai');
        const openai = new OpenAI.default({
            apiKey: '',
        });
        let prompt = 'Based on the following data, generate extensive detailed and intelligent yet common intents for a chatbot in JSON format: as tag patterns and responses in json format, patterns should be extensive questions which user could ask\n\n' + data;

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
        });

        // Clean the response to ensure it is valid JSON
        const responseText = chatCompletion.choices[0].message.content;
        a = JSON.parse(responseText);
        console.log("responsea ", a.intents)
        return a.intents;

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return [];
    }
}

async function saveIntents(intents) {
    const fileName = path.join(__dirname, 'intents.json');

    fs.writeFile(fileName, JSON.stringify(intents, null, 2), (err) => {
        if (err) {
            console.error('Error saving intents:', err);
        } else {
            console.log(`Intents saved to file: ${fileName}`);
        }
    });
}

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log('Received user message:', userMessage);
        const { userId, websiteId } = req.body;
        // await db.query('INSERT INTO messages (websiteId, text, sender, user_id) VALUES (?, ?, ?, ?)', [websiteId, userMessage, 'user', userId]);
        
        if (userMessage.toLowerCase().includes('live chat') || userMessage.toLowerCase().includes('agent') || userMessage.toLowerCase().includes('person') || userMessage.toLowerCase().includes('livechat')) {
            // Replace <phone_number> with the actual phone number including country code, but without any '+' or '-'
            const whatsappUrl = 'https://wa.me/971506683114';
            return res.status(200).json({ response: 'Redirecting to WhatsApp...', whatsappUrl: whatsappUrl, initiateLiveChat: true });
        }

        const chatbotResponse = await getChatbotResponse(userMessage);
        console.log('Chatbot response:', chatbotResponse);
        const response = chatbotResponse || 'I\'m sorry, I didn\'t understand that.';
        
        const customResponse = {
            response: response,
            score: GLOBALS.score,
            appName: GLOBALS.appName,
        };
            
        // await db.query('INSERT INTO messages (websiteId, text, sender, user_id) VALUES (?, ?, ?, ?)', [websiteId, chatbotResponse || customResponse.response, 'bot', userId]);
        
        console.log("custom response", customResponse);
        return res.status(200).json(customResponse);
    }catch {
        console.error('please try again');
    }
});


async function getChatbotResponse(message) {
    const response = await manager.process('en', message);

    const { score, answer } = response;
    if (score > 0.3) {
        console.log(score)
        return answer;
    } else {
        console.log("I am unable to understand Should I Start Live chat? kindly enter live chat to start it?")
    }
}

app.get('/info', (req, res) => {
    res.send('<html><body><form method="post" action="/save-info">Name: <input type="text" name="name"><br>Email: <input type="email" name="email"><br><input type="submit" value="Submit"></form></body></html>');
});







// Node Api

app.post('/v1/addnode', (req, res) => {
    const { id, data, position } = req.body;
    if (!data || !data.label) {
        return res.status(400).send('Invalid data format');
    }

    const sql = 'INSERT INTO nodes (id, label, positionX, positionY) VALUES (?, ?, ?, ?)';
    const values = [id, data.label, position.x, position.y];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding new node:', err);
            return res.status(500).send('Failed to add new node');
        }
        console.log('New node added to database');
        res.status(200).send('Node added successfully');
    });
});


// Update node
app.put('/v1/updatenode', (req, res) => {
    console.log('Update node request received');
    const { id, data, position } = req.body;
    if (!id || !data || !data.label || !position) {
        return res.status(400).send('Invalid data');
    }

    const sql = 'UPDATE nodes SET label = ?, positionX = ?, positionY = ? WHERE id = ?';
    const values = [data.label, position.x, position.y, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating node:', err);
            return res.status(500).send('Failed to update node');
        }
        console.log('Node updated successfully');
        res.status(200).send('Node updated successfully');
    });
});


// GET endpoint to fetch all nodes
app.get('/v1/getnodes', (req, res) => {
    const sql = 'SELECT * FROM nodes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching nodes:', err);
            return res.status(500).send('Failed to fetch nodes');
        }
        if (results.length === 0) {
            return res.status(404).send('No nodes found');
        }
        res.status(200).json(results);
    });
});


app.post('/v1/addurl', (req, res) => {
    if (req.method === 'POST') {
        const { url, userId } = req.body;
        const sql = 'INSERT INTO scrap_data_site (url, user_id, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP)';
        db.query(sql, [url, userId], (error, results, fields) => {
            if (error) {
                console.error('Error inserting URL into database:', error);
                res.status(500).json({ message: 'Failed to insert URL' });
                return;
            }

            console.log('URL inserted successfully');
            getLastUrlFromDatabase();
            scrapDataSites();

            res.status(200).json({ message: 'URL inserted successfully', SCRAP_DATA });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
});




app.get('/api/scrap_data_site', (req, res) => {
    const { userId } = req.query;

    // Ensure userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Prepare the SQL query with a userId filter
    const sql = 'SELECT id, url, timestamp, status FROM scrap_data_site WHERE user_id = ?';
    db.query(sql, [userId], (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/scrap_data_site_data', (req, res) => {
    const sql = 'SELECT id, url, timestamp, status FROM scrap_data_site';
    db.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.json(results);
        }
    });
});



// Add Manual Intent

// Function to generate variations using OpenAI API
async function genrateautoIntents(patterns, responses) {
    try {
        const OpenAI = await import('openai');
        const openai = new OpenAI.default({
            apiKey: '',
        });
        let prompt = 'Based on the following data, generate extensive detailed and intelligent yet common intents for a chatbot in JSON format: as tag patterns and responses in json format, patterns should be extensive questions which user could ask\n\n' + patterns + responses;
        const chatCompletions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
        });

        const responseText = chatCompletions.choices[0].message.content;
        const intents = JSON.parse(responseText).intents;

        return intents;

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return [];
    }
}

app.post('/api/addIntent', async (req, res) => {
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
        pm2.restart('app', (err) => {
            if (err) {
                console.error('Error restarting application:', err);
            } else {
                console.log('Application restarted successfully');
            }
        });
    });
});




// Delete Url and Url Intents

app.delete('/api/deleteurl/:id', async (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM scrap_data_site WHERE id = ?';

    try {
        // Delete from intents array
        const deletedUrl = await deleteFromIntents(id);
 
        await new Promise((resolve, reject) => {
            db.query(sql, [id], (error, results, fields) => {
                if (error) {
                    console.error('Error deleting record from database:', error);
                    reject(error);
                } else {
                    console.log(`Deleted record with ID ${id} from scrap_data_site successfully`);
                    resolve();
                }
            });
        });
        var allIntents = [];
        allIntents = allIntents.concat(customdata);
        await saveIntents(allIntents);
        if (deletedUrl) {
            pm2.restart('app', (err) => {
                if (err) {
                    console.error('Error restarting application:', err);
                } else {
                    console.log('Application restarted successfully');
                }
            });
            res.status(200).json({ message: `Deleted record with ID ${id} successfully` });
        } else {
            res.status(500).json({ message: `Failed to delete record with ID ${id}` });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Failed to delete record' });
    }
});

async function getUrlById(id) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT url FROM scrap_data_site WHERE id = ?', [id]);
      if (rows.length > 0) {
        return rows[0].url;
      } else {
        console.log(`URL with ID ${id} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error querying URL by ID:', error);
      return null;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async function getUrlIdByUrl(url) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT id FROM scrap_data_site WHERE url = ?', [url]);
      if (rows.length > 0) {
        return rows[0].id;
      } else {
        console.log(`URL with ID ${id} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error querying URL by ID:', error);
      return null;
    }
  }

  
// Define allIntents globally to store all intents
let allIntents = [];

async function deleteFromIntents(id) {
    try {
        const urlToDelete = await getUrlById(id);
        if (!urlToDelete) {
            console.error(`URL with ID ${id} not found.`);
            return false;
        }

        // Filter out intents associated with the deleted URL
        allIntents = allIntents.filter(intent => intent.url !== urlToDelete);

        // Save the updated intents
        await saveIntents(allIntents);

        console.log(`Deleted intents associated with URL ${urlToDelete} successfully`);
        return true;
    } catch (error) {
        console.error('Error deleting intents:', error);
        return false;
    }
}


// Example Node.js/Express endpoint to fetch status

async function updateScrapingStatus(id, status) {
    try {
        const sql = 'UPDATE scrap_data_site SET status = ? WHERE id = ?';
        await db.query(sql, [status, id]);
        console.log(`Updated status to '${status}' for ID ${id}`);
    } catch (error) {
        console.error(`Error updating status for ID ${id}:`, error);
    }
}


// Endpoint to serve intents data
app.get('/api/intents', (req, res) => {
    const intentsPath = path.join(__dirname, 'intents.json');

    fs.readFile(intentsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading intents file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(JSON.parse(data));
    });
});



app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


