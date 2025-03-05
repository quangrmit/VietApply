from playwright.sync_api import sync_playwright, Playwright
from bs4 import BeautifulSoup
import requests
import time
import json

from database import insert_jobs

def runYbox(playwright: Playwright):
    base_url = "https://ybox.vn"
    chromium = playwright.chromium
    browser = chromium.launch(headless = False)
    context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
    page = context.new_page()
    page.goto("https://ybox.vn/tuyen-dung-viec-lam-tk-c1?keyword=", wait_until = "load")
    time.sleep(3)
    prev_height = -1
    count = 0
    while count < 0:
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        time.sleep(5)

        new_height = page.evaluate("document.body.scrollHeight")


        if new_height == prev_height:
            break


        prev_height = new_height
        count += 1
    links = page.query_selector_all('a[href^="/tuyen-dung/"]')
    job_details = {}
    job_links = []
    for link in links:
        mid = link.get_attribute("href")
        mid = mid.split("#")[0]
        job_links.append(mid)

    job_links = list(dict.fromkeys(job_links))
    # print(job_links)
    for link in job_links:
        job_details[link] = extractJobDescription(base_url + link)
    

    with open("test.json", "w") as file:
        json.dump(job_details, file)

    ## Test load file with its embedding into postgresql
    job_details = {}
    with open("test.json") as file:
        job_details = json.load(file)
    insert_jobs(job_details)

def extractJobDescription(link):
    print("____________________________")
    print(f"Extracting text from: {link}")
    response = requests.get(link)
    if response.status_code != 200:
        return "Can't access the web page"

    soup = BeautifulSoup(response.text, 'html.parser')

    res = {}
    ## Extract relevant data
    title = soup.select('h3 a')
    res['title'] = title[0].text
    company = soup.select('.username')
    res['company'] = company[1].text

    target_div = soup.find_all('div', style="background:#eaeaea;padding:15px;margin:10px 0 10px 0;border-radius:10px;")
    
    ## Extract feature
    feature_text = target_div[0].get_text().strip()
    keywords = ("Mức lương", "Chuyên môn", "Kinh nghiệm", "Địa điểm", "Tính chất công việc")
    keywords_col = {"Mức lương": "salary", "Chuyên môn": "skills", "Kinh nghiệm": "experience", "Địa điểm": "location", "Tính chất công việc": "job-type"}
    keywords_map = {}
    for keyword in keywords:
        keywords_map[keyword] = feature_text.find(keyword)
    keywords_map = {k: v for k, v in sorted(keywords_map.items(), key=lambda item: item[1])}
    keys = list(keywords_map.keys())
    keyword_index = list(keywords_map.values())

    for i in range(len(keys)):
        if (i == len(keys) - 1):
            res[keywords_col[keys[i]]] = feature_text[keyword_index[i]:] 
            break
        res[keywords_col[keys[i]]] = feature_text[keyword_index[i]:keyword_index[i+1]]           

    ## Extract entire jobs content
    target_div = soup.find_all('div', { "id": "post-content" })[0]
    child_divs = target_div.find_all('div', recursive=False)[1:]
    jobs_content = []
    for div in child_divs:
        jobs_content.append(stripTag(div))
    
    ## Some page format with inconsistent div elements, result in overbloating elements
    if (len(jobs_content) >= 10):
        mid = "\n".join(jobs_content)
        jobs_content = [mid]
    
    res['description'] = jobs_content
    return res

def stripTag(div_element):
    extracted_texts = []
    for element in div_element.find_all(recursive=True):
        if element.string and element.string.strip():
            extracted_texts.append(element.string.strip())
    extracted_texts = list(dict.fromkeys(extracted_texts))
    res = "\n".join(extracted_texts)
    return res

with sync_playwright() as playwright:
    runYbox(playwright)