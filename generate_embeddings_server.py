from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L12-v2')
executor = ThreadPoolExecutor(max_workers=4)

def generate_embeddings(texts):
    embeddings = model.encode(texts)
    return embeddings.tolist()

@app.route('/generate_embeddings', methods=['POST'])
def generate_embeddings_endpoint():
    data = request.json
    texts = data.get('texts', [])
    future = executor.submit(generate_embeddings, texts)
    embeddings = future.result()
    return jsonify(embeddings)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
