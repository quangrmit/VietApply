import redis
import json
import base64
import time

from database import fetch_resume_text, vector_search_job

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def process_job(job_data):
    """Custom processing logic"""
    print(f"Processing job: {job_data}")
    message_id = job_data["messageId"]
    resume_id = job_data["resumeId"]
    
    # Extract resume content
    text = fetch_resume_text(resume_id)

    # Search similar job
    res = vector_search_job(text)

    # Serialize object
    res = json.dumps(res)

    print(res)
    # Store result in Redis
    r.hset(message_id, "status", "complete")
    r.hset(message_id, "result", res)

while True:
    print("Processing")
    job_json = r.lpop("job_queue")  # Non-blocking pop
    if job_json:
        job_data = json.loads(job_json)
        try:
            process_job(job_data)
        except Exception as e:
            print(f"Error processing job {job_data['messageId']}: {e}")
    else:
        time.sleep(1)  # Avoid busy-waiting, poll every 1 second
