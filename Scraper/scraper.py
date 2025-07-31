import os
import time
import pandas as pd
from tqdm import tqdm
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ====== 配置 ======
CHROMEDRIVER_PATH = "../chromedriver.exe"  # 修改为实际路径
TARGET_URL = "https://cims.cidb.gov.my/smis/regcontractor/reglocalsearchcontractor.vbhtml"
TOTAL_PAGES = 139
SAVE_FOLDER = "./pages_output"
LOG_FILE = "progress.log"
os.makedirs(SAVE_FOLDER, exist_ok=True)

# ====== 恢复上次进度 ======
if os.path.exists(LOG_FILE):
    with open(LOG_FILE, "r") as f:
        completed_pages = [int(line.strip().split(":")[1]) for line in f if line.startswith("PAGE_COMPLETED")]
    start_page = max(completed_pages) + 1 if completed_pages else 1
else:
    start_page = 1

# ====== 初始化浏览器 ======
options = Options()
options.add_argument("--disable-gpu")
options.add_argument("--disable-software-rasterizer")
options.add_argument("--no-sandbox")
options.add_argument("--disable-extensions")
options.add_argument("--disable-background-networking")
driver = webdriver.Chrome(service=Service(CHROMEDRIVER_PATH), options=options)
driver.maximize_window()

# ====== 打开页面 ======
driver.get(TARGET_URL)
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "btnfilter")))
driver.find_element(By.ID, "btnfilter").click()

# ====== 设置每页显示 1000 条 ======
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "selpagesize")))
time.sleep(1)
select_elem = driver.find_element(By.ID, "selpagesize")
select_elem.click()
select_elem.find_element(By.XPATH, './/option[@value="1000"]').click()
time.sleep(3)

# ====== 主循环 ======
for page in range(start_page, TOTAL_PAGES + 1):
    print(f"\n📄 当前页：{page}")
    page_filename = f"{SAVE_FOLDER}/page_{page}.xlsx"

    if os.path.exists(page_filename):
        print(f"✅ 第 {page} 页文件已存在，跳过")
        continue

    contractors = []
    failed_items = []

    WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "open-AddBookDialog1")))
    links = driver.find_elements(By.CLASS_NAME, "open-AddBookDialog1")
    total = len(links)

    for i in tqdm(range(total), desc=f"抓取第 {page} 页", ncols=100):
        try:
            links = driver.find_elements(By.CLASS_NAME, "open-AddBookDialog1")
            link = links[i]
            driver.execute_script("arguments[0].scrollIntoView(true);", link)
            driver.execute_script("arguments[0].click();", link)

            WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "mypaymodal")))
            iframe = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "iframe")))
            driver.switch_to.frame(iframe)

            def extract_field(label):
                try:
                    th = driver.find_element(By.XPATH, f'//th[text()="{label}"]')
                    td = th.find_element(By.XPATH, './following-sibling::th')
                    return td.text.strip()
                except:
                    return ""

            try:
                name = driver.find_element(By.XPATH, '//b').text.strip()
            except:
                name = ""

            tel = extract_field("Tel No")
            fax = extract_field("Fax No")
            ppk = extract_field("PPK Registration No")
            expiry = extract_field("Current Registration Expiry Date")

            try:
                gred_raw = driver.find_element(
                    By.XPATH, '//table[contains(@class,"table-bordered")]/tbody/tr/td'
                ).text.strip()
                gred = gred_raw.split()[0] if gred_raw.startswith("G") else ""
            except:
                gred = ""

            contractors.append({
                "Name": name,
                "Tel No": tel,
                "Fax No": fax,
                "PPK Registration No": ppk,
                "Current Registration Expiry Date": expiry,
                "Gred": gred
            })

            driver.switch_to.default_content()
            close_btn = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, '//button[@class="close" and @data-dismiss="modal"]'))
            )
            driver.execute_script("arguments[0].click();", close_btn)
            WebDriverWait(driver, 5).until_not(EC.visibility_of_element_located((By.ID, "mypaymodal")))

        except Exception as e:
            failed_items.append({"page": page, "index": i, "error": str(e)})
            driver.switch_to.default_content()
            continue

    pd.DataFrame(contractors).to_excel(page_filename, index=False)
    print(f"✅ 第 {page} 页数据已保存到 {page_filename}")

    if failed_items:
        pd.DataFrame(failed_items).to_excel(f"{SAVE_FOLDER}/failed_page_{page}.xlsx", index=False)

    with open(LOG_FILE, "a") as log:
        log.write(f"PAGE_COMPLETED: {page}\n")

    try:
        next_btn = driver.find_element(By.XPATH, f'//a[@class="clnavto" and text()="{page+1}"]')
        driver.execute_script("arguments[0].click();", next_btn)
        time.sleep(2)
    except:
        print("✅ 最后一页处理完毕")
        break

driver.quit()
print("🎉 所有页面处理完成。日志已保存。")
