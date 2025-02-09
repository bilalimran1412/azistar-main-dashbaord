const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');
const { HfInference } = require('@huggingface/inference');
const { performance } = require('perf_hooks');

const hf = new HfInference('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'); // Replace with your API key
const knowledgeBaseFile = path.join(__dirname, 'knowledge_base.json');
let knowledgeBaseEmbeddings = {};

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
async function generateEmbeddings(texts) {
    try {
        console.log(`Generating embeddings for texts at: ${new Date().toISOString()}`);
        const response = await hf.featureExtraction({
            inputs: texts,
            model: 'sentence-transformers/all-MiniLM-L12-v2', // More advanced model
        });
        console.log(`Received embeddings response at: ${new Date().toISOString()}`);
        return response; // Return the embedding vectors
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
    const knowledgeBase = JSON.parse(fs.readFileSync(knowledgeBaseFile, 'utf8'));
    const queryEmbedding = await generateEmbeddings([query]);
    if (!queryEmbedding) return 'Error generating embedding for the query.';

    // Generate embeddings for entries if needed
    const entriesToEmbed = knowledgeBase.filter(entry => !knowledgeBaseEmbeddings[entry.url]);
    if (entriesToEmbed.length > 0) {
        const embeddings = await generateEmbeddings(entriesToEmbed.map(entry => entry.content));
        embeddings.forEach((embedding, index) => {
            knowledgeBaseEmbeddings[entriesToEmbed[index].url] = embedding;
        });
    }

    // Calculate similarities
    const similarities = knowledgeBase.map(entry => ({
        entry,
        score: cosineSimilarity(queryEmbedding[0], knowledgeBaseEmbeddings[entry.url]),
    }));

    const topResult = similarities.sort((a, b) => b.score - a.score)[0];
    if (!topResult) return 'No relevant information found.';

    const context = topResult.entry.content;
    const prompt = `
Context:
${context}

User's Query:
${query}

Your Response:
`;

    try {
        const response = await hf.textGeneration({
            model: 'google/flan-t5-xxl', // Use a smaller but good model
            inputs: prompt,
            parameters: {
                max_length: 150,
                temperature: 0.7,
            }
        });
        return response.generated_text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error('Error querying Hugging Face:', error);
        return 'Error generating a response. Please try again later.';
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
