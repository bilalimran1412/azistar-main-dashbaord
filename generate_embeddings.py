import sys
import json
from sentence_transformers import SentenceTransformer

def generate_embeddings(texts):
    model = SentenceTransformer('all-MiniLM-L12-v2')
    embeddings = model.encode(texts)
    return embeddings.tolist()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_embeddings.py <json_texts>")
        sys.exit(1)
    texts = json.loads(sys.argv[1])
    embeddings = generate_embeddings(texts)
    print(json.dumps(embeddings))
