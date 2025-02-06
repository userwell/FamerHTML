import mysql.connector
import requests
import logging
import schedule
import time

vegetable_list = ["萝卜", "苹果", "西瓜", "辣椒", "草莓", "南瓜", "火龙果", "橘子", "芒果", "椰子", "菠萝", "木瓜", "葡萄"];

# 配置日志
logging.basicConfig(
    filename='update_db.log',       # 日志文件
    level=logging.INFO,             # 设置日志级别为 INFO（记录所有 INFO 及以上级别的日志）
    format='%(asctime)s - %(levelname)s - %(message)s',  # 日志格式
    datefmt='%Y-%m-%d %H:%M:%S'      # 时间格式
)
# 1. 连接 MySQL 数据库
def connect_db():
    return mysql.connector.connect(
        host="127.0.0.1",    # 数据库主机
        user="www_foundright_x",    # 数据库用户名
        password="zxj123",    # 数据库密码
        database="www_foundright_x"   # 数据库名
    )
def parseData(response):
    response = response.json()
    # print(response['data'])
    fruit = ['萝卜','苹果','西瓜',
            '辣椒','草莓','南瓜',
            '火龙果','橘子','芒果',
            '椰子','菠萝','木瓜',
            '葡萄','化肥','超级化肥',
            '黄宝石'
            ]
    fruitPrice = {}
    try:
        for i,data in enumerate(response['data']):
            #print(str(i) + " " +  str(data))
            fruitPrice[fruit[i]] = int(data['lastPrice'])/1000
    except:
        logging.error("访问农场市场价格接口返回数据存在问题,"+str(response))
        return None
    return fruitPrice
# 2. 获取数据并更新数据库
def fetch_and_update_data():
    url = "http://139.196.208.160:30007/app/farm/market.price"  # 替换为目标 API 的地址
    try:
        # 发送 POST 请求
        response = requests.post(url, json={"userId": "6659"})  # 替换为实际的请求体
        if response.status_code == 200:
            data = parseData(response)
            if data == None:
                return
            print(data)
            logging.info("网络请求成功:"+str(data))
            # 连接数据库
            db = connect_db()
            cursor = db.cursor()

            # 假设返回的数据是一个产品列表
            for index,product in enumerate(data):
                id = index + 1
                name = product
                price = data[product]
                # 使用 INSERT INTO...ON DUPLICATE KEY UPDATE 来避免重复插入
                sql = """
                    INSERT INTO products (id, name, price)
                    VALUES (%s, %s, %s)
                    ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price)
                """
                cursor.execute(sql, (id, name, price))
            
            # 提交更新
            db.commit()
            cursor.close()
            db.close()
            logging.info("数据库更新成功")
            print("数据库更新成功")
        else:
            logging.warning(f"请求失败，状态码：{response.status_code}")
            print(f"请求失败，状态码：{response.status_code}")
    except Exception as e:
        print(f"更新失败: {e}")
        logging.warning(f"更新失败: {e}")

# 3. 设置定时任务
def schedule_task():
    # 每隔 10 分钟执行一次
    schedule.every(60 * 10).seconds.do(fetch_and_update_data)
    
    while True:
        schedule.run_pending()
        time.sleep(1)

# 启动定时任务
if __name__ == "__main__":
    logging.info("定时任务开启")
    schedule_task()

