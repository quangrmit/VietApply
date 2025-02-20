import redis
import json
import base64
import time

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def process_job(job_data):
    """Custom processing logic"""
    job_id = job_data["jobId"]
    message = job_data["message"]
    file_data = job_data.get("fileData")

    # Decode base64 file
    if file_data:
        file_bytes = base64.b64decode(file_data)
        print(file_bytes)
        with open(f"/test/{job_id}.txt", "wb") as f:  # Save file temporarily
            f.write(file_bytes)

    # Simulate processing
    result = f"Processed {message} with file {job_id}.txt"

    # Store result in Redis
    r.set(f"result:{job_id}", result, ex=300)  # Expire in 5 minutes

while True:
    print("Processing")
    job_json = r.lpop("job_queue")  # Non-blocking pop
    if job_json:
        job_data = json.loads(job_json)
        try:
            print(job_data)
            # process_job(job_data)
        except Exception as e:
            print(f"Error processing job {job_data['jobId']}: {e}")
    else:
        time.sleep(1)  # Avoid busy-waiting, poll every 1 second
