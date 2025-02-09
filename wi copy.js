const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference('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'); // Replace with your API key
const knowledgeBaseFile = path.join(__dirname, 'knowledge_base.json');

// Function to scrape data from a URL
async function scrapeWebsite(url) {
    try {
        console.log(`Scraping data from: ${url}`);
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('script, style, img, link').remove();
        const title = $('title').text().trim();
        const bodyText = $('body').text().replace(/\s+/g, ' ').trim();

        console.log('Scraping completed successfully.');
        return { url, title, content: bodyText };
    } catch (error) {
        console.error(`Error scraping URL ${url}:`, error);
        return null;
    }
}

// Function to save data to the knowledge base
function saveToKnowledgeBase(entry) {
    let knowledgeBase = [];
    if (fs.existsSync(knowledgeBaseFile)) {
        const content = fs.readFileSync(knowledgeBaseFile, 'utf8');
        knowledgeBase = JSON.parse(content);
    }
    knowledgeBase.push({ ...entry, timestamp: new Date().toISOString() });
    fs.writeFileSync(knowledgeBaseFile, JSON.stringify(knowledgeBase, null, 2), 'utf8');
    console.log(`Data from ${entry.url} saved to the knowledge base.`);
}

// Function to generate embeddings using Hugging Face
async function generateEmbedding(text) {
    try {
        //console.log(`Generating embedding for text: ${text}`);
        const response = await hf.featureExtraction({
            inputs: text,
            model: 'sentence-transformers/all-mpnet-base-v2', // Updated model
        });
        //console.log('Embedding response:', response);
        return response; // Return the embedding vector
    } catch (error) {
        console.error('Error generating embeddings:', error);
        return null;
    }
}

// Function to compute cosine similarity
function cosineSimilarity(vecA, vecB) {

    if (!Array.isArray(vecA) || !Array.isArray(vecB)) 
        throw new TypeError('Embeddings must be arrays');
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a ** 2, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b ** 2, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

// Function to query the knowledge base using semantic similarity
async function queryKnowledgeBaseWithLLM(query) {
    if (!fs.existsSync(knowledgeBaseFile)) {
        console.error('Knowledge base file not found. Please scrape a URL first.');
        return 'Knowledge base is empty. Please add some data.';
    }

    const knowledgeBase = JSON.parse(fs.readFileSync(knowledgeBaseFile, 'utf8'));

    const queryEmbedding = await generateEmbedding(query);
    if (!queryEmbedding ) {
        //console.error('Error generating embedding for the query.');
        return 'Error generating embedding for the query.';
    }

    // Compute similarity for each entry
    const similarities = [];
    for (const entry of knowledgeBase) {
        if (!entry.content) continue; // Skip if content is missing or empty

        const entryEmbedding = await generateEmbedding(entry.content);
        if (!entryEmbedding) {
            console.error(`Skipping entry due to invalid embedding for URL: ${entry.url}`);
            continue; // Skip invalid embeddings
        }

        try {

            console.log(queryEmbedding,"/n now other /n/n",entryEmbedding)

            const score = cosineSimilarity(queryEmbedding, entryEmbedding);
            similarities.push({ entry, score });
        } catch (error) {
            console.error(`Error calculating similarity for URL: ${entry.url}`, error);
        }
    }

    // Sort by similarity and get top results
    const topResults = similarities
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(r => r.entry);

    if (topResults.length === 0) {
        return 'No relevant information found in the knowledge base.';
    }

    const context = topResults.map(r => r.content).join('\n\n');
    const prompt = `
You are a knowledgeable assistant. Use the context below to answer the user's query in a detailed and conversational tone. After providing the answer, ask a relevant follow-up question to engage further.

Context:
${context}

User's Query:
${query}

Your Response:
`;

    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            const response = await hf.textGeneration({
                inputs: prompt,
                parameters: { max_length: 300, temperature: 0.7 },
                model: 'google/flan-ul2',
            });
            return response.generated_text || "I'm sorry, I couldn't generate a response.";
        } catch (error) {
            attempt++;
            console.error(`Error querying the LLM (Attempt ${attempt}):`, error);
            if (attempt >= maxRetries) {
                return 'Error generating a response. Please try again later.';
            }
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        }
    }
}

// Console interface
function startConsoleInterface() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const promptMenu = () => {
        console.log('\nChoose an option:');
        console.log('1. Scrape a URL');
        console.log('2. Query the Knowledge Base');
        console.log('3. Exit');
        rl.prompt();
    };

    console.log('Welcome to the Web Scraper and Knowledge Base!');
    promptMenu();

    rl.on('line', async (input) => {
        const option = input.trim();

        if (option === '1') {
            rl.question('Enter the URL to scrape: ', async (url) => {
                const data = await scrapeWebsite(url);
                if (data) saveToKnowledgeBase(data);
                promptMenu();
            });
        } else if (option === '2') {
            rl.question('Enter your query: ', async (query) => {
                const response = await queryKnowledgeBaseWithLLM(query);
                console.log(`Response: ${response}`);
                promptMenu();
            });
        } else if (option === '3') {
            console.log('Goodbye!');
            rl.close();
        } else {
            console.log('Invalid option. Please choose 1, 2, or 3.');
            promptMenu();
        }
    });

    rl.on('close', () => {
        console.log('Exiting the application.');
        process.exit(0);
    });
}

// Start the console interface
startConsoleInterface();
