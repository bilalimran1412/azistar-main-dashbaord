from flask import Flask, request, jsonify
import faiss
import numpy as np
from transformers import AutoTokenizer, AutoModel
import torch

app = Flask(__name__)

# Create a FAISS index
dimension = 384  # Assuming 384-dimensional embeddings for MiniLM
index = faiss.IndexFlatL2(dimension)

# Load the model and tokenizer
model_name = 'sentence-transformers/all-MiniLM-L6-v2'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def generate_embedding(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

@app.route('/generate_embedding', methods=['POST'])
def generate_embedding_endpoint():
    data = request.json
    text = data['text']
    embedding = generate_embedding(text)
    return jsonify({'embedding': embedding.tolist()})

@app.route('/add_embeddings', methods=['POST'])
def add_embeddings():
    data = request.json
    embeddings = np.array(data['embeddings'], dtype='float32')
    index.add(embeddings)
    return jsonify({'status': 'success'})

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    query_embedding = np.array(data['query_embedding'], dtype='float32').reshape(1, -1)
    k = data.get('k', 3)
    distances, indices = index.search(query_embedding, k)
    return jsonify({'indices': indices.tolist(), 'distances': distances.tolist()})

if __name__ == '__main__':
    app.run(port=5001) 