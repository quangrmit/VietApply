from sentence_transformers import SentenceTransformer

model = SentenceTransformer("dangvantuan/vietnamese-document-embedding", trust_remote_code=True)

def embed_document(document):
    docs = [document]
    embeddings = model.encode(docs)
    return embeddings[0]