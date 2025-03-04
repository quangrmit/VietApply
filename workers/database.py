from pgvector.psycopg import register_vector
import psycopg
from embeddings import embed_document
import io
import PyPDF2

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

## Only run this function if this is the first time setting up the database
def setup():
    
    conn.execute('DROP TABLE IF EXISTS jobs')
    conn.execute('CREATE TABLE jobs (id bigserial PRIMARY KEY, title text, company text, salary text, location text, skills text, link text, content text, embedding vector(768))')

    conn.execute('DROP TABLE IF EXISTS cvs')
    conn.execute('CREATE TABLE cvs (id SERIAL PRIMARY KEY, filename TEXT, data bytea)')

# setup()

def setup_benchmark():
    conn.execute('DROP TABLE IF EXISTS jobs_benchmark')
    conn.execute('CREATE TABLE jobs_benchmark (id bigserial PRIMARY KEY, title text, company text, salary text, location text, skills text, link text, content text, embedding vector(768))')

def insert_jobs_benchmark(jobs):
    for job in jobs:
        embed = embed_document(job['content'])

        conn.execute("INSERT INTO jobs_benchmark (title, company, salary, location, skills, link, content, embedding) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (job['title'], job['company'], job['salary'], job['location'], job['skills'], job['link'], job['content'], embed))
'''
Function to insert 1 CV to a user's database
Input: A resume
Output: None
'''
def insert_jobs(docs):
    base_url = "https://ybox.vn"
    for link in docs:
        for job in docs[link]['description']:
            print("Inserting job...")
            embed = embed_document(job)
            # print((docs[link]['title'], docs[link]['company'], docs[link]['salary'], docs[link]['location'], docs[link]['skills'], base_url + link, job, embed))
            conn.execute("INSERT INTO jobs (title, company, salary, location, skills, link, content, embedding) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (docs[link]['title'], docs[link]['company'], docs[link]['salary'], docs[link]['location'], docs[link]['skills'], base_url + link, job, embed))

    return

'''
Function to extract text from a PDF resume
Input: A PDF file
Output: A list of strings
'''
def pdf_text(pdf):
    text_list = []
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text_list.append(page.extract_text())
    return text_list

'''
Function to get content of file from id
Input: A resume id
Output: Resume result
'''
def fetch_resume_text(resume_id):
    result = conn.execute(f"SELECT data FROM cvs WHERE id = {resume_id}")
    row = result.fetchone()
    pdf_file = io.BytesIO(row[0])
    pdf_content = PyPDF2.PdfReader(pdf_file)

    text = "\n".join([page.extract_text() for page in pdf_content.pages if page.extract_text()])

    return text


'''
Function to get the best matching cv from embeddings, using the cosine method
Input: A string CV
Output: Top 10 most suited job list
'''
def vector_search_job(cv):
    print("Embedding the CV")
    embed_cv = embed_document(cv)
    
    neighbors = conn.execute("SELECT id FROM jobs ORDER BY embedding <=> %s LIMIT 10", (embed_cv,))

    res = []
    for neighbor in neighbors:
        res.append(neighbor[0])
    return res


def vector_search_job_benchmark(cv):
    print("Embedding the CV")
    embed_cv = embed_document(cv)
    
    neighbors = conn.execute("SELECT id FROM jobs_benchmark ORDER BY embedding <=> %s DESC LIMIT 10", (embed_cv,))

    res = []
    for neighbor in neighbors:
        res.append(neighbor[0])
    return res

