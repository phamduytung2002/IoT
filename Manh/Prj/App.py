from flask import Flask, render_template
from pymongo import MongoClient
import os
import threading
import schedule
import time

app = Flask(__name__)

# Kết nối đến MongoDB
mongo_uri = "mongodb+srv://ducdm200158:e4kZPtLErHksXuqn@cluster0.xbcgsq9.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client.get_database('test')

# Thay 'dht11' bằng tên thực tế của bảng trong cơ sở dữ liệu MongoDB của bạn
collection = db['dht11']

def fetch_data_and_update():
    # Thực hiện truy vấn và lấy dữ liệu từ MongoDB
    data = list(collection.find({}))
    
    # Chuyển đổi ObjectId thành str để có thể chuyển thành JSON
    for item in data:
        item['_id'] = str(item['_id'])
        
    # Render template và truyền dữ liệu vào
    with app.app_context():
        template_rendered = render_template('index.html', data=data)
        return template_rendered

def job():
    print("Fetching data and updating...")
    fetch_data_and_update()

# Lập lịch chạy công việc mỗi 1 phút
schedule.every(1).minutes.do(job)

def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(1)

# Chạy ứng dụng Flask trong một thread riêng biệt
if __name__ == '__main__':
    # Khởi tạo một thread chạy lịch trình
    schedule_thread = threading.Thread(target=run_schedule)
    schedule_thread.start()

    # Chạy ứng dụng Flask
    app.run(debug=True)
