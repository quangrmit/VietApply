from pgvector.psycopg import register_vector
import psycopg
from embeddings import embed_document

# Establish connection
conn = psycopg.connect(
    dbname="devdb",
    user="devuser",
    password="devpassword",
    host="localhost",
    port="5432",
    autocommit=True
)
conn.execute("CREATE EXTENSION IF NOT EXISTS vector")
register_vector(conn)

# conn.execute('DROP TABLE IF EXISTS jobs')
# conn.execute('CREATE TABLE jobs (id bigserial PRIMARY KEY, link text, content text, embedding vector(768))')

'''
Function to insert multiple job posts crawl from website into database
Input: A list of jobs object
Output: None
'''
def insert_jobs(docs):
    base_url = "https://ybox.vn"
    for link in docs:
        for job in docs[link]:
            print("Inserting job...")
            embed = embed_document(job)
            conn.execute("INSERT INTO jobs (link, content, embedding) VALUES (%s, %s, %s)", (base_url + link, job, embed))

    return


'''
Function to get the best matching cv from embeddings, using the cosine method
Input: A string CV
Output: Top 10 most suited job list
'''
def vector_search_job(cv):
    print("Embedding the CV")
    embed_cv = embed_document(cv)
    
    neighbors = conn.execute("SELECT link FROM jobs ORDER BY embedding <=> %s LIMIT 5", (embed_cv,))

    return list(neighbors)

